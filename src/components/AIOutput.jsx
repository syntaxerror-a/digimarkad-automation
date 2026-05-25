// ================================================================
//  DIGIMARKAD  –  AIOutput Component
//  Reusable panel for showing AI-generated text with copy button.
// ================================================================

window.AIOutput = function AIOutput({
  output,
  loading,
  emptyIcon = "ti-sparkles",
  emptyText = "Results will appear here",
  maxHeight = 440,
  onCopy,
}) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    if (!output) return;
    await window.copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (loading) {
    return (
      <div className="ai-output">
        <span className="loading-dots">Generating</span>
      </div>
    );
  }

  if (!output) {
    return (
      <div className="ai-empty">
        <i className={`ti ${emptyIcon}`} />
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb8">
        <span className="badge green"><i className="ti ti-check" /> Generated</span>
        <button className="btn small" onClick={handleCopy}>
          <i className={`ti ${copied ? "ti-check" : "ti-copy"}`} />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="ai-output" style={{ maxHeight }}>
        {output}
      </div>
    </div>
  );
};

// ── Two-column AI layout (form left, output right) ────────────
window.AIPanel = function AIPanel({ formContent, output, loading, emptyIcon, emptyText }) {
  return (
    <div className="grid2">
      <div className="card">{formContent}</div>
      <div className="card">
        <window.AIOutput
          output={output}
          loading={loading}
          emptyIcon={emptyIcon}
          emptyText={emptyText}
        />
      </div>
    </div>
  );
};
