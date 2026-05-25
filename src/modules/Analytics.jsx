// ================================================================
//  DIGIMARKAD  –  Analytics & Reporting Module
// ================================================================
const { useState: useStateAN } = React;

window.AnalyticsModule = function AnalyticsModule() {
  const [tab, setTab] = useStateAN("report");
  const [output, setOutput] = useStateAN("");
  const [loading, setLoading] = useStateAN(false);

  function ReportTab() {
    const [form, setForm] = useStateAN({ client: "", period: "", channels: "All channels", goals: "" });

    async function generate() {
      if (!form.client) return;
      setLoading(true); setOutput("");
      const out = await window.aiAnalytics(
        `Generate a professional monthly marketing performance report for:
Client: ${form.client}
Period: ${form.period || "last 30 days"}
Channels: ${form.channels}
Goals: ${form.goals || "grow traffic, generate leads, improve conversions"}

Include:
1. EXECUTIVE SUMMARY (4-5 sentences, client-friendly language)
2. KPI SCORECARD (table: Metric | Target | Actual | Variance | Status ✅/⚠️/❌)
3. SEO PERFORMANCE (organic traffic, keyword rankings, backlinks built)
4. SOCIAL MEDIA METRICS (per platform: reach, engagement rate, followers gained, top posts)
5. PAID ADVERTISING (spend, impressions, clicks, conversions, ROAS, CPA)
6. EMAIL MARKETING (sent, open rate, CTR, conversions, unsubscribes)
7. LEAD GENERATION (leads generated, qualified, conversion rate)
8. KEY WINS THIS MONTH (3-5 specific achievements)
9. OPPORTUNITIES & RECOMMENDATIONS (3-5 areas to improve next month)
10. NEXT MONTH'S PRIORITIES (5 ranked action items with owner and deadline)
11. BUDGET UTILIZATION (spend vs. budget, ROI summary)

Tone: Data-driven but accessible. The client is a business owner, not a marketer.`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-report" style={{ color: "#7c3aed" }} />Monthly Client Report</div>
        <div className="form-row"><label>Client Name *</label>
          <input type="text" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="e.g. TechStartup Inc" />
        </div>
        <div className="form-row"><label>Reporting Period</label>
          <input type="text" value={form.period} onChange={e => setForm({ ...form, period: e.target.value })} placeholder="e.g. May 2025 / Q2 2025" />
        </div>
        <div className="form-row"><label>Channels to Cover</label>
          <select value={form.channels} onChange={e => setForm({ ...form, channels: e.target.value })}>
            {["All channels", "SEO + Content only", "Paid Ads only", "Social Media only", "SEO + Ads + Social", "Email only"].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="form-row"><label>Client Goals</label>
          <input type="text" value={form.goals} onChange={e => setForm({ ...form, goals: e.target.value })} placeholder="e.g. 20% traffic growth, 50 leads/month, 3x ROAS" />
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !form.client}>
          <i className="ti ti-report" />{loading ? "Generating report…" : "Generate Client Report"}
        </button>
      </div>
    );
  }

  function InsightsTab() {
    const [client, setClient] = useStateAN("");
    const [metrics, setMetrics] = useStateAN("");

    async function analyze() {
      if (!metrics) return;
      setLoading(true); setOutput("");
      const out = await window.aiAnalytics(
        `Analyze these marketing metrics and provide expert insights:
Client: ${client || "our client"}
Metrics: ${metrics}

Provide:
1. WHAT'S WORKING WELL (interpret positive signals)
2. RED FLAGS (metrics that need attention — explain why)
3. INDUSTRY BENCHMARK COMPARISON (how do these compare to industry averages)
4. ROOT CAUSE ANALYSIS (for any underperforming metrics)
5. TOP 5 OPTIMIZATION RECOMMENDATIONS (specific, actionable, ranked by impact)
6. PREDICTED RESULTS if recommendations are implemented (with timeframes)
7. QUICK WIN: The single highest-leverage action to take in the next 7 days`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-chart-dots" style={{ color: "#7c3aed" }} />Marketing Data Insights</div>
        <div className="form-row"><label>Client (optional)</label>
          <input type="text" value={client} onChange={e => setClient(e.target.value)} placeholder="Client name" />
        </div>
        <div className="form-row"><label>Paste your metrics / data *</label>
          <textarea value={metrics} onChange={e => setMetrics(e.target.value)} placeholder={"e.g.\n• Organic traffic: 5,420 (+12% MoM)\n• Conversions: 43 (-8%)\n• ROAS: 3.2x\n• Email open rate: 22%\n• Instagram followers: 2,800 (+340)\n• LinkedIn CTR: 1.8%"} style={{ minHeight: 120 }} />
        </div>
        <button className="btn primary" onClick={analyze} disabled={loading || !metrics}>
          <i className="ti ti-sparkles" />{loading ? "Analyzing…" : "Analyze & Get Insights"}
        </button>
      </div>
    );
  }

  function CompetitorTab() {
    const [domain, setDomain] = useStateAN("");
    const [competitor, setCompetitor] = useStateAN("");
    const [industry, setIndustry] = useStateAN("");

    async function analyze() {
      if (!domain) return;
      setLoading(true); setOutput("");
      const out = await window.aiAnalytics(
        `Perform a strategic competitive analysis:
Our Client: ${domain}
Competitor: ${competitor || "top competitors in their space"}
Industry: ${industry || "digital marketing"}

Provide:
1. SWOT ANALYSIS (Strengths / Weaknesses / Opportunities / Threats)
2. CONTENT GAPS (topics competitors rank for that we don't — estimate 10 opportunities)
3. BACKLINK STRATEGY (types of links competitors likely have, how to compete)
4. AD STRATEGY (likely platforms, messaging angles, targeting based on industry)
5. SOCIAL MEDIA POSITIONING (how competitors position themselves, differentiation opportunities)
6. UNIQUE POSITIONING ANGLE (how to stand out from all competitors)
7. QUICK WINS (5 tactics to outperform competitors within 30 days)
8. 90-DAY COMPETITIVE BATTLE PLAN`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-eye" style={{ color: "#7c3aed" }} />Competitor Analysis</div>
        <div className="form-row"><label>Client Website / Business *</label>
          <input type="text" value={domain} onChange={e => setDomain(e.target.value)} placeholder="e.g. https://ourclient.com or TechStartup Toronto" />
        </div>
        <div className="form-row"><label>Competitor (optional)</label>
          <input type="text" value={competitor} onChange={e => setCompetitor(e.target.value)} placeholder="e.g. https://competitor.com or CompetitorName" />
        </div>
        <div className="form-row"><label>Industry</label>
          <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. SaaS, E-commerce fashion, Real estate" />
        </div>
        <button className="btn primary" onClick={analyze} disabled={loading || !domain}>
          <i className="ti ti-eye" />{loading ? "Analyzing…" : "Run Competitor Analysis"}
        </button>
      </div>
    );
  }

  function ROITab() {
    const [form, setForm] = useStateAN({ spend: "", roas: "", margin: "", period: "Monthly" });
    const [calc, setCalc] = useStateAN(null);

    function calculate() {
      const spend = parseFloat(form.spend) || 0;
      const roas  = parseFloat(form.roas)  || 0;
      const margin= parseFloat(form.margin)|| 0;
      if (!spend || !roas) { alert("Enter ad spend and ROAS"); return; }
      const revenue = spend * roas;
      const profit  = revenue * (margin / 100) - spend;
      const roi     = spend > 0 ? ((profit / spend) * 100).toFixed(1) : 0;
      setCalc({ revenue: revenue.toFixed(2), profit: profit.toFixed(2), roi, roas: form.roas });
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-calculator" style={{ color: "#7c3aed" }} />Marketing ROI Calculator</div>
        <div className="form-row"><label>Total Ad Spend ($)</label>
          <input type="number" value={form.spend} onChange={e => setForm({ ...form, spend: e.target.value })} placeholder="e.g. 5000" />
        </div>
        <div className="form-row"><label>ROAS (Return on Ad Spend)</label>
          <input type="number" step="0.1" value={form.roas} onChange={e => setForm({ ...form, roas: e.target.value })} placeholder="e.g. 4 (= 4x return)" />
        </div>
        <div className="form-row"><label>Profit Margin (%)</label>
          <input type="number" value={form.margin} onChange={e => setForm({ ...form, margin: e.target.value })} placeholder="e.g. 40" />
        </div>
        <div className="form-row"><label>Period</label>
          <select value={form.period} onChange={e => setForm({ ...form, period: e.target.value })}>
            {["Monthly", "Quarterly", "Yearly"].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <button className="btn primary" onClick={calculate}><i className="ti ti-calculator" />Calculate ROI</button>

        {calc && (
          <div className="grid3 mt16" style={{ marginBottom: 0 }}>
            {[
              { lbl: "Revenue Generated", val: "$" + window.fmtNum(parseFloat(calc.revenue)), color: "#22c55e" },
              { lbl: "Net Profit",        val: "$" + window.fmtNum(parseFloat(calc.profit)),  color: parseFloat(calc.profit) >= 0 ? "#22c55e" : "#ef4444" },
              { lbl: "ROI",               val: calc.roi + "%",                                 color: "#2563eb" },
            ].map(s => (
              <div className="stat-card" key={s.lbl}>
                <div className="stat-num" style={{ color: s.color }}>{s.val}</div>
                <div className="stat-lbl">{s.lbl} ({form.period})</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const TABS = [
    ["report",     "Client Reports"],
    ["insights",   "Data Insights"],
    ["competitor", "Competitor Analysis"],
    ["roi",        "ROI Calculator"],
  ];

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-chart-bar" style={{ color: "#7c3aed" }} />Analytics & Reporting</h1>
          <p>Generate professional reports, extract insights & track ROI for all clients</p>
        </div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {TABS.map(([id, lbl]) => (
            <div key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => { setTab(id); setOutput(""); }}>{lbl}</div>
          ))}
        </div>
        {tab === "roi" ? (
          <ROITab />
        ) : (
          <div className="grid2">
            {tab === "report"     && <ReportTab />}
            {tab === "insights"   && <InsightsTab />}
            {tab === "competitor" && <CompetitorTab />}
            <div className="card">
              <window.AIOutput output={output} loading={loading} emptyIcon="ti-chart-bar" emptyText="Analytics output will appear here" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
