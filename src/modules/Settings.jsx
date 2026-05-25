// ================================================================
//  DIGIMARKAD  –  Settings & API Module
// ================================================================
const { useState: useStateST } = React;

window.SettingsModule = function SettingsModule() {
  const [saved, setSaved] = useStateST(false);
  const [apiKey, setApiKey] = useStateST("");
  const [agency, setAgency] = useStateST({ name: "DIGIMARKAD", website: "https://digimarkad.com", email: "", phone: "" });

  const [automations, setAutomations] = useStateST([
    { id:1,  name: "Daily LinkedIn posting",       desc: "Auto-post at optimal times",           on: true  },
    { id:2,  name: "Instagram & TikTok scheduler", desc: "Queue and publish reels automatically", on: true  },
    { id:3,  name: "Daily backlink submissions",   desc: "Submit URLs to search engines daily",   on: true  },
    { id:4,  name: "Weekly SEO report",            desc: "Auto-generate & email client reports",  on: false },
    { id:5,  name: "Lead scraping (LinkedIn)",     desc: "Find new leads matching ICP daily",     on: true  },
    { id:6,  name: "Email drip sequences",         desc: "Send automated nurture emails",         on: true  },
    { id:7,  name: "Hashtag auto-rotation",        desc: "Rotate hashtag sets every 3 days",      on: false },
    { id:8,  name: "Competitor monitoring",        desc: "Weekly competitor change alerts",        on: true  },
    { id:9,  name: "Content calendar reminders",   desc: "Slack/email alerts before post time",   on: true  },
    { id:10, name: "Monthly report auto-send",     desc: "Send reports to clients automatically", on: false },
  ]);

  const integrations = [
    { name: "Claude AI (Anthropic)",   desc: "AI content engine — powers all generation",  status: "connected", color: "#e94560" },
    { name: "Meta Business Suite",     desc: "Instagram & Facebook posting",                status: "configure", color: "#1877F2" },
    { name: "TikTok for Business",     desc: "TikTok scheduling & analytics",               status: "configure", color: "#010101" },
    { name: "Google Search Console",   desc: "SEO data & URL submissions",                  status: "configure", color: "#4285F4" },
    { name: "LinkedIn Marketing API",  desc: "LinkedIn posting & lead data",                status: "configure", color: "#0A66C2" },
    { name: "YouTube Data API",        desc: "YouTube channel management",                  status: "configure", color: "#FF0000" },
    { name: "Mailchimp / Klaviyo",     desc: "Email campaign platform",                     status: "configure", color: "#FFE01B" },
    { name: "Google Analytics 4",      desc: "Website & campaign analytics",                status: "configure", color: "#F9AB00" },
    { name: "Ahrefs / SEMrush API",    desc: "Keyword & backlink data",                     status: "configure", color: "#FF6B35" },
    { name: "Zapier / Make",           desc: "Workflow automation bridge",                  status: "configure", color: "#FF4A00" },
  ];

  function save() {
    window.storage.set("agency", agency);
    window.storage.set("automations", automations);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function toggleAuto(id) {
    setAutomations(a => a.map(x => x.id === id ? { ...x, on: !x.on } : x));
  }

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-settings" />Settings & API Configuration</h1>
          <p>Configure integrations, automation rules, and agency details</p>
        </div>
        <button className="btn primary" onClick={save}>
          <i className={`ti ${saved ? "ti-check" : "ti-device-floppy"}`} />{saved ? "Saved!" : "Save All Settings"}
        </button>
      </div>
      <div className="content-area">
        <div className="grid2">
          {/* Agency Details */}
          <div className="card">
            <div className="card-title"><i className="ti ti-building" style={{ color: "#0f7173" }} />Agency Details</div>
            {[["name","Agency Name","DIGIMARKAD"],["website","Website","https://digimarkad.com"],["email","Contact Email","hello@digimarkad.com"],["phone","Phone",""]].map(([f,l,p]) => (
              <div className="form-row" key={f}><label>{l}</label>
                <input type="text" value={agency[f]||""} onChange={e => setAgency({...agency,[f]:e.target.value})} placeholder={p} />
              </div>
            ))}
          </div>

          {/* Automation Toggles */}
          <div className="card">
            <div className="card-title"><i className="ti ti-robot" style={{ color: "#533483" }} />Automation Rules</div>
            {automations.map(a => (
              <div key={a.id} className="platform-row" style={{ justifyContent: "space-between" }}>
                <div style={{ flex: 1, marginRight: 12 }}>
                  <div className="text-sm font-medium">{a.name}</div>
                  <div className="text-xs text-muted">{a.desc}</div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={a.on} onChange={() => toggleAuto(a.id)} />
                  <span className="toggle-slider" />
                </label>
              </div>
            ))}
          </div>

          {/* Integrations */}
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-title"><i className="ti ti-plug" style={{ color: "#e94560" }} />API Integrations</div>
            <div className="grid2" style={{ marginBottom: 0 }}>
              {integrations.map((intg, i) => (
                <div key={i} className="platform-row">
                  <div className="live-dot" style={{ background: intg.status === "connected" ? "#22c55e" : "#d97706" }} />
                  <div style={{ flex: 1 }}>
                    <div className="text-sm font-medium">{intg.name}</div>
                    <div className="text-xs text-muted">{intg.desc}</div>
                  </div>
                  <span className={`badge ${intg.status === "connected" ? "green" : "amber"}`}>
                    {intg.status === "connected" ? "Connected" : "Set Up"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
