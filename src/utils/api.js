// ================================================================
//  DIGIMARKAD  –  API Utilities
//  All calls to the Anthropic Claude API live here.
// ================================================================

/**
 * callClaude(prompt, system?)
 * Calls the Anthropic /v1/messages endpoint.
 * The API key is injected by the Anthropic platform automatically
 * when running inside claude.ai Artifacts.
 *
 * For standalone deployment you must set your own key:
 *   Replace the fetch header with:
 *     "x-api-key": "YOUR_ANTHROPIC_API_KEY"
 *
 * @param {string} prompt   – User message
 * @param {string} system   – Optional system prompt
 * @param {number} tokens   – Max tokens (default 1000)
 * @returns {Promise<string>}
 */
window.callClaude = async function callClaude(
  prompt,
  system = "You are a professional digital marketing AI assistant for DIGIMARKAD agency. Be concise, expert, and always actionable. Use numbered lists and clear sections.",
  tokens = 1200
) {
  try {
    const body = {
      model: "claude-sonnet-4-20250514",
      max_tokens: tokens,
      messages: [{ role: "user", content: prompt }],
    };
    if (system) body.system = system;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || "No response returned.";
  } catch (error) {
    console.error("[callClaude] error:", error);
    return `Error: ${error.message}\n\nPlease check your API configuration in Settings.`;
  }
};

// ── Specialized callers (thin wrappers with domain system prompts) ──

window.aiContent = (prompt) =>
  window.callClaude(
    prompt,
    "You are a viral content strategist and scriptwriter for a digital marketing agency. Create highly engaging, platform-optimized scripts and captions with specific hashtags and timing recommendations.",
    1500
  );

window.aiSEO = (prompt) =>
  window.callClaude(
    prompt,
    "You are a senior SEO strategist with expertise in technical SEO, content strategy, and link building. Provide data-driven, actionable SEO recommendations.",
    1500
  );

window.aiLeads = (prompt) =>
  window.callClaude(
    prompt,
    "You are a B2B lead generation and sales expert specializing in digital marketing agencies. Provide proven outreach templates, qualification frameworks, and prospecting strategies.",
    1500
  );

window.aiEmail = (prompt) =>
  window.callClaude(
    prompt,
    "You are an email marketing expert who writes high-converting sequences, subject lines, and campaigns. Focus on personalization, deliverability, and measurable results.",
    1500
  );

window.aiAnalytics = (prompt) =>
  window.callClaude(
    prompt,
    "You are a marketing analytics expert who turns raw data into clear, actionable insights. Provide benchmark comparisons and specific next steps for improvement.",
    1500
  );

window.aiSocial = (prompt) =>
  window.callClaude(
    prompt,
    "You are a social media expert who knows the algorithms, best practices, and content strategies for Instagram, TikTok, YouTube, LinkedIn, and Facebook. Optimize for engagement and growth.",
    1500
  );
