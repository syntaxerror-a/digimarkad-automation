// ================================================================
//  DIGIMARKAD  –  Sidebar Component
// ================================================================
const { useState } = React;

const NAV_SECTIONS = [
  { label: "Overview", items: [
    { id: "dashboard", label: "Dashboard",       icon: "ti-layout-dashboard" },
  ]},
  { label: "Create", items: [
    { id: "content",   label: "Content & Video", icon: "ti-video" },
    { id: "social",    label: "Social Media",    icon: "ti-brand-instagram" },
  ]},
  { label: "Grow", items: [
    { id: "seo",       label: "SEO Automation",  icon: "ti-search" },
    { id: "leads",     label: "Lead Generation", icon: "ti-users" },
    { id: "email",     label: "Email Campaigns", icon: "ti-mail" },
  ]},
  { label: "Analyze", items: [
    { id: "analytics", label: "Analytics",       icon: "ti-chart-bar" },
  ]},
  { label: "Manage", items: [
    { id: "clients",   label: "Client Manager",  icon: "ti-building" },
    { id: "settings",  label: "Settings & API",  icon: "ti-settings" },
  ]},
];

window.Sidebar = function Sidebar({ active, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>⚡ DIGIMARKAD</h2>
        <span>Automation Platform v2.0</span>
      </div>

      {NAV_SECTIONS.map(section => (
        <div key={section.label}>
          <div className="nav-section">{section.label}</div>
          {section.items.map(item => (
            <div
              key={item.id}
              className={`nav-item${active === item.id ? " active" : ""}`}
              onClick={() => onNavigate(item.id)}
            >
              <i className={`ti ${item.icon}`} />
              {item.label}
            </div>
          ))}
        </div>
      ))}

      <div className="sidebar-footer">
        <p>DIGIMARKAD</p>
        <p style={{ marginTop: 2, fontSize: 10 }}>digimarkad.com</p>
      </div>
    </aside>
  );
};
