import { useState, useEffect } from "react";

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Barlow+Condensed:wght@300;500;700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:       #080C10;
      --surface:  #0E1318;
      --card:     #131A22;
      --border:   #1E2A35;
      --accent:   #00E5A0;
      --danger:   #FF3B5C;
      --warn:     #FFB800;
      --text:     #E8EDF2;
      --muted:    #4A5A6A;
      --mono:     'Space Mono', monospace;
      --display:  'Barlow Condensed', sans-serif;
    }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--mono);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
    }

    #root {
      width: 100%;
      max-width: 420px;
      min-height: 100vh;
      background: var(--bg);
      position: relative;
      overflow: hidden;
    }

    #root::before {
      content: '';
      position: fixed;
      inset: 0;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0,0,0,0.03) 2px,
        rgba(0,0,0,0.03) 4px
      );
      pointer-events: none;
      z-index: 999;
    }

    .screen { display: none; flex-direction: column; min-height: 100vh; padding-bottom: 80px; }
    .screen.active { display: flex; }

    .nav {
      position: fixed;
      bottom: 0; left: 50%;
      transform: translateX(-50%);
      width: 100%; max-width: 420px;
      background: var(--surface);
      border-top: 1px solid var(--border);
      display: flex;
      z-index: 100;
    }
    .nav-btn {
      flex: 1; padding: 14px 4px 12px;
      background: none; border: none; cursor: pointer;
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      color: var(--muted);
      font-family: var(--display);
      font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
      text-transform: uppercase;
      transition: color 0.15s;
    }
    .nav-btn.active { color: var(--accent); }
    .nav-btn svg { width: 20px; height: 20px; }

    .header {
      padding: 24px 20px 16px;
      border-bottom: 1px solid var(--border);
      display: flex; align-items: center; justify-content: space-between;
    }
    .header-title {
      font-family: var(--display);
      font-size: 28px; font-weight: 900;
      letter-spacing: 0.04em;
      color: var(--text);
    }
    .header-title span { color: var(--accent); }
    .header-sub {
      font-size: 10px; color: var(--muted);
      letter-spacing: 0.1em; text-transform: uppercase;
      margin-top: 2px;
    }
    .tag {
      background: rgba(0,229,160,0.1);
      border: 1px solid rgba(0,229,160,0.25);
      color: var(--accent);
      font-family: var(--display);
      font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
      padding: 4px 10px; border-radius: 2px;
    }

    .check-body { padding: 20px; flex: 1; display: flex; flex-direction: column; gap: 12px; }
    .check-item {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px;
      padding: 16px 18px;
      display: flex; align-items: center; gap: 16px;
      cursor: pointer;
      transition: border-color 0.15s, background 0.15s;
      user-select: none;
    }
    .check-item.checked {
      border-color: var(--accent);
      background: rgba(0,229,160,0.06);
    }
    .check-box {
      width: 22px; height: 22px; flex-shrink: 0;
      border: 2px solid var(--border);
      border-radius: 2px;
      display: flex; align-items: center; justify-content: center;
      transition: border-color 0.15s, background 0.15s;
    }
    .check-item.checked .check-box {
      border-color: var(--accent);
      background: var(--accent);
    }
    .check-info { flex: 1; }
    .check-name {
      font-family: var(--display);
      font-size: 16px; font-weight: 700; letter-spacing: 0.04em;
    }
    .check-desc { font-size: 10px; color: var(--muted); margin-top: 2px; letter-spacing: 0.05em; }

    .verdict-box {
      margin: 0 20px 8px;
      border-radius: 4px;
      padding: 18px 20px;
      display: flex; align-items: center; gap: 14px;
      border: 1px solid;
      animation: fadeUp 0.25s ease;
    }
    .verdict-box.valid   { border-color: var(--accent); background: rgba(0,229,160,0.08); }
    .verdict-box.invalid { border-color: var(--danger);  background: rgba(255,59,92,0.08); }
    .verdict-label {
      font-family: var(--display);
      font-size: 22px; font-weight: 900; letter-spacing: 0.06em;
    }
    .verdict-box.valid   .verdict-label { color: var(--accent); }
    .verdict-box.invalid .verdict-label { color: var(--danger); }
    .verdict-count { font-size: 11px; color: var(--muted); margin-top: 2px; }

    .dot-bar { display: flex; gap: 6px; padding: 0 20px 20px; }
    .dot {
      flex: 1; height: 4px; border-radius: 2px;
      background: var(--border); transition: background 0.2s;
    }
    .dot.filled { background: var(--accent); }
    .dot.warn   { background: var(--warn); }
    .dot.ok     { background: var(--accent); }

    .reset-btn {
      margin: 0 20px 4px;
      background: none; border: 1px solid var(--border);
      color: var(--muted); font-family: var(--mono); font-size: 11px;
      letter-spacing: 0.08em; padding: 10px;
      border-radius: 4px; cursor: pointer; width: calc(100% - 40px);
      transition: border-color 0.15s, color 0.15s;
      text-transform: uppercase;
    }
    .reset-btn:hover { border-color: var(--muted); color: var(--text); }

    .calc-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
    .field-label {
      font-size: 10px; color: var(--muted);
      letter-spacing: 0.1em; text-transform: uppercase;
      margin-bottom: 6px;
    }
    .field-input {
      width: 100%; background: var(--card);
      border: 1px solid var(--border);
      border-radius: 4px; padding: 13px 16px;
      color: var(--text); font-family: var(--mono); font-size: 14px;
      outline: none; transition: border-color 0.15s;
      -moz-appearance: textfield;
    }
    .field-input:focus { border-color: var(--accent); }
    .field-input::-webkit-outer-spin-button,
    .field-input::-webkit-inner-spin-button { -webkit-appearance: none; }

    .calc-divider { border: none; border-top: 1px solid var(--border); margin: 4px 0; }
    .result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .result-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 4px; padding: 16px;
    }
    .result-card.accent { border-color: rgba(0,229,160,0.3); background: rgba(0,229,160,0.05); }
    .result-value {
      font-family: var(--display);
      font-size: 28px; font-weight: 900; color: var(--accent);
    }
    .result-unit { font-size: 13px; color: var(--muted); margin-left: 2px; }
    .result-label { font-size: 10px; color: var(--muted); margin-top: 4px; letter-spacing: 0.08em; text-transform: uppercase; }

    .formula-note {
      font-size: 10px; color: var(--muted);
      border: 1px solid var(--border); border-radius: 4px;
      padding: 12px 14px; line-height: 1.6; letter-spacing: 0.03em;
    }
    .formula-note code { color: var(--accent); }

    .journal-body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
    .journal-form {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 4px; padding: 16px; display: flex; flex-direction: column; gap: 12px;
    }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .form-title {
      font-family: var(--display); font-size: 13px; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted);
      margin-bottom: 2px;
    }
    .field-select {
      width: 100%; background: var(--card);
      border: 1px solid var(--border); border-radius: 4px;
      padding: 13px 16px; color: var(--text);
      font-family: var(--mono); font-size: 13px;
      outline: none; appearance: none; cursor: pointer;
      transition: border-color 0.15s;
    }
    .field-select:focus { border-color: var(--accent); }

    .submit-btn {
      width: 100%; padding: 14px;
      background: var(--accent); border: none; border-radius: 4px;
      color: #080C10; font-family: var(--display);
      font-size: 16px; font-weight: 900; letter-spacing: 0.08em;
      text-transform: uppercase; cursor: pointer;
      transition: opacity 0.15s;
    }
    .submit-btn:active { opacity: 0.85; }
    .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .entries-title {
      font-family: var(--display); font-size: 13px; font-weight: 700;
      letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted);
    }
    .entry-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 4px; padding: 14px 16px;
      display: flex; align-items: center; gap: 12px;
      animation: fadeUp 0.2s ease;
    }
    .entry-side {
      font-family: var(--display); font-size: 13px; font-weight: 900;
      letter-spacing: 0.06em; padding: 4px 10px; border-radius: 2px;
      min-width: 44px; text-align: center;
    }
    .entry-side.buy  { background: rgba(0,229,160,0.15); color: var(--accent); }
    .entry-side.sell { background: rgba(255,59,92,0.15);  color: var(--danger); }
    .entry-pair {
      font-family: var(--display); font-size: 17px; font-weight: 700;
      letter-spacing: 0.04em; flex: 1;
    }
    .entry-result {
      font-size: 11px; letter-spacing: 0.06em;
      padding: 3px 9px; border-radius: 2px; font-weight: 700;
    }
    .entry-result.win  { background: rgba(0,229,160,0.1); color: var(--accent); }
    .entry-result.loss { background: rgba(255,59,92,0.1);  color: var(--danger); }
    .entry-result.be   { background: rgba(255,184,0,0.1);  color: var(--warn); }
    .entry-result.open { background: rgba(255,255,255,0.06); color: var(--muted); }
    .entry-date { font-size: 10px; color: var(--muted); }
    .entry-del {
      background: none; border: none; color: var(--muted);
      cursor: pointer; font-size: 16px; padding: 4px;
      transition: color 0.15s;
    }
    .entry-del:hover { color: var(--danger); }

    .empty-state {
      text-align: center; padding: 40px 20px;
      color: var(--muted); font-size: 12px; letter-spacing: 0.06em;
    }
    .empty-icon { font-size: 32px; margin-bottom: 10px; }

    .stats-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
    .stat-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 4px; padding: 12px; text-align: center;
    }
    .stat-val { font-family: var(--display); font-size: 22px; font-weight: 900; }
    .stat-lbl { font-size: 9px; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-top: 2px; }

    /* ── Signals Screen ── */
    .signals-body { padding: 20px; display: flex; flex-direction: column; gap: 12px; }

    .pair-toggles { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .pair-toggle {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 4px; padding: 10px 14px;
      cursor: pointer; user-select: none;
      transition: border-color 0.15s, background 0.15s;
    }
    .pair-toggle.on {
      border-color: var(--accent);
      background: rgba(0,229,160,0.06);
    }
    .pair-toggle-name {
      font-family: var(--display); font-size: 15px; font-weight: 700;
      letter-spacing: 0.04em; color: var(--text);
    }
    .pair-toggle-sub { font-size: 10px; color: var(--muted); margin-top: 2px; }

    .analyze-btn {
      width: 100%; padding: 14px;
      background: var(--accent); border: none; border-radius: 4px;
      color: #080C10; font-family: var(--display);
      font-size: 16px; font-weight: 900; letter-spacing: 0.08em;
      text-transform: uppercase; cursor: pointer;
      transition: opacity 0.15s;
    }
    .analyze-btn:disabled { opacity: 0.4; cursor: not-allowed; }

    .signal-card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: 4px; padding: 16px;
      animation: fadeUp 0.2s ease;
    }
    .signal-header {
      display: flex; justify-content: space-between; align-items: center;
      margin-bottom: 12px;
    }
    .signal-pair-name {
      font-family: var(--display); font-size: 20px; font-weight: 900;
      letter-spacing: 0.04em;
    }
    .signal-badge {
      font-family: var(--display); font-size: 13px; font-weight: 900;
      letter-spacing: 0.08em; padding: 4px 12px; border-radius: 2px;
    }
    .badge-buy  { background: rgba(0,229,160,0.15); color: var(--accent); }
    .badge-sell { background: rgba(255,59,92,0.15);  color: var(--danger); }
    .badge-wait { background: rgba(255,184,0,0.1);   color: var(--warn); }

    .criteria-row {
      display: flex; justify-content: space-between; align-items: flex-start;
      font-size: 11px; padding: 6px 0;
      border-bottom: 1px solid var(--border);
    }
    .criteria-row:last-of-type { border-bottom: none; }
    .criteria-label { color: var(--muted); letter-spacing: 0.04em; flex: 1; }
    .criteria-val { text-align: right; max-width: 55%; }
    .val-pass { color: var(--accent); font-weight: 700; }
    .val-fail { color: var(--danger); font-weight: 700; }

    .conf-bar-wrap { margin-top: 12px; }
    .conf-bar {
      height: 3px; background: var(--border);
      border-radius: 2px; overflow: hidden;
    }
    .conf-fill {
      height: 100%; border-radius: 2px;
      transition: width 0.4s ease;
    }
    .fill-high   { background: var(--accent); }
    .fill-medium { background: var(--warn); }
    .fill-low    { background: var(--danger); }
    .conf-label {
      font-size: 10px; color: var(--muted);
      margin-top: 4px; letter-spacing: 0.06em;
    }

    .signal-summary {
      font-size: 11px; color: var(--muted);
      border: 1px solid var(--border); border-radius: 4px;
      padding: 10px 12px; margin-top: 10px; line-height: 1.6;
    }

    .spinner-wrap {
      text-align: center; padding: 2rem;
      color: var(--muted); font-size: 12px; letter-spacing: 0.06em;
    }
    .spinner {
      display: inline-block; width: 18px; height: 18px;
      border: 2px solid var(--border); border-top-color: var(--accent);
      border-radius: 50%; animation: spin 0.7s linear infinite;
      margin-right: 8px; vertical-align: middle;
    }
    .disclaimer {
      font-size: 10px; color: var(--muted);
      border: 1px solid var(--border); border-radius: 4px;
      padding: 10px 12px; line-height: 1.6; letter-spacing: 0.03em;
    }

    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconCalc = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/>
    <line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/>
    <line x1="8" y1="18" x2="12" y2="18"/>
  </svg>
);
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
  </svg>
);
const IconSignal = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#080C10" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="2 7 5.5 10.5 12 4" />
  </svg>
);

