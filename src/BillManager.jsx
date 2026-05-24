import { useState, useRef } from "react";

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function BillManager() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const printRef = useRef();

  const addItem = () => {
    if (!name.trim()) return setError("Item name is required.");
    if (!price || isNaN(price) || Number(price) <= 0)
      return setError("Enter a valid price.");
    setError("");
    setItems((prev) => [
      ...prev,
      {
        id: generateId(),
        name: name.trim(),
        price: parseFloat(parseFloat(price).toFixed(2)),
        qty: Math.max(1, parseInt(qty) || 1),
        selected: true,
      },
    ]);
    setName("");
    setPrice("");
    setQty(1);
  };

  const deleteItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const toggleSelect = (id) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );

  const updateQty = (id, val) =>
    setItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, parseInt(val) || 1) } : i
      )
    );

  const selectAll = () => setItems((prev) => prev.map((i) => ({ ...i, selected: true })));
  const deselectAll = () => setItems((prev) => prev.map((i) => ({ ...i, selected: false })));

  const selectedItems = items.filter((i) => i.selected);
  const total = selectedItems.reduce((sum, i) => sum + i.price * i.qty, 0);
  const itemCount = selectedItems.reduce((sum, i) => sum + i.qty, 0);

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <html>
        <head>
          <title>Bill</title>
          <style>
            body { font-family: 'Segoe UI', sans-serif; padding: 32px; color: #1a1a1a; }
            h1 { font-size: 22px; margin-bottom: 4px; }
            .subtitle { color: #888; font-size: 13px; margin-bottom: 24px; }
            table { width: 100%; border-collapse: collapse; }
            th { text-align: left; border-bottom: 2px solid #e5e7eb; padding: 8px 12px; font-size: 13px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; }
            td { padding: 10px 12px; border-bottom: 1px solid #f3f4f6; font-size: 14px; }
            .right { text-align: right; }
            .total-row td { font-weight: 700; font-size: 16px; border-top: 2px solid #e5e7eb; border-bottom: none; padding-top: 16px; }
            .footer { margin-top: 32px; font-size: 12px; color: #aaa; text-align: center; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    win.print();
  };

  const now = new Date().toLocaleString();

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "32px 16px", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: "#111827", margin: 0 }}>🧾 Bill Manager</h1>
          <p style={{ color: "#6b7280", fontSize: 14, marginTop: 4 }}>Add items, select what to bill, and get your total instantly.</p>
        </div>

        {/* Add Item Form */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "20px 24px",
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          marginBottom: 24,
        }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#374151", marginTop: 0, marginBottom: 16 }}>Add New Item</h2>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Item name"
              style={inputStyle}
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Price (₹)"
              type="number"
              min="0"
              step="0.01"
              style={{ ...inputStyle, width: 120 }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <label style={{ fontSize: 13, color: "#6b7280", whiteSpace: "nowrap" }}>Qty</label>
              <input
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                type="number"
                min="1"
                style={{ ...inputStyle, width: 70 }}
              />
            </div>
            <button onClick={addItem} style={btnPrimaryStyle}>+ Add</button>
          </div>
          {error && <p style={{ color: "#ef4444", fontSize: 13, marginTop: 8, marginBottom: 0 }}>{error}</p>}
        </div>

        {/* Items List */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
          marginBottom: 24,
          overflow: "hidden",
        }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #f3f4f6", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#374151", margin: 0 }}>
              Items <span style={{ color: "#9ca3af", fontWeight: 400 }}>({items.length})</span>
            </h2>
            {items.length > 0 && (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={selectAll} style={btnSmallStyle}>Select All</button>
                <button onClick={deselectAll} style={btnSmallStyle}>Deselect All</button>
              </div>
            )}
          </div>

          {items.length === 0 ? (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
              No items added yet. Start by adding an item above.
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f9fafb" }}>
                  <th style={thStyle}></th>
                  <th style={thStyle}>Item</th>
                  <th style={{ ...thStyle, textAlign: "center" }}>Qty</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Unit Price</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Subtotal</th>
                  <th style={thStyle}></th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} style={{
                    borderBottom: "1px solid #f3f4f6",
                    background: item.selected ? "#fff" : "#fafafa",
                    opacity: item.selected ? 1 : 0.5,
                    transition: "opacity 0.15s",
                  }}>
                    <td style={{ padding: "12px 12px 12px 20px", width: 36 }}>
                      <input
                        type="checkbox"
                        checked={item.selected}
                        onChange={() => toggleSelect(item.id)}
                        style={{ width: 16, height: 16, cursor: "pointer", accentColor: "#6366f1" }}
                      />
                    </td>
                    <td style={{ padding: "12px 8px", fontSize: 14, color: "#111827", fontWeight: 500 }}>{item.name}</td>
                    <td style={{ padding: "12px 8px", textAlign: "center" }}>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => updateQty(item.id, e.target.value)}
                        style={{
                          width: 60,
                          textAlign: "center",
                          border: "1px solid #e5e7eb",
                          borderRadius: 6,
                          padding: "4px 6px",
                          fontSize: 14,
                          outline: "none",
                        }}
                      />
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "right", fontSize: 14, color: "#374151" }}>
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td style={{ padding: "12px 8px", textAlign: "right", fontSize: 14, fontWeight: 600, color: "#111827" }}>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </td>
                    <td style={{ padding: "12px 16px 12px 8px", textAlign: "right" }}>
                      <button
                        onClick={() => deleteItem(item.id)}
                        title="Remove item"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "#d1d5db",
                          fontSize: 16,
                          padding: 4,
                          borderRadius: 4,
                          lineHeight: 1,
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = "#ef4444")}
                        onMouseLeave={(e) => (e.target.style.color = "#d1d5db")}
                      >✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Total Summary */}
        {items.length > 0 && (
          <div style={{
            background: "#fff",
            borderRadius: 12,
            padding: "20px 24px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div>
              <p style={{ margin: 0, fontSize: 13, color: "#6b7280" }}>
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected
                {itemCount !== selectedItems.length && ` · ${itemCount} units`}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: 28, fontWeight: 700, color: "#111827" }}>
                ₹{total.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handlePrint}
              disabled={selectedItems.length === 0}
              style={{
                ...btnPrimaryStyle,
                opacity: selectedItems.length === 0 ? 0.4 : 1,
                cursor: selectedItems.length === 0 ? "not-allowed" : "pointer",
              }}
            >
              🖨️ Print Bill
            </button>
          </div>
        )}

        {/* Hidden print template */}
        <div ref={printRef} style={{ display: "none" }}>
          <h1>Bill</h1>
          <p className="subtitle">Generated on {now}</p>
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th className="right">Qty</th>
                <th className="right">Unit Price</th>
                <th className="right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td className="right">{item.qty}</td>
                  <td className="right">₹{item.price.toFixed(2)}</td>
                  <td className="right">₹{(item.price * item.qty).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="total-row">
                <td colSpan={3}>Total</td>
                <td className="right">₹{total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <p className="footer">Bill Manager · {now}</p>
        </div>

      </div>
    </div>
  );
}

const inputStyle = {
  flex: 1,
  minWidth: 160,
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: 14,
  outline: "none",
  color: "#111827",
  background: "#fff",
};

const btnPrimaryStyle = {
  background: "#6366f1",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "9px 20px",
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  whiteSpace: "nowrap",
};

const btnSmallStyle = {
  background: "none",
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  padding: "5px 12px",
  fontSize: 12,
  color: "#6b7280",
  cursor: "pointer",
};

const thStyle = {
  padding: "10px 8px",
  fontSize: 12,
  fontWeight: 600,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  textAlign: "left",
};
