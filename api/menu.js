import { sql } from './_db.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const items = await sql`
        SELECT id, name, price, emoji, bg_color AS bg, variant, categories AS cats
        FROM menu_items
        ORDER BY created_at ASC
      `;
      return res.status(200).json(items);
    }

    if (req.method === 'POST') {
      const { id, name, price, emoji, bg, variant, cats } = req.body ?? {};
      if (!id || !name || !price || !Array.isArray(cats) || cats.length === 0) {
        return res.status(400).json({ error: 'id, name, price and at least one category are required' });
      }
      const [item] = await sql`
        INSERT INTO menu_items (id, name, price, emoji, bg_color, variant, categories)
        VALUES (${id}, ${name}, ${price}, ${emoji}, ${bg}, ${variant}, ${cats})
        RETURNING id, name, price, emoji, bg_color AS bg, variant, categories AS cats
      `;
      return res.status(201).json(item);
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: 'id is required' });
      await sql`DELETE FROM menu_items WHERE id = ${id}`;
      return res.status(204).end();
    }

    res.setHeader('Allow', 'GET, POST, DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
