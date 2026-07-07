import { sql } from './_db.js';

function isValidDate(str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str) && !Number.isNaN(new Date(str).getTime());
}

function toTotals(row) {
  return { revenue: Number(row.revenue), qty: Number(row.qty), orders: Number(row.orders) };
}

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { date } = req.query ?? {};
    if (!date || !isValidDate(date)) {
      return res.status(400).json({ error: 'A valid date query param (YYYY-MM-DD) is required' });
    }

    const [[dayRow], [monthRow], [yearRow]] = await Promise.all([
      sql`
        SELECT
          (SELECT COALESCE(SUM(subtotal), 0) FROM orders WHERE created_at::date = ${date}::date) AS revenue,
          (SELECT COUNT(*) FROM orders WHERE created_at::date = ${date}::date) AS orders,
          (SELECT COALESCE(SUM(oi.qty), 0) FROM order_items oi JOIN orders o ON o.id = oi.order_id WHERE o.created_at::date = ${date}::date) AS qty
      `,
      sql`
        SELECT
          (SELECT COALESCE(SUM(subtotal), 0) FROM orders WHERE date_trunc('month', created_at) = date_trunc('month', ${date}::date)) AS revenue,
          (SELECT COUNT(*) FROM orders WHERE date_trunc('month', created_at) = date_trunc('month', ${date}::date)) AS orders,
          (SELECT COALESCE(SUM(oi.qty), 0) FROM order_items oi JOIN orders o ON o.id = oi.order_id WHERE date_trunc('month', o.created_at) = date_trunc('month', ${date}::date)) AS qty
      `,
      sql`
        SELECT
          (SELECT COALESCE(SUM(subtotal), 0) FROM orders WHERE date_trunc('year', created_at) = date_trunc('year', ${date}::date)) AS revenue,
          (SELECT COUNT(*) FROM orders WHERE date_trunc('year', created_at) = date_trunc('year', ${date}::date)) AS orders,
          (SELECT COALESCE(SUM(oi.qty), 0) FROM order_items oi JOIN orders o ON o.id = oi.order_id WHERE date_trunc('year', o.created_at) = date_trunc('year', ${date}::date)) AS qty
      `,
    ]);

    return res.status(200).json({
      date,
      day: toTotals(dayRow),
      month: toTotals(monthRow),
      year: toTotals(yearRow),
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
