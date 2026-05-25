# ⚡ DIGIMARKAD Automation Platform
## Complete 10-Step Setup Guide

---

## What You're Building

A **free, AI-powered digital marketing automation platform** hosted on GitHub Pages. No server costs. No monthly fees. Powered by Claude AI.

**7 Automation Modules:**
1. 🎬 Content & Video — Scripts, captions, image prompts, content calendars
2. 📱 Social Media — Post scheduling, hashtag generator, post analyzer
3. 🔍 SEO Automation — Keywords, on-page briefs, site audits, daily submissions
4. 👥 Lead Generation — ICP builder, outreach sequences, CRM, BANT scorer
5. 📧 Email Campaigns — Drip sequences, subject lines, newsletters, templates
6. 📊 Analytics — Client reports, data insights, competitor analysis, ROI calc
7. 🏢 Client Manager — Client CRM, 90-day strategies, proposals

---

## ✅ STEP 1 — Create a GitHub Account (if you don't have one)

1. Go to **https://github.com**
2. Click **Sign up**
3. Enter your email, create a password, choose a username
4. Verify your email address
5. ✅ Done — you have a free GitHub account

---

## ✅ STEP 2 — Create a New Repository

1. Click the **+** icon (top right of GitHub) → **New repository**
2. Set:
   - **Repository name:** `digimarkad-automation`
   - **Description:** `AI-powered digital marketing automation platform`
   - **Visibility:** ✅ Public (required for free GitHub Pages)
3. Check ✅ **Add a README file**
4. Click **Create repository**
5. ✅ Your repo is live at: `github.com/YOUR-USERNAME/digimarkad-automation`

---

## ✅ STEP 3 — Upload All Project Files

You need to upload the entire project folder structure:

```
digimarkad-automation/
├── index.html
├── src/
│   ├── styles.css
│   ├── App.jsx
│   ├── utils/
│   │   ├── api.js
│   │   └── helpers.js
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── AIOutput.jsx
│   │   └── DataTable.jsx
│   └── modules/
│       ├── Dashboard.jsx
│       ├── Content.jsx
│       ├── Social.jsx
│       ├── SEO.jsx
│       ├── Leads.jsx
│       ├── Email.jsx
│       ├── Analytics.jsx
│       ├── Clients.jsx
│       └── Settings.jsx
└── .github/
    └── workflows/
        └── deploy.yml
```

**How to upload:**

### Option A — GitHub Web Interface (easiest, no coding needed)
1. In your repo, click **Add file** → **Upload files**
2. Drag and drop all files (maintaining folder structure)
3. OR use **Add file** → **Create new file** for each file (paste the code)
4. Click **Commit changes** after each file

### Option B — GitHub Desktop App (recommended)
1. Download **GitHub Desktop** from https://desktop.github.com
2. Sign in with your GitHub account
3. Clone your repo: **File** → **Clone Repository** → select `digimarkad-automation`
4. Copy all project files into the cloned folder on your computer
5. In GitHub Desktop: add commit message → **Commit to main** → **Push origin**

### Option C — Git Command Line
```bash
git clone https://github.com/YOUR-USERNAME/digimarkad-automation.git
cd digimarkad-automation
# Copy all files here
git add .
git commit -m "Initial: DIGIMARKAD Automation Platform v2"
git push origin main
```

---

## ✅ STEP 4 — Get Your Anthropic API Key (Free to start)

The platform runs on **Claude AI** — you need an API key.

1. Go to **https://console.anthropic.com**
2. Click **Sign up** (free account)
3. Go to **API Keys** → **Create Key**
4. Copy your key — it looks like: `sk-ant-api03-...`
5. **Keep it secret** — never share it publicly

**Cost:** Anthropic offers free credits for new accounts. After that, usage costs approximately:
- ~$0.003 per 1,000 tokens (~750 words)
- A typical generation = $0.01–$0.05
- 100 generations/day ≈ $1–$5/day

---

## ✅ STEP 5 — Add Your API Key to the Platform

Open `src/utils/api.js` and find this section:

```javascript
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
```

**Add your API key header:**
```javascript
headers: {
  "Content-Type": "application/json",
  "x-api-key": "YOUR_API_KEY_HERE",
  "anthropic-version": "2023-06-01",
  "anthropic-dangerous-direct-browser-access": "true",
},
```

> ⚠️ **SECURITY NOTE:** For a client-facing tool, move API calls to a backend.
> For internal agency use only, browser-direct is acceptable.
> Never commit your API key to a public repo — use GitHub Secrets instead.

**Using GitHub Secrets (safer):**
1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Name: `ANTHROPIC_API_KEY`, Value: your key
4. Reference it in the workflow if you add a build step

---

## ✅ STEP 6 — Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source** → select **GitHub Actions**
5. Click **Save**
6. ✅ GitHub Pages is now enabled

Your site will be live at:
```
https://YOUR-USERNAME.github.io/digimarkad-automation/
```

---

## ✅ STEP 7 — Trigger Your First Deployment

The `deploy.yml` workflow auto-deploys on every push to `main`.

To trigger manually:
1. Go to your repo → **Actions** tab
2. Click **Deploy DIGIMARKAD Automation Platform**
3. Click **Run workflow** → **Run workflow**
4. Watch the deployment run (takes ~1-2 minutes)
5. ✅ Green checkmark = deployed successfully

---

