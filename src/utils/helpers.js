// ================================================================
//  DIGIMARKAD  –  Shared Helpers
// ================================================================

/** Copy text to clipboard and return a Promise */
window.copyToClipboard = async function(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Fallback for older browsers
    const el = document.createElement("textarea");
    el.value = text;
    el.style.position = "fixed";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    return true;
  }
};

/** Format a number with commas */
window.fmtNum = (n) => Number(n).toLocaleString();

/** Format currency */
window.fmtCurrency = (n, symbol = "$") => `${symbol}${Number(n).toLocaleString()}`;

/** Random integer between min and max (inclusive) */
window.randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/** Truncate a string */
window.truncate = (str, len = 60) =>
  str && str.length > len ? str.slice(0, len) + "…" : str;

/** Simple local storage wrapper */
window.storage = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem("dma_" + key)); }
    catch { return null; }
  },
  set: (key, val) => {
    try { localStorage.setItem("dma_" + key, JSON.stringify(val)); }
    catch { /* quota exceeded — fail silently */ }
  },
  remove: (key) => localStorage.removeItem("dma_" + key),
};

/** Platform colors map */
window.PLATFORM_COLORS = {
  Instagram:  "#E1306C",
  TikTok:     "#010101",
  YouTube:    "#FF0000",
  Facebook:   "#1877F2",
  LinkedIn:   "#0A66C2",
  "Twitter/X":"#1DA1F2",
  Pinterest:  "#E60023",
  WhatsApp:   "#25D366",
};

/** Industry list for selects */
window.INDUSTRIES = [
  "E-commerce / Retail",
  "SaaS / Software",
  "Real Estate",
  "Healthcare / Medical",
  "Restaurant / F&B",
  "Fashion / Apparel",
  "Finance / Fintech",
  "Education / EdTech",
  "Fitness / Wellness",
  "Travel / Hospitality",
  "B2B Services",
  "Local Business",
  "Non-profit",
  "Other",
];

/** All social platforms */
window.ALL_PLATFORMS = [
  "Instagram", "TikTok", "YouTube", "Facebook",
  "LinkedIn", "Twitter/X", "Pinterest",
];

/** Mock client data (replace with real DB) */
window.SAMPLE_CLIENTS = [
  { id:1, name:"TechStartup Inc",  industry:"SaaS",        location:"Toronto, CA",    revenue:"$3,200/mo", services:["SEO","Social","PPC"],   status:"active",  since:"Jan 2025" },
  { id:2, name:"FashionBrand CA",  industry:"E-commerce",  location:"Vancouver, CA",  revenue:"$2,800/mo", services:["Instagram","TikTok","Email"], status:"active",  since:"Feb 2025" },
  { id:3, name:"LocalRestaurant",  industry:"F&B",         location:"Hyderabad, IN",  revenue:"$1,500/mo", services:["Local SEO","GMB"],      status:"active",  since:"Mar 2025" },
  { id:4, name:"SaasCo USA",       industry:"SaaS",        location:"New York, US",   revenue:"$5,400/mo", services:["SEO","Content","Email"],status:"active",  since:"Oct 2024" },
  { id:5, name:"RealEstate Pro",   industry:"Real Estate", location:"Calgary, CA",    revenue:"$4,000/mo", services:["PPC","SEO","Social"],   status:"paused",  since:"Dec 2024" },
  { id:6, name:"HealthClinic Delhi",industry:"Healthcare", location:"Delhi, IN",      revenue:"$2,200/mo", services:["Local SEO","Social"],   status:"active",  since:"Apr 2025" },
];
