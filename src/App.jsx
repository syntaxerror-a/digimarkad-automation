// ================================================================
//  DIGIMARKAD  –  App Shell (Root Component)
//  Must load LAST — all modules must be defined before this runs.
// ================================================================
const { useState: useStateApp } = React;

const PAGE_MAP = {
  dashboard: window.Dashboard,
  content:   window.ContentModule,
  social:    window.SocialModule,
  seo:       window.SEOModule,
  leads:     window.LeadsModule,
  email:     window.EmailModule,
  analytics: window.AnalyticsModule,
  clients:   window.ClientsModule,
  settings:  window.SettingsModule,
};

function App() {
  const [active, setActive] = useStateApp("dashboard");
  const Page = PAGE_MAP[active] || window.Dashboard;

  return (
    <div className="app">
      <window.Sidebar active={active} onNavigate={setActive} />
      <div className="main">
        <Page onNavigate={setActive} />
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