## ✅ STEP 8 — Connect Your Real Social Media Accounts

The platform generates content — to **actually post automatically**, connect these APIs:

### Instagram & Facebook (Meta)
1. Go to **https://developers.facebook.com**
2. Create an app → Add **Instagram Graph API** product
3. Get your **Page Access Token** and **Instagram Business Account ID**
4. Update `src/modules/Social.jsx` — replace the `schedulePost()` function with a real API call

### TikTok
1. Go to **https://developers.tiktok.com**
2. Create an app → Get **Content Posting API** access
3. Get your **access token** after OAuth

### LinkedIn
1. Go to **https://developer.linkedin.com**
2. Create an app → Request **Share on LinkedIn** permission
3. Get your **OAuth 2.0 token**

### YouTube
1. Go to **https://console.cloud.google.com**
2. Enable **YouTube Data API v3**
3. Create **OAuth 2.0 credentials**

> **Free Alternative:** Use **Buffer** or **Later** free plans as a posting bridge —
> generate content in the platform, then push to Buffer via their free API.

---

## ✅ STEP 9 — Set Up Daily Automation (Free with GitHub Actions)

Use GitHub Actions as a free cron scheduler to run daily tasks automatically.

Create `.github/workflows/daily-automation.yml`:

```yaml
name: Daily Marketing Automation

on:
  schedule:
    - cron: '0 9 * * *'   # Run every day at 9 AM UTC
  workflow_dispatch:

jobs:
  run-automation:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Daily SEO Submissions
        run: |
          echo "Submitting URLs to search engines..."
          # Add your submission script here
          # node scripts/submit-urls.js

      - name: Generate Daily Content Ideas
        run: |
          echo "Generating content calendar..."
          # node scripts/generate-content.js

      - name: Send Leads Report
        run: |
          echo "Sending daily leads summary..."
          # node scripts/leads-report.js
```

This runs **free** (GitHub gives 2,000 minutes/month free for public repos).

---

## ✅ STEP 10 — Customize for Your Brand

### Update Agency Branding
In `src/components/Sidebar.jsx`, find:
```javascript
<h2>⚡ DIGIMARKAD</h2>
<span>Automation Platform v2.0</span>
```
Change to your agency name.

### Add Your Logo
1. Add `public/logo.png` to your repo
2. Replace the text logo in the Sidebar with an `<img>` tag

### Custom Domain (optional, free)
1. Buy a domain (e.g., `tools.digimarkad.com`) — ~$10/year
2. In GitHub repo → **Settings** → **Pages** → **Custom domain**
3. Enter your domain and save
4. Update your domain's DNS: Add a CNAME record pointing to `YOUR-USERNAME.github.io`

### Add Password Protection (for client-facing use)
In `src/App.jsx`, add before the return:
```javascript
const [auth, setAuth] = useState(false);
const [pass, setPass] = useState("");
const SECRET = "your-password-here";

if (!auth) return (
  <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh"}}>
    <div style={{textAlign:"center",padding:40}}>
      <h2>DIGIMARKAD Internal Tools</h2>
      <input type="password" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Enter password" style={{margin:"16px 0",display:"block",padding:"10px 16px"}}/>
      <button onClick={()=>{if(pass===SECRET)setAuth(true)}} style={{padding:"10px 24px",background:"#e94560",color:"#fff",border:"none",borderRadius:8,cursor:"pointer"}}>
        Access Platform
      </button>
    </div>
  </div>
);
```

---

## 🚀 You're Live!

Your DIGIMARKAD Automation Platform is now running at:
```
https://YOUR-USERNAME.github.io/digimarkad-automation/
```

### What Each Module Does

| Module | What It Automates |
|--------|------------------|
| Content & Video | Generates YouTube/Reel/TikTok scripts, captions, image prompts |
| Social Media | Post scheduling queue, hashtag strategy, post optimization |
| SEO | Keyword research, on-page briefs, audits, daily URL submissions |
| Lead Generation | ICP strategy, outreach sequences, CRM, BANT scoring |
| Email Campaigns | Drip sequences, subject lines, newsletters, templates |
| Analytics | Client reports, data insights, competitor analysis, ROI calculator |
| Client Manager | Client CRM, 90-day strategies, proposals |

---

## 💡 Free Tools to Use Alongside This Platform

| Purpose | Free Tool |
|---------|-----------|
| Image generation | Adobe Firefly (free tier), Bing Image Creator |
| Video creation | CapCut (free), DaVinci Resolve |
| Post scheduling | Buffer (3 channels free), Later (free) |
| Email sending | Mailchimp (500 contacts free), Brevo |
| CRM | HubSpot (free CRM), Notion |
| Analytics | Google Analytics 4 (free), Search Console (free) |
| Keyword research | Google Keyword Planner (free), Ubersuggest (3 searches/day) |
| Backlink building | HARO (free), Google My Business (free) |

---

## 🆘 Troubleshooting

**Site shows 404:** Wait 5-10 minutes after first deploy. Check Actions tab for errors.

**AI not generating:** Check your API key in `src/utils/api.js`. Make sure you added the `anthropic-dangerous-direct-browser-access` header.

**Files not loading:** Make sure all file paths in `index.html` exactly match your folder structure (case-sensitive).

**Styles broken:** Make sure `src/styles.css` uploaded correctly and the link in `index.html` is correct.

---

## 📞 Support
Website: https://digimarkad.com
