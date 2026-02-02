import { useState, useMemo, useEffect } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area, CartesianGrid
} from "recharts";

const USERS = [
  { username: "admin", password: "admin123" },
  { username: "user", password: "user123" },
];

const INITIAL_ITEMS = [
  { id: 1, name: "شاشات", icon: "🖥️", qty: 15, category: "إلكترونيات", price: 850 },
  { id: 2, name: "كيبورد", icon: "⌨️", qty: 30, category: "إلكترونيات", price: 120 },
  { id: 3, name: "ماوس", icon: "🖱️", qty: 42, category: "إلكترونيات", price: 65 },
  { id: 4, name: "كيبل USB", icon: "🔌", qty: 200, category: "كوابل", price: 12 },
  { id: 5, name: "كيبل HDMI", icon: "🔗", qty: 85, category: "كوابل", price: 25 },
  { id: 6, name: "مزودات طاقة", icon: "⚡", qty: 50, category: "إلكترونيات", price: 180 },
  { id: 7, name: "كراسي", icon: "🪑", qty: 25, category: "أثاث", price: 400 },
  { id: 8, name: "مكاتب", icon: "🪵", qty: 12, category: "أثاث", price: 950 },
  { id: 9, name: "لوحات حائط", icon: "🖼️", qty: 18, category: "أثاث", price: 220 },
  { id: 10, name: "حقيبة لاب توب", icon: "💼", qty: 60, category: "إكسسريات", price: 75 },
];

const COLORS = ["#38bdf8", "#a78bfa", "#fb923c", "#34d399", "#f472b6", "#60a5fa", "#facc15", "#fb7185"];

