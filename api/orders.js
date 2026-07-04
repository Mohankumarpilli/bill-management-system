import { Pool } from '@neondatabase/serverless';
import { sql } from './_db.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const orders = await sql`
        SELECT
          o.id, o.order_type, o.table_number, o.customer_name, o.subtotal, o.created_at,
          COALESCE(
            json_agg(
              json_build_object(
                'menu_item_id', oi.menu_item_id,
                'name', oi.name,
                'price', oi.price,
                'variant', oi.variant,
                'qty', oi.qty
              )
            ) FILTER (WHERE oi.id IS NOT NULL),
            '[]'
          ) AS items
        FROM orders o
        LEFT JOIN order_items oi ON oi.order_id = o.id
        GROUP BY o.id
        ORDER BY o.created_at DESC
      `;
      return res.status(200).json(orders);
    }

    if (req.method === 'POST') {
      const { orderType, tableNumber, customerName, subtotal, items } = req.body ?? {};
      if (!orderType || !subtotal || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'orderType, subtotal and at least one item are required' });
      }

      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const { rows: [order] } = await client.query(
          `INSERT INTO orders (order_type, table_number, customer_name, subtotal)
           VALUES ($1, $2, $3, $4) RETURNING id, order_type, table_number, customer_name, subtotal, created_at`,
          [orderType, tableNumber || null, customerName || null, subtotal]
        );
        for (const item of items) {
          await client.query(
            `INSERT INTO order_items (order_id, menu_item_id, name, price, variant, qty)
             VALUES ($1, $2, $3, $4, $5, $6)`,
            [order.id, item.menuItemId, item.name, item.price, item.variant || null, item.qty]
          );
        }
        await client.query('COMMIT');
        return res.status(201).json({ ...order, items });
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
        await pool.end();
      }
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
