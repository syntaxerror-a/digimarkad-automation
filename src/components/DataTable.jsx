// ================================================================
//  DIGIMARKAD  –  DataTable Component
// ================================================================

/**
 * DataTable
 * @param {Array}  columns  – [{ key, label, render? }]
 * @param {Array}  rows     – array of objects
 * @param {Function} onDelete – optional row delete handler
 */
window.DataTable = function DataTable({ columns, rows, onDelete, emptyText = "No records yet" }) {
  if (!rows || rows.length === 0) {
    return (
      <div className="ai-empty" style={{ minHeight: 100 }}>
        <i className="ti ti-table-off" />
        <p>{emptyText}</p>
      </div>
    );
  }

  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table">
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col.key}>{col.label}</th>
            ))}
            {onDelete && <th style={{ width: 40 }} />}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map(col => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
              {onDelete && (
                <td>
                  <button
                    className="btn small icon"
                    onClick={() => onDelete(row)}
                    title="Delete"
                  >
                    <i className="ti ti-trash" style={{ color: "var(--danger)" }} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
