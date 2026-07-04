import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

const INIT_MENU = [
  { id: "cb",   name: "Chicken Burger",    price: 120, cats: ["Favorite", "Main course"],       emoji: "🍔", bg: "#fff3e0", variant: "Regular" },
  { id: "cl",   name: "Cafe Latte",         price: 110, cats: ["Favorite", "Coffee"],            emoji: "☕", bg: "#fbe9e7", variant: "Large"   },
  { id: "cs",   name: "Caesar Salad",       price: 200, cats: ["Favorite", "Main course"],       emoji: "🥗", bg: "#e8f5e9", variant: "Regular" },
  { id: "cd",   name: "Chocolate Donut",    price: 160, cats: ["Favorite", "Desserts"],          emoji: "🍩", bg: "#fce4ec", variant: "Regular" },
  { id: "bc",   name: "Belgian Choco Shot", price: 60,  cats: ["Favorite", "Coffee"],            emoji: "🧋", bg: "#efebe9", variant: "Regular" },
  { id: "vs",   name: "Veg Sandwich",       price: 60,  cats: ["Favorite", "Add on"],            emoji: "🥪", bg: "#f3e5f5", variant: "Regular" },
  { id: "ct",   name: "Chicken Tenders",    price: 200, cats: ["Favorite", "Main course"],       emoji: "🍗", bg: "#fff8e1", variant: "Regular" },
  { id: "cc",   name: "Cold Coffee",        price: 80,  cats: ["Favorite", "Coffee", "Drinks"],  emoji: "🥤", bg: "#e0f2f1", variant: "Regular" },
  { id: "vl",   name: "Vanilla Latte",      price: 90,  cats: ["Favorite", "Coffee"],            emoji: "☕", bg: "#fbe9e7", variant: "Regular" },
  { id: "ctc",  name: "Choco Truffle Cake", price: 80,  cats: ["Favorite", "Desserts"],          emoji: "🎂", bg: "#fce4ec", variant: "Regular" },
  { id: "chb",  name: "Choco Brownie",      price: 60,  cats: ["Favorite", "Desserts"],          emoji: "🍫", bg: "#efebe9", variant: "Regular" },
  { id: "fw",   name: "Flat White",         price: 120, cats: ["Favorite", "Coffee"],            emoji: "☕", bg: "#fbe9e7", variant: "Regular" },
  { id: "cap",  name: "Cappuccino",         price: 90,  cats: ["Coffee"],                        emoji: "☕", bg: "#fbe9e7", variant: "Regular" },
  { id: "esp",  name: "Espresso",           price: 70,  cats: ["Coffee"],                        emoji: "☕", bg: "#efebe9", variant: "Single"  },
  { id: "ame",  name: "Americano",          price: 80,  cats: ["Coffee"],                        emoji: "☕", bg: "#e8eaf6", variant: "Regular" },
  { id: "moc",  name: "Mocha",             price: 110, cats: ["Coffee"],                        emoji: "☕", bg: "#fce4ec", variant: "Regular" },
  { id: "ff",   name: "French Fries",      price: 60,  cats: ["Add on"],                        emoji: "🍟", bg: "#fff8e1", variant: "Regular" },
  { id: "gb",   name: "Garlic Bread",      price: 50,  cats: ["Add on"],                        emoji: "🍞", bg: "#fff3e0", variant: "Regular" },
  { id: "nug",  name: "Chicken Nuggets",   price: 80,  cats: ["Add on"],                        emoji: "🍗", bg: "#fff8e1", variant: "6 pcs"   },
  { id: "vp",   name: "Veg Pasta",         price: 150, cats: ["Main course"],                   emoji: "🍝", bg: "#fff3e0", variant: "Regular" },
  { id: "gch",  name: "Grilled Chicken",   price: 250, cats: ["Main course"],                   emoji: "🍖", bg: "#fbe9e7", variant: "Regular" },
  { id: "bir",  name: "Veg Biryani",       price: 140, cats: ["Main course", "Breakfast"],      emoji: "🍛", bg: "#fff8e1", variant: "Full"    },
  { id: "ic",   name: "Ice Cream",         price: 50,  cats: ["Desserts"],                      emoji: "🍦", bg: "#fce4ec", variant: "2 Scoop" },
  { id: "cc2",  name: "Cheesecake",        price: 90,  cats: ["Desserts"],                      emoji: "🍰", bg: "#fce4ec", variant: "Regular" },
  { id: "waf",  name: "Waffle",            price: 80,  cats: ["Desserts"],                      emoji: "🧇", bg: "#fff8e1", variant: "Regular" },
  { id: "marg", name: "Margherita",        price: 180, cats: ["Pizza"],                         emoji: "🍕", bg: "#fff3e0", variant: "Medium"  },
  { id: "pep",  name: "Pepperoni",         price: 220, cats: ["Pizza"],                         emoji: "🍕", bg: "#fce4ec", variant: "Medium"  },
  { id: "bbq",  name: "BBQ Chicken",       price: 240, cats: ["Pizza"],                         emoji: "🍕", bg: "#fff8e1", variant: "Medium"  },
  { id: "vgs",  name: "Veggie Supreme",    price: 200, cats: ["Pizza"],                         emoji: "🍕", bg: "#e8f5e9", variant: "Medium"  },
  { id: "idl",   name: "Idly",            price: 30,  cats: ["Breakfast"],                     emoji: "🍚", bg: "#f5f5f5", variant: "3 pcs"   },
  { id: "poori", name: "Poori",           price: 40,  cats: ["Breakfast"],                     emoji: "🫓", bg: "#fff3e0", variant: "2 pcs"   },
  { id: "bonda", name: "Bonda",           price: 30,  cats: ["Breakfast"],                     emoji: "🍩", bg: "#fff8e1", variant: "3 pcs"   },
  { id: "vad",   name: "Vada",            price: 30,  cats: ["Breakfast"],                     emoji: "🍩", bg: "#fce4ec", variant: "2 pcs"   },
  { id: "sidl",  name: "Sambar Idly",     price: 40,  cats: ["Breakfast"],                     emoji: "🍚", bg: "#e8f5e9", variant: "Regular" },
  { id: "kud",   name: "Kudumu",          price: 30,  cats: ["Breakfast"],                     emoji: "🍚", bg: "#f5f5f5", variant: "Regular" },
  { id: "upm",   name: "Upma",            price: 30,  cats: ["Breakfast"],                     emoji: "🍲", bg: "#e8f5e9", variant: "Regular" },
  { id: "pdosa", name: "Plain Dosa",      price: 35,  cats: ["Breakfast"],                     emoji: "🫓", bg: "#fff8e1", variant: "Regular" },
  { id: "odosa", name: "Onion Dosa",      price: 40,  cats: ["Breakfast"],                     emoji: "🫓", bg: "#fce4ec", variant: "Regular" },
  { id: "udosa", name: "Upma Dosa",       price: 45,  cats: ["Breakfast"],                     emoji: "🫓", bg: "#e0f2f1", variant: "Regular" },
  { id: "las",  name: "Mango Lassi",       price: 60,  cats: ["Drinks"],                        emoji: "🥛", bg: "#fff8e1", variant: "Regular" },
  { id: "jui",  name: "Fresh Juice",       price: 60,  cats: ["Drinks"],                        emoji: "🧃", bg: "#e8f5e9", variant: "Regular" },
  { id: "lem",  name: "Lemonade",          price: 40,  cats: ["Drinks"],                        emoji: "🍋", bg: "#fffde7", variant: "Regular" },
  { id: "msh",  name: "Milkshake",         price: 80,  cats: ["Drinks"],                        emoji: "🥤", bg: "#fce4ec", variant: "Regular" },
  { id: "wat",  name: "Mineral Water",     price: 20,  cats: ["Drinks"],                        emoji: "💧", bg: "#e0f7fa", variant: "500ml"   },
];

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      emoji TEXT NOT NULL,
      bg_color TEXT NOT NULL,
      variant TEXT NOT NULL,
      categories TEXT[] NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      order_type TEXT NOT NULL,
      table_number TEXT,
      customer_name TEXT,
      subtotal NUMERIC(10,2) NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      menu_item_id TEXT NOT NULL,
      name TEXT NOT NULL,
      price NUMERIC(10,2) NOT NULL,
      variant TEXT,
      qty INTEGER NOT NULL
    )
  `;

  const [{ count }] = await sql`SELECT COUNT(*)::int AS count FROM menu_items`;
  if (count > 0) {
    console.log(`menu_items already has ${count} rows, skipping seed.`);
  } else {
    for (const item of INIT_MENU) {
      await sql`
        INSERT INTO menu_items (id, name, price, emoji, bg_color, variant, categories)
        VALUES (${item.id}, ${item.name}, ${item.price}, ${item.emoji}, ${item.bg}, ${item.variant}, ${item.cats})
      `;
    }
    console.log(`Seeded ${INIT_MENU.length} menu items.`);
  }

  console.log('Database ready.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
