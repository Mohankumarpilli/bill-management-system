import { useState, useRef } from "react";

const NAV = "#1c2b4b";
const ACCENT = "#3a7ef5";

const CATS = ["Favorite", "Coffee", "Add on", "Main course", "Desserts", "Pizza", "Breakfast", "Drinks"];

const BG_COLORS = ["#fff3e0","#fbe9e7","#e8f5e9","#fce4ec","#efebe9","#f3e5f5","#fff8e1","#e0f2f1","#e8eaf6","#e0f7fa","#fffde7","#f5f5f5"];

const EMOJI_LIST = ["🍔","🍕","🍗","🍖","🌮","🌯","🥗","🥪","🍜","🍝","🍛","🍲","🍚","🫓","🥞","🧇","🍩","🎂","🍰","🍫","🍮","🍦","🧁","🍧","☕","🧋","🥤","🍹","🧃","🍋","🥛","💧","🍟","🍞","🧅","🥩","🐟","🧀","🍳","🥚"];

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
  { id: "idl",  name: "Idli",             price: 20,  cats: ["Breakfast"],                     emoji: "🍚", bg: "#f5f5f5", variant: "2 pcs"   },
  { id: "dosa", name: "Masala Dosa",       price: 60,  cats: ["Breakfast"],                     emoji: "🫓", bg: "#fff8e1", variant: "Regular" },
  { id: "pur",  name: "Puri Bhaji",        price: 40,  cats: ["Breakfast"],                     emoji: "🫓", bg: "#fff3e0", variant: "Regular" },
  { id: "upm",  name: "Upma",             price: 25,  cats: ["Breakfast"],                     emoji: "🍲", bg: "#e8f5e9", variant: "Regular" },
  { id: "vad",  name: "Medu Vada",         price: 30,  cats: ["Breakfast"],                     emoji: "🍩", bg: "#fff8e1", variant: "2 pcs"   },
  { id: "las",  name: "Mango Lassi",       price: 60,  cats: ["Drinks"],                        emoji: "🥛", bg: "#fff8e1", variant: "Regular" },
  { id: "jui",  name: "Fresh Juice",       price: 60,  cats: ["Drinks"],                        emoji: "🧃", bg: "#e8f5e9", variant: "Regular" },
  { id: "lem",  name: "Lemonade",          price: 40,  cats: ["Drinks"],                        emoji: "🍋", bg: "#fffde7", variant: "Regular" },
  { id: "msh",  name: "Milkshake",         price: 80,  cats: ["Drinks"],                        emoji: "🥤", bg: "#fce4ec", variant: "Regular" },
  { id: "wat",  name: "Mineral Water",     price: 20,  cats: ["Drinks"],                        emoji: "💧", bg: "#e0f7fa", variant: "500ml"   },
];

const blankForm = { name: "", price: "", emoji: "🍔", bg: "#fff3e0", variant: "Regular", cats: ["Favorite"] };