// ─── SPARKLINE SVG ────────────────────────────────────────────
function Sparkline({ data, color }) {
  const w = 88, h = 26;
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`).join(" ");
  const areaD = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - (v / max) * h}`);
  const path = `M${areaD[0]} ${areaD.slice(1).map(p => `L${p}`).join(" ")} L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={`sp-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#sp-${color.replace("#","")})`} />
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── TOOLTIPS ─────────────────────────────────────────────────
const TipStyle = { background: "#1a2540", border: "1px solid #243352", borderRadius: 10, padding: "9px 15px", boxShadow: "0 8px 28px rgba(0,0,0,.45)" };
function BarTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={TipStyle}>
      <p style={{ color: "#64748b", margin: 0, fontSize: 11, marginBottom: 3 }}>{payload[0]?.payload?.name}</p>
      <p style={{ color: "#38bdf8", margin: 0, fontSize: 20, fontWeight: 700 }}>{payload[0]?.value} <span style={{ fontSize: 10, color: "#64748b", fontWeight: 400 }}>وحدة</span></p>
    </div>
  );
}
function PieTip({ active, payload }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={TipStyle}>
      <p style={{ color: "#64748b", margin: 0, fontSize: 11, marginBottom: 3 }}>{payload[0]?.name}</p>
      <p style={{ color: payload[0]?.payload?.fill || "#38bdf8", margin: 0, fontSize: 20, fontWeight: 700 }}>{payload[0]?.value} <span style={{ fontSize: 10, color: "#64748b", fontWeight: 400 }}>وحدة</span></p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════════════
function LoginPage({ onLogin }) {
  const [un, setUn] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [shake, setShake] = useState(false);
  const go = () => {
    if (USERS.find(u => u.username === un && u.password === pw)) { onLogin(un); return; }
    setErr("اسم المستخدم أو كلمة المرور غلط");
    setShake(true); setTimeout(() => setShake(false), 500);
  };
  return (
    <div style={L.bg}>
      {/* ambient glow */}
      <div style={{ position:"absolute", top:"-160px", left:"-160px", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 70%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", bottom:"-120px", right:"-120px", width:340, height:340, borderRadius:"50%", background:"radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 70%)", pointerEvents:"none" }}/>

      <div style={{ ...L.card, animation: shake ? "shake .4s ease" : "fadeUp .55s ease" }}>
        {/* logo row */}
        <div style={L.logoRow}>
          <div style={L.logoBg}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="1" y="10" width="26" height="16" rx="3" stroke="#38bdf8" strokeWidth="2.2" fill="none"/><path d="M7 10V7a7 7 0 0114 0v3" stroke="#38bdf8" strokeWidth="2.2" fill="none" strokeLinecap="round"/><circle cx="14" cy="18" r="2.5" fill="#38bdf8"/></svg>
          </div>
          <div><h1 style={L.title}>SmartStock</h1><p style={L.sub}>نظام إدارة المخزون</p></div>
        </div>
        {/* inputs */}
        <div style={L.inpWrap}><span style={L.inpIcon}>👤</span><input value={un} onChange={e=>{setUn(e.target.value);setErr("")}} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="اسم المستخدم" style={L.inp} autoComplete="off"/></div>
        <div style={L.inpWrap}><span style={L.inpIcon}>🔐</span><input type="password" value={pw} onChange={e=>{setPw(e.target.value);setErr("")}} onKeyDown={e=>e.key==="Enter"&&go()} placeholder="كلمة المرور" style={L.inp}/></div>
        {err && <p style={L.err}>{err}</p>}
        <button onClick={go} style={L.btn}>تسجيل الدخول</button>
        <p style={L.hint}><code style={L.cd}>admin</code> / <code style={L.cd}>admin123</code></p>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-9px)}75%{transform:translateX(9px)}}input:focus{outline:none!important;border-color:#38bdf8!important;box-shadow:0 0 0 3px rgba(56,189,248,.18)!important;}`}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// DASHBOARD
// ═══════════════════════════════════════════════════════════════
function Dashboard({ user, onLogout }) {
  // Load items from storage or use initial data
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [page, setPage] = useState("home");
  const [filter, setFilter] = useState("كل");

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Try using window.storage if available (shared storage)
        if (window.storage && typeof window.storage.get === 'function') {
          const result = await window.storage.get('inventory-items', true);
          if (result?.value) {
            setItems(JSON.parse(result.value));
          }
        } else {
          // Fallback to localStorage (local only)
          const saved = localStorage.getItem('smartstock_items');
          if (saved) {
            setItems(JSON.parse(saved));
          }
        }
      } catch (error) {
        console.log('No saved data found, using initial items');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Save items to storage whenever they change
  useEffect(() => {
    if (!loading) {
      const saveData = async () => {
        try {
          // Try using window.storage if available (shared storage)
          if (window.storage && typeof window.storage.set === 'function') {
            await window.storage.set('inventory-items', JSON.stringify(items), true);
          } else {
            // Fallback to localStorage (local only)
            localStorage.setItem('smartstock_items', JSON.stringify(items));
          }
        } catch (error) {
          console.error('Failed to save data:', error);
        }
      };
      saveData();
    }
  }, [items, loading]);

  // derived
  const categories = useMemo(() => ["كل", ...new Set(items.map(i => i.category))], [items]);
  const catData = useMemo(() => {
    const m = {};
    items.forEach(i => { m[i.category] = (m[i.category] || 0) + i.qty; });
    return Object.entries(m).map(([cat, qty], idx) => ({ name: cat, value: qty, fill: COLORS[idx % COLORS.length] }));
  }, [items]);
  const barData = useMemo(() => items.map(i => ({ name: i.name, qty: i.qty })), [items]);
  const totalQty = useMemo(() => items.reduce((a, i) => a + i.qty, 0), [items]);
  const totalVal = useMemo(() => items.reduce((a, i) => a + i.qty * i.price, 0), [items]);
  const lowStock = useMemo(() => items.filter(i => i.qty <= 20).length, [items]);
  const filtered = filter === "كل" ? items : items.filter(i => i.category === filter);

  // trend (simulated monthly)
  const trendData = useMemo(() => {
    const ms = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
    return ms.map((m, i) => ({ month: m, الإضافات: 38 + Math.round(Math.sin(i)*18) + (totalQty % 28), السحب: 22 + Math.round(Math.cos(i)*14) + (totalQty % 18) }));
  }, [totalQty]);

  // CRUD
  const save = () => {
    if (!modal?.item?.name) return;
    if (modal.mode === "edit") setItems(p => p.map(i => i.id === modal.item.id ? modal.item : i));
    else setItems(p => [...p, { ...modal.item, id: Date.now() }]);
    setModal(null);
  };
  const del = id => setItems(p => p.filter(i => i.id !== id));
  const chgQty = (id, d) => setItems(p => p.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + d) } : i));

  // ── NAV ──
  const Nav = (
    <nav style={D.nav}>
      <div style={D.navL}>
        <span style={D.navLogo}>📦 SmartStock</span>
        <div style={D.tabs}>
          {[["home","🏠 لوحة البيانات"],["inventory","📋 المخزون"]].map(([k,lbl])=>(
            <button key={k} onClick={()=>setPage(k)} style={{...D.tab,...(page===k?D.tabAct:{})}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>
      <div style={D.navR}>
        <span style={D.navUser}>👤 {user}</span>
        <button onClick={onLogout} style={D.logoutBtn}>خروج</button>
      </div>
    </nav>
  );

  // ═══ HOME ═══
  if (page === "home") return (
    <div style={D.bg}>
      {Nav}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#64748b', fontSize: 14 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📦</div>
            <div>جاري تحميل البيانات...</div>
          </div>
        </div>
      ) : (
      <div style={D.wrap}>
        {/* KPI */}
        <div style={D.kpiRow}>
          {[
            { label:"إجمالي الأغراض", val: totalQty, icon:"📦", color:"#38bdf8", sp:[12,16,14,20,24,21,28,32,29,35,38,totalQty%42+18] },
            { label:"قيمة المخزون", val:`${(totalVal/1000).toFixed(1)}K`, icon:"💰", color:"#34d399", sp:[8,11,10,14,17,15,20,23,25,22,28,32] },
            { label:"أنواع الأغراض", val: items.length, icon:"🏷️", color:"#a78bfa", sp:[6,7,7,8,8,9,9,10,10,10,items.length,items.length] },
            { label:"كمية منخفضة", val: lowStock, icon:"⚠️", color:"#f472b6", sp:[4,3,5,3,2,1,2,3,2,1,2,lowStock] },
          ].map((kpi,i)=>(
            <div key={i} style={D.kpiCard}>
              <div style={D.kpiTop}>
                <div style={{...D.kpiBadge, background:`${kpi.color}16`}}><span style={{fontSize:21}}>{kpi.icon}</span></div>
                <div><div style={{...D.kpiVal, color:kpi.color}}>{kpi.val}</div><div style={D.kpiLbl}>{kpi.label}</div></div>
              </div>
              <Sparkline data={kpi.sp} color={kpi.color}/>
            </div>
          ))}
        </div>

        {/* Bar + Pie row */}
        <div style={D.row2}>
          {/* BAR */}
          <div style={D.chartCard}>
            <div style={D.cHead}><div><h3 style={D.cTitle}>الكمية حسب الغرض</h3><p style={D.cSub}>توزيع الأغراض في المخزون</p></div><span style={D.badge}>بار</span></div>
            <ResponsiveContainer width="100%" height={210}>
              <BarChart data={barData} margin={{top:8,right:8,left:-24,bottom:0}}>
                <defs><linearGradient id="bG" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8"/><stop offset="100%" stopColor="#0369a1"/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a"/>
                <XAxis dataKey="name" tick={{fill:"#64748b",fontSize:9}} axisLine={{stroke:"#243352"}} tickLine={false} interval={0} angle={-28} textAnchor="end" height={46}/>
                <YAxis tick={{fill:"#64748b",fontSize:10}} axisLine={false} tickLine={false}/>
                <Tooltip content={<BarTip/>} cursor={{fill:"rgba(56,189,248,.06)"}}/>
                <Bar dataKey="qty" fill="url(#bG)" radius={[5,5,0,0]} barSize={24}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          {/* PIE */}
          <div style={D.chartCard}>
            <div style={D.cHead}><div><h3 style={D.cTitle}>التوزيع حسب الفئة</h3><p style={D.cSub}>نسبة كل فئة من الإجمالي</p></div><span style={{...D.badge, background:"rgba(167,139,250,.12)", color:"#a78bfa"}}>دوني</span></div>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie data={catData} cx="50%" cy="50%" innerRadius={50} outerRadius={78} dataKey="value" nameKey="name" paddingAngle={3} stroke="none">
                  {catData.map((e,i)=><Cell key={i} fill={e.fill}/>)}
                </Pie>
                <Tooltip content={<PieTip/>}/>
                <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11}} formatter={v=><span style={{color:"#94a3b8"}}>{v}</span>}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AREA trend */}
        <div style={D.chartCard}>
          <div style={D.cHead}><div><h3 style={D.cTitle}>حركة المخزون - هذا العام</h3><p style={D.cSub}>الإضافات والسحب الشهري</p></div><span style={{...D.badge, background:"rgba(52,211,153,.12)", color:"#34d399"}}>مساحة</span></div>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={trendData} margin={{top:8,right:8,left:-24,bottom:0}}>
              <defs>
                <linearGradient id="aA" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#38bdf8" stopOpacity=".32"/><stop offset="100%" stopColor="#38bdf8" stopOpacity="0"/></linearGradient>
                <linearGradient id="aS" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fb7185" stopOpacity=".28"/><stop offset="100%" stopColor="#fb7185" stopOpacity="0"/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d4a"/>
              <XAxis dataKey="month" tick={{fill:"#64748b",fontSize:9}} axisLine={{stroke:"#243352"}} tickLine={false}/>
              <YAxis tick={{fill:"#64748b",fontSize:10}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#1a2540",border:"1px solid #243352",borderRadius:10,color:"#e2e8f0",fontSize:12}}/>
              <Area type="monotone" dataKey="الإضافات" stroke="#38bdf8" strokeWidth={2.2} fill="url(#aA)"/>
              <Area type="monotone" dataKey="السحب" stroke="#fb7185" strokeWidth={2.2} fill="url(#aS)"/>
              <Legend iconType="circle" iconSize={7} wrapperStyle={{fontSize:11}} formatter={v=><span style={{color:"#94a3b8"}}>{v}</span>}/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top 5 + Low stock */}
        <div style={D.row2}>
          {/* Top 5 */}
          <div style={D.chartCard}>
            <div style={D.cHead}><div><h3 style={D.cTitle}>🏆 أعلى 5 أغراض</h3><p style={D.cSub}>حسب الكمية الأعلى</p></div></div>
            {[...items].sort((a,b)=>b.qty-a.qty).slice(0,5).map((item,i)=>{
              const pct = (item.qty / Math.max(...items.map(x=>x.qty)))*100;
              return (
                <div key={item.id} style={D.topRow}>
                  <span style={{...D.topRank, color:COLORS[i]}}>{i+1}</span>
                  <span style={{fontSize:17}}>{item.icon}</span>
                  <div style={D.topInfo}>
                    <span style={D.topName}>{item.name}</span>
                    <div style={D.topBarBg}><div style={{...D.topBarFill, width:`${pct}%`, background:COLORS[i]}}/></div>
                  </div>
                  <span style={{...D.topQty, color:COLORS[i]}}>{item.qty}</span>
                </div>
              );
            })}
          </div>
          {/* Low stock */}
          <div style={D.chartCard}>
            <div style={D.cHead}><div><h3 style={D.cTitle}>⚠️ كمية منخفضة</h3><p style={D.cSub}>أغراض تحتاج إعادة تخزين</p></div></div>
            {items.filter(i=>i.qty<=20).sort((a,b)=>a.qty-b.qty).length===0
              ? <p style={{color:"#475569",textAlign:"center",padding:28,fontSize:13}}>✓ كل شي كافي الحين</p>
              : items.filter(i=>i.qty<=20).sort((a,b)=>a.qty-b.qty).map(item=>(
                <div key={item.id} style={D.lowRow}>
                  <span style={{fontSize:18}}>{item.icon}</span>
                  <div style={{flex:1}}><div style={D.lowName}>{item.name}</div><div style={D.lowCat}>{item.category}</div></div>
                  <div style={{textAlign:"right"}}><div style={D.lowQty}>{item.qty}</div><div style={D.lowLbl}>وحدة</div></div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      )}
    </div>
  );

  // ═══ INVENTORY ═══
  return (
    <div style={D.bg}>
      {Nav}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#64748b', fontSize: 14 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>📦</div>
            <div>جاري تحميل البيانات...</div>
          </div>
        </div>
      ) : (
      <div style={D.wrap}>
        {/* toolbar */}
        <div style={D.toolbar}>
          <div style={D.fRow}>
            {categories.map(c=>(
              <button key={c} onClick={()=>setFilter(c)} style={{...D.fBtn,...(filter===c?D.fBtnAct:{})}}>{c}</button>
            ))}
          </div>
          <button onClick={()=>setModal({mode:"add",item:{id:null,name:"",icon:"📦",qty:0,category:"إلكترونيات",price:0}})} style={D.addBtn}>
            <span style={{fontSize:17,marginRight:3}}>+</span> إضافة غرض
          </button>
        </div>
        {/* grid */}
        <div style={D.itemGrid}>
          {filtered.map(item=>(
            <div key={item.id} style={D.iCard}>
              <div style={D.iCardTop}>
                <div style={D.iIconBox}><span style={{fontSize:26}}>{item.icon}</span></div>
                <div style={{display:"flex",gap:5}}>
                  <button onClick={()=>setModal({mode:"edit",item:{...item}})} style={D.actBtn}>✏️</button>
                  <button onClick={()=>del(item.id)} style={{...D.actBtn,...D.actDel}}>🗑️</button>
                </div>
              </div>
              <h3 style={D.iName}>{item.name}</h3>
              <span style={D.iCat}>{item.category}</span>
              <div style={D.iPriceRow}>
                <span style={D.iPrice}>{item.price} ريال</span>
                <span style={D.iTotal}>{(item.qty*item.price).toLocaleString()} إجمالي</span>
              </div>
              <div style={D.qRow}>
                <button onClick={()=>chgQty(item.id,-1)} style={D.qBtn}>−</button>
                <span style={D.qVal}>{item.qty}</span>
                <button onClick={()=>chgQty(item.id,1)} style={D.qBtn}>+</button>
              </div>
              <div style={D.iBarBg}><div style={{...D.iBarFill, width:`${Math.min((item.qty/200)*100,100)}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
      {/* MODAL */}
      {modal && (
        <div style={D.overlay} onClick={()=>setModal(null)}>
          <div style={D.modal} onClick={e=>e.stopPropagation()}>
            <h2 style={D.mTitle}>{modal.mode==="edit"?"✏️ تعديل غرض":"➕ إضافة غرض جديد"}</h2>
            {[
              {key:"name",label:"الاسم",type:"text",ph:"مثال: شاشات"},
              {key:"icon",label:"الأيكون (إيموجي)",type:"text",ph:"📦"},
              {key:"qty",label:"الكمية",type:"number",ph:"0"},
              {key:"price",label:"السعر (ريال)",type:"number",ph:"0"},
              {key:"category",label:"الفئة",type:"text",ph:"إلكترونيات"},
            ].map(f=>(
              <div key={f.key} style={{marginBottom:13}}>
                <label style={D.mLabel}>{f.label}</label>
                <input type={f.type} value={modal.item[f.key]} onChange={e=>setModal({...modal,item:{...modal.item,[f.key]:f.type==="number"?(parseInt(e.target.value)||0):e.target.value}})} placeholder={f.ph} style={D.mInp}/>
              </div>
            ))}
            <div style={{display:"flex",gap:8,marginTop:20}}>
              <button onClick={()=>setModal(null)} style={D.mCancel}>إلغاء</button>
              <button onClick={save} disabled={!modal.item.name} style={D.mSave}>حفظ</button>
            </div>
          </div>
        </div>
      )}
      )}
      <style>{`input:focus{outline:none!important;border-color:#38bdf8!important;box-shadow:0 0 0 3px rgba(56,189,248,.17)!important;}`}</style>
    </div>
  );
}

// ═══ ROOT ═════════════════════════════════════════════════════
export default function App() {
  const [user, setUser] = useState(null);
  return user ? <Dashboard user={user} onLogout={()=>setUser(null)}/> : <LoginPage onLogin={u=>setUser(u)}/>;
}

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const L = {
  bg: { minHeight:"100vh", background:"#090e1a", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", fontFamily:"'Segoe UI',sans-serif" },
  card: { background:"linear-gradient(145deg,#111a2e,#162035)", border:"1px solid #1e2d4a", borderRadius:22, padding:"44px 34px", width:"100%", maxWidth:390, boxShadow:"0 28px 72px rgba(0,0,0,.5)", position:"relative", zIndex:1 },
  logoRow: { display:"flex", alignItems:"center", gap:14, marginBottom:34 },
  logoBg: { width:52, height:52, borderRadius:13, background:"rgba(56,189,248,.1)", border:"1px solid rgba(56,189,248,.18)", display:"flex", alignItems:"center", justifyContent:"center" },
  title: { color:"#f1f5f9", fontSize:22, margin:0, fontWeight:700 },
  sub: { color:"#475569", fontSize:11, margin:"3px 0 0" },
  inpWrap: { position:"relative", marginBottom:12 },
  inpIcon: { position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", fontSize:15, pointerEvents:"none" },
  inp: { width:"100%", padding:"12px 15px 12px 40px", borderRadius:9, border:"1px solid #1e2d4a", background:"#0d1220", color:"#f1f5f9", fontSize:14, boxSizing:"border-box", transition:"all .2s", fontFamily:"inherit" },
  err: { color:"#f87171", fontSize:12, textAlign:"center", margin:"8px 0" },
  btn: { width:"100%", padding:13, borderRadius:9, border:"none", background:"linear-gradient(135deg,#0284c7,#38bdf8)", color:"#fff", fontSize:15, fontWeight:700, cursor:"pointer", marginTop:4, transition:"all .2s" },
  hint: { color:"#374151", fontSize:11, textAlign:"center", marginTop:18 },
  cd: { color:"#38bdf8", background:"rgba(56,189,248,.1)", padding:"2px 7px", borderRadius:4, fontFamily:"monospace" },
};

const D = {
  bg: { minHeight:"100vh", background:"#090e1a", color:"#e2e8f0", fontFamily:"'Segoe UI',sans-serif" },
  nav: { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 26px", background:"rgba(12,17,30,.92)", borderBottom:"1px solid #1e2d4a", backdropFilter:"blur(12px)", position:"sticky", top:0, zIndex:10 },
  navL: { display:"flex", alignItems:"center", gap:22 },
  navLogo: { fontSize:17, fontWeight:700, color:"#f1f5f9", letterSpacing:"-.3px" },
  tabs: { display:"flex", gap:3 },
  tab: { padding:"5px 15px", borderRadius:7, border:"none", background:"transparent", color:"#64748b", fontSize:12.5, cursor:"pointer", transition:"all .2s", fontFamily:"inherit" },
  tabAct: { background:"rgba(56,189,248,.1)", color:"#38bdf8" },
  navR: { display:"flex", alignItems:"center", gap:13 },
  navUser: { color:"#64748b", fontSize:12.5 },
  logoutBtn: { padding:"5px 15px", borderRadius:7, border:"1px solid #1e2d4a", background:"transparent", color:"#64748b", fontSize:11.5, cursor:"pointer", fontFamily:"inherit" },

  wrap: { padding:"22px 26px", display:"flex", flexDirection:"column", gap:18 },

  // KPI
  kpiRow: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(195px,1fr))", gap:13 },
  kpiCard: { background:"linear-gradient(145deg,#111a2e,#162035)", border:"1px solid #1e2d4a", borderRadius:15, padding:"16px 18px", display:"flex", flexDirection:"column", gap:12 },
  kpiTop: { display:"flex", alignItems:"center", gap:13 },
  kpiBadge: { width:42, height:42, borderRadius:11, display:"flex", alignItems:"center", justifyContent:"center" },
  kpiVal: { fontSize:24, fontWeight:700, lineHeight:1.2 },
  kpiLbl: { color:"#64748b", fontSize:10.5, fontWeight:600, marginTop:1 },

  // Charts
  row2: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:15 },
  chartCard: { background:"linear-gradient(145deg,#111a2e,#162035)", border:"1px solid #1e2d4a", borderRadius:15, padding:"18px 20px" },
  cHead: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 },
  cTitle: { color:"#f1f5f9", fontSize:14, margin:0, fontWeight:600 },
  cSub: { color:"#475569", fontSize:10.5, margin:"3px 0 0" },
  badge: { background:"rgba(56,189,248,.12)", color:"#38bdf8", fontSize:9.5, padding:"2px 9px", borderRadius:18, fontWeight:600 },

  // Top
  topRow: { display:"flex", alignItems:"center", gap:9, padding:"7px 0", borderBottom:"1px solid #1a2540" },
  topRank: { fontSize:13, fontWeight:700, width:16, textAlign:"center" },
  topInfo: { flex:1, minWidth:0 },
  topName: { color:"#cbd5e1", fontSize:12, display:"block", marginBottom:4 },
  topBarBg: { height:3.5, borderRadius:2, background:"#1a2540", overflow:"hidden" },
  topBarFill: { height:"100%", borderRadius:2, transition:"width .35s" },
  topQty: { fontSize:14, fontWeight:700 },

  // Low
  lowRow: { display:"flex", alignItems:"center", gap:9, padding:"9px 0", borderBottom:"1px solid #1a2540" },
  lowName: { color:"#cbd5e1", fontSize:12 },
  lowCat: { color:"#475569", fontSize:9.5 },
  lowQty: { color:"#f472b6", fontSize:17, fontWeight:700 },
  lowLbl: { color:"#475569", fontSize:8.5 },

  // Inventory
  toolbar: { display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:9 },
  fRow: { display:"flex", gap:5, flexWrap:"wrap" },
  fBtn: { padding:"5px 13px", borderRadius:16, border:"1px solid #1e2d4a", background:"transparent", color:"#64748b", fontSize:11.5, cursor:"pointer", transition:"all .2s", fontFamily:"inherit" },
  fBtnAct: { background:"rgba(56,189,248,.12)", borderColor:"#38bdf8", color:"#38bdf8" },
  addBtn: { display:"flex", alignItems:"center", padding:"7px 18px", borderRadius:9, border:"none", background:"linear-gradient(135deg,#0284c7,#38bdf8)", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" },

  itemGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(220px,1fr))", gap:13 },
  iCard: { background:"linear-gradient(145deg,#111a2e,#162035)", border:"1px solid #1e2d4a", borderRadius:15, padding:16, display:"flex", flexDirection:"column", gap:7 },
  iCardTop: { display:"flex", justifyContent:"space-between", alignItems:"flex-start" },
  iIconBox: { width:46, height:46, borderRadius:11, background:"rgba(56,189,248,.08)", display:"flex", alignItems:"center", justifyContent:"center" },
  actBtn: { width:28, height:28, borderRadius:6, border:"1px solid #1e2d4a", background:"transparent", cursor:"pointer", fontSize:12, display:"flex", alignItems:"center", justifyContent:"center" },
  actDel: { borderColor:"rgba(244,114,182,.2)", color:"#f472b6" },
  iName: { color:"#f1f5f9", fontSize:14.5, margin:0, fontWeight:600 },
  iCat: { color:"#475569", fontSize:9.5, fontWeight:600, textTransform:"uppercase", letterSpacing:".5px" },
  iPriceRow: { display:"flex", justifyContent:"space-between" },
  iPrice: { color:"#34d399", fontSize:12.5, fontWeight:600 },
  iTotal: { color:"#475569", fontSize:9.5 },
  qRow: { display:"flex", alignItems:"center", gap:7 },
  qBtn: { width:28, height:28, borderRadius:7, border:"1px solid #1e2d4a", background:"#0d1220", color:"#94a3b8", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"inherit" },
  qVal: { fontSize:19, fontWeight:700, color:"#38bdf8", minWidth:30, textAlign:"center" },
  iBarBg: { height:3, borderRadius:2, background:"#1a2540", overflow:"hidden", marginTop:1 },
  iBarFill: { height:"100%", borderRadius:2, background:"linear-gradient(90deg,#0284c7,#38bdf8)", transition:"width .3s" },

  // Modal
  overlay: { position:"fixed", inset:0, background:"rgba(0,0,0,.6)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100 },
  modal: { background:"#141e33", border:"1px solid #1e2d4a", borderRadius:18, padding:28, width:"100%", maxWidth:370, boxShadow:"0 28px 72px rgba(0,0,0,.5)" },
  mTitle: { color:"#f1f5f9", fontSize:17, margin:"0 0 20px", fontWeight:700 },
  mLabel: { display:"block", color:"#64748b", fontSize:10.5, marginBottom:5, fontWeight:600 },
  mInp: { width:"100%", padding:"9px 13px", borderRadius:7, border:"1px solid #1e2d4a", background:"#0d1220", color:"#f1f5f9", fontSize:13.5, boxSizing:"border-box", transition:"all .2s", fontFamily:"inherit" },
  mCancel: { flex:1, padding:9, borderRadius:7, border:"1px solid #1e2d4a", background:"transparent", color:"#64748b", fontSize:13, cursor:"pointer", fontFamily:"inherit" },
  mSave: { flex:1, padding:9, borderRadius:7, border:"none", background:"linear-gradient(135deg,#0284c7,#38bdf8)", color:"#fff", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" },
};
