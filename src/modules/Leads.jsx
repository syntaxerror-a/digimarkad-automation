// ================================================================
//  DIGIMARKAD  –  Lead Generation Module
//  Covers: ICP builder, outreach sequences, lead CRM, BANT scorer
// ================================================================
const { useState: useStateL } = React;

window.LeadsModule = function LeadsModule() {
  const [tab, setTab] = useStateL("strategy");
  const [output, setOutput] = useStateL("");
  const [loading, setLoading] = useStateL(false);

  const [leads, setLeads] = useStateL([
    { id:1, name:"Sarah Johnson",   company:"TechCorp Inc",    email:"sarah@techcorp.com",    phone:"+1 416 555 0101", status:"new",       source:"LinkedIn",   score:87 },
    { id:2, name:"Mike Chen",       company:"StartupHub",      email:"mike@startuphub.ca",    phone:"+1 604 555 0202", status:"contacted", source:"Web Scrape", score:74 },
    { id:3, name:"Priya Patel",     company:"EcomStore",       email:"priya@ecomstore.com",   phone:"+91 99887 76655", status:"qualified", source:"Cold Email", score:92 },
    { id:4, name:"David Williams",  company:"FinanceApp",      email:"d.w@finapp.io",         phone:"+1 212 555 0303", status:"proposal",  source:"Referral",   score:96 },
    { id:5, name:"Emily Brown",     company:"FashionLabel",    email:"emily@fashion.com",     phone:"+44 207 555 0404", status:"new",      source:"LinkedIn",   score:68 },
    { id:6, name:"Raj Sharma",      company:"LogisticsPlus",   email:"raj@logisticsplus.in",  phone:"+91 98765 43210", status:"contacted", source:"Cold Email", score:81 },
  ]);

  // ── Lead Strategy ────────────────────────────────────────────
  function StrategyTab() {
    const [form, setForm] = useStateL({ industry: "", location: "", size: "", budget: "" });

    async function generate() {
      if (!form.industry) return;
      setLoading(true); setOutput("");
      const out = await window.aiLeads(
        `Create a comprehensive lead generation strategy for targeting ${form.industry} companies in ${form.location || "Canada / USA / India"}.
Company size: ${form.size || "any"}
Budget: ${form.budget || "any"}

Provide:
1. IDEAL CUSTOMER PROFILE (ICP) — detailed buyer persona with job title, pain points, goals, channels
2. TOP 5 LEAD SOURCES with step-by-step instructions for each
3. LINKEDIN OUTREACH STRATEGY (profile optimization + daily activity plan)
4. COLD EMAIL STRATEGY (sending limits, warm-up, deliverability tips)
5. LEAD MAGNET IDEAS (5 free offers that attract ideal clients)
6. QUALIFICATION FRAMEWORK (BANT questions to ask)
7. WEEKLY LEAD GEN SCHEDULE (daily activities with time estimates)
8. FREE TOOLS to use (Apollo, Hunter, LinkedIn Sales Navigator alternatives)
9. KPIs to track weekly
10. 30-DAY ACTION PLAN with daily tasks`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-target" style={{ color: "#d97706" }} />Lead Generation Strategy</div>
        <div className="form-row"><label>Target Industry *</label>
          <input type="text" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} placeholder="e.g. E-commerce, SaaS, Real Estate, Healthcare" />
        </div>
        <div className="form-row"><label>Target Location</label>
          <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Toronto, New York, India" />
        </div>
        <div className="grid2" style={{ marginBottom: 0 }}>
          <div className="form-row"><label>Company Size</label>
            <select value={form.size} onChange={e => setForm({ ...form, size: e.target.value })}>
              <option value="">Any size</option>
              <option>Startup (1-10 employees)</option>
              <option>Small (11-50 employees)</option>
              <option>Mid-size (51-200)</option>
              <option>Enterprise (200+)</option>
            </select>
          </div>
          <div className="form-row"><label>Avg Client Budget</label>
            <select value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
              <option value="">Any budget</option>
              <option>$500-$1,500/mo</option>
              <option>$1,500-$5,000/mo</option>
              <option>$5,000-$15,000/mo</option>
              <option>$15,000+/mo</option>
            </select>
          </div>
        </div>
        <div className="mt12">
          <button className="btn primary" onClick={generate} disabled={loading || !form.industry}>
            <i className="ti ti-target" />{loading ? "Building strategy…" : "Generate Lead Strategy"}
          </button>
        </div>
      </div>
    );
  }

  // ── Outreach Sequences ───────────────────────────────────────
  function OutreachTab() {
    const [form, setForm] = useStateL({ name: "", company: "", industry: "", painPoint: "", channel: "LinkedIn + Email" });

    async function generate() {
      if (!form.name || !form.company) return;
      setLoading(true); setOutput("");
      const out = await window.aiLeads(
        `Write a personalized multi-channel outreach sequence for this prospect:
Name: ${form.name}
Company: ${form.company}
Industry: ${form.industry || "not specified"}
Pain Point: ${form.painPoint || "growing their business online"}
Channel: ${form.channel}

Create a complete sequence:
1. LINKEDIN CONNECTION REQUEST (300 chars — mention something specific, not generic)
2. LINKEDIN MESSAGE #1 (after accepted — value first, no pitch)
3. LINKEDIN MESSAGE #2 (3 days later — soft ask)
4. COLD EMAIL — Subject line (5 A/B test variations)
5. COLD EMAIL BODY (150-200 words, ultra-personalized, problem-focused)
6. FOLLOW-UP EMAIL #1 (3 days after — different angle)
7. FOLLOW-UP EMAIL #2 (5 days after — case study/social proof)
8. BREAK-UP EMAIL (final send — creates urgency without pressure)
9. SMS/WHATSAPP (if opted-in — 160 chars max)

Note: Each message should feel like it was written just for this person.`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-mail-forward" style={{ color: "#d97706" }} />Personalized Outreach Sequence</div>
        <div className="form-row"><label>Prospect Name *</label>
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" />
        </div>
        <div className="form-row"><label>Company *</label>
          <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" />
        </div>
        <div className="form-row"><label>Industry</label>
          <input type="text" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })} placeholder="e.g. SaaS, Retail, Healthcare" />
        </div>
        <div className="form-row"><label>Their Main Pain Point</label>
          <input type="text" value={form.painPoint} onChange={e => setForm({ ...form, painPoint: e.target.value })} placeholder="e.g. not getting enough leads online, poor SEO rankings" />
        </div>
        <div className="form-row"><label>Channel</label>
          <select value={form.channel} onChange={e => setForm({ ...form, channel: e.target.value })}>
            {["LinkedIn + Email", "LinkedIn Only", "Cold Email Only", "Phone + Email", "Full Multi-channel"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !form.name || !form.company}>
          <i className="ti ti-send" />{loading ? "Writing sequence…" : "Generate Outreach Sequence"}
        </button>
      </div>
    );
  }

  // ── Lead CRM ──────────────────────────────────────────────────
  function CRMTab() {
    const [showForm, setShowForm] = useStateL(false);
    const [newLead, setNewLead] = useStateL({ name: "", company: "", email: "", phone: "", source: "Manual", status: "new" });
    const statusColors = { new: "blue", contacted: "amber", qualified: "purple", proposal: "green", closed: "teal", lost: "red" };

    function addLead() {
      if (!newLead.name || !newLead.company) return;
      setLeads(l => [{ ...newLead, id: Date.now(), score: window.randInt(55, 95) }, ...l]);
      setNewLead({ name: "", company: "", email: "", phone: "", source: "Manual", status: "new" });
      setShowForm(false);
    }

    return (
      <div className="card">
        <div className="section-header">
          <h2><i className="ti ti-users" />Lead CRM</h2>
          <button className="btn primary small" onClick={() => setShowForm(s => !s)}>
            <i className={`ti ${showForm ? "ti-x" : "ti-plus"}`} />{showForm ? "Cancel" : "Add Lead"}
          </button>
        </div>

        {showForm && (
          <div style={{ background: "var(--bg3)", borderRadius: "var(--radius)", padding: 14, marginBottom: 14 }}>
            <div className="grid2" style={{ marginBottom: 0 }}>
              {[["name","Name *","John Smith"],["company","Company *","Acme Corp"],["email","Email","john@acme.com"],["phone","Phone","+1 416 555 0000"]].map(([f,l,p]) => (
                <div className="form-row" key={f}><label>{l}</label>
                  <input type="text" value={newLead[f]} onChange={e => setNewLead({ ...newLead, [f]: e.target.value })} placeholder={p} />
                </div>
              ))}
            </div>
            <div className="grid2" style={{ marginBottom: 8 }}>
              <div className="form-row"><label>Source</label>
                <select value={newLead.source} onChange={e => setNewLead({ ...newLead, source: e.target.value })}>
                  {["Manual", "LinkedIn", "Cold Email", "Referral", "Website", "Web Scrape", "Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-row"><label>Status</label>
                <select value={newLead.status} onChange={e => setNewLead({ ...newLead, status: e.target.value })}>
                  {["new", "contacted", "qualified", "proposal", "closed", "lost"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button className="btn primary small" onClick={addLead}><i className="ti ti-plus" />Add to CRM</button>
          </div>
        )}

        <window.DataTable
          columns={[
            { key: "name",    label: "Name",    render: (v,r) => <div><strong>{v}</strong><div className="text-xs text-muted">{r.email}</div></div> },
            { key: "company", label: "Company" },
            { key: "source",  label: "Source",  render: v => <span className="chip">{v}</span> },
            { key: "score",   label: "Score",   render: v => (
              <div className="score-bar-wrap">
                <div className="progress-bar" style={{ width: 50 }}>
                  <div className="progress-fill" style={{ width: v + "%", background: v > 80 ? "#22c55e" : v > 60 ? "#d97706" : "#ef4444" }} />
                </div>
                <span className="text-xs">{v}</span>
              </div>
            )},
            { key: "status",  label: "Status",  render: v => <span className={`badge ${statusColors[v] || "gray"}`}>{v}</span> },
          ]}
          rows={leads}
          onDelete={row => setLeads(l => l.filter(x => x.id !== row.id))}
          emptyText="No leads yet. Add your first lead above."
        />
      </div>
    );
  }

  // ── BANT Lead Scorer ──────────────────────────────────────────
  function ScorerTab() {
    const [form, setForm] = useStateL({ budget: "", timeline: "", authority: "", need: "", engagement: "" });

    async function score() {
      setLoading(true); setOutput("");
      const out = await window.aiLeads(
        `Score this lead using the BANT + Engagement framework:
Budget: ${form.budget || "unknown"}
Timeline: ${form.timeline || "unknown"}
Decision Authority: ${form.authority || "unknown"}
Need/Pain Point: ${form.need || "unknown"}
Engagement Level: ${form.engagement || "unknown"}

Provide:
1. BANT SCORE (0-100) with weighted breakdown (Budget 25pts, Authority 25pts, Need 30pts, Timeline 20pts)
2. ENGAGEMENT SCORE (0-20 bonus points)
3. TOTAL LEAD GRADE (A: 80-100 / B: 60-79 / C: 40-59 / D: below 40)
4. PRIORITY LEVEL (Hot 🔥 / Warm / Cold)
5. RECOMMENDED NEXT ACTION (exactly what to do within 24 hours)
6. TOP 3 OBJECTIONS to prepare for (with rebuttals)
7. ESTIMATED CLOSE PROBABILITY
8. IDEAL FOLLOW-UP TIMING`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-chart-arrows" style={{ color: "#d97706" }} />BANT Lead Scorer</div>
        <div className="card-sub">Qualify any lead in seconds using the BANT framework</div>
        {[
          ["budget",     "Budget (what they can spend)",    "e.g. $2k/month, project under $10k, no budget yet"],
          ["timeline",   "Timeline (when they need it)",    "e.g. ASAP, Q3 2025, just exploring"],
          ["authority",  "Authority (who makes decision)",  "e.g. CEO, Marketing Manager, needs board approval"],
          ["need",       "Need / Pain Point",               "e.g. No online presence, losing to competitors, low leads"],
          ["engagement", "Engagement Level",                "e.g. Opened all emails, booked call, replied once, cold"],
        ].map(([f, l, p]) => (
          <div className="form-row" key={f}>
            <label>{l}</label>
            <input type="text" value={form[f]} onChange={e => setForm({ ...form, [f]: e.target.value })} placeholder={p} />
          </div>
        ))}
        <button className="btn primary" onClick={score} disabled={loading}>
          <i className="ti ti-chart-arrows" />{loading ? "Scoring…" : "Score This Lead"}
        </button>
      </div>
    );
  }

  const TABS = [
    ["strategy", "Lead Strategy"],
    ["outreach", "Outreach Sequences"],
    ["crm",      "Lead CRM"],
    ["scorer",   "BANT Scorer"],
  ];

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-users" style={{ color: "#d97706" }} />Lead Generation</h1>
          <p>Find, qualify & nurture high-value prospects automatically</p>
        </div>
        <div className="topbar-right">
          <span className="badge green">{leads.filter(l => l.status === "qualified" || l.status === "proposal").length} qualified</span>
          <span className="badge blue">{leads.length} total leads</span>
        </div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {TABS.map(([id, lbl]) => (
            <div key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => { setTab(id); setOutput(""); }}>{lbl}</div>
          ))}
        </div>
        {tab === "crm" ? (
          <CRMTab />
        ) : (
          <div className="grid2">
            {tab === "strategy" && <StrategyTab />}
            {tab === "outreach" && <OutreachTab />}
            {tab === "scorer"   && <ScorerTab />}
            <div className="card">
              <window.AIOutput output={output} loading={loading} emptyIcon="ti-users" emptyText="Your lead generation output will appear here" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