const CONDITIONS = [
  { id: "ms",  name: "Market Structure", desc: "BOS or CHoCH confirmed on HTF" },
  { id: "liq", name: "Liquidity Sweep",  desc: "Previous high/low taken out" },
  { id: "fvg", name: "FVG / Imbalance",  desc: "Fair value gap present on entry TF" },
  { id: "ema", name: "EMA Trend",        desc: "Price aligned with 50/200 EMA direction" },
];

const PAIRS = ["XAUUSD","EURUSD","GBPUSD","USDJPY","GBPJPY","AUDUSD","USDCAD","NAS100","US30","OTHER"];
const RESULTS = [
  { value: "open", label: "Open" },
  { value: "win",  label: "Win" },
  { value: "loss", label: "Loss" },
  { value: "be",   label: "BE" },
];

const SIGNAL_PAIRS = [
  { id: "EURUSD",  label: "EUR/USD", sub: "Euro / US Dollar" },
  { id: "GBPUSD",  label: "GBP/USD", sub: "Pound / US Dollar" },
  { id: "USDJPY",  label: "USD/JPY", sub: "Dollar / Yen" },
  { id: "XAUUSD",  label: "XAU/USD", sub: "Gold / US Dollar" },
];

function loadJournal() {
  try { return JSON.parse(localStorage.getItem("sniper_journal") || "[]"); } catch { return []; }
}
function saveJournal(entries) {
  try { localStorage.setItem("sniper_journal", JSON.stringify(entries)); } catch {}
}

