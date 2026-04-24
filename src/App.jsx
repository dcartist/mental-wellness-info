/*
 * App.jsx — Mental Health Research Dashboard
 * ============================================================
 * PSEUDO-CODE: TOP-LEVEL FLOW
 *   1. Import useState + Recharts chart primitives
 *   2. Import DATA and CAT_COLORS from data.js
 *   3. Define T (design tokens): white-bg palette, all WCAG AA verified
 *   4. Define small reusable components (pure render functions, no state)
 *   5. Define section components for Q1, Q2, and Datasets views
 *   6. Export default App: root component holding view/subTab state
 *
 * 508 / WCAG 2.1 AA:
 *   - Single <h1>; all sections use h2/h3 in document order
 *   - role="tablist" + role="tab" + aria-selected on every tab bar
 *   - Charts: role="img" + aria-label listing every data value
 *   - Progress bars: role="meter" + aria-valuenow/min/max
 *   - Expandable rows: aria-expanded + aria-controls + id on panel
 *   - Tables: th scope="col" on every column header
 *   - External links: visually-hidden "(opens in new tab)" text
 *   - Skip-to-main-content link visible on keyboard focus
 *   - focus-visible: 3px solid #1D4ED8 on every interactive element
 *   - All text >= 4.5:1 contrast on #FFFFFF
 *   - Color never sole conveyor of meaning; text labels always present
 */

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, Legend } from "recharts";
import { DATA, CAT_COLORS, DMV, WARDS } from "./data.js";

/* ============================================================
   DESIGN TOKENS
   PSEUDO-CODE: Single source of truth for every color.
   All values verified >= 4.5:1 contrast ratio on white (#FFF).
============================================================ */
const T = {
  bg:      "#FFFFFF",
  bgCard:  "#F8FAFC",
  bgSub:   "#F1F5F9",
  border:  "#E2E8F0",
  text:    "#0F172A",
  textSub: "#1E293B",
  textMut: "#475569",
};

/* ============================================================
   SMALL REUSABLE COMPONENTS
   PSEUDO-CODE: Pure functions — props in, JSX out. No side effects.
============================================================ */

/* ChartTip: custom Recharts tooltip.
   PSEUDO-CODE: IF active=true AND payload has data → render box. ELSE → null.
   508: role="tooltip"; text-only, no color-only information. */
function ChartTip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div role="tooltip" style={{ background:"#1E293B", border:"1px solid #334155", borderRadius:8, padding:"10px 14px", fontSize:13, color:"#F1F5F9", maxWidth:260 }}>
      <p style={{ margin:"0 0 4px", fontWeight:700 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ margin:0 }}>{p.name || p.dataKey}: <strong>{p.value}{typeof p.value==="number"&&p.value<=100?"%":""}</strong></p>
      ))}
    </div>
  );
}

/* Eyebrow: decorative uppercase label above a heading.
   508: aria-hidden="true" — the h2 is the semantic heading, this is decorative. */
function Eyebrow({ text, color }) {
  return <p aria-hidden="true" style={{ fontSize:10, fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase", color:color||T.textMut, margin:"0 0 4px" }}>{text}</p>;
}

/* Card: white card container with optional left accent stripe.
   PSEUDO-CODE: Merge base styles, optionally add borderLeft from accent prop. */
function Card({ accent, style, children }) {
  const base = { background:T.bgCard, border:"1px solid "+T.border, borderRadius:12, padding:20 };
  if (accent) base.borderLeft = "4px solid "+accent;
  return <div style={{ ...base, ...style }}>{children}</div>;
}

/* StatCard: one big headline statistic.
   PSEUDO-CODE: Build aria-label = val + label + src. Render val in large mono.
   508: role="article" + aria-label so screen reader reads full stat as one unit. */
function StatCard({ val, label, color, src }) {
  return (
    <article aria-label={`${val}: ${label}. Source: ${src}`} style={{ background:T.bgCard, border:"1px solid "+T.border, borderRadius:12, padding:"16px 18px", borderLeft:"4px solid "+color }}>
      <div style={{ fontSize:32, fontWeight:700, color, fontFamily:"monospace", lineHeight:1 }}>{val}</div>
      <div style={{ fontSize:13, color:T.textSub, marginTop:6, lineHeight:1.4 }}>{label}</div>
      <div style={{ fontSize:11, color:T.textMut, marginTop:5 }}>Source: {src}</div>
    </article>
  );
}

/* Tag: small colored badge pill.
   508: Text (not color) carries meaning — color is supplemental. */
function Tag({ children, color }) {
  const c = color||T.textMut;
  return <span style={{ display:"inline-block", background:c+"25", color:c, border:"1px solid "+c+"50", borderRadius:12, padding:"2px 9px", fontSize:11, fontWeight:600, whiteSpace:"nowrap" }}>{children}</span>;
}

/* ExtLink: anchor that opens in a new tab.
   PSEUDO-CODE: Render <a target="_blank"> + sr-only "(opens in new tab)" span.
   508: Screen reader announces new-tab behavior via the hidden span. */
function ExtLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ color:"#1D4ED8", textDecoration:"underline" }}>
      {children}
      <span style={{ position:"absolute", left:"-9999px", width:1, height:1, overflow:"hidden" }}>{" (opens in new tab)"}</span>
    </a>
  );
}

/* PBar: progress bar row that expands to show detail on click.
   PSEUDO-CODE:
     1. Build panelId from label text (for aria-controls reference).
     2. Render [toggle button] + [% badge].
     3. Render colored bar track with role="meter".
     4. IF expanded: render detail panel. ELSE: render short note.
   508: button has aria-expanded + aria-controls; bar has role="meter" + aria-value attrs;
        detail panel has role="region" + aria-label. */
