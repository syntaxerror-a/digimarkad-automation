// ================================================================
//  DIGIMARKAD  –  Email Campaigns Module
//  Covers: drip sequences, subject lines, newsletter, templates
// ================================================================
const { useState: useStateEM } = React;

window.EmailModule = function EmailModule() {
  const [tab, setTab] = useStateEM("sequence");
  const [output, setOutput] = useStateEM("");
  const [loading, setLoading] = useStateEM(false);

  // ── Email Sequence ────────────────────────────────────────────
  function SequenceTab() {
    const [form, setForm] = useStateEM({ goal: "", audience: "", service: "", emails: "5", tone: "Professional & Warm" });

    async function generate() {
      if (!form.goal) return;
      setLoading(true); setOutput("");
      const out = await window.aiEmail(
        `Create a complete ${form.emails}-email marketing sequence:
Goal: ${form.goal}
Target Audience: ${form.audience || "business owners"}
Service/Product: ${form.service || "digital marketing services"}
Tone: ${form.tone}

For each email provide:
- EMAIL #N: Trigger (Day X or Action-based)
- SUBJECT LINE (primary) + 2 A/B variations
- PREVIEW TEXT (90 chars)
- BODY (professional, conversational, 150-250 words)
- CTA BUTTON TEXT
- EXPECTED OPEN RATE benchmark
- TIMING: Best day + time to send

End with:
- Recommended email platform settings
- Segmentation tips
- Re-engagement strategy for non-openers`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-mail-forward" style={{ color: "#2563eb" }} />Email Drip Sequence Builder</div>
        <div className="form-row"><label>Campaign Goal *</label>
          <input type="text" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} placeholder="e.g. Book a free strategy call, Download our guide, Purchase SEO services" />
        </div>
        <div className="form-row"><label>Target Audience</label>
          <input type="text" value={form.audience} onChange={e => setForm({ ...form, audience: e.target.value })} placeholder="e.g. Small business owners, E-commerce brands, SaaS founders" />
        </div>
        <div className="form-row"><label>Service / Product</label>
          <input type="text" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} placeholder="e.g. Full-stack digital marketing, SEO services, social media management" />
        </div>
        <div className="grid2" style={{ marginBottom: 0 }}>
          <div className="form-row"><label>Number of Emails</label>
            <select value={form.emails} onChange={e => setForm({ ...form, emails: e.target.value })}>
              {["3", "5", "7", "10", "14"].map(n => <option key={n}>{n} emails</option>)}
            </select>
          </div>
          <div className="form-row"><label>Tone</label>
            <select value={form.tone} onChange={e => setForm({ ...form, tone: e.target.value })}>
              {["Professional & Warm", "Casual & Friendly", "Authoritative", "Storytelling", "Data-driven"].map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="mt12">
          <button className="btn primary" onClick={generate} disabled={loading || !form.goal}>
            <i className="ti ti-sparkles" />{loading ? "Writing sequence…" : `Generate ${form.emails}-Email Sequence`}
          </button>
        </div>
      </div>
    );
  }

  // ── Subject Line Generator ────────────────────────────────────
  function SubjectsTab() {
    const [goal, setGoal] = useStateEM("");
    const [audience, setAudience] = useStateEM("");

    async function generate() {
      if (!goal) return;
      setLoading(true); setOutput("");
      const out = await window.aiEmail(
        `Generate 25 high-converting email subject lines for:
Goal: "${goal}"
Audience: ${audience || "business owners"}

Organize into 5 categories (5 each):
1. CURIOSITY-BASED (create an open loop, tease without revealing)
2. BENEFIT-DRIVEN (clear value proposition, what they gain)
3. URGENCY/SCARCITY (time-sensitive, FOMO)
4. PERSONALIZATION (use their situation, not just [First Name])
5. PATTERN INTERRUPT (unexpected, stop the scroll)

For each subject line:
- Predicted open rate range
- Best use case
- Emoji variation
- Mobile preview (first 40 chars shown on phone)
- Spam score note (avoid trigger words)

Bonus: 5 subject lines to NEVER use (and why).`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-cursor-text" style={{ color: "#2563eb" }} />Subject Line Generator</div>
        <div className="form-row"><label>Email Goal / Topic *</label>
          <input type="text" value={goal} onChange={e => setGoal(e.target.value)} placeholder="e.g. Book a free audit, Black Friday sale, Case study results" />
        </div>
        <div className="form-row"><label>Target Audience</label>
          <input type="text" value={audience} onChange={e => setAudience(e.target.value)} placeholder="e.g. E-commerce store owners, SaaS founders" />
        </div>
        <button className="btn primary" onClick={generate} disabled={loading || !goal}>
          <i className="ti ti-sparkles" />{loading ? "Generating…" : "Generate 25 Subject Lines"}
        </button>
      </div>
    );
  }

  // ── Newsletter Builder ────────────────────────────────────────
  function NewsletterTab() {
    const [topic, setTopic] = useStateEM("");
    const [week, setWeek] = useStateEM("");

    async function build() {
      if (!topic) return;
      setLoading(true); setOutput("");
      const out = await window.aiEmail(
        `Write a complete weekly marketing newsletter for DIGIMARKAD agency.
Topic: "${topic}"
Edition: ${week || "this week"}

Structure:
1. FROM THE DESK (2-3 sentence personal intro hook)
2. SUBJECT LINE OPTIONS (3 variations)
3. PREVIEW TEXT
4. MAIN STORY (280-320 words — insight, trend, or lesson)
5. QUICK TIP OF THE WEEK (1 actionable tactic, 50 words)
6. INDUSTRY NEWS (3 bullet points from this week)
7. TOOL SPOTLIGHT (one free/low-cost tool recommendation)
8. CLIENT WIN (template placeholder — customize per send)
9. THIS WEEK'S QUESTION (engagement prompt)
10. CTA SECTION (book call / reply / read blog)
11. P.S. LINE (extra value or reminder)

Tone: Trusted advisor — knowledgeable but never stuffy. Like a smart friend who happens to be a marketing expert.`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-news" style={{ color: "#2563eb" }} />Weekly Newsletter Builder</div>
        <div className="form-row"><label>Newsletter Topic *</label>
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. AI marketing trends, Instagram algorithm update, Black Friday strategy" />
        </div>
        <div className="form-row"><label>Edition / Date (optional)</label>
          <input type="text" value={week} onChange={e => setWeek(e.target.value)} placeholder="e.g. Week 21, May 2025" />
        </div>
        <button className="btn primary" onClick={build} disabled={loading || !topic}>
          <i className="ti ti-news" />{loading ? "Writing newsletter…" : "Build Newsletter"}
        </button>
      </div>
    );
  }

  // ── Templates ─────────────────────────────────────────────────
  function TemplatesTab() {
    const [selected, setSelected] = useStateEM(null);

    const TEMPLATES = [
      { name: "Welcome Email",       icon: "ti-hand-finger",   desc: "First email to new subscribers/clients" },
      { name: "Free Audit Offer",    icon: "ti-search",        desc: "Offer a free marketing audit" },
      { name: "Case Study Email",    icon: "ti-trophy",        desc: "Share a client success story" },
      { name: "Proposal Follow-up",  icon: "ti-file-invoice",  desc: "Follow up after sending a proposal" },
      { name: "Re-engagement",       icon: "ti-repeat",        desc: "Win back cold subscribers" },
      { name: "Referral Request",    icon: "ti-share",         desc: "Ask clients for referrals" },
      { name: "Monthly Report",      icon: "ti-chart-bar",     desc: "Send monthly performance summary" },
      { name: "Upsell / Cross-sell", icon: "ti-trending-up",   desc: "Offer additional services" },
      { name: "Thank You",           icon: "ti-heart",         desc: "Post-purchase or post-call thank you" },
      { name: "Last Chance",         icon: "ti-clock",         desc: "Urgency / deadline-based email" },
    ];

    async function generateTemplate(t) {
      setSelected(t.name);
      setLoading(true); setOutput("");
      const out = await window.aiEmail(
        `Write a complete "${t.name}" email template for a digital marketing agency (DIGIMARKAD).
Purpose: ${t.desc}

Include:
- SUBJECT LINE (primary + 2 A/B variations)
- PREVIEW TEXT
- GREETING
- FULL EMAIL BODY with [PERSONALIZATION VARIABLES] in brackets
- CTA BUTTON TEXT (+ backup hyperlink text)
- P.S. LINE
- RECOMMENDED SEND TIME
- PRO TIP for this template type

Make it warm, professional, and immediately usable — just fill in the brackets.`
      );
      setOutput(out); setLoading(false);
    }

    return (
      <div className="card">
        <div className="card-title"><i className="ti ti-template" style={{ color: "#2563eb" }} />Email Templates Library</div>
        <div className="card-sub">Click any template to generate a ready-to-use email</div>
        <div className="flex wrap gap8 mt12">
          {TEMPLATES.map(t => (
            <button
              key={t.name}
              className={`btn small${selected === t.name ? " primary" : ""}`}
              onClick={() => generateTemplate(t)}
              disabled={loading}
              title={t.desc}
            >
              <i className={`ti ${t.icon}`} />{t.name}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const TABS = [
    ["sequence",   "Email Sequences"],
    ["subjects",   "Subject Lines"],
    ["newsletter", "Newsletter Builder"],
    ["templates",  "Templates Library"],
  ];

  return (
    <div>
      <div className="topbar">
        <div>
          <h1><i className="ti ti-mail" style={{ color: "#2563eb" }} />Email Marketing Automation</h1>
          <p>Build high-converting sequences, newsletters & templates for all clients</p>
        </div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {TABS.map(([id, lbl]) => (
            <div key={id} className={`tab${tab === id ? " active" : ""}`} onClick={() => { setTab(id); setOutput(""); }}>{lbl}</div>
          ))}
        </div>
        <div className="grid2">
          {tab === "sequence"   && <SequenceTab />}
          {tab === "subjects"   && <SubjectsTab />}
          {tab === "newsletter" && <NewsletterTab />}
          {tab === "templates"  && <TemplatesTab />}
          <div className="card">
            <window.AIOutput output={output} loading={loading} emptyIcon="ti-mail" emptyText="Your email content will appear here" />
          </div>
        </div>
      </div>
    </div>
  );
};