function ChecklistScreen() {
  const [checked, setChecked] = useState({});
  const toggle = (id) => setChecked(p => ({ ...p, [id]: !p[id] }));
  const count = Object.values(checked).filter(Boolean).length;
  const valid = count >= 3;
  const reset = () => setChecked({});

  return (
    <div className="screen active" id="screen-check">
      <div className="header">
        <div>
          <div className="header-title">SNIPER<span>ENTRY</span></div>
          <div className="header-sub">Trade confirmation filter</div>
        </div>
        <div className="tag">CHECKLIST</div>
      </div>

      <div className="dot-bar">
        {CONDITIONS.map((c, i) => (
          <div key={c.id} className={`dot ${i < count ? (count >= 3 ? "ok" : "warn") : ""}`} />
        ))}
      </div>

      {count > 0 && (
        <div className={`verdict-box ${valid ? "valid" : "invalid"}`}>
          <div>
            <div className="verdict-label">{valid ? "✦ VALID TRADE" : "✕ NO TRADE"}</div>
            <div className="verdict-count">{count}/4 conditions met · {valid ? "min 3 required ✓" : `need ${3 - count} more`}</div>
          </div>
        </div>
      )}

      <div className="check-body">
        {CONDITIONS.map(c => (
          <div key={c.id} className={`check-item${checked[c.id] ? " checked" : ""}`} onClick={() => toggle(c.id)}>
            <div className="check-box">{checked[c.id] && <Tick />}</div>
            <div className="check-info">
              <div className="check-name">{c.name}</div>
              <div className="check-desc">{c.desc}</div>
            </div>
          </div>
        ))}
        <button className="reset-btn" onClick={reset}>↺ Reset checklist</button>
      </div>
    </div>
  );
}