function PBar({ label, pct, color, note, detail, expanded, onToggle }) {
  const panelId = "panel-"+label.replace(/[^a-zA-Z0-9]/g,"-");
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:4 }}>
        <button aria-expanded={expanded?"true":"false"} aria-controls={panelId} onClick={onToggle}
          style={{ background:"none", border:"none", cursor:"pointer", textAlign:"left", color:T.text, fontSize:13, fontWeight:500, padding:0, display:"flex", alignItems:"center", gap:6, fontFamily:"inherit" }}>
          <span aria-hidden="true" style={{ color, fontSize:10, minWidth:10 }}>{expanded?"▼":"▶"}</span>
          {label}
        </button>
        <Tag color={color}>{pct}%</Tag>
      </div>
      <div role="meter" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${label}: ${pct} percent`}
        style={{ background:T.bgSub, borderRadius:4, height:6 }}>
        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:4 }} />
      </div>
      {!expanded && <div style={{ fontSize:11, color:T.textMut, marginTop:3 }}>{note}</div>}
      {expanded && (
        <div id={panelId} role="region" aria-label={`Details for ${label}`}
          style={{ marginTop:8, background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:8, padding:"10px 12px", fontSize:12, color:T.textSub, lineHeight:1.6 }}>
          {detail||note}
        </div>
      )}
    </div>
  );
}

/* TabBar: accessible horizontal tab strip.
   PSEUDO-CODE: FOR each tab → render role="tab" button with aria-selected.
   508: role="tablist" on wrapper; role="tab" + aria-selected on each button. */
function TabBar({ tabs, active, onSelect, accent }) {
  return (
    <div role="tablist" aria-label="Section navigation" style={{ display:"flex", gap:0, flexWrap:"wrap" }}>
      {tabs.map(t => {
        const on = active===t.id;
        return (
          <button key={t.id} role="tab" aria-selected={on?"true":"false"} onClick={()=>onSelect(t.id)}
            style={{ background:"none", border:"none", borderBottom:on?`3px solid ${accent||T.textMut}`:"3px solid transparent", color:on?(accent||T.textSub):T.textMut, padding:"10px 16px", cursor:"pointer", fontSize:13, fontWeight:on?700:400, fontFamily:"inherit", whiteSpace:"nowrap", transition:"all 0.15s" }}>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

/* ============================================================
   Q1 SECTION COMPONENTS
   Each receives d=DATA.q1 and renders one sub-tab's content.
============================================================ */

/* Q1Overview: headline stats, race/age charts, funnel, care continuum.
   PSEUDO-CODE:
     1. Build aria description strings by mapping data arrays to text
     2. Render 6 StatCards in 3-column grid
     3. Render race + age bar charts side by side
     4. Render funnel bar chart
     5. Render 4 care continuum rung cards
   508: Every chart wrapped in role="img" div with full aria-label. */
function Q1Overview({ d }) {
  const raceDesc = d.treatment_by_race.map(r=>`${r.group}: ${r.rate}%`).join(", ");
  const ageDesc  = d.treatment_by_age.map(a=>`${a.age}: ${a.pct}%`).join(", ");
  const funDesc  = d.funnel.map(f=>`${f.stage}: ${f.value}%`).join(", ");
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
      <section aria-labelledby="q1ov-h">
        <h2 id="q1ov-h" style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 12px" }}>Key Figures</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {d.headline_stats.map((s,i)=><StatCard key={i} {...s}/>)}
        </div>
      </section>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Card>
          <Eyebrow text="Source: SAMHSA NSDUH 2023" color="#065F46"/>
          <h2 style={{ fontSize:16, fontWeight:700, color:T.text, margin:"0 0 14px" }}>Treatment Rate by Race</h2>
          <div role="img" aria-label={`Horizontal bar chart: treatment rates by race. ${raceDesc}`}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={d.treatment_by_race} layout="vertical" barSize={22} margin={{left:10}}>
                <XAxis type="number" tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`} domain={[0,28]}/>
                <YAxis type="category" dataKey="group" tick={{fill:T.textSub,fontSize:12}} width={120}/>
                <Tooltip content={<ChartTip/>}/>
                <Bar dataKey="rate" name="Treatment rate" radius={[0,4,4,0]}>{d.treatment_by_race.map((r,i)=><Cell key={i} fill={r.fill}/>)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <Eyebrow text="Source: SAMHSA NSDUH 2023" color="#065F46"/>
          <h2 style={{ fontSize:16, fontWeight:700, color:T.text, margin:"0 0 14px" }}>Treatment Rate by Age Group</h2>
          <div role="img" aria-label={`Bar chart: treatment rates by age group. ${ageDesc}`}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={d.treatment_by_age} barSize={40}>
                <XAxis dataKey="age" tick={{fill:T.textSub,fontSize:12}}/>
                <YAxis tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<ChartTip/>}/>
                <Bar dataKey="pct" name="Treatment rate" fill="#065F46" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card>
        <Eyebrow text="Source: PLOS One 2025 — 38-study systematic review" color="#5B21B6"/>
        <h2 style={{ fontSize:16, fontWeight:700, color:T.text, margin:"0 0 4px" }}>App Retention Funnel</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 14px" }}>Only 4.7% of users who download a MH app are still active at day 30. This engagement collapse is the sector's defining challenge.</p>
        <div role="img" aria-label={`Bar chart: app retention funnel. ${funDesc}`}>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={d.funnel} barSize={62}>
              <XAxis dataKey="stage" tick={{fill:T.textSub,fontSize:11}}/>
              <YAxis tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`}/>
              <Tooltip content={<ChartTip/>}/>
              <Bar dataKey="value" name="Users remaining" radius={[5,5,0,0]}>{d.funnel.map((f,i)=><Cell key={i} fill={f.fill}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <section aria-labelledby="q1cc-h">
        <h2 id="q1cc-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 6px" }}>Care Continuum: The App as On-Ramp</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 14px" }}>Four rungs from digital self-care to clinical care. Alternative resources expand each rung's population.</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {d.care_continuum.map(r=>(
            <Card key={r.rung} accent={r.color} style={{padding:14}}>
              <div style={{ fontSize:26, fontWeight:700, color:r.color, fontFamily:"monospace", marginBottom:6 }}>{r.rung}</div>
              <h3 style={{ fontSize:13, fontWeight:700, color:T.text, margin:"0 0 5px" }}>{r.label}</h3>
              <p style={{ fontSize:12, color:T.textMut, margin:0, lineHeight:1.5 }}>{r.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* Q1Users: expandable likely/unlikely user group rows.
   PSEUDO-CODE:
     1. useState(null) per column tracks which row is expanded.
     2. FOR each group: render PBar. Pass expanded={state===index}.
     3. onToggle: IF same row → set null (collapse). ELSE → set index (open).
   508: PBar handles all aria-expanded/controls internally. */
function Q1Users({ d }) {
  const [expL, setExpL] = useState(null);
  const [expU, setExpU] = useState(null);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
      <Card>
        <Eyebrow text="Highest adoption potential — click any row to expand" color="#065F46"/>
        <h2 style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 14px" }}>Most Likely Users</h2>
        {d.likely_users.map((u,i)=>(
          <PBar key={i} label={u.group} pct={u.score} color={u.color} note={u.note} detail={u.detail}
            expanded={expL===i} onToggle={()=>setExpL(expL===i?null:i)}/>
        ))}
      </Card>
      <Card>
        <Eyebrow text="Hardest-to-reach — avoidance score — click to expand" color="#991B1B"/>
        <h2 style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 14px" }}>Least Likely Users</h2>
        {d.unlikely_users.map((u,i)=>(
          <PBar key={i} label={u.group} pct={u.score} color={u.color} note={u.note} detail={u.detail}
            expanded={expU===i} onToggle={()=>setExpU(expU===i?null:i)}/>
        ))}
      </Card>
    </div>
  );
}

/* Q1Capabilities: horizontal bar chart + detail tiles for each feature.
   PSEUDO-CODE:
     1. Build aria-label listing all 10 features and scores.
     2. Render horizontal BarChart with per-bar Cell colors.
     3. FOR each capability: render detail tile (score + barrier).
   508: Chart div has role="img" + complete aria-label. */
function Q1Capabilities({ d }) {
  const desc = d.capabilities.map(c=>`${c.cap}: ${c.impact}`).join(", ");
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <Card>
        <Eyebrow text="Source: PLOS One 2025, 38-study systematic review" color="#065F46"/>
        <h2 style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 4px" }}>10 App Features — Evidence Impact Scores (0–100)</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 14px" }}>Crisis tools and 24/7 access score highest because they address structural gaps that therapy cannot fill.</p>
        <div role="img" aria-label={`Horizontal bar chart of feature impact scores. ${desc}`}>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={d.capabilities} layout="vertical" barSize={20} margin={{left:20}}>
              <XAxis type="number" tick={{fill:T.textMut,fontSize:11}} domain={[0,100]}/>
              <YAxis type="category" dataKey="cap" tick={{fill:T.textSub,fontSize:11}} width={195}/>
              <Tooltip content={<ChartTip/>}/>
              <Bar dataKey="impact" name="Impact score" radius={[0,5,5,0]}>{d.capabilities.map((c,i)=><Cell key={i} fill={c.color}/>)}</Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
        {d.capabilities.map((c,i)=>(
          <div key={i} style={{ background:T.bgSub, border:"1px solid "+T.border, borderRadius:10, padding:"12px 14px", display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ fontSize:24, fontWeight:700, color:c.color, fontFamily:"monospace", minWidth:44 }}>{c.impact}</div>
            <div>
              <h3 style={{ fontSize:13, fontWeight:700, color:T.text, margin:"0 0 3px" }}>{c.cap}</h3>
              <p style={{ fontSize:11, color:T.textMut, margin:0 }}>Addresses: {c.barrier}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Q1Bridge: DMV reach grouped bar chart + 8 bridge strategy cards.
   PSEUDO-CODE:
     1. Build aria-label for the grouped bar chart.
     2. Render grouped BarChart with before/after bars per DMV segment.
     3. Render list of 8 strategy tiles — numbered icons are aria-hidden.
   508: Chart div has role="img" + aria-label. */
function Q1Bridge({ d }) {
  const dmvDesc = d.dmv_data.map(r=>`${r.segment}: before ${r.before}K, after ${r.after}K`).join(". ");
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <Card>
        <Eyebrow text="DMV local market estimates (thousands of potential users)" color="#065F46"/>
        <h2 style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 4px" }}>Potential Reach: Clinical Listings Only vs. With Alternative Resources</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 14px" }}>Adding yoga studios, DC DPR programs, faith-based ministries, and community wellness dramatically expands the addressable user base.</p>
        <div role="img" aria-label={`Grouped bar chart comparing reach. ${dmvDesc}`}>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={d.dmv_data} barGap={4} barSize={28}>
              <XAxis dataKey="segment" tick={{fill:T.textSub,fontSize:10}}/>
              <YAxis tick={{fill:T.textMut,fontSize:11}} label={{value:"K users",angle:-90,position:"insideLeft",fill:T.textMut,fontSize:11}}/>
              <Tooltip content={<ChartTip/>}/>
              <Legend wrapperStyle={{fontSize:12,color:T.textSub}}/>
              <Bar dataKey="before" name="Clinical listings only" fill="#94A3B8" radius={[3,3,0,0]}/>
              <Bar dataKey="after"  name="With alt resources"     fill="#065F46" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <section aria-labelledby="q1bridge-h">
        <h2 id="q1bridge-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 14px" }}>8 Bridge Strategies to Grow User Adoption</h2>
        <ul style={{ listStyle:"none", padding:0, margin:0, display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {d.bridge_strategies.map(s=>(
            <li key={s.icon} style={{ background:T.bgCard, border:"1px solid "+T.border, borderRadius:10, padding:"14px 16px", display:"flex", gap:12 }}>
              <div aria-hidden="true" style={{ fontSize:20, fontWeight:700, color:"#065F46", fontFamily:"monospace", minWidth:28 }}>{s.icon}</div>
              <div>
                <h3 style={{ fontSize:13, fontWeight:700, color:T.text, margin:"0 0 5px" }}>{s.title}</h3>
                <p style={{ fontSize:12, color:T.textMut, lineHeight:1.5, margin:"0 0 6px" }}>{s.desc}</p>
                <Tag color="#065F46">{s.src}</Tag>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/* Q1AltResources: 8-category alternative resource taxonomy.
   PSEUDO-CODE: FOR each category → render Card with accent + h3 + examples paragraph.
   508: section has aria-labelledby pointing to the h2. */
function Q1AltResources({ d }) {
  return (
    <section aria-labelledby="q1altres-h">
      <h2 id="q1altres-h" style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 6px" }}>Full Alternative Resource Taxonomy</h2>
      <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>8 non-clinical resource categories an app can surface — expanding reach into groups who would never book a therapist.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:14 }}>
        {d.alt_resource_taxonomy.map((a,i)=>(
          <Card key={i} accent={a.color}>
            <h3 style={{ fontSize:14, fontWeight:700, color:a.color, margin:"0 0 6px" }}>{a.cat}</h3>
            <p style={{ fontSize:12, color:T.textSub, margin:0, lineHeight:1.6 }}>{a.examples}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   Q2 SECTION COMPONENTS
============================================================ */

/* Q2Overview: headline stats, treatment gap funnel, avoidance reasons, app outcomes.
   PSEUDO-CODE:
     1. Map headline_stats → 6 StatCards
     2. Render two horizontal bar charts (funnel + avoidance reasons)
     3. Render 5 app outcome metric tiles
   508: Both charts have role="img" + aria-label listing all values. */
function Q2Overview({ d }) {
  const gapDesc = d.treatment_gap.map(r=>`${r.label}: ${r.value}%`).join(", ");
  const avoDesc = d.avoidance_reasons.map(r=>`${r.reason}: ${r.pct}%`).join(", ");
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
      <section aria-labelledby="q2ov-h">
        <h2 id="q2ov-h" style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 12px" }}>Key Figures</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {d.headline_stats.map((s,i)=><StatCard key={i} {...s}/>)}
        </div>
      </section>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        <Card>
          <Eyebrow text="Sources: SAMHSA NSDUH 2023 + AHRQ MEPS 2023" color="#5B21B6"/>
          <h2 style={{ fontSize:16, fontWeight:700, color:T.text, margin:"0 0 4px" }}>Treatment Gap Funnel</h2>
          <p style={{ fontSize:12, color:T.textMut, margin:"0 0 14px" }}>Percentage of all adults with any MH condition who fall into each treatment category.</p>
          <div role="img" aria-label={`Treatment gap funnel. ${gapDesc}`}>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={d.treatment_gap} layout="vertical" barSize={24} margin={{left:10}}>
                <XAxis type="number" tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`} domain={[0,110]}/>
                <YAxis type="category" dataKey="label" tick={{fill:T.textSub,fontSize:11}} width={155}/>
                <Tooltip content={<ChartTip/>}/>
                <Bar dataKey="value" name="Percent of adults" radius={[0,4,4,0]}>{d.treatment_gap.map((r,i)=><Cell key={i} fill={r.fill}/>)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <Eyebrow text="Sources: KFF 2023, NCS-R PMC, NAMI 2024, HRSA, APA 2022" color="#991B1B"/>
          <h2 style={{ fontSize:16, fontWeight:700, color:T.text, margin:"0 0 4px" }}>Why People Skip Therapy</h2>
          <p style={{ fontSize:12, color:T.textMut, margin:"0 0 14px" }}>Most people cite 2–3 reasons simultaneously. Cost (80%) and self-reliance (72.6%) top the list.</p>
          <div role="img" aria-label={`Avoidance reasons. ${avoDesc}`}>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={d.avoidance_reasons} layout="vertical" barSize={18} margin={{left:10}}>
                <XAxis type="number" tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`} domain={[0,100]}/>
                <YAxis type="category" dataKey="reason" tick={{fill:T.textSub,fontSize:10}} width={190}/>
                <Tooltip content={<ChartTip/>}/>
                <Bar dataKey="pct" name="% citing reason" radius={[0,4,4,0]}>{d.avoidance_reasons.map((r,i)=><Cell key={i} fill={r.fill}/>)}</Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <section aria-labelledby="q2out-h">
        <h2 id="q2out-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 12px" }}>App Outcomes — What the Research Shows</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12 }}>
          {d.app_outcomes.map((o,i)=>(
            <article key={i} aria-label={`${o.metric}: ${o.value} percent. ${o.note}`}
              style={{ background:T.bgSub, border:"1px solid "+T.border, borderRadius:10, padding:14, textAlign:"center", borderTop:"4px solid "+o.fill }}>
              <div style={{ fontSize:28, fontWeight:700, color:o.fill, fontFamily:"monospace" }}>{o.value}%</div>
              <h3 style={{ fontSize:12, fontWeight:700, color:T.text, margin:"6px 0 5px", lineHeight:1.3 }}>{o.metric}</h3>
              <p style={{ fontSize:10, color:T.textMut, margin:0, lineHeight:1.4 }}>{o.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* Q2Demographics: avoidance by sex, race, and age group.
   PSEUDO-CODE:
     1. Build aria description strings for all 3 charts.
     2. Render sex chart + race chart side by side.
     3. Render full-width age chart + per-age notes grid.
     4. Render 8-tile top-alternative-per-demographic section.
   508: All 3 charts have role="img" + full aria-label. */
function Q2Demographics({ d }) {
  const sexDesc = d.by_sex.map(r=>`${r.group}: avoid ${r.avoid}%, seek ${r.seek}%`).join(". ");
  const ageDesc = d.by_age.map(r=>`${r.age}: avoid ${r.avoid}%, seek ${r.seek}%, app ${r.appUse}%`).join(". ");
  const racDesc = d.by_race.map(r=>`${r.race}: treatment ${r.treatmentRate}%, avoidance ${r.avoidance}%, stigma ${r.stigmaScore}`).join(". ");
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:20 }}>
        <Card>
          <Eyebrow text="Source: SAMHSA NSDUH 2023" color="#5B21B6"/>
          <h2 style={{ fontSize:15, fontWeight:700, color:T.text, margin:"0 0 14px" }}>Avoidance vs. Help-Seeking by Sex</h2>
          <div role="img" aria-label={`Grouped bar chart by sex. ${sexDesc}`}>
            <ResponsiveContainer width="100%" height={155}>
              <BarChart data={d.by_sex} barSize={44} barGap={6}>
                <XAxis dataKey="group" tick={{fill:T.textSub,fontSize:13}}/>
                <YAxis tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<ChartTip/>}/>
                <Legend wrapperStyle={{fontSize:11,color:T.textSub}}/>
                <Bar dataKey="avoid" name="Avoids therapy" fill="#991B1B" radius={[4,4,0,0]}/>
                <Bar dataKey="seek"  name="Seeks help"     fill="#5B21B6" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <ul style={{ listStyle:"none", padding:0, margin:"10px 0 0" }}>
            {d.by_sex.map((s,i)=>(
              <li key={i} style={{ fontSize:11, color:T.textMut, padding:"4px 0", borderTop:"1px solid "+T.border }}>
                <strong style={{color:T.textSub}}>{s.group}:</strong> {s.note}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <Eyebrow text="Sources: SAMHSA NSDUH 2023 + NAMI 2024" color="#5B21B6"/>
          <h2 style={{ fontSize:15, fontWeight:700, color:T.text, margin:"0 0 14px" }}>Race: Treatment Rate / Avoidance / Stigma Barrier</h2>
          <div role="img" aria-label={`Grouped bar chart by race. ${racDesc}`}>
            <ResponsiveContainer width="100%" height={205}>
              <BarChart data={d.by_race} barSize={16} barGap={2}>
                <XAxis dataKey="race" tick={{fill:T.textSub,fontSize:11}}/>
                <YAxis tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`}/>
                <Tooltip content={<ChartTip/>}/>
                <Legend wrapperStyle={{fontSize:10,color:T.textSub}}/>
                <Bar dataKey="treatmentRate" name="Treatment rate"  fill="#065F46" radius={[2,2,0,0]}/>
                <Bar dataKey="avoidance"     name="Avoidance %"     fill="#991B1B" radius={[2,2,0,0]}/>
                <Bar dataKey="stigmaScore"   name="Stigma barrier"  fill="#92400E" radius={[2,2,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card>
        <Eyebrow text="Sources: SAMHSA NSDUH 2023 + data.ai 2024" color="#5B21B6"/>
        <h2 style={{ fontSize:15, fontWeight:700, color:T.text, margin:"0 0 4px" }}>Age: Avoidance / Help-Seeking / App Use</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 14px" }}>Avoidance rises sharply with age. App use collapses from 38% (18–25) to just 5% (65+).</p>
        <div role="img" aria-label={`Grouped bar chart by age group. ${ageDesc}`}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={d.by_age} barSize={24} barGap={3}>
              <XAxis dataKey="age" tick={{fill:T.textSub,fontSize:12}}/>
              <YAxis tick={{fill:T.textMut,fontSize:11}} tickFormatter={v=>`${v}%`}/>
              <Tooltip content={<ChartTip/>}/>
              <Legend wrapperStyle={{fontSize:11,color:T.textSub}}/>
              <Bar dataKey="avoid"  name="Avoidance %" fill="#991B1B" radius={[3,3,0,0]}/>
              <Bar dataKey="seek"   name="Seek help %"  fill="#5B21B6" radius={[3,3,0,0]}/>
              <Bar dataKey="appUse" name="App use %"    fill="#065F46" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginTop:12 }}>
          {d.by_age.map(a=>(
            <div key={a.age} style={{ fontSize:10, color:T.textMut, background:T.bgSub, borderRadius:6, padding:"6px 8px", lineHeight:1.4 }}>
              <strong style={{color:T.textSub}}>{a.age}:</strong> {a.note}
            </div>
          ))}
        </div>
      </Card>
      <section aria-labelledby="q2ademo-h">
        <h2 id="q2ademo-h" style={{ fontSize:16, fontWeight:700, color:T.text, margin:"0 0 12px" }}>Top Alternative by Demographic Group</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {d.alt_by_demo.map((a,i)=>(
            <article key={i} aria-label={`${a.group}: top alternative is ${a.topAlt} at ${a.pct} percent`}
              style={{ background:T.bgSub, border:"1px solid "+T.border, borderRadius:10, padding:"12px 14px" }}>
              <div style={{ fontSize:11, fontWeight:700, color:T.textMut, marginBottom:4 }}>{a.group}</div>
              <div style={{ fontSize:14, fontWeight:700, color:"#5B21B6", marginBottom:2 }}>{a.topAlt}</div>
              <div style={{ fontSize:28, fontWeight:700, color:T.text, fontFamily:"monospace" }}>{a.pct}%</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* Q2Alternatives: 8 therapy alternatives with percentage bars and detail.
   PSEUDO-CODE:
     FOR each alternative → render: label row, role="meter" bar, detail + source tag.
   508: Every bar uses role="meter" + aria-valuenow/min/max. */
function Q2Alternatives({ d }) {
  return (
    <Card>
      <Eyebrow text="Sources: AHRQ FASTER, CDC BRFSS, SAMHSA NSDUH, data.ai, Gallup, NAMI" color="#5B21B6"/>
      <h2 style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 4px" }}>What People Do Instead of Therapy</h2>
      <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>More than half of U.S. adults with MH conditions manage without professional support. Each category is a potential entry point for app features or partnerships.</p>
      <ul style={{ listStyle:"none", padding:0, margin:0 }}>
        {d.alternatives.map((a,i)=>(
          <li key={i} style={{ marginBottom:18, paddingBottom:18, borderBottom:i<d.alternatives.length-1?"1px solid "+T.border:"none" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:6 }}>
              <span style={{ fontSize:14, fontWeight:600, color:T.text }}>{a.alt}</span>
              <Tag color="#5B21B6">{a.pct}%</Tag>
            </div>
            <div role="meter" aria-valuenow={a.pct} aria-valuemin={0} aria-valuemax={100}
              aria-label={`${a.alt}: ${a.pct} percent`}
              style={{ background:T.bgSub, borderRadius:4, height:6, marginBottom:8 }}>
              <div style={{ width:`${a.pct}%`, height:"100%", background:"#5B21B6", borderRadius:4 }}/>
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", gap:8, flexWrap:"wrap" }}>
              <span style={{ fontSize:12, color:T.textMut }}>{a.detail}</span>
              <Tag color="#334155">{a.src}</Tag>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* Q2Search: 11 search triggers with urgency scores, timing, and context notes.
   PSEUDO-CODE:
     urgColor(u): number → hex color (high=red, med=amber, lo=blue)
     urgLabel(u): number → text label (for aria-label, not color-only)
     FOR each trigger → render list item card with urgency + timing + note.
   508: urgency shown as number + text label, not color alone.
        Each li has full aria-label combining trigger + timing + urgency text. */
function Q2Search({ d }) {
  function urgColor(u) { return u>=85?"#991B1B":u>=70?"#92400E":u>=55?"#5B21B6":"#1E40AF"; }
  function urgLabel(u) { return u>=85?"very high":u>=70?"high":u>=55?"medium":"lower"; }
  return (
    <Card>
      <Eyebrow text="Sources: APA 2022, AHRQ FASTER, data.ai, Northwestern Schleider study" color="#5B21B6"/>
      <h2 style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 4px" }}>When Do People Search Online for Help?</h2>
      <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>11 search triggers with urgency scores (0–100) reflecting conversion likelihood. 85+ = Very High, 70–84 = High, 55–69 = Medium, under 55 = Lower.</p>
      <ul style={{ listStyle:"none", padding:0, margin:0, display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
        {d.search_triggers.map((t,i)=>(
          <li key={i} aria-label={`${t.trigger}. Timing: ${t.timing}. Urgency: ${urgLabel(t.urgency)} at ${t.urgency} out of 100.`}
            style={{ background:T.bgSub, border:"1px solid "+T.border, borderRadius:10, padding:"14px 16px", borderLeft:"4px solid "+urgColor(t.urgency) }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
              <span style={{ fontSize:13, fontWeight:700, color:T.text, lineHeight:1.3, flex:1, paddingRight:10 }}>{t.trigger}</span>
              <span aria-hidden="true" style={{ fontSize:22, fontWeight:700, color:urgColor(t.urgency), fontFamily:"monospace", minWidth:34, textAlign:"right" }}>{t.urgency}</span>
            </div>
            <Tag color={urgColor(t.urgency)}>{t.timing}</Tag>
            <p style={{ fontSize:11, color:T.textMut, marginTop:8, marginBottom:0, lineHeight:1.5 }}>{t.note}</p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ============================================================
   DATASETS VIEW
   PSEUDO-CODE:
     1. useState("gov") controls which inner tab is active.
     2. SWITCH on active tab: render the matching data table.
     3. Every table: th scope="col" on every header (required for 508).
     4. URLs wrapped in ExtLink (announces new-tab to screen reader).
     5. Category labels use Tag (text + color, not color alone).
============================================================ */
function DatasetsView({ d }) {
  const [tab, setTab] = useState("gov");
  const innerTabs = [
    {id:"gov",  label:"Government (10)",   accent:"#065F46"},
    {id:"aca",  label:"Academic (8)",       accent:"#1E40AF"},
    {id:"inst", label:"Institutional (10)", accent:"#5B21B6"},
    {id:"ext",  label:"Additional (7)",     accent:"#92400E"},
    {id:"stats",label:"Master Stats (20)",  accent:"#991B1B"},
  ];
  const activeAccent = (innerTabs.find(t=>t.id===tab)||{}).accent||T.textMut;
  const thS = { padding:"8px 12px", textAlign:"left", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:T.textMut, borderBottom:"2px solid "+T.border, background:T.bgSub, whiteSpace:"nowrap" };
  const tds = (mono) => ({ padding:"8px 12px", fontSize:12, color:T.textSub, borderBottom:"1px solid "+T.border, fontFamily:mono?"monospace":undefined, verticalAlign:"top" });
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ borderBottom:"1px solid "+T.border }}>
        <TabBar tabs={innerTabs} active={tab} onSelect={setTab} accent={activeAccent}/>
      </div>
      {tab==="gov"&&(
        <section aria-labelledby="dsgov-h">
          <h2 id="dsgov-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 12px" }}>10 Government Open Datasets</h2>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",background:T.bg}}>
            <thead><tr><th scope="col" style={thS}>ID</th><th scope="col" style={thS}>Dataset</th><th scope="col" style={thS}>Organization</th><th scope="col" style={thS}>Formats</th><th scope="col" style={thS}>Access</th><th scope="col" style={thS}>Notes</th></tr></thead>
            <tbody>{d.government.map(r=>(
              <tr key={r.id}><td style={tds(true)}>{r.id}</td><td style={tds(false)}><ExtLink href={r.url}>{r.name}</ExtLink></td><td style={tds(false)}>{r.org}</td><td style={tds(true)}>{r.formats}</td><td style={tds(false)}><Tag color="#065F46">{r.access}</Tag></td><td style={tds(false)}>{r.notes}</td></tr>
            ))}</tbody>
          </table></div>
        </section>
      )}
      {tab==="aca"&&(
        <section aria-labelledby="dsaca-h">
          <h2 id="dsaca-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 12px" }}>8 Peer-Reviewed Studies</h2>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",background:T.bg}}>
            <thead><tr><th scope="col" style={thS}>ID</th><th scope="col" style={thS}>Study Name</th><th scope="col" style={thS}>DOI</th><th scope="col" style={thS}>Sample Size</th><th scope="col" style={thS}>Key Statistic</th></tr></thead>
            <tbody>{d.academic.map(r=>(
              <tr key={r.id}><td style={tds(true)}>{r.id}</td><td style={tds(false)}><ExtLink href={r.pmc}>{r.name}</ExtLink></td><td style={tds(true)}>{r.doi}</td><td style={tds(false)}>{r.n}</td><td style={tds(false)}>{r.stat}</td></tr>
            ))}</tbody>
          </table></div>
        </section>
      )}
      {tab==="inst"&&(
        <section aria-labelledby="dsinst-h">
          <h2 id="dsinst-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 12px" }}>10 Institutional Reports</h2>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",background:T.bg}}>
            <thead><tr><th scope="col" style={thS}>ID</th><th scope="col" style={thS}>Report</th><th scope="col" style={thS}>Organization</th><th scope="col" style={thS}>Key Statistic / Finding</th></tr></thead>
            <tbody>{d.institutional.map(r=>(
              <tr key={r.id}><td style={tds(true)}>{r.id}</td><td style={tds(false)}><ExtLink href={r.url}>{r.name}</ExtLink></td><td style={tds(false)}>{r.org}</td><td style={tds(false)}>{r.key_stat}</td></tr>
            ))}</tbody>
          </table></div>
        </section>
      )}
      {tab==="ext"&&(
        <section aria-labelledby="dsext-h">
          <h2 id="dsext-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 12px" }}>7 Additional Open Data Sources</h2>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",background:T.bg}}>
            <thead><tr><th scope="col" style={thS}>ID</th><th scope="col" style={thS}>Dataset</th><th scope="col" style={thS}>Access</th><th scope="col" style={thS}>Notes</th></tr></thead>
            <tbody>{d.additional.map(r=>(
              <tr key={r.id}><td style={tds(true)}>{r.id}</td><td style={tds(false)}><ExtLink href={r.url}>{r.name}</ExtLink></td><td style={tds(false)}><Tag color="#92400E">{r.access}</Tag></td><td style={tds(false)}>{r.notes}</td></tr>
            ))}</tbody>
          </table></div>
        </section>
      )}
      {tab==="stats"&&(
        <section aria-labelledby="dsstats-h">
          <h2 id="dsstats-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 12px" }}>Master Statistics Reference (20 Key Stats)</h2>
          <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",background:T.bg}}>
            <thead><tr><th scope="col" style={thS}>Category</th><th scope="col" style={thS}>Statistic</th><th scope="col" style={thS}>Value</th><th scope="col" style={thS}>Year</th><th scope="col" style={thS}>Source</th></tr></thead>
            <tbody>{d.key_stats.map((r,i)=>(
              <tr key={i}><td style={tds(false)}><Tag color={CAT_COLORS[r.cat]||T.textMut}>{r.cat}</Tag></td><td style={tds(false)}>{r.stat}</td><td style={{...tds(true),fontSize:16,fontWeight:700,color:T.text}}>{r.value}</td><td style={tds(true)}>{r.year}</td><td style={tds(false)}><ExtLink href={r.url}>{r.src}</ExtLink></td></tr>
            ))}</tbody>
          </table></div>
        </section>
      )}
    </div>
  );
}

/* ============================================================
   APP — ROOT COMPONENT
   PSEUDO-CODE:
     1. useState("q1"): tracks which top-level view is visible.
     2. useState("overview"): tracks which sub-tab is active.
     3. switchView(v): sets view AND resets subTab to "overview".
     4. viewConfig: defines all 3 views with accent colors and sub-tabs.
     5. Render: [skip link] [header] [main] [floating nav]
   508:
     - Single h1 (changes text per view but is always the only h1)
     - Skip nav link is off-screen until focused
     - role="banner" on header, role="main" on main, role="navigation" on navs
     - All interactive elements get focus-visible from global CSS
============================================================ */
/* ============================================================
   DMV SECTION COMPONENTS
   All receive d = DMV and render one sub-tab's content.
============================================================ */

/* DMVOverview: headline stats + regional stats cards for DC/MD/VA.
   PSEUDO-CODE:
     1. Render 6 headline StatCards in a 3-column grid
     2. FOR each region (DC, Maryland, Virginia):
          Render a Card with regional stats list + context paragraph
   508: Stats list uses <ul> with <li>; context uses <p>. */
function DMVOverview({ d }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
      <section aria-labelledby="dmvov-h">
        <h2 id="dmvov-h" style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 12px" }}>DMV Regional Key Figures</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {d.headline_stats.map((s,i) => <StatCard key={i} {...s} />)}
        </div>
      </section>

      <section aria-labelledby="dmv-regions-h">
        <h2 id="dmv-regions-h" style={{ fontSize:17, fontWeight:700, color:T.text, margin:"0 0 14px" }}>Regional Breakdown — DC, Maryland, Virginia</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
          {d.regional_stats.map(r => (
            <Card key={r.region} accent={r.color}>
              <h3 style={{ fontSize:16, fontWeight:700, color:r.color, margin:"0 0 12px" }}>{r.region}</h3>
              <ul style={{ listStyle:"none", padding:0, margin:"0 0 12px" }}>
                {r.stats.map((s,i) => (
                  <li key={i} style={{ display:"flex", justifyContent:"space-between", padding:"5px 0", borderBottom:"1px solid "+T.border, gap:8 }}>
                    <span style={{ fontSize:11, color:T.textMut, flex:1 }}>{s.label}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:T.text, fontFamily:"monospace", whiteSpace:"nowrap" }}>{s.value}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize:11, color:T.textMut, margin:0, lineHeight:1.5 }}>{r.context}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* DMVUnderserved: deep-dive cards for the 4 most underserved DMV areas.
   PSEUDO-CODE:
     FOR each underserved area:
       Render a Card with population stats, challenge description,
       key resources list, and app opportunity note.
   508: Cards use article + aria-label; lists use ul/li. */
function DMVUnderserved({ d }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <section aria-labelledby="dmv-under-h">
        <h2 id="dmv-under-h" style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 6px" }}>Underserved Area Spotlights</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>
          Four areas in the DMV with the highest gap between need and available resources — and the highest app opportunity.
        </p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:18 }}>
          {d.underserved_spotlight.map((a,i) => (
            <article key={i} aria-label={a.area + ": " + a.population}
              style={{ background:T.bgCard, border:"1px solid "+T.border, borderRadius:12, padding:20, borderLeft:"4px solid "+a.color }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8, flexWrap:"wrap", gap:6 }}>
                <h3 style={{ fontSize:15, fontWeight:700, color:a.color, margin:0 }}>{a.area}</h3>
                <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                  <Tag color={a.color}>{a.population}</Tag>
                  <Tag color="#334155">{a.pctBlack} Black</Tag>
                </div>
              </div>

              <p style={{ fontSize:12, color:T.textSub, lineHeight:1.6, margin:"0 0 12px" }}>{a.challenge}</p>

              <div style={{ marginBottom:12 }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.textMut, margin:"0 0 6px" }}>Key Resources</p>
                <ul style={{ listStyle:"none", padding:0, margin:0 }}>
                  {a.keyResources.map((r,j) => (
                    <li key={j} style={{ fontSize:11, color:T.textSub, padding:"3px 0", paddingLeft:12, position:"relative" }}>
                      <span aria-hidden="true" style={{ position:"absolute", left:0, color:a.color }}>›</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background:T.bgSub, borderRadius:8, padding:"8px 12px" }}>
                <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:a.color, margin:"0 0 4px" }}>App Opportunity</p>
                <p style={{ fontSize:11, color:T.textMut, margin:0, lineHeight:1.5 }}>{a.appOpportunity}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ResourceTable: reusable component for rendering a resource category section.
   PSEUDO-CODE:
     FOR each category in categories array:
       Render category heading + accent bar
       FOR each resource item:
         Render a row with: name, type, cost badge, phone, notes
         IF url exists: wrap name in ExtLink
   508: th scope="col" on all headers; cost uses Tag (text not color only). */
function ResourceTable({ categories, accentColor }) {
  const thS = { padding:"8px 12px", textAlign:"left", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:T.textMut, borderBottom:"2px solid "+T.border, background:T.bgSub, whiteSpace:"nowrap" };
  const tds = { padding:"8px 12px", fontSize:12, color:T.textSub, borderBottom:"1px solid "+T.border, verticalAlign:"top" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
      {categories.map(cat => (
        <section key={cat.category} aria-labelledby={"cat-"+cat.category.replace(/[^a-z0-9]/gi,"-")}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
            <div style={{ width:4, height:22, background:cat.color, borderRadius:2, flexShrink:0 }} aria-hidden="true" />
            <h3 id={"cat-"+cat.category.replace(/[^a-z0-9]/gi,"-")}
              style={{ fontSize:15, fontWeight:700, color:T.text, margin:0 }}>{cat.category}</h3>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", background:T.bg }}>
              <thead>
                <tr>
                  <th scope="col" style={thS}>Resource</th>
                  <th scope="col" style={thS}>Type</th>
                  <th scope="col" style={thS}>Cost</th>
                  <th scope="col" style={thS}>Phone / Contact</th>
                  <th scope="col" style={thS}>Notes</th>
                </tr>
              </thead>
              <tbody>
                {cat.items.map((item, i) => (
                  <tr key={i}>
                    <td style={{ ...tds, fontWeight:600 }}>
                      {item.url ? <ExtLink href={item.url}>{item.name}</ExtLink> : item.name}
                    </td>
                    <td style={tds}>{item.type}</td>
                    <td style={tds}>
                      <Tag color={item.cost==="Free"?"#065F46":item.cost.includes("sliding")?"#1E40AF":"#92400E"}>
                        {item.cost}
                      </Tag>
                    </td>
                    <td style={{ ...tds, fontFamily:"monospace", whiteSpace:"nowrap" }}>{item.phone || "—"}</td>
                    <td style={tds}>{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}
    </div>
  );
}

/* DMVResourcesDC: Washington DC resources across all 5 categories.
   PSEUDO-CODE: Pass d.resources_dc to ResourceTable component.
   508: Each category section has aria-labelledby. */
function DMVResourcesDC({ d }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div>
        <Eyebrow text="Washington DC — All 8 Wards" color="#1E40AF" />
        <h2 style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 4px" }}>DC Mental Health Resources</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>
          Crisis lines, community mental health centers, DC DPR free wellness programming, peer support groups, and faith-based resources.
          Ward 7 and Ward 8 resources are highlighted — the most underserved areas east of the Anacostia.
        </p>
      </div>
      <ResourceTable categories={d.resources_dc} accentColor="#1E40AF" />
    </div>
  );
}

/* DMVResourcesMD: Maryland resources across all categories.
   PSEUDO-CODE: Pass d.resources_md to ResourceTable component.
   508: h2 heading with id for landmark navigation. */
function DMVResourcesMD({ d }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div>
        <Eyebrow text="Maryland — PG County, Montgomery County, Statewide" color="#991B1B" />
        <h2 style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 4px" }}>Maryland Mental Health Resources</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>
          Crisis lines, community mental health centers, peer support groups, and regional data sources.
          Prince George's County is highlighted as the most underserved large county in the DMV.
        </p>
      </div>
      <ResourceTable categories={d.resources_md} accentColor="#991B1B" />
    </div>
  );
}

/* DMVResourcesVA: Virginia resources across all categories.
   PSEUDO-CODE: Pass d.resources_va to ResourceTable component.
   508: h2 heading; ResourceTable handles th scope on all columns. */
function DMVResourcesVA({ d }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div>
        <Eyebrow text="Virginia — Northern VA, Statewide, Rural Southwest" color="#065F46" />
        <h2 style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 4px" }}>Virginia Mental Health Resources</h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>
          Crisis lines including REACH VA, Community Services Boards, peer support, and regional data sources.
          91% of Virginia localities are designated MH shortage areas — the most acute provider desert in the region.
        </p>
      </div>
      <ResourceTable categories={d.resources_va} accentColor="#065F46" />
    </div>
  );
}

/* DMVDatasets: table of all 12 regional DMV data sources.
   PSEUDO-CODE:
     Render a table with scope, org, key stat, and linked name for all R01-R12.
     Scope uses Tag with color per jurisdiction (DC/MD/VA/regional).
   508: th scope="col" on every header; ExtLinks announce new-tab. */
function DMVDatasets({ d }) {
  function scopeColor(s) {
    if (s==="DC") return "#1E40AF";
    if (s==="Maryland") return "#991B1B";
    if (s==="Virginia") return "#065F46";
    return "#5B21B6";
  }
  const thS = { padding:"8px 12px", textAlign:"left", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", color:T.textMut, borderBottom:"2px solid "+T.border, background:T.bgSub, whiteSpace:"nowrap" };
  const tds = { padding:"8px 12px", fontSize:12, color:T.textSub, borderBottom:"1px solid "+T.border, verticalAlign:"top" };
  return (
    <section aria-labelledby="dmv-ds-h">
      <Eyebrow text="12 regional data sources covering DC, Maryland, and Virginia" color="#5B21B6" />
      <h2 id="dmv-ds-h" style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 14px" }}>DMV Regional Data Sources</h2>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", background:T.bg }}>
          <thead>
            <tr>
              <th scope="col" style={thS}>ID</th>
              <th scope="col" style={thS}>Scope</th>
              <th scope="col" style={thS}>Dataset / Report</th>
              <th scope="col" style={thS}>Organization</th>
              <th scope="col" style={thS}>Key Metric / Finding</th>
            </tr>
          </thead>
          <tbody>
            {d.regional_datasets.map(r => (
              <tr key={r.id}>
                <td style={{ ...tds, fontFamily:"monospace" }}>{r.id}</td>
                <td style={tds}><Tag color={scopeColor(r.scope)}>{r.scope}</Tag></td>
                <td style={tds}><ExtLink href={r.url}>{r.name}</ExtLink></td>
                <td style={tds}>{r.org}</td>
                <td style={tds}>{r.key_stat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ============================================================
   APP — ROOT COMPONENT
   PSEUDO-CODE:
     1. useState("q1"): tracks which top-level view is visible.
     2. useState("overview"): tracks which sub-tab is active.
     3. switchView(v): sets view AND resets subTab to "overview".
     4. viewConfig: defines all 4 views (q1, q2, dmv, datasets)
        with accent colors and sub-tab definitions.
     5. Render: [skip link] [header] [main] [floating nav]
   508:
     - Single h1 (text changes per view; always only one h1 on page)
     - Skip nav link off-screen until focused
     - role="banner" on header, role="main" on main, role="navigation" on navs
     - All interactive elements get focus-visible outline from global CSS
============================================================ */
/* ============================================================
   WARD SECTION COMPONENTS
   All receive wards = WARDS array and render DC ward-level data.
============================================================ */

/* severityColor: maps ward severity level to a color token.
   PSEUDO-CODE: IF critical → red. IF high → orange-red. IF moderate-high → amber.
                IF moderate → blue. IF low → green.
   Used for left border accents and label tags — always paired with text label. */
function severityColor(s) {
  if (s === "critical")       return "#991B1B";
  if (s === "high")           return "#B91C1C";
  if (s === "moderate-high")  return "#92400E";
  if (s === "moderate")       return "#1E40AF";
  return "#065F46";
}

/* severityLabel: human-readable label for screen readers and tags.
   PSEUDO-CODE: Map severity string to display label. */
function severityLabel(s) {
  if (s === "critical")       return "Critical need";
  if (s === "high")           return "High need";
  if (s === "moderate-high")  return "Moderate–High";
  if (s === "moderate")       return "Moderate";
  return "Lower need";
}

/* ─── depression bar chart data sorted worst → best ─── */
var depressionChartData = WARDS
  .map(w => ({ ward: w.name, rate: w.depressionRate, fill: severityColor(w.severity) }))
  .sort((a, b) => b.rate - a.rate);

/* ─── poverty bar chart data sorted worst → best ─── */
var povertyChartData = WARDS
  .map(w => ({ ward: w.name, pov: parseFloat(w.povertyRate), fill: severityColor(w.severity) }))
  .sort((a, b) => b.pov - a.pov);

/* ─── uninsured bar chart data ─── */
var uninsuredChartData = WARDS
  .map(w => ({ ward: w.name, rate: parseFloat(w.uninsuredRate), fill: severityColor(w.severity) }))
  .sort((a, b) => b.rate - a.rate);

/*
 * WardOverview — comparative bar charts across all 8 wards.
 * PSEUDO-CODE:
 *   1. Build chart data arrays (depression, poverty, uninsured) sorted descending.
 *   2. Render three side-by-side bar charts.
 *   3. Render summary comparison table for all 8 wards.
 * 508: Each chart has role="img" + aria-label listing all values.
 *      Table has th scope="col" on all headers.
 */
function WardOverview({ wards }) {
  const depDesc  = depressionChartData.map(r => `${r.ward}: ${r.rate}%`).join(", ");
  const povDesc  = povertyChartData.map(r => `${r.ward}: ${r.pov}%`).join(", ");
  const insDesc  = uninsuredChartData.map(r => `${r.ward}: ${r.rate}%`).join(", ");
  const thS = { padding:"8px 12px", textAlign:"left", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:T.textMut, borderBottom:"2px solid "+T.border, background:T.bgSub, whiteSpace:"nowrap" };
  const tds = { padding:"8px 12px", fontSize:12, color:T.textSub, borderBottom:"1px solid "+T.border, verticalAlign:"middle" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>

      <section aria-labelledby="ward-ov-h">
        <h2 id="ward-ov-h" style={{ fontSize:18, fontWeight:700, color:T.text, margin:"0 0 6px" }}>
          All 8 Wards — Comparative Mental Health Data
        </h2>
        <p style={{ fontSize:13, color:T.textMut, margin:"0 0 20px" }}>
          Ward 8 has a 63% higher depression rate than Ward 3, yet the fewest providers per capita and the highest poverty rate.
          The Anacostia River is a literal dividing line between the city's best-served and worst-served mental health communities.
          Sources: DC BRFSS / DC DOH, DC KIDS COUNT, DC Fiscal Policy Institute, OurHealthyDC.org.
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:18 }}>
          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#991B1B", margin:"0 0 8px" }}>Depression Diagnosis Rate by Ward</p>
            <div role="img" aria-label={`Bar chart: depression rate by ward, sorted high to low. ${depDesc}`}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={depressionChartData} layout="vertical" barSize={18} margin={{left:10,right:30}}>
                  <XAxis type="number" tick={{fill:T.textMut,fontSize:10}} tickFormatter={v=>`${v}%`} domain={[0,30]}/>
                  <YAxis type="category" dataKey="ward" tick={{fill:T.textSub,fontSize:12}} width={58}/>
                  <Tooltip content={<ChartTip/>}/>
                  <Bar dataKey="rate" name="Depression rate" radius={[0,4,4,0]}>{depressionChartData.map((r,i)=><Cell key={i} fill={r.fill}/>)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#92400E", margin:"0 0 8px" }}>Poverty Rate by Ward</p>
            <div role="img" aria-label={`Bar chart: poverty rate by ward. ${povDesc}`}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={povertyChartData} layout="vertical" barSize={18} margin={{left:10,right:30}}>
                  <XAxis type="number" tick={{fill:T.textMut,fontSize:10}} tickFormatter={v=>`${v}%`} domain={[0,35]}/>
                  <YAxis type="category" dataKey="ward" tick={{fill:T.textSub,fontSize:12}} width={58}/>
                  <Tooltip content={<ChartTip/>}/>
                  <Bar dataKey="pov" name="Poverty rate" radius={[0,4,4,0]}>{povertyChartData.map((r,i)=><Cell key={i} fill={r.fill}/>)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#5B21B6", margin:"0 0 8px" }}>Uninsured Rate by Ward</p>
            <div role="img" aria-label={`Bar chart: uninsured rate by ward. ${insDesc}`}>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={uninsuredChartData} layout="vertical" barSize={18} margin={{left:10,right:30}}>
                  <XAxis type="number" tick={{fill:T.textMut,fontSize:10}} tickFormatter={v=>`${v}%`} domain={[0,22]}/>
                  <YAxis type="category" dataKey="ward" tick={{fill:T.textSub,fontSize:12}} width={58}/>
                  <Tooltip content={<ChartTip/>}/>
                  <Bar dataKey="rate" name="Uninsured rate" radius={[0,4,4,0]}>{uninsuredChartData.map((r,i)=><Cell key={i} fill={r.fill}/>)}</Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Full comparison table */}
      <section aria-labelledby="ward-table-h">
        <h2 id="ward-table-h" style={{ fontSize:16, fontWeight:700, color:T.text, margin:"0 0 12px" }}>Ward-by-Ward Summary Table</h2>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", background:T.bg }}>
            <thead>
              <tr>
                <th scope="col" style={thS}>Ward</th>
                <th scope="col" style={thS}>Neighborhoods</th>
                <th scope="col" style={thS}>Population</th>
                <th scope="col" style={thS}>% Black</th>
                <th scope="col" style={thS}>Median Income</th>
                <th scope="col" style={thS}>Poverty</th>
                <th scope="col" style={thS}>Uninsured</th>
                <th scope="col" style={thS}>Depression Rate</th>
                <th scope="col" style={thS}>Shortage Status</th>
                <th scope="col" style={thS}>Need Level</th>
              </tr>
            </thead>
            <tbody>
              {wards.map(w => (
                <tr key={w.number} style={{ background: w.severity==="critical"||w.severity==="high" ? "#FFF5F5" : T.bg }}>
                  <td style={{ ...tds, fontWeight:700 }}>{w.name}</td>
                  <td style={{ ...tds, fontSize:11, maxWidth:200 }}>{w.neighborhoods.split(",").slice(0,3).join(", ")}{w.neighborhoods.split(",").length > 3 ? " + more" : ""}</td>
                  <td style={tds}>{w.population}</td>
                  <td style={tds}>{w.pctBlack}</td>
                  <td style={{ ...tds, fontFamily:"monospace" }}>{w.medianIncome}</td>
                  <td style={{ ...tds, fontWeight:700, color: parseFloat(w.povertyRate)>=20?"#991B1B":parseFloat(w.povertyRate)>=14?"#92400E":T.textSub }}>{w.povertyRate}</td>
                  <td style={{ ...tds, fontWeight:700, color: parseFloat(w.uninsuredRate)>=15?"#991B1B":parseFloat(w.uninsuredRate)>=10?"#92400E":T.textSub }}>{w.uninsuredRate}</td>
                  <td style={{ ...tds, fontWeight:700, color: w.depressionRate>=22?"#991B1B":w.depressionRate>=18?"#92400E":T.textSub }}>{w.depressionRate}%</td>
                  <td style={tds}>{w.shortage}</td>
                  <td style={tds}><Tag color={severityColor(w.severity)}>{severityLabel(w.severity)}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

/*
 * WardDetail — full deep-dive card for a single ward.
 * PSEUDO-CODE:
 *   1. Render ward header with key stats grid.
 *   2. Render context narrative paragraph.
 *   3. Render three resource tables: MH providers, DPR centers, peer/faith.
 *   4. Render app opportunity callout box.
 * 508: Sections have aria-labelledby; resource tables have th scope="col".
 */
function WardDetail({ ward }) {
  const sc = severityColor(ward.severity);
  const thS = { padding:"7px 10px", textAlign:"left", fontSize:10, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", color:T.textMut, borderBottom:"2px solid "+T.border, background:T.bgSub, whiteSpace:"nowrap" };
  const tds = { padding:"7px 10px", fontSize:12, color:T.textSub, borderBottom:"1px solid "+T.border, verticalAlign:"top" };

  function ResourceSection({ title, items, accent }) {
    return (
      <section aria-labelledby={`ward${ward.number}-${title.replace(/\s/g,"-")}`} style={{ marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
          <div style={{ width:4, height:18, background:accent, borderRadius:2 }} aria-hidden="true" />
          <h3 id={`ward${ward.number}-${title.replace(/\s/g,"-")}`} style={{ fontSize:14, fontWeight:700, color:T.text, margin:0 }}>{title}</h3>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", background:T.bg }}>
            <thead><tr>
              <th scope="col" style={thS}>Resource</th>
              <th scope="col" style={thS}>Type</th>
              <th scope="col" style={thS}>Cost</th>
              <th scope="col" style={thS}>Phone</th>
              <th scope="col" style={thS}>Notes</th>
            </tr></thead>
            <tbody>{items.map((item,i) => (
              <tr key={i}><td style={{ ...tds, fontWeight:600 }}>
                {item.url ? <ExtLink href={item.url}>{item.name}</ExtLink> : item.name}
              </td>
              <td style={tds}>{item.type}</td>
              <td style={tds}><Tag color={item.cost==="Free"||item.cost==="FREE"?"#065F46":item.cost.includes("sliding")?"#1E40AF":"#92400E"}>{item.cost}</Tag></td>
              <td style={{ ...tds, fontFamily:"monospace", whiteSpace:"nowrap" }}>{item.phone||"—"}</td>
              <td style={{ ...tds, fontSize:11 }}>{item.notes}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <article aria-label={`${ward.name} detailed mental health profile`}
      style={{ background:T.bgCard, border:"1px solid "+T.border, borderRadius:14, padding:24, borderLeft:"6px solid "+sc }}>

      {/* Ward header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:16, flexWrap:"wrap", gap:12 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
            <h2 style={{ fontSize:20, fontWeight:700, color:sc, margin:0 }}>{ward.name}</h2>
            <Tag color={sc}>{severityLabel(ward.severity)}</Tag>
          </div>
          <p style={{ fontSize:12, color:T.textMut, margin:0 }}>{ward.neighborhoods}</p>
        </div>
      </div>

      {/* Key stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:10, marginBottom:16 }}>
        {[
          { label:"Population",         value:ward.population },
          { label:"Black residents",     value:ward.pctBlack },
          { label:"Median income",       value:ward.medianIncome },
          { label:"Poverty rate",        value:ward.povertyRate },
          { label:"Uninsured",           value:ward.uninsuredRate },
          { label:"Depression rate",     value:ward.depressionRate+"%", highlight: ward.depressionRate >= 22 },
          { label:"Poor MH days/mo",     value:ward.poorMHDays },
          { label:"HRSA shortage",       value:ward.shortage },
          { label:"Provider density",    value:ward.providerDensity.split(" — ")[0] },
          { label:"Hispanic residents",  value:ward.pctHispanic },
        ].map((s,i) => (
          <div key={i} style={{ background:T.bgSub, borderRadius:8, padding:"8px 10px", borderTop: s.highlight ? "3px solid #991B1B" : "3px solid transparent" }}>
            <div style={{ fontSize:11, color:T.textMut, marginBottom:3 }}>{s.label}</div>
            <div style={{ fontSize:14, fontWeight:700, color: s.highlight ? "#991B1B" : T.text, fontFamily:"monospace" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Context */}
      <div style={{ background: sc+"10", border:"1px solid "+sc+"30", borderRadius:8, padding:"12px 14px", marginBottom:20 }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:sc, margin:"0 0 5px" }}>Ward Context</p>
        <p style={{ fontSize:12, color:T.textSub, margin:0, lineHeight:1.7 }}>{ward.context}</p>
      </div>

      {/* Resource tables */}
      <ResourceSection title="Mental Health Providers" items={ward.mh_resources} accent="#1E40AF" />
      <ResourceSection title="DC DPR Free Wellness Centers" items={ward.dpr_centers} accent="#065F46" />
      <ResourceSection title="Peer Support & Faith-Based Resources" items={ward.peer_faith} accent="#5B21B6" />

      {/* App opportunity */}
      <div style={{ background:"#EFF6FF", border:"1px solid #BFDBFE", borderRadius:8, padding:"12px 14px" }}>
        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#1E40AF", margin:"0 0 5px" }}>App Opportunity for This Ward</p>
        <p style={{ fontSize:12, color:T.textSub, margin:0, lineHeight:1.6 }}>{ward.app_opportunity}</p>
      </div>
    </article>
  );
}

/*
 * WardSelector — tabbed ward selector showing one ward at a time.
 * PSEUDO-CODE:
 *   1. useState tracks which ward number is currently selected.
 *   2. Render 8 ward selector buttons in a row.
 *   3. WHEN button clicked: set activeWard to that number.
 *   4. Render WardDetail for the currently selected ward.
 * 508: Buttons use role="tab" + aria-selected; wrapper uses role="tablist".
 */
function WardSelector({ wards }) {
  const [active, setActive] = useState(8); /* Start on Ward 8 — highest need */
  const activeWard = wards.find(w => w.number === active);

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div>
        <p style={{ fontSize:11, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:T.textMut, margin:"0 0 8px" }}>
          Select a Ward — Starting with Ward 8 (Highest Need)
        </p>
        {/* Ward picker */}
        <div role="tablist" aria-label="DC ward selector" style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
          {wards.map(w => {
            const on = active === w.number;
            const sc = severityColor(w.severity);
            return (
              <button key={w.number} role="tab" aria-selected={on?"true":"false"}
                onClick={() => setActive(w.number)}
                style={{ background:on?sc:"transparent", border:"2px solid "+(on?sc:T.border), color:on?"#fff":T.textMut, borderRadius:8, padding:"6px 14px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit", transition:"all 0.15s" }}>
                {w.name}
                {(w.severity==="critical"||w.severity==="high") && (
                  <span aria-hidden="true" style={{ marginLeft:4, fontSize:10 }}>⚠</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
        {[["critical","#991B1B"],["high","#B91C1C"],["moderate-high","#92400E"],["moderate","#1E40AF"],["low","#065F46"]].map(([s,c]) => (
          <div key={s} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <div style={{ width:10, height:10, borderRadius:2, background:c }} aria-hidden="true" />
            <span style={{ fontSize:11, color:T.textMut }}>{severityLabel(s)}</span>
          </div>
        ))}
      </div>

      {/* Active ward detail */}
      {activeWard && <WardDetail ward={activeWard} />}
    </div>
  );
}

export default function App() {
  const [view,   setView]   = useState("q1");
  const [subTab, setSubTab] = useState("overview");

  /* Switch top-level view and reset sub-tab to "overview" */
  function switchView(v) { setView(v); setSubTab("overview"); }

  /* Configuration for all 4 top-level views */
  const viewConfig = [
    { id:"q1",       label:"Query 1: App Demographics",   accent:"#065F46",
      subTabs:[
        {id:"overview",     label:"Overview + Charts"},
        {id:"users",        label:"Likely / Unlikely Users"},
        {id:"capabilities", label:"App Capabilities"},
        {id:"bridge",       label:"Bridge Strategies + DMV"},
        {id:"altres",       label:"Alternative Resources"},
      ]},
    { id:"q2",       label:"Query 2: Therapy Avoidance",  accent:"#5B21B6",
      subTabs:[
        {id:"overview",     label:"Overview + Gap Funnel"},
        {id:"demographics", label:"By Age / Sex / Race"},
        {id:"alternatives", label:"What They Do Instead"},
        {id:"search",       label:"When They Search Online"},
      ]},
    { id:"dmv",      label:"DMV Resources",               accent:"#1E40AF",
      subTabs:[
        {id:"overview",    label:"Regional Overview"},
        {id:"underserved", label:"Underserved Areas"},
        {id:"dc",          label:"Washington DC"}, {id:"wards",        label:"All 8 Wards — Detail"}, {id:"wards-overview", label:"Wards Comparison"},
        {id:"maryland",    label:"Maryland"},
        {id:"virginia",    label:"Virginia"},
        {id:"datasets",    label:"DMV Data Sources"},
      ]},
    { id:"datasets", label:"All Datasets",                accent:"#92400E",
      subTabs:[{id:"overview",label:"Sources and Data"}]},
  ];

  const cfg    = viewConfig.find(v => v.id === view) || viewConfig[0];
  const accent = cfg.accent;
  const titles = {
    q1:       "Mental Health App — Who Would Use It?",
    q2:       "Therapy Avoidance and Alternatives",
    dmv:      "DMV Mental Health Resources — DC, Maryland, Virginia",
    datasets: "All Datasets and Sources",
  };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Segoe UI',Arial,sans-serif" }}>
      <style>{`*,:after,:before{box-sizing:border-box}body{margin:0;background:#fff}*:focus-visible{outline:3px solid #1D4ED8 !important;outline-offset:2px !important}`}</style>

      {/* Skip navigation link — visually hidden until keyboard focus.
          PSEUDO-CODE: onFocus → snap into view. onBlur → hide again.
          508: Allows keyboard users to bypass repeated header navigation. */}
      <a href="#main-content"
        style={{ position:"fixed", left:"-9999px", top:"auto", width:1, height:1, overflow:"hidden", background:"#1D4ED8", color:"#fff", padding:"8px 16px", borderRadius:4, zIndex:9999, textDecoration:"none", fontSize:14, fontWeight:700 }}
        onFocus={e => { e.currentTarget.style.cssText += ";left:16px;top:16px;width:auto;height:auto"; }}
        onBlur={e  => { e.currentTarget.style.cssText += ";left:-9999px;width:1px;height:1px"; }}>
        Skip to main content
      </a>

      {/* Sticky header: site label, single h1, view switcher, sub-tab bar.
          PSEUDO-CODE: Render h1 text from titles lookup. Render 4 view buttons.
                       Render TabBar for active view's sub-tabs.
          508: role="banner"; single h1; buttons use aria-pressed. */}
      <header role="banner" style={{ background:"#fff", borderBottom:"2px solid "+T.border, position:"sticky", top:0, zIndex:100, padding:"16px 40px 0" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:16, flexWrap:"wrap", gap:12 }}>
            <div>
              <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:T.textMut, margin:"0 0 4px" }}>
                Mental Health Research — 2 Queries · DMV Resources · 47+ Data Sources
              </p>
              <h1 style={{ fontSize:22, fontWeight:700, color:T.text, margin:0 }}>{titles[view]}</h1>
            </div>
            <nav role="navigation" aria-label="Main sections">
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {viewConfig.map(v => {
                  const on = view === v.id;
                  return (
                    <button key={v.id} aria-pressed={on?"true":"false"} onClick={() => switchView(v.id)}
                      style={{ background:on?v.accent+"18":"transparent", border:"2px solid "+(on?v.accent:T.border), color:on?v.accent:T.textMut, borderRadius:8, padding:"7px 14px", cursor:"pointer", fontSize:12, fontWeight:700, fontFamily:"inherit", transition:"all 0.15s" }}>
                      {v.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
          <TabBar tabs={cfg.subTabs} active={subTab} onSelect={setSubTab} accent={accent} />
        </div>
      </header>

      {/* Main content area — renders section component matching (view, subTab).
          PSEUDO-CODE: Each line is a boolean check. Only one section renders at a time.
          508: id="main-content" is skip-nav target; role="main" is ARIA landmark. */}
      <main id="main-content" role="main" aria-label={cfg.label}
        style={{ maxWidth:1300, margin:"0 auto", padding:"32px 40px 100px" }}>

        {/* Query 1 sub-sections */}
        {view==="q1" && subTab==="overview"     && <Q1Overview     d={DATA.q1} />}
        {view==="q1" && subTab==="users"        && <Q1Users        d={DATA.q1} />}
        {view==="q1" && subTab==="capabilities" && <Q1Capabilities d={DATA.q1} />}
        {view==="q1" && subTab==="bridge"       && <Q1Bridge       d={DATA.q1} />}
        {view==="q1" && subTab==="altres"       && <Q1AltResources d={DATA.q1} />}

        {/* Query 2 sub-sections */}
        {view==="q2" && subTab==="overview"     && <Q2Overview     d={DATA.q2} />}
        {view==="q2" && subTab==="demographics" && <Q2Demographics d={DATA.q2} />}
        {view==="q2" && subTab==="alternatives" && <Q2Alternatives d={DATA.q2} />}
        {view==="q2" && subTab==="search"       && <Q2Search       d={DATA.q2} />}

        {/* DMV sub-sections */}
        {view==="dmv" && subTab==="overview"    && <DMVOverview    d={DMV} />}
        {view==="dmv" && subTab==="underserved" && <DMVUnderserved d={DMV} />}
        {view==="dmv" && subTab==="dc"          && <DMVResourcesDC d={DMV} />}
        {view==="dmv" && subTab==="maryland"    && <DMVResourcesMD d={DMV} />}
        {view==="dmv" && subTab==="virginia"    && <DMVResourcesVA d={DMV} />}
        {view==="dmv" && subTab==="datasets"       && <DMVDatasets    d={DMV} />}
        {view==="dmv" && subTab==="wards"          && <WardSelector   wards={WARDS} />}
        {view==="dmv" && subTab==="wards-overview" && <WardOverview   wards={WARDS} />}

        {/* All datasets section */}
        {view==="datasets"                      && <DatasetsView   d={DATA.datasets} />}
      </main>

      {/* Floating bottom nav — quick-switch between all 4 top-level views.
          PSEUDO-CODE: Render 4 buttons pinned to bottom-center of viewport.
                       Separator spans between buttons are aria-hidden.
          508: role="navigation" + aria-label; buttons use aria-pressed. */}
      <nav role="navigation" aria-label="Quick section navigation"
        style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", display:"flex", gap:4, alignItems:"center", background:"#fff", border:"2px solid "+T.border, borderRadius:40, padding:"8px 18px", boxShadow:"0 4px 24px rgba(15,23,42,0.12)" }}>
        {viewConfig.map((v,i) => {
          const on = view === v.id;
          return (
            <span key={v.id} style={{ display:"flex", alignItems:"center", gap:4 }}>
              {i > 0 && <span aria-hidden="true" style={{ color:T.border, fontSize:16, lineHeight:1 }}>|</span>}
              <button aria-pressed={on?"true":"false"} onClick={() => switchView(v.id)}
                style={{ background:on?v.accent:"transparent", border:"2px solid "+(on?v.accent:T.border), color:on?"#fff":T.textMut, borderRadius:20, padding:"5px 12px", cursor:"pointer", fontSize:11, fontWeight:700, fontFamily:"inherit", transition:"all 0.15s" }}>
                {v.label}
              </button>
            </span>
          );
        })}
      </nav>
    </div>
  );
}