export default function RestaurantPOS() {
  const [menu, setMenu] = useState(INIT_MENU);
  const [cat, setCat] = useState("Favorite");
  const [order, setOrder] = useState({});
  const [table, setTable] = useState("");
  const [customer, setCustomer] = useState("");
  const [search, setSearch] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [showCustomer, setShowCustomer] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [orderType, setOrderType] = useState("Dine-in");
  const [editMode, setEditMode] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(blankForm);
  const [formError, setFormError] = useState("");
  const tabsRef = useRef();
  const printRef = useRef();

  const filtered = menu.filter(
    (i) => i.cats.includes(cat) &&
      (search === "" || i.name.toLowerCase().includes(search.toLowerCase()))
  );

  const addItem = (id) => setOrder((p) => ({ ...p, [id]: (p[id] || 0) + 1 }));
  const removeItem = (id) => setOrder((p) => { const n = { ...p }; if (n[id] > 1) n[id]--; else delete n[id]; return n; });
  const clearItem = (id) => setOrder((p) => { const n = { ...p }; delete n[id]; return n; });
  const clearAll = () => setOrder({});

  const deleteMenuItem = (id) => {
    setMenu((m) => m.filter((i) => i.id !== id));
    clearItem(id);
  };

  const toggleFormCat = (c) => {
    setForm((f) => ({
      ...f,
      cats: f.cats.includes(c) ? f.cats.filter((x) => x !== c) : [...f.cats, c],
    }));
  };

  const submitNewItem = () => {
    if (!form.name.trim()) return setFormError("Item name is required.");
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0) return setFormError("Enter a valid price.");
    if (form.cats.length === 0) return setFormError("Select at least one category.");
    setFormError("");
    const newItem = {
      id: "custom_" + Date.now(),
      name: form.name.trim(),
      price: parseFloat(parseFloat(form.price).toFixed(2)),
      emoji: form.emoji,
      bg: form.bg,
      variant: form.variant || "Regular",
      cats: form.cats,
    };
    setMenu((m) => [...m, newItem]);
    setForm(blankForm);
    setShowAddModal(false);
  };

  const ordered = menu.filter((i) => order[i.id]);
  const subtotal = ordered.reduce((s, i) => s + i.price * order[i.id], 0);

  const scrollTabs = (dir) => { if (tabsRef.current) tabsRef.current.scrollLeft += dir * 150; };

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>Bill</title><style>
      body{font-family:'Segoe UI',sans-serif;padding:24px;color:#111;max-width:320px}
      h2{font-size:18px;text-align:center;margin-bottom:4px}
      .sub{font-size:12px;color:#888;text-align:center;margin-bottom:16px}
      table{width:100%;border-collapse:collapse;font-size:13px}
      th{border-bottom:1.5px solid #ddd;padding:6px 4px;text-align:left;color:#555;font-size:11px;text-transform:uppercase}
      td{padding:7px 4px;border-bottom:1px solid #f0f0f0}
      .r{text-align:right}
      .tot td{font-weight:700;font-size:15px;border-top:2px solid #222;border-bottom:none;padding-top:10px}
      .muted{color:#888;font-size:12px}
      .footer{margin-top:20px;text-align:center;font-size:11px;color:#aaa}
    </style></head><body>${content}</body></html>`);
    win.document.close(); win.print();
  };

  const now = new Date().toLocaleString();

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* ── TOP NAV ── */}
      <div style={{ background: NAV, color: "#fff", padding: "0 20px", height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>🍽️</span>
          <span style={{ fontWeight: 700, fontSize: 17 }}>MMB Valentine Restaurant</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍  Search items..."
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, padding: "6px 14px", color: "#fff", fontSize: 13, width: 190, outline: "none" }} />
          <button
            onClick={() => { setEditMode((e) => !e); setSearch(""); }}
            style={{ background: editMode ? "#e55" : "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            {editMode ? "✕ Done" : "⚙ Manage Menu"}
          </button>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>👤</div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden", background: "#eef0f5" }}>

        {/* LEFT: MENU */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: "14px 14px 0 14px" }}>

          {/* Edit mode banner */}
          {editMode && (
            <div style={{ background: "#fff3cd", border: "1px solid #ffc107", borderRadius: 8, padding: "8px 14px", marginBottom: 12, fontSize: 13, color: "#856404", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
              <span>⚙️ Manage mode — tap <strong>✕</strong> on any card to remove it, or add a new item below.</span>
            </div>
          )}

          {/* Category tabs */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14, flexShrink: 0 }}>
            <button onClick={() => scrollTabs(-1)} style={{ background: "#fff", border: "1px solid #dde0e8", borderRadius: 6, width: 30, height: 34, fontSize: 18, color: "#555", flexShrink: 0, cursor: "pointer" }}>‹</button>
            <div ref={tabsRef} style={{ display: "flex", gap: 6, overflowX: "auto", scrollBehavior: "smooth", flex: 1, scrollbarWidth: "none" }}>
              {CATS.map((c) => (
                <button key={c} onClick={() => { setCat(c); setSearch(""); }}
                  style={{ padding: "7px 18px", borderRadius: 6, fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", border: "none", cursor: "pointer", background: cat === c ? NAV : "#fff", color: cat === c ? "#fff" : "#666", flexShrink: 0, transition: "all 0.15s" }}>
                  {c}
                </button>
              ))}
            </div>
            <button onClick={() => scrollTabs(1)} style={{ background: "#fff", border: "1px solid #dde0e8", borderRadius: 6, width: 30, height: 34, fontSize: 18, color: "#555", flexShrink: 0, cursor: "pointer" }}>›</button>
          </div>

          {/* Menu grid */}
          <div style={{ overflowY: "auto", flex: 1, paddingBottom: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(148px, 1fr))", gap: 12 }}>

              {filtered.length === 0 && !editMode && (
                <div style={{ gridColumn: "1/-1", padding: "60px 0", textAlign: "center", color: "#aaa", fontSize: 14 }}>No items found</div>
              )}

              {filtered.map((item) => {
                const qty = order[item.id] || 0;
                return (
                  <div key={item.id}
                    style={{ background: "#fff", borderRadius: 12, overflow: "hidden", position: "relative", border: qty > 0 ? `2px solid ${NAV}` : "2px solid transparent", boxShadow: "0 2px 8px rgba(0,0,0,0.07)", transition: "all 0.15s", cursor: qty > 0 || editMode ? "default" : "pointer" }}
                    onClick={() => !editMode && qty === 0 && addItem(item.id)}>

                    {/* Delete button in edit mode */}
                    {editMode && (
                      <button onClick={() => deleteMenuItem(item.id)}
                        style={{ position: "absolute", top: 6, right: 6, zIndex: 5, width: 24, height: 24, borderRadius: "50%", background: "#e53e3e", border: "none", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                        ✕
                      </button>
                    )}

                    {/* Edit mode overlay tint */}
                    {editMode && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.04)", zIndex: 1, pointerEvents: "none", borderRadius: 10 }} />}

                    <div style={{ background: item.bg, height: 110, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 46 }}>
                      {item.emoji}
                    </div>
                    <div style={{ padding: "8px 8px 4px", fontSize: 12.5, fontWeight: 600, color: "#222", textAlign: "center", lineHeight: 1.3, minHeight: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {item.name}
                    </div>

                    {/* Price bar / qty controls */}
                    {qty === 0 || editMode ? (
                      <div style={{ background: NAV, color: "#fff", textAlign: "center", padding: "7px 8px", fontSize: 13, fontWeight: 700 }}>
                        ₹ {item.price.toFixed(2)}
                      </div>
                    ) : (
                      <div onClick={(e) => e.stopPropagation()} style={{ background: NAV, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "5px 10px" }}>
                        <button onClick={() => removeItem(item.id)} style={{ width: 24, height: 24, borderRadius: 5, border: "none", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{qty}</span>
                        <button onClick={() => addItem(item.id)} style={{ width: 24, height: 24, borderRadius: 5, border: "none", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* + Add Item card (edit mode only) */}
              {editMode && (
                <div onClick={() => setShowAddModal(true)}
                  style={{ background: "#fff", borderRadius: 12, overflow: "hidden", cursor: "pointer", border: "2px dashed #6366f1", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 180, gap: 8, color: "#6366f1", transition: "all 0.15s" }}>
                  <div style={{ fontSize: 32, fontWeight: 300 }}>＋</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Add Item</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: ORDER PANEL */}
        <div style={{ width: 320, display: "flex", flexDirection: "column", background: "#fff", borderLeft: "1px solid #e8eaf0", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ background: NAV, padding: "0 16px", height: 48, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 14 }}>
              {["Dine-in", "Takeaway", "Delivery"].map((t) => (
                <button key={t} onClick={() => setOrderType(t)}
                  style={{ background: "none", border: "none", cursor: "pointer", color: orderType === t ? "#fff" : "rgba(255,255,255,0.45)", fontWeight: orderType === t ? 700 : 400, fontSize: 14, padding: "4px 0", borderBottom: orderType === t ? "2px solid #fff" : "2px solid transparent", transition: "all 0.15s" }}>
                  {t}
                </button>
              ))}
            </div>
            {ordered.length > 0 && (
              <button onClick={clearAll} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,120,120,0.9)", fontSize: 11, fontWeight: 600 }}>Clear</button>
            )}
          </div>

          {/* Table / Customer */}
          <div style={{ padding: "10px 14px", borderBottom: "1px solid #f0f2f6", display: "flex", gap: 8, flexShrink: 0 }}>
            <div style={{ flex: 1, position: "relative" }}>
              <button onClick={() => setShowTable((t) => !t)}
                style={{ width: "100%", background: "#f5f7fa", border: "1px solid #e0e3ec", borderRadius: 8, padding: "7px 10px", fontSize: 12.5, color: table ? NAV : "#888", fontWeight: table ? 600 : 400, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <span>🪑</span> {table ? "Table " + table : "Table"}
              </button>
              {showTable && (
                <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "#fff", border: "1px solid #dde0ea", borderRadius: 8, padding: 10, zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <input autoFocus value={table} onChange={(e) => setTable(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setShowTable(false)}
                    placeholder="Table number" style={{ width: "100%", border: "1px solid #dde0ea", borderRadius: 6, padding: "6px 10px", fontSize: 13, outline: "none" }} />
                </div>
              )}
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <button onClick={() => setShowCustomer((t) => !t)}
                style={{ width: "100%", background: "#f5f7fa", border: "1px solid #e0e3ec", borderRadius: 8, padding: "7px 10px", fontSize: 12.5, color: customer ? NAV : "#888", fontWeight: customer ? 600 : 400, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <span>👤</span> {customer || "Add customer"}
              </button>
              {showCustomer && (
                <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "#fff", border: "1px solid #dde0ea", borderRadius: 8, padding: 10, zIndex: 10, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                  <input autoFocus value={customer} onChange={(e) => setCustomer(e.target.value)} onKeyDown={(e) => e.key === "Enter" && setShowCustomer(false)}
                    placeholder="Customer name" style={{ width: "100%", border: "1px solid #dde0ea", borderRadius: 6, padding: "6px 10px", fontSize: 13, outline: "none" }} />
                </div>
              )}
            </div>
          </div>

          {/* Order items */}
          <div style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
            {ordered.length === 0 ? (
              <div style={{ padding: "50px 20px", textAlign: "center", color: "#bbb", fontSize: 13 }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>🛒</div>
                No items added yet.<br />Tap any item from the menu.
              </div>
            ) : ordered.map((item) => (
              <div key={item.id} style={{ padding: "9px 14px", borderBottom: "1px solid #f5f6fa", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 20 }}>{item.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a1a2e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: ACCENT, marginTop: 1 }}>{item.variant}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <button onClick={() => removeItem(item.id)} style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #dde0ea", background: "#f5f7fa", fontSize: 14, fontWeight: 700, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>−</button>
                  <span style={{ fontSize: 13, fontWeight: 700, minWidth: 18, textAlign: "center", color: "#1a1a2e" }}>{order[item.id]}</span>
                  <button onClick={() => addItem(item.id)} style={{ width: 24, height: 24, borderRadius: 4, border: "1px solid #dde0ea", background: "#f5f7fa", fontSize: 14, fontWeight: 700, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>+</button>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e", minWidth: 60, textAlign: "right" }}>₹ {(item.price * order[item.id]).toFixed(2)}</div>
                <button onClick={() => clearItem(item.id)} style={{ background: "none", border: "none", color: "#ccc", fontSize: 13, padding: 2, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.target.style.color = "#e55")} onMouseLeave={(e) => (e.target.style.color = "#ccc")}>✕</button>
              </div>
            ))}
          </div>

          {/* Proceed button */}
          <div style={{ padding: "10px 14px 14px", flexShrink: 0 }}>
            <button onClick={() => ordered.length > 0 && setShowBill(true)} disabled={ordered.length === 0}
              style={{ width: "100%", background: ordered.length === 0 ? "#ccc" : ACCENT, color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: ordered.length === 0 ? "not-allowed" : "pointer", transition: "background 0.15s" }}>
              <span>Proceed to kitchen</span>
              <span style={{ background: "rgba(0,0,0,0.18)", borderRadius: 6, padding: "3px 10px", fontSize: 15, fontWeight: 800 }}>₹ {subtotal.toLocaleString("en-IN")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ══ ADD ITEM MODAL ══ */}
      {showAddModal && (
        <div onClick={(e) => e.target === e.currentTarget && setShowAddModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: 460, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
            <div style={{ background: NAV, padding: "16px 20px", borderRadius: "16px 16px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>➕ Add New Menu Item</span>
              <button onClick={() => setShowAddModal(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 6, width: 28, height: 28, fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "20px" }}>

              {/* Preview card */}
              <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
                <div style={{ background: form.bg, borderRadius: 10, width: 80, height: 80, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>
                  {form.emoji}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "#111" }}>{form.name || "Item name"}</div>
                  <div style={{ fontSize: 13, color: "#6366f1", marginTop: 2 }}>{form.variant || "Variant"}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: NAV, marginTop: 4 }}>₹ {form.price || "0"}</div>
                </div>
              </div>

              {/* Name */}
              <label style={labelStyle}>Item Name</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Paneer Butter Masala" style={inputStyle} />

              {/* Price & Variant */}
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Price (₹)</label>
                  <input type="number" min="0" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="e.g. 150" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Variant / Size</label>
                  <input value={form.variant} onChange={(e) => setForm((f) => ({ ...f, variant: e.target.value }))}
                    placeholder="e.g. Regular, Full, 2 pcs" style={inputStyle} />
                </div>
              </div>

              {/* Emoji picker */}
              <label style={labelStyle}>Emoji</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                {EMOJI_LIST.map((e) => (
                  <button key={e} onClick={() => setForm((f) => ({ ...f, emoji: e }))}
                    style={{ width: 36, height: 36, borderRadius: 8, border: form.emoji === e ? `2px solid ${NAV}` : "1.5px solid #e5e7eb", background: form.emoji === e ? "#eef2ff" : "#fff", fontSize: 18, cursor: "pointer" }}>
                    {e}
                  </button>
                ))}
              </div>

              {/* Background color */}
              <label style={labelStyle}>Card Background</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
                {BG_COLORS.map((c) => (
                  <button key={c} onClick={() => setForm((f) => ({ ...f, bg: c }))}
                    style={{ width: 28, height: 28, borderRadius: 6, background: c, border: form.bg === c ? `2px solid ${NAV}` : "1.5px solid #ddd", cursor: "pointer" }} />
                ))}
              </div>

              {/* Categories */}
              <label style={labelStyle}>Categories (select at least one)</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
                {CATS.map((c) => (
                  <button key={c} onClick={() => toggleFormCat(c)}
                    style={{ padding: "5px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer", background: form.cats.includes(c) ? NAV : "#f0f2f8", color: form.cats.includes(c) ? "#fff" : "#666", transition: "all 0.15s" }}>
                    {c}
                  </button>
                ))}
              </div>

              {formError && <p style={{ color: "#e53e3e", fontSize: 13, marginBottom: 10 }}>{formError}</p>}

              <button onClick={submitNewItem}
                style={{ width: "100%", background: ACCENT, color: "#fff", border: "none", borderRadius: 10, padding: "12px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                ➕ Add to Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══ BILL MODAL ══ */}
      {showBill && (
        <div onClick={(e) => e.target === e.currentTarget && setShowBill(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
          <div style={{ background: "#fff", borderRadius: 16, width: 400, maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ background: NAV, padding: "16px 20px", borderRadius: "16px 16px 0 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>🍽️ MMB Valentine Restaurant</div>
                <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 2 }}>{orderType}{table ? " · Table " + table : ""}{customer ? " · " + customer : ""}</div>
              </div>
              <button onClick={() => setShowBill(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", borderRadius: 6, width: 28, height: 28, fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>
            <div style={{ padding: "16px 20px" }}>
              <div style={{ fontSize: 12, color: "#aaa", marginBottom: 12 }}>{now}</div>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1.5px solid #eee" }}>
                    {["Item", "Qty", "Price", "Total"].map((h, i) => (
                      <th key={h} style={{ textAlign: i > 0 ? "right" : "left", fontSize: 11, color: "#888", padding: "4px 0", textTransform: "uppercase", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ordered.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "8px 0", fontSize: 13, fontWeight: 500 }}>{item.name}<br /><span style={{ fontSize: 11, color: ACCENT }}>{item.variant}</span></td>
                      <td style={{ textAlign: "right", fontSize: 13 }}>{order[item.id]}</td>
                      <td style={{ textAlign: "right", fontSize: 13 }}>₹{item.price}</td>
                      <td style={{ textAlign: "right", fontSize: 13, fontWeight: 600 }}>₹{(item.price * order[item.id]).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 12, borderTop: "2px solid " + NAV, paddingTop: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 800, color: NAV }}>
                  <span>Total</span><span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <button onClick={handlePrint} style={{ flex: 1, background: "#f5f7fa", border: "1px solid #dde0ea", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 600, color: "#444", cursor: "pointer" }}>🖨️ Print Bill</button>
                <button onClick={() => { clearAll(); setShowBill(false); setTable(""); setCustomer(""); }}
                  style={{ flex: 1, background: ACCENT, border: "none", borderRadius: 8, padding: "10px", fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer" }}>✅ Confirm Order</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden print template */}
      <div ref={printRef} style={{ display: "none" }}>
        <h2>MMB Valentine Restaurant</h2>
        <p className="sub">{orderType}{table ? " | Table " + table : ""}{customer ? " | " + customer : ""}<br />{now}</p>
        <table>
          <thead><tr><th>Item</th><th className="r">Qty</th><th className="r">Rate</th><th className="r">Amt</th></tr></thead>
          <tbody>
            {ordered.map((i) => (
              <tr key={i.id}>
                <td>{i.name} <span className="muted">({i.variant})</span></td>
                <td className="r">{order[i.id]}</td>
                <td className="r">₹{i.price}</td>
                <td className="r">₹{(i.price * order[i.id]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="tot"><td colSpan="3">TOTAL</td><td className="r">₹{subtotal.toLocaleString("en-IN")}</td></tr>
          </tfoot>
        </table>
        <p className="footer">Thank you for dining with us!</p>
      </div>
    </div>
  );
}

const labelStyle = { display: "block", fontSize: 12, fontWeight: 600, color: "#555", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.4 };
const inputStyle = { width: "100%", border: "1.5px solid #e5e7eb", borderRadius: 8, padding: "8px 12px", fontSize: 13, outline: "none", marginBottom: 14, boxSizing: "border-box" };