function CalcScreen() {
  const [balance, setBalance] = useState("");
  const [riskPct, setRiskPct] = useState("1");
  const [slPips,  setSlPips]  = useState("");

  const riskAmount = (parseFloat(balance) * parseFloat(riskPct)) / 100 || 0;
  const pipValue   = 10;
  const lotSize    = slPips ? riskAmount / (parseFloat(slPips) * pipValue) : 0;

  return (
    <div className="screen" id="screen-calc">
      <div className="header">
        <div>
          <div className="header-title">RISK<span>CALC</span></div>
          <div className="header-sub">Position size calculator</div>
        </div>
        <div className="tag">CALCULATOR</div>
      </div>

      <div className="calc-body">
        <div>
          <div className="field-label">Account Balance (USD)</div>
          <input className="field-input" type="number" placeholder="e.g. 1000"
            value={balance} onChange={e => setBalance(e.target.value)} />
        </div>
        <div>
          <div className="field-label">Risk %</div>
          <input className="field-input" type="number" placeholder="e.g. 1" step="0.1"
            value={riskPct} onChange={e => setRiskPct(e.target.value)} />
        </div>
        <div>
          <div className="field-label">Stop Loss (pips)</div>
          <input className="field-input" type="number" placeholder="e.g. 20"
            value={slPips} onChange={e => setSlPips(e.target.value)} />
        </div>

        <hr className="calc-divider" />

        <div className="result-grid">
          <div className="result-card accent">
            <div className="result-value">
              {lotSize > 0 ? lotSize.toFixed(2) : "—"}
              <span className="result-unit">lots</span>
            </div>
            <div className="result-label">Lot Size</div>
          </div>
          <div className="result-card">
            <div className="result-value" style={{color: "var(--warn)"}}>
              ${riskAmount > 0 ? riskAmount.toFixed(2) : "—"}
            </div>
            <div className="result-label">Risk Amount</div>
          </div>
        </div>

        <div className="formula-note">
          Formula: <code>Lot = Risk$ ÷ (SL pips × $10)</code><br/>
          Assumes standard lot · $10/pip · USD pairs.<br/>
          For XAUUSD use $1/pip; for JPY pairs adjust accordingly.
        </div>
      </div>
    </div>
  );
}

