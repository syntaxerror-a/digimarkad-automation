// ================================================================
//  DIGIMARKAD  –  Content & Video Module
//  Covers: video scripts, captions, image prompts, content calendar
// ================================================================
const { useState: useStateC } = React;

window.ContentModule = function ContentModule() {
  const [tab, setTab] = useStateC("script");
  const [output, setOutput] = useStateC("");
  const [loading, setLoading] = useStateC(false);

  // ── Script Generator ─────────────────────────────────────────
  function ScriptTab() {
    const [form, setForm] = useStateC({
      client: "", niche: "", topic: "", platform: "YouTube",
      style: "Educational", duration: "5-7 minutes",
    });

    async function generate() {
      if (!form.topic) return;
      setLoading(true); setOutput("");
      const out = await window.aiContent(
        `Generate a complete ${form.platform} video script.
Client: ${form.client || "our client"}
Industry/Niche: ${form.niche || "general"}
Topic: ${form.topic}
Style: ${form.style}
Duration: ${form.duration}

Provide:
1. HOOK (first 5 seconds – attention-grabbing opening line)
2. INTRO (15-20 seconds – who you are, what they'll learn)
3. MAIN CONTENT (timestamped sections with talking points)
4. CALL TO ACTION (clear, specific CTA)
5. OUTRO (outro script)
6. THUMBNAIL CONCEPT (visual description)
7. HASHTAGS (20 platform-optimized hashtags)
8. BEST POSTING TIME recommendation
9. DESCRIPTION (SEO-optimized video description, 150 words)`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-video" style={{ color: "#e94560" }} />Video Script Generator</div>
        <div className="grid2" style={{ marginBottom: 0 }}>
          <div>
            <div className="form-row"><label>Client / Brand</label>
              <input type="text" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} placeholder="e.g. FashionBrand Canada" />
            </div>
            <div className="form-row"><label>Industry / Niche</label>
              <input type="text" value={form.niche} onChange={e => setForm({ ...form, niche: e.target.value })} placeholder="e.g. Fashion, SaaS, Fitness" />
            </div>
            <div className="form-row"><label>Video Topic *</label>
              <input type="text" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="e.g. 5 ways to grow on Instagram in 2025" />
            </div>
          </div>
          <div>
            <div className="form-row"><label>Platform</label>
              <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
                {["YouTube", "Instagram Reels", "TikTok", "Facebook Reels", "YouTube Shorts"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-row"><label>Content Style</label>
              <select value={form.style} onChange={e => setForm({ ...form, style: e.target.value })}>
                {["Educational", "Entertaining", "How-To Tutorial", "Trending / Viral", "Storytelling", "Promotional", "Behind-the-Scenes"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-row"><label>Duration</label>
              <select value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })}>
                {["15-30 seconds (Short/Reel)", "60-90 seconds (Reel)", "2-3 minutes", "5-7 minutes", "10-15 minutes", "20+ minutes (Long form)"].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </div>
        <div className="mt12">
          <button className="btn primary" onClick={generate} disabled={loading || !form.topic}>
            <i className="ti ti-sparkles" />{loading ? "Generating script…" : "Generate Video Script"}
          </button>
        </div>
      </div>
    );
  }

  // ── Caption Generator ────────────────────────────────────────
  function CaptionTab() {
    const [form, setForm] = useStateC({ topic: "", niche: "", platform: "Instagram", tone: "Engaging" });

    async function generate() {
      if (!form.topic) return;
      setLoading(true); setOutput("");
      const out = await window.aiContent(
        `Generate 5 high-performing ${form.platform} caption variations for:
Topic: "${form.topic}"
Niche: ${form.niche || "digital marketing"}
Tone: ${form.tone}

For each caption provide:
- Caption text (platform-optimized length)
- Emojis integrated naturally
- Strong hook opening
- Engagement question or CTA at the end
- 10-15 relevant hashtags (mix of sizes)
- Target audience note

Label each: CAPTION 1 through 5 with a brief strategy note.`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-pencil" style={{ color: "#533483" }} />Caption Generator</div>
        <div className="form-row"><label>Post Topic *</label>
          <input type="text" value={form.topic} onChange={e => setForm({ ...form, topic: e.target.value })} placeholder="e.g. New product launch, behind-the-scenes, tips post" />
        </div>
        <div className="form-row"><label>Niche</label>
          <input type="text" value={form.niche} onChange={e => setForm({ ...form, niche: e.target.value })} placeholder="e.g. Fashion, SaaS, Real Estate" />
        </div>
        <div className="grid2" style={{ marginBottom: 0 }}>
          <div className="form-row"><label>Platform</label>
            <select value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
              {window.ALL_PLATFORMS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-row"><label>Tone</label>
            <select value={form.tone} onChange={e => setForm({ ...form, tone: e.target.value })}>
              {["Engaging", "Professional", "Funny/Witty", "Inspirational", "Urgent/Promotional", "Conversational"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !form.topic}>
          <i className="ti ti-sparkles" />{loading ? "Generating…" : "Generate 5 Captions"}
        </button>
      </div>
    );
  }

  // ── Image Prompt Generator ───────────────────────────────────
  function ImageTab() {
    const [desc, setDesc] = useStateC("");
    const [platform, setPlatform] = useStateC("Instagram");

    async function generate() {
      if (!desc) return;
      setLoading(true); setOutput("");
      const out = await window.callClaude(
        `Create 4 detailed AI image generation prompts (for DALL-E 3, Midjourney, Stable Diffusion) for this ${platform} post:
Description: "${desc}"

For each prompt provide:
1. Full detailed prompt (style, lighting, composition, colors, mood, technical specs, aspect ratio)
2. Negative prompt (what to avoid)
3. Best AI tool for this style
4. Thumbnail text overlay suggestions
5. Brand color recommendations
6. Image format (square/portrait/landscape) and dimensions

Make each prompt visually distinct – photorealistic, illustrated, minimalist, bold graphic.`,
        "You are a creative director specializing in social media visuals and AI image generation prompts."
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-photo" style={{ color: "#0f7173" }} />AI Image Prompt Generator</div>
        <div className="card-sub">Generate prompts for DALL-E 3, Midjourney, or Stable Diffusion</div>
        <div className="form-row"><label>Describe your post / campaign *</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. A luxury fashion brand summer collection shoot. Bright, airy, targeting young women in Canada. Modern minimalist aesthetic." style={{ minHeight: 90 }} />
        </div>
        <div className="form-row"><label>Platform</label>
          <select value={platform} onChange={e => setPlatform(e.target.value)}>
            {["Instagram Post", "Instagram Story", "TikTok", "YouTube Thumbnail", "Facebook Cover", "LinkedIn Banner"].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !desc}>
          <i className="ti ti-wand" />{loading ? "Generating prompts…" : "Generate Image Prompts"}
        </button>
      </div>
    );
  }

  // ── Content Calendar ─────────────────────────────────────────
  function CalendarTab() {
    const [industry, setIndustry] = useStateC("");
    const [weeks, setWeeks] = useStateC("4");

    async function generate() {
      if (!industry) return;
      setLoading(true); setOutput("");
      const out = await window.aiContent(
        `Create a detailed ${weeks}-week social media content calendar for a client in the "${industry}" industry.
For each day across all 7 days per week include:
- Day & Date placeholder
- Platform (Instagram / TikTok / YouTube / Facebook / LinkedIn)
- Post type (Reel, Carousel, Story, Short, Static Post, Long Video)
- Topic / Caption idea
- Best posting time
- Hashtag category
- Content pillar (Educate / Entertain / Promote / Engage / Inspire)

Format clearly by week. Be specific and immediately usable.`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-calendar" style={{ color: "#2563eb" }} />Content Calendar Generator</div>
        <div className="flex items-center gap10 mb12">
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Client Industry *</label>
            <input type="text" value={industry} onChange={e => setIndustry(e.target.value)} placeholder="e.g. Real Estate, Fitness, E-commerce, SaaS" />
          </div>
          <div style={{ width: 120 }}>
            <label style={{ display: "block", marginBottom: 4 }}>Duration</label>
            <select value={weeks} onChange={e => setWeeks(e.target.value)}>
              {["2", "4", "8", "12"].map(w => <option key={w}>{w} weeks</option>)}
            </select>
          </div>
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !industry}>
          <i className="ti ti-calendar-plus" />{loading ? "Building calendar…" : `Generate ${weeks}-Week Calendar`}
        </button>
      </div>
    );
  }

  const TABS = [
    ["script",   "Video Scripts"],
    ["captions", "Captions"],
    ["images",   "Image Prompts"],
    ["calendar", "Content Calendar"],
  ];

  const FormComponents = { script: ScriptTab, captions: CaptionTab, images: ImageTab, calendar: CalendarTab };
  const FormComp = FormComponents[tab];

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-video" style={{ color: "#e94560" }} />Content & Video Automation</h1>
          <p>Generate scripts, captions, image prompts & content calendars for all platforms</p>
        </div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {TABS.map(([id, lbl]) => (
            <div key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => { setTab(id); setOutput(""); }}>{lbl}</div>
          ))}
        </div>
        <div className="grid2">
          <FormComp />
          <div className="card">
            <window.AIOutput
              output={output}
              loading={loading}
              emptyIcon="ti-video"
              emptyText="Fill in the form and click Generate to create AI-powered content"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
