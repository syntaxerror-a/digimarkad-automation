// ================================================================
//  DIGIMARKAD  –  Dashboard Module
// ================================================================
const { useState, useEffect } = React;

window.Dashboard = function Dashboard({ onNavigate }) {
  const stats = [
    { num: "47",    lbl: "Posts Scheduled",    delta: "+12 today",        up: true,  icon: "ti-calendar" },
    { num: "1,284", lbl: "Leads Generated",    delta: "+89 this week",    up: true,  icon: "ti-users" },
    { num: "328",   lbl: "Backlinks Submitted", delta: "+24 today",       up: true,  icon: "ti-link" },
    { num: "94%",   lbl: "Automation Health",   delta: "All systems go",  up: true,  icon: "ti-activity" },
  ];

  const modules = [
    { id: "content",   icon: "ti-video",        label: "Content & Video",   desc: "Scripts, captions, image prompts",  color: "#e94560", pct: 72 },
    { id: "social",    icon: "ti-share",         label: "Social Posting",    desc: "Auto-schedule all platforms",        color: "#533483", pct: 85 },
    { id: "seo",       icon: "ti-search",        label: "SEO & Backlinks",   desc: "Rankings & daily submissions",       color: "#0f7173", pct: 68 },
    { id: "leads",     icon: "ti-users",         label: "Lead Generation",   desc: "Find & nurture prospects",           color: "#d97706", pct: 91 },
    { id: "email",     icon: "ti-mail",          label: "Email Campaigns",   desc: "Sequences & newsletter automation",  color: "#2563eb", pct: 60 },
    { id: "analytics", icon: "ti-chart-bar",     label: "Analytics",         desc: "Client reports & insights",          color: "#7c3aed", pct: 78 },
  ];

  const activity = [
    { time: "2m ago",  action: "YouTube script generated",       client: "TechStartup Inc",  status: "done" },
    { time: "5m ago",  action: "Instagram post scheduled",       client: "FashionBrand CA",  status: "done" },
    { time: "12m ago", action: "25 backlinks submitted",         client: "LocalRestaurant",  status: "done" },
    { time: "18m ago", action: "Email campaign sent (2,400)",    client: "SaasCo USA",       status: "done" },
    { time: "31m ago", action: "SEO keyword research generated", client: "RealEstate Pro",   status: "done" },
    { time: "1h ago",  action: "Lead outreach sequence created", client: "HealthClinic",     status: "done" },
  ];

  return (
    <div>
      {/* Top Bar */}
      <div className="topbar">
        <div>
          <h1><i className="ti ti-layout-dashboard" />Dashboard</h1>
          <p>All automations running · Last sync 2 min ago</p>
        </div>
        <div className="topbar-right">
          <span className="live-dot" />
          <span className="badge green">6 automations active</span>
          <span className="badge blue"><i className="ti ti-clock" /> Next run: 5 min</span>
        </div>
      </div>

      <div className="content-area">
        {/* Stat Cards */}
        <div className="grid4">
          {stats.map(s => (
            <div className="stat-card" key={s.lbl}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
                <i className={`ti ${s.icon}`} style={{ fontSize: 22, color: "var(--text3)" }} />
              </div>
              <div className={`stat-delta ${s.up ? "up" : "dn"}`}>
                {s.up ? "↑" : "↓"} {s.delta}
              </div>
            </div>
          ))}
        </div>

        {/* Module Cards */}
        <div className="section-header">
          <h2>Automation Modules</h2>
          <span className="badge gray">Click to open</span>
        </div>
        <div className="grid3">
          {modules.map(m => (
            <div
              className="card"
              key={m.id}
              style={{ cursor: "pointer" }}
              onClick={() => onNavigate(m.id)}
            >
              <div className="flex items-center gap10 mb12">
                <div
                  className="platform-icon"
                  style={{ background: m.color + "22", color: m.color }}
                >
                  <i className={`ti ${m.icon}`} />
                </div>
                <div>
                  <div className="font-bold text-sm">{m.label}</div>
                  <div className="text-xs text-muted">{m.desc}</div>
                </div>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: m.pct + "%", background: m.color }} />
              </div>
              <div className="text-xs text-muted mt8" style={{ textAlign: "right" }}>{m.pct}% active</div>
            </div>
          ))}
        </div>

        {/* Activity Log */}
        <div className="card">
          <div className="section-header">
            <h2><i className="ti ti-activity" />Recent Activity</h2>
            <span className="badge green">{activity.length} actions today</span>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Time</th><th>Action</th><th>Client</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {activity.map((a, i) => (
                <tr key={i}>
                  <td className="text-xs text-muted" style={{ whiteSpace: "nowrap" }}>{a.time}</td>
                  <td>{a.action}</td>
                  <td><span className="badge blue">{a.client}</span></td>
                  <td><span className="badge green"><i className="ti ti-check" /> Done</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
