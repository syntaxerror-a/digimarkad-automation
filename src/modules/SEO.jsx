// ================================================================
//  DIGIMARKAD  –  SEO Automation Module
//  Covers: keyword research, on-page SEO, site audit,
//          daily link submissions, local SEO
// ================================================================
const { useState: useStateSEO } = React;

window.SEOModule = function SEOModule() {
  const [tab, setTab] = useStateSEO("keywords");
  const [output, setOutput] = useStateSEO("");
  const [loading, setLoading] = useStateSEO(false);

  const [submissions, setSubmissions] = useStateSEO([
    { id:1, url: "https://client1.com/blog/seo-tips",       engine: "Google Search Console", time: "10:02 AM", status: "submitted" },
    { id:2, url: "https://client2.com/services",            engine: "Bing Webmaster",        time: "10:04 AM", status: "submitted" },
    { id:3, url: "https://client3.com/about",               engine: "IndexNow",              time: "10:06 AM", status: "submitted" },
    { id:4, url: "https://client4.com/blog/marketing-tips", engine: "Yandex",                time: "10:08 AM", status: "pending"   },
  ]);

  // ── Keyword Research ──────────────────────────────────────────
  function KeywordsTab() {
    const [niche, setNiche] = useStateSEO("");
    const [location, setLocation] = useStateSEO("Canada");

    async function generate() {
      if (!niche) return;
      setLoading(true); setOutput("");
      const out = await window.aiSEO(
        `Perform a comprehensive keyword research analysis for: "${niche}" targeting ${location}.

1. PRIMARY KEYWORDS (8-10): High-value, buyer-intent keywords with estimated monthly search volume ranges
2. LONG-TAIL KEYWORDS (15-20): Lower competition, specific intent phrases
3. LSI / SEMANTIC KEYWORDS (10-15): Semantically related terms Google associates with the topic
4. LOCAL SEO KEYWORDS (8-10): Location-based variations for ${location}
5. QUESTION KEYWORDS (10): "How to", "What is", "Best" type keywords for featured snippets
6. COMPETITOR KEYWORD GAPS: Likely opportunities that competitors may be missing
7. CONTENT CLUSTER MAP: 3 pillar pages + 5 supporting topics each
8. QUICK WINS (5): Keywords you can rank for within 30-60 days
9. NEGATIVE KEYWORDS: Terms to exclude from paid campaigns`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-key" style={{ color: "#0f7173" }} />Keyword Research</div>
        <div className="form-row"><label>Industry / Niche *</label>
          <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="e.g. Digital Marketing Agency Toronto, Fitness App Canada" />
        </div>
        <div className="form-row"><label>Target Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Toronto, Canada / New York, USA / India" />
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !niche}>
          <i className="ti ti-search" />{loading ? "Researching…" : "Generate Keyword Strategy"}
        </button>
      </div>
    );
  }

  // ── On-Page SEO ───────────────────────────────────────────────
  function OnPageTab() {
    const [keyword, setKeyword] = useStateSEO("");
    const [url, setUrl] = useStateSEO("");
    const [pageType, setPageType] = useStateSEO("Blog Post");

    async function generate() {
      if (!keyword) return;
      setLoading(true); setOutput("");
      const out = await window.aiSEO(
        `Create a complete on-page SEO brief for:
Target Keyword: "${keyword}"
Page URL: ${url || "not specified"}
Page Type: ${pageType}

Provide:
1. SEO TITLE TAG (60 chars max, keyword near beginning)
2. META DESCRIPTION (155 chars, compelling with CTA)
3. H1 TAG (single, different from title)
4. H2 STRUCTURE (6-8 subheadings covering the topic comprehensively)
5. CONTENT BRIEF (what to write in each section, word count target)
6. KEYWORD DENSITY guide (primary + secondary + LSI usage)
7. INTERNAL LINKING suggestions (anchor text + page types to link to)
8. EXTERNAL LINKING (authority sites to cite)
9. IMAGE ALT TEXT formula
10. SCHEMA MARKUP recommendation (type + key fields)
11. FEATURED SNIPPET optimization strategy
12. PAGE SPEED checklist (images, code, server)
13. MOBILE UX checklist`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-file-search" style={{ color: "#0f7173" }} />On-Page SEO Brief</div>
        <div className="form-row"><label>Target Keyword *</label>
          <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. digital marketing agency Toronto" />
        </div>
        <div className="form-row"><label>Page URL</label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yoursite.com/page" />
        </div>
        <div className="form-row"><label>Page Type</label>
          <select value={pageType} onChange={e => setPageType(e.target.value)}>
            {["Blog Post", "Service Page", "Product Page", "Homepage", "Landing Page", "Location Page"].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !keyword}>
          <i className="ti ti-sparkles" />{loading ? "Generating brief…" : "Generate SEO Brief"}
        </button>
      </div>
    );
  }

  // ── Site Audit ────────────────────────────────────────────────
  function AuditTab() {
    const [url, setUrl] = useStateSEO("");

    async function run() {
      if (!url) return;
      setLoading(true); setOutput("");
      const out = await window.aiSEO(
        `Perform a comprehensive technical SEO audit for: ${url}

Generate a professional audit report covering:

TECHNICAL SEO
- Crawlability & indexation issues
- XML sitemap & robots.txt
- Canonical tags & duplicate content
- Redirect chains (301/302)
- HTTPS & security

ON-PAGE SEO
- Title tag & meta description audit
- Heading structure (H1-H6)
- Content quality signals
- Internal linking structure
- Image optimization

CORE WEB VITALS
- LCP (Largest Contentful Paint) — target under 2.5s
- CLS (Cumulative Layout Shift) — target under 0.1
- FID/INP (Interaction to Next Paint) — target under 200ms

LOCAL SEO
- Google Business Profile optimization
- NAP consistency
- Local citations
- Reviews strategy

BACKLINK PROFILE
- Link building opportunities
- Toxic link risks
- Competitor backlink gaps

PRIORITY ACTION PLAN (ranked High/Medium/Low impact)
- Top 5 immediate fixes (this week)
- Top 5 short-term improvements (30 days)
- Long-term strategy (90 days)`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-checklist" style={{ color: "#0f7173" }} />Full SEO Audit</div>
        <div className="form-row"><label>Website URL *</label>
          <input type="url" value={url} onChange={e => setUrl(e.target.value)} placeholder="https://digimarkad.com" />
        </div>
        <button className="btn primary" onClick={run} disabled={loading || !url}>
          <i className="ti ti-checklist" />{loading ? "Auditing…" : "Run Full SEO Audit"}
        </button>
      </div>
    );
  }

  // ── Daily Submissions ─────────────────────────────────────────
  function SubmissionsTab() {
    const [urls, setUrls] = useStateSEO("");
    const engines = [
      { name: "Google Search Console", freq: "Instant (via API)",  status: true  },
      { name: "Bing Webmaster Tools",  freq: "Daily batch",        status: true  },
      { name: "IndexNow Protocol",     freq: "Instant push",       status: true  },
      { name: "Yandex Webmaster",      freq: "Daily",              status: true  },
      { name: "Ping-o-Matic",          freq: "On publish",         status: true  },
      { name: "DuckDuckGo",            freq: "Weekly",             status: false },
    ];

    function submit() {
      const lines = urls.split("\n").map(u => u.trim()).filter(Boolean);
      if (!lines.length) { alert("Enter at least one URL."); return; }
      const enginePool = ["Google Search Console", "Bing Webmaster", "IndexNow", "Yandex"];
      const newSubs = lines.map(url => ({
        id:     Date.now() + Math.random(),
        url,
        engine: enginePool[window.randInt(0, enginePool.length - 1)],
        time:   new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        status: "submitted",
      }));
      setSubmissions(s => [...newSubs, ...s]);
      setUrls("");
    }

    return (
      <div>
        <div className="grid2">
          <div className="card">
            <div className="card-title"><i className="ti ti-send" style={{ color: "#0f7173" }} />Submit URLs to Search Engines</div>
            <div className="card-sub">Submit pages daily for faster indexing and organic SEO gains</div>
            <div className="form-row"><label>URLs to Submit (one per line)</label>
              <textarea value={urls} onChange={e => setUrls(e.target.value)} placeholder={"https://yoursite.com/page1\nhttps://yoursite.com/blog/post\nhttps://yoursite.com/services"} style={{ minHeight: 100 }} />
            </div>
            <button className="btn primary" onClick={submit}>
              <i className="ti ti-send" />Submit to All Search Engines
            </button>
          </div>
          <div className="card">
            <div className="card-title"><i className="ti ti-world" style={{ color: "#533483" }} />Submission Targets</div>
            {engines.map((e, i) => (
              <div key={i} className="platform-row">
                <div className={`live-dot${e.status ? "" : " off"}`} />
                <div style={{ flex: 1 }}>
                  <div className="text-sm font-medium">{e.name}</div>
                  <div className="text-xs text-muted">{e.freq}</div>
                </div>
                <span className={`badge ${e.status ? "green" : "gray"}`}>{e.status ? "Active" : "Inactive"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="section-header">
            <h2><i className="ti ti-history" />Submission Log</h2>
            <span className="badge blue">{submissions.length} total</span>
          </div>
          <window.DataTable
            columns={[
              { key: "url",    label: "URL",    render: v => <span className="truncate" style={{ display: "block", maxWidth: 280, fontSize: 12 }}>{v}</span> },
              { key: "engine", label: "Engine" },
              { key: "time",   label: "Time",   render: v => <span className="text-xs text-muted">{v}</span> },
              { key: "status", label: "Status", render: v => <span className={`badge ${v === "submitted" ? "green" : "amber"}`}>{v}</span> },
            ]}
            rows={submissions}
            emptyText="No submissions yet"
          />
        </div>
      </div>
    );
  }

  const TABS = [
    ["keywords",    "Keyword Research"],
    ["onpage",      "On-Page SEO"],
    ["audit",       "Site Audit"],
    ["submissions", "Daily Submissions"],
  ];

  const Components = { keywords: KeywordsTab, onpage: OnPageTab, audit: AuditTab };

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-search" style={{ color: "#0f7173" }} />SEO Automation</h1>
          <p>Keyword research, on-page optimization, site audits & daily search engine submissions</p>
        </div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {TABS.map(([id, lbl]) => (
            <div key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => { setTab(id); setOutput(""); }}>{lbl}</div>
          ))}
        </div>
        {tab === "submissions" ? (
          <SubmissionsTab />
        ) : (
          <div className="grid2">
            {tab === "keywords" && <KeywordsTab />}
            {tab === "onpage"   && <OnPageTab />}
            {tab === "audit"    && <AuditTab />}
            <div className="card">
              <window.AIOutput output={output} loading={loading} emptyIcon="ti-search" emptyText="SEO analysis will appear here" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