function JournalScreen() {
  const [entries, setEntries] = useState(loadJournal);
  const [pair,    setPair]    = useState("XAUUSD");
  const [side,    setSide]    = useState("buy");
  const [result,  setResult]  = useState("open");

  const addEntry = () => {
    const entry = {
      id: Date.now(), pair, side, result,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    saveJournal(updated);
  };

  const deleteEntry = (id) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    saveJournal(updated);
  };

  const wins   = entries.filter(e => e.result === "win").length;
  const losses = entries.filter(e => e.result === "loss").length;
  const wr     = wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0;

  return (
    <div className="screen" id="screen-journal">
      <div className="header">
        <div>
          <div className="header-title">TRADE<span>LOG</span></div>
          <div className="header-sub">Journal · {entries.length} trades logged</div>
        </div>
        <div className="tag">JOURNAL</div>
      </div>

      <div className="journal-body">
        {entries.length > 0 && (
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-val" style={{color:"var(--accent)"}}>{wins}</div>
              <div className="stat-lbl">Wins</div>
            </div>
            <div className="stat-card">
              <div className="stat-val" style={{color:"var(--danger)"}}>{losses}</div>
              <div className="stat-lbl">Losses</div>
            </div>
            <div className="stat-card">
              <div className="stat-val" style={{color:"var(--warn)"}}>{wr}%</div>
              <div className="stat-lbl">Win Rate</div>
            </div>
          </div>
        )}

        <div className="journal-form">
          <div className="form-title">Log a trade</div>
          <div className="form-row">
            <div>
              <div className="field-label">Pair</div>
              <select className="field-select" value={pair} onChange={e => setPair(e.target.value)}
                style={{background:"var(--surface)"}}>
                {PAIRS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <div className="field-label">Direction</div>
              <select className="field-select" value={side} onChange={e => setSide(e.target.value)}
                style={{background:"var(--surface)"}}>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
              </select>
            </div>
          </div>
          <div>
            <div className="field-label">Result</div>
            <select className="field-select" value={result} onChange={e => setResult(e.target.value)}
              style={{background:"var(--surface)"}}>
              {RESULTS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <button className="submit-btn" onClick={addEntry}>+ Log Trade</button>
        </div>

        {entries.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            No trades logged yet.<br/>Your journal is clean.
          </div>
        ) : (
          <>
            <div className="entries-title">Recent trades</div>
            {entries.map(e => (
              <div key={e.id} className="entry-card">
                <div className={`entry-side ${e.side}`}>{e.side.toUpperCase()}</div>
                <div style={{flex:1}}>
                  <div className="entry-pair">{e.pair}</div>
                  <div className="entry-date">{e.date}</div>
                </div>
                <span className={`entry-result ${e.result}`}>{e.result.toUpperCase()}</span>
                <button className="entry-del" onClick={() => deleteEntry(e.id)}>✕</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ── Signals Screen ────────────────────────────────────────────────────────────
function SignalsScreen() {
  const [selected, setSelected] = useState(["EURUSD","GBPUSD","USDJPY","XAUUSD"]);
  const [loading,  setLoading]  = useState(false);
  const [signals,  setSignals]  = useState([]);
  const [error,    setError]    = useState("");

  const togglePair = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const analyze = async () => {
    if (!selected.length) return;
    setLoading(true);
    setSignals([]);
    setError("");

    const pairList = selected.join(", ");
    const prompt = `You are a professional forex SMC (Smart Money Concepts) analyst. Analyze these pairs on the 5M timeframe for sniper entry opportunities: ${pairList}.

For each pair evaluate these 4 SMC criteria based on realistic current market conditions:
1. Market Structure: BOS or ChoCH confirmed on HTF?
2. Liquidity Sweep: Previous high or low taken out recently?
3. FVG/Imbalance: Fair Value Gap present on entry timeframe?
4. EMA Trend: Price aligned with 50/200 EMA direction?

Respond ONLY with a valid JSON array. No markdown, no explanation, no extra text. Use this exact format:
[{"pair":"EUR/USD","signal":"BUY","marketStructure":{"pass":true,"detail":"Bullish BOS on H1"},"liquiditySweep":{"pass":true,"detail":"Buy-side liquidity swept"},"fvgImbalance":{"pass":false,"detail":"No clear FVG"},"emaTrend":{"pass":true,"detail":"Above 50 EMA"},"confidence":72,"summary":"Potential long from 4H OB, wait for 5M confirmation"}]`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(text);
      setSignals(parsed);
    } catch {
      setError("Failed to fetch signals. Please try again.");
    }
    setLoading(false);
  };

  const confClass = (c) => c >= 70 ? "fill-high" : c >= 45 ? "fill-medium" : "fill-low";

  return (
    <div className="screen" id="screen-signals">
      <div className="header">
        <div>
          <div className="header-title">AI<span>SIGNALS</span></div>
          <div className="header-sub">SMC sniper analyzer · 5M</div>
        </div>
        <div className="tag">LIVE</div>
      </div>

      <div className="signals-body">
        <div className="pair-toggles">
          {SIGNAL_PAIRS.map(p => (
            <div
              key={p.id}
              className={`pair-toggle${selected.includes(p.id) ? " on" : ""}`}
              onClick={() => togglePair(p.id)}
            >
              <div className="pair-toggle-name">{p.label}</div>
              <div className="pair-toggle-sub">{p.sub}</div>
            </div>
          ))}
        </div>

        <button
          className="analyze-btn"
          onClick={analyze}
          disabled={loading || !selected.length}
        >
          {loading ? "ANALYZING..." : "SCAN FOR SNIPER ENTRIES"}
        </button>

        {loading && (
          <div className="spinner-wrap">
            <span className="spinner"></span>
            Scanning {selected.join(", ")} for setups...
          </div>
        )}

        {error && (
          <div className="signal-summary" style={{color:"var(--danger)"}}>
            {error}
          </div>
        )}

        {signals.map((s, i) => {
          const badgeClass = s.signal === "BUY" ? "badge-buy" : s.signal === "SELL" ? "badge-sell" : "badge-wait";
          const criteria = [
            { label: "Market Structure (BOS/ChoCH)", data: s.marketStructure },
            { label: "Liquidity Sweep",              data: s.liquiditySweep },
            { label: "FVG / Imbalance",              data: s.fvgImbalance },
            { label: "EMA Trend (50/200)",           data: s.emaTrend },
          ];
          return (
            <div key={i} className="signal-card">
              <div className="signal-header">
                <span className="signal-pair-name">{s.pair}</span>
                <span className={`signal-badge ${badgeClass}`}>{s.signal}</span>
              </div>
              {criteria.map((c, j) => (
                <div key={j} className="criteria-row">
                  <span className="criteria-label">{c.label}</span>
                  <span className={`criteria-val ${c.data.pass ? "val-pass" : "val-fail"}`}>
                    {c.data.pass ? "✓" : "✗"} {c.data.detail}
                  </span>
                </div>
              ))}
              <div className="conf-bar-wrap">
                <div className="conf-bar">
                  <div className={`conf-fill ${confClass(s.confidence)}`} style={{width: `${s.confidence}%`}}></div>
                </div>
                <div className="conf-label">Confidence: {s.confidence}%</div>
              </div>
              <div className="signal-summary">{s.summary}</div>
            </div>
          );
        })}

        <div className="disclaimer">
          AI analysis is for educational purposes only. Always confirm signals on your chart before entering a trade. Not financial advice.
        </div>
      </div>
    </div>
  );
}

// ── App Shell ─────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("check");
  const screens = ["check", "calc", "journal", "signals"];

  useEffect(() => {
    screens.forEach(s => {
      const el = document.getElementById(`screen-${s}`);
      if (el) el.className = `screen${tab === s ? " active" : ""}`;
    });
  }, [tab]);

  return (
    <>
      <GlobalStyles />
      <ChecklistScreen />
      <CalcScreen />
      <JournalScreen />
      <SignalsScreen />

      <nav className="nav">
        {[
          { id: "check",   label: "Checklist", Icon: IconCheck  },
          { id: "calc",    label: "Risk Calc",  Icon: IconCalc   },
          { id: "journal", label: "Journal",    Icon: IconBook   },
          { id: "signals", label: "Signals",    Icon: IconSignal },
        ].map(({ id, label, Icon }) => (
          <button key={id} className={`nav-btn${tab === id ? " active" : ""}`} onClick={() => setTab(id)}>
            <Icon />
            {label}
          </button>
        ))}
      </nav>
    </>
  );
}
