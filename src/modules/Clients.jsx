// ================================================================
//  DIGIMARKAD  –  Client Manager Module
// ================================================================
const { useState: useStateCL } = React;

window.ClientsModule = function ClientsModule() {
  const [clients, setClients] = useStateCL([...window.SAMPLE_CLIENTS]);
  const [output, setOutput] = useStateCL("");
  const [loading, setLoading] = useStateCL(false);
  const [activeClient, setActiveClient] = useStateCL(null);
  const [showAdd, setShowAdd] = useStateCL(false);
  const [newClient, setNewClient] = useStateCL({ name:"", industry:"", location:"", revenue:"", services:[], status:"active" });
  const [tab, setTab] = useStateCL("list");

  async function generateStrategy(client) {
    setActiveClient(client);
    setTab("strategy");
    setLoading(true); setOutput("");
    const out = await window.callClaude(
      `Create a comprehensive 90-day marketing strategy for this client:
Client: ${client.name}
Industry: ${client.industry}
Location: ${client.location}
Services: ${client.services.join(", ")}
Monthly Budget: ${client.revenue}

Deliver:
1. SITUATION ANALYSIS (where they are now, likely challenges)
2. 90-DAY ROADMAP
   - Month 1: Foundation (what to set up and fix)
   - Month 2: Growth (what to scale)
   - Month 3: Optimize (what to double down on)
3. CHANNEL STRATEGY (specific tactics per service)
4. CONTENT THEMES for next 3 months (4 themes/month)
5. KPI TARGETS (specific numbers for each metric)
6. WEEKLY ACTIVITY SCHEDULE
7. UPSELL OPPORTUNITIES (additional services to propose)
8. RISKS & MITIGATION
9. EXPECTED RESULTS by month 3`,
      "You are a senior marketing strategist creating client roadmaps."
    );
    setOutput(out); setLoading(false);
  }

  async function generateProposal(client) {
    setActiveClient(client);
    setTab("strategy");
    setLoading(true); setOutput("");
    const out = await window.callClaude(
      `Write a professional marketing services proposal for:
Client: ${client.name}
Industry: ${client.industry}
Location: ${client.location}
Proposed Services: ${client.services.join(", ")}
Investment: ${client.revenue}

Include:
1. EXECUTIVE SUMMARY (why DIGIMARKAD is the right partner)
2. CLIENT SITUATION (their likely challenges and goals)
3. OUR APPROACH (methodology, AI-first strategy)
4. SCOPE OF WORK (detailed deliverables per service)
5. INVESTMENT (clear pricing table)
6. EXPECTED RESULTS (realistic KPIs with timeframes)
7. OUR PROCESS (onboarding → strategy → execute → report)
8. CASE STUDIES (reference similar clients)
9. NEXT STEPS (clear CTA)
10. TERMS OVERVIEW`,
      "You are a senior account executive writing winning marketing proposals."
    );
    setOutput(out); setLoading(false);
  }

  function addClient() {
    if (!newClient.name || !newClient.industry) return;
    setClients(c => [{ ...newClient, id: Date.now(), since: new Date().toLocaleDateString("en-US", { month:"short", year:"numeric" }) }, ...c]);
    setNewClient({ name:"", industry:"", location:"", revenue:"", services:[], status:"active" });
    setShowAdd(false);
  }

  const statusColors = { active: "green", paused: "amber", churned: "red", prospect: "blue" };

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-building" style={{ color: "#0f7173" }} />Client Manager</h1>
          <p>Manage all clients and generate custom strategies & proposals</p>
        </div>
        <div className="topbar-right">
          <span className="badge green">{clients.filter(c => c.status === "active").length} active</span>
          <span className="badge blue">{clients.length} total</span>
        </div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {[["list","Client List"],["strategy","Strategy / Proposal"]].map(([id,lbl]) => (
            <div key={id} className={`tab${tab===id?" active":""}`} onClick={()=>setTab(id)}>{lbl}</div>
          ))}
        </div>

        {tab === "list" && (
          <div>
            <div className="section-header">
              <h2><i className="ti ti-building" />All Clients</h2>
              <button className="btn primary small" onClick={() => setShowAdd(s => !s)}>
                <i className={`ti ${showAdd ? "ti-x" : "ti-plus"}`} />{showAdd ? "Cancel" : "Add Client"}
              </button>
            </div>

            {showAdd && (
              <div className="card mb12">
                <div className="card-title"><i className="ti ti-plus" style={{ color: "#0f7173" }} />New Client</div>
                <div className="grid2" style={{ marginBottom: 0 }}>
                  {[["name","Client Name *","Acme Corp"],["industry","Industry *","E-commerce"],["location","Location","Toronto, CA"],["revenue","Monthly Retainer","$2,500/mo"]].map(([f,l,p]) => (
                    <div className="form-row" key={f}><label>{l}</label>
                      <input type="text" value={newClient[f]} onChange={e => setNewClient({...newClient,[f]:e.target.value})} placeholder={p} />
                    </div>
                  ))}
                </div>
                <div className="mt12">
                  <button className="btn primary small" onClick={addClient}><i className="ti ti-check" />Save Client</button>
                </div>
              </div>
            )}

            <div className="card">
              <window.DataTable
                columns={[
                  { key: "name",     label: "Client",   render: (v,r) => <div><strong>{v}</strong><div className="text-xs text-muted">Since {r.since}</div></div> },
                  { key: "industry", label: "Industry", render: v => <span className="chip">{v}</span> },
                  { key: "location", label: "Location", render: v => <span className="text-xs text-muted">{v}</span> },
                  { key: "services", label: "Services", render: v => (v||[]).map(s => <span key={s} className="chip">{s}</span>) },
                  { key: "revenue",  label: "Revenue",  render: v => <span className="font-medium" style={{ color: "#22c55e" }}>{v}</span> },
                  { key: "status",   label: "Status",   render: v => <span className={`badge ${statusColors[v]||"gray"}`}>{v}</span> },
                ]}
                rows={clients}
                onDelete={row => setClients(c => c.filter(x => x.id !== row.id))}
                emptyText="No clients yet. Add your first client above."
              />
            </div>

            <div className="grid2 mt12">
              {clients.slice(0, 4).map(c => (
                <div className="card" key={c.id}>
                  <div className="flex items-center justify-between mb12">
                    <div>
                      <div className="font-bold">{c.name}</div>
                      <div className="text-xs text-muted">{c.industry} · {c.location}</div>
                    </div>
                    <span className={`badge ${statusColors[c.status]||"gray"}`}>{c.status}</span>
                  </div>
                  <div className="flex gap8">
                    <button className="btn small" style={{ flex: 1 }} onClick={() => generateStrategy(c)} disabled={loading}>
                      <i className="ti ti-map" />Strategy
                    </button>
                    <button className="btn small" style={{ flex: 1 }} onClick={() => generateProposal(c)} disabled={loading}>
                      <i className="ti ti-file-invoice" />Proposal
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "strategy" && (
          <div className="card">
            <div className="section-header">
              <h2><i className="ti ti-sparkles" style={{ color: "#e94560" }} />
                {activeClient ? `Strategy for ${activeClient.name}` : "Generate Strategy / Proposal"}
              </h2>
              {!activeClient && <span className="badge amber">Select a client from the Client List tab</span>}
            </div>
            {!activeClient ? (
              <div className="ai-empty">
                <i className="ti ti-building" />
                <p>Go to Client List and click "Strategy" or "Proposal" on any client card</p>
              </div>
            ) : (
              <window.AIOutput output={output} loading={loading} emptyIcon="ti-map" emptyText="Strategy is being generated…" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
