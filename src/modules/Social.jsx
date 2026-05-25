// ================================================================
//  DIGIMARKAD  –  Social Media Module
//  Covers: post scheduler, hashtag generator, post analyzer,
//          platform optimizer, posting queue
// ================================================================
const { useState: useStateS, useRef } = React;

window.SocialModule = function SocialModule() {
  const [tab, setTab] = useStateS("compose");
  const [output, setOutput] = useStateS("");
  const [loading, setLoading] = useStateS(false);

  // ── Post Queue state (shared across tabs) ────────────────────
  const [queue, setQueue] = useStateS([
    { id: 1, client: "TechStartup Inc",  preview: "🚀 Just launched our new AI feature...",  platforms: ["Instagram", "LinkedIn"], time: "9:00 AM",  date: "Today",     status: "scheduled" },
    { id: 2, client: "FashionBrand CA",  preview: "Summer collection is HERE 🌸 Shop now...", platforms: ["Instagram", "TikTok"],   time: "2:00 PM",  date: "Today",     status: "scheduled" },
    { id: 3, client: "LocalRestaurant",  preview: "Fresh ingredients, bold flavors 🍽️...",   platforms: ["Instagram"],             time: "11:30 AM", date: "Tomorrow",  status: "pending"   },
    { id: 4, client: "SaasCo USA",       preview: "How we reduced churn by 40%...",           platforms: ["LinkedIn", "Twitter/X"], time: "8:00 AM",  date: "Tomorrow",  status: "scheduled" },
  ]);

  // ── Compose Tab ──────────────────────────────────────────────
  function ComposeTab() {
    const [form, setForm] = useStateS({ client: "", content: "", platforms: [], date: "", time: "" });

    function togglePlatform(p) {
      setForm(f => ({
        ...f,
        platforms: f.platforms.includes(p)
          ? f.platforms.filter(x => x !== p)
          : [...f.platforms, p],
      }));
    }

    async function aiOptimize() {
      if (!form.content) return;
      setLoading(true); setOutput("");
      const out = await window.aiSocial(
        `Optimize this social media post for each selected platform: ${form.platforms.join(", ") || "all major platforms"}
Original post: "${form.content}"
Client: ${form.client || "our client"}

For each platform provide:
1. Platform-optimized version (correct length, tone, format)
2. Platform-specific hashtags
3. Best time to post (day + time)
4. Engagement tip
5. Whether to include link or "link in bio"`
      );
      setOutput(out); setLoading(false);
    }

    function schedulePost() {
      if (!form.content || !form.platforms.length) {
        alert("Add content and select at least one platform.");
        return;
      }
      const item = {
        id: Date.now(),
        client: form.client || "New Client",
        preview: form.content.slice(0, 60) + (form.content.length > 60 ? "…" : ""),
        platforms: form.platforms,
        time: form.time || "9:00 AM",
        date: form.date || "Today",
        status: "scheduled",
      };
      setQueue(q => [item, ...q]);
      setForm({ client: "", content: "", platforms: [], date: "", time: "" });
      setOutput("");
      alert("Post added to queue! ✅");
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-edit" style={{ color: "#E1306C" }} />Compose & Schedule Post</div>
        <div className="form-row"><label>Client</label>
          <input type="text" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="Client name" />
        </div>
        <div className="form-row"><label>Post Content *</label>
          <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write your post here…" style={{ minHeight: 100 }} />
        </div>
        <div className="form-row"><label>Platforms *</label>
          <div className="flex wrap gap8 mt8">
            {window.ALL_PLATFORMS.map(p => (
              <div
                key={p}
                className="platform-tag"
                style={{
                  borderColor: form.platforms.includes(p) ? (window.PLATFORM_COLORS[p] || "#e94560") : "var(--border2)",
                  background:  form.platforms.includes(p) ? (window.PLATFORM_COLORS[p] + "18") : "transparent",
                  color:       form.platforms.includes(p) ? (window.PLATFORM_COLORS[p] || "#e94560") : "var(--text2)",
                }}
                onClick={() => togglePlatform(p)}
              >
                {p}
              </div>
            ))}
          </div>
        </div>
        <div className="grid2" style={{ marginBottom: 0 }}>
          <div className="form-row"><label>Date</label>
            <input type="text" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} placeholder="e.g. Today, Jun 1" />
          </div>
          <div className="form-row"><label>Time</label>
            <input type="text" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} placeholder="e.g. 9:00 AM EST" />
          </div>
        </div>
        <div className="flex gap8 mt12">
          <button className="btn primary" onClick={schedulePost}><i className="ti ti-calendar-plus" />Schedule Post</button>
          <button className="btn" onClick={aiOptimize} disabled={loading || !form.content}><i className="ti ti-sparkles" />{loading ? "Optimizing…" : "AI Optimize"}</button>
        </div>
      </div>
    );
  }

  // ── Queue Tab ────────────────────────────────────────────────
  function QueueTab() {
    return (
      <div className="card">
        <div className="section-header">
          <h2><i className="ti ti-list-check" />Post Queue</h2>
          <span className="badge green">{queue.length} posts scheduled</span>
        </div>
        <window.DataTable
          columns={[
            { key: "client",    label: "Client",    render: v => <strong>{v}</strong> },
            { key: "preview",   label: "Post",      render: v => <span className="truncate" style={{ maxWidth: 200, display: "block" }}>{v}</span> },
            { key: "platforms", label: "Platforms", render: v => v.map(p => <span key={p} className="chip" style={{ color: window.PLATFORM_COLORS[p] }}>{p}</span>) },
            { key: "date",      label: "Schedule",  render: (v, row) => <div><div className="text-sm">{v}</div><div className="text-xs text-muted">{row.time}</div></div> },
            { key: "status",    label: "Status",    render: v => <span className={`badge ${v === "scheduled" ? "green" : "amber"}`}>{v}</span> },
          ]}
          rows={queue}
          onDelete={row => setQueue(q => q.filter(x => x.id !== row.id))}
          emptyText="No posts scheduled yet. Compose a post to get started."
        />
      </div>
    );
  }

  // ── Hashtag Generator ────────────────────────────────────────
  function HashtagTab() {
    const [niche, setNiche] = useStateS("");

    async function generate() {
      if (!niche) return;
      setLoading(true); setOutput("");
      const out = await window.aiSocial(
        `Generate a complete hashtag strategy for the "${niche}" niche across all platforms.

1. INSTAGRAM (30 hashtags in 3 groups – mega/200k+, medium/10-200k, niche/under 10k)
2. TIKTOK (15 trending hashtags with approximate view range)
3. YOUTUBE (10 SEO video tags)
4. LINKEDIN (10 professional hashtags)
5. TWITTER/X (5 trending tags)
6. FACEBOOK (8 relevant tags)
7. PINTEREST (10 tags)

Bonus: Hashtag rotation strategy (how often to change sets) + banned hashtags to avoid.`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-hash" style={{ color: "#0f7173" }} />Hashtag Strategy Generator</div>
        <div className="flex gap10 mt8">
          <input type="text" value={niche} onChange={e => setNiche(e.target.value)} placeholder="Enter niche (e.g. Fitness, Real Estate, Tech Startup)" style={{ flex: 1 }} />
          <button className="btn primary" onClick={generate} disabled={loading || !niche}>
            <i className="ti ti-hash" />{loading ? "Generating…" : "Generate"}
          </button>
        </div>
      </div>
    );
  }

  // ── Post Analyzer ────────────────────────────────────────────
  function AnalyzerTab() {
    const [post, setPost] = useStateS("");

    async function analyze() {
      if (!post) return;
      setLoading(true); setOutput("");
      const out = await window.aiSocial(
        `Analyze this social media post and predict its performance:
"${post}"

Provide:
1. ENGAGEMENT SCORE (0-100) with breakdown (hook: /20, content: /30, CTA: /20, hashtags: /15, format: /15)
2. VIRALITY POTENTIAL (Low/Medium/High) with reasoning
3. SENTIMENT & TONE analysis
4. TOP 3 STRENGTHS
5. TOP 3 IMPROVEMENTS (with specific rewrites)
6. PREDICTED REACH range by platform
7. BEST PLATFORM for this post
8. 2 A/B TEST VARIATIONS to try`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-chart-dots" style={{ color: "#533483" }} />Post Performance Analyzer</div>
        <div className="form-row"><label>Paste post content to analyze</label>
          <textarea value={post} onChange={e => setPost(e.target.value)} placeholder="Paste any post here to analyze its potential performance…" />
        </div>
        <button className="btn primary" onClick={analyze} disabled={loading || !post}>
          <i className="ti ti-chart-dots" />{loading ? "Analyzing…" : "Analyze Post"}
        </button>
      </div>
    );
  }

  const TABS = [
    ["compose",  "Compose & Schedule"],
    ["queue",    "Post Queue"],
    ["hashtags", "Hashtag Generator"],
    ["analyze",  "Post Analyzer"],
  ];

  const Components = { compose: ComposeTab, queue: QueueTab, hashtags: HashtagTab, analyze: AnalyzerTab };
  const TabComp = Components[tab];

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-brand-instagram" style={{ color: "#E1306C" }} />Social Media Automation</h1>
          <p>Schedule, optimize & analyze posts across all platforms simultaneously</p>
        </div>
        <div className="topbar-right">
          <span className="badge green"><i className="ti ti-clock" />{queue.filter(q => q.status === "scheduled").length} posts scheduled</span>
        </div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {TABS.map(([id, lbl]) => (
            <div key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => { setTab(id); setOutput(""); }}>{lbl}</div>
          ))}
        </div>
        {tab === "queue" ? (
          <QueueTab />
        ) : (
          <div className="grid2">
            <TabComp />
            <div className="card">
              <window.AIOutput output={output} loading={loading} emptyIcon="ti-brand-instagram" emptyText="Results will appear here" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
