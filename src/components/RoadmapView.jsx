export default function RoadmapView({ data, checkedDocs, onSelectNode, onToggleDone }) {
  return (
    <>
      <style>{`
        .roadmap-tree {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4px 0 12px;
        }

        .roadmap-node-wrapper {
          position: relative;
          width: 100%;
          max-width: 800px;
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          column-gap: 14px;
        }

        .roadmap-node-wrapper:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 26px;
          top: 58px;
          bottom: -16px;
          width: 2px;
          background: #cfd6df;
        }

        .step-number {
          position: relative;
          z-index: 2;
          width: 54px;
          height: 54px;
          border-radius: 8px;
          background: #ffffff;
          color: var(--accent);
          border: 1px solid #b8c4d2;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 18px;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
        }

        .roadmap-box {
          width: 100%;
          background: #ffffff;
          border: 1px solid var(--border);
          border-left: 5px solid var(--accent);
          border-radius: 10px;
          padding: 18px;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.2s;
          display: grid;
          grid-template-columns: auto minmax(0, 1fr) auto;
          gap: 16px;
          align-items: center;
          position: relative;
          margin-bottom: 22px;
          box-shadow: 0 6px 18px rgba(15, 23, 42, 0.05);
        }

        .roadmap-box:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(15, 23, 42, 0.08);
          border-color: #b8c4d2;
          border-left-color: var(--accent);
        }

        .roadmap-box.is-done {
          border-left-color: var(--success);
          background: linear-gradient(90deg, var(--success-soft), #ffffff 22%);
        }

        .node-avatar-sphere {
          width: 54px;
          height: 54px;
          border-radius: 8px;
          background: var(--surface2);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 25px;
          flex-shrink: 0;
        }

        .node-main-info {
          flex: 1;
          min-width: 0;
        }

        .node-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 7px;
        }

        .node-heading-text {
          font-size: 16px;
          font-weight: 800;
          color: #17212f;
        }

        .node-badge-tag {
          font-size: 10px;
          font-weight: 800;
          padding: 4px 8px;
          border-radius: 5px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #344054;
          background: #f2f4f7;
          border: 1px solid #d0d5dd;
          white-space: nowrap;
        }

        .node-summary-paragraph {
          font-size: 13px;
          color: var(--muted);
          line-height: 1.65;
          margin-bottom: 10px;
        }

        .node-helper-text {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .helper-chip {
          font-size: 11px;
          font-weight: 700;
          color: #475467;
          background: #f8fafc;
          border: 1px solid #e4e7ec;
          border-radius: 5px;
          padding: 5px 8px;
        }

        .helper-chip.color {
          color: var(--accent);
          background: #eef3f8;
          border-color: #c9d6e4;
        }

        .helper-chip.done {
          color: var(--success);
          background: var(--success-soft);
          border-color: #c8e6d3;
        }

        .node-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 9px;
          flex-shrink: 0;
        }

        .done-toggle-btn {
          min-width: 116px;
          min-height: 38px;
          border-radius: 7px;
          border: 1px solid #b8c4d2;
          background: #ffffff;
          color: var(--accent);
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          transition: all 0.2s;
        }

        .done-toggle-btn:hover {
          background: #eef3f8;
          border-color: var(--accent);
        }

        .done-toggle-btn.is-done {
          border-color: #9cc8ad;
          background: var(--success-soft);
          color: var(--success);
        }

        .check-icon {
          width: 18px;
          height: 18px;
          border: 2px solid currentColor;
          border-radius: 4px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .action-docs-indicator {
          font-size: 11px;
          font-weight: 800;
          color: #667085;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.4px;
        }

        @media (max-width: 720px) {
          .roadmap-node-wrapper {
            grid-template-columns: 42px minmax(0, 1fr);
            column-gap: 10px;
          }

          .roadmap-node-wrapper:not(:last-child)::after {
            left: 20px;
          }

          .step-number {
            width: 42px;
            height: 42px;
            border-radius: 7px;
            font-size: 15px;
          }

          .roadmap-box {
            grid-template-columns: auto minmax(0, 1fr);
            align-items: flex-start;
            gap: 12px;
            padding: 14px;
          }

          .node-actions {
            grid-column: 1 / -1;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            padding-left: 66px;
          }

          .node-header-row {
            align-items: flex-start;
            flex-direction: column;
          }

          .done-toggle-btn {
            min-width: 108px;
          }
        }

        @media (max-width: 460px) {
          .node-actions {
            padding-left: 0;
          }
        }
      `}</style>

      <div className="roadmap-tree">
        {data.map((node, index) => {
          const isDone = !!checkedDocs[node.id];
          const step = String(index + 1).padStart(2, "0");

          return (
            <div key={node.id} className="roadmap-node-wrapper">
              <div className="step-number">{step}</div>
              <div
                className={`roadmap-box ${isDone ? "is-done" : ""}`}
                onClick={() => onSelectNode(node.id)}
              >
                <div className="node-avatar-sphere">{node.icon}</div>

                <div className="node-main-info">
                  <div className="node-header-row">
                    <h3 className="node-heading-text">{node.name}</h3>
                    <span className="node-badge-tag">{node.tag}</span>
                  </div>
                  <p className="node-summary-paragraph">{node.shortDesc}</p>
                  <div className="node-helper-text">
                    <span className="helper-chip color">Step {index + 1} of {data.length}</span>
                    <span className="helper-chip">Open requirements</span>
                    <span className={`helper-chip ${isDone ? "done" : ""}`}>
                      {isDone ? "Completed" : "Pending"}
                    </span>
                  </div>
                </div>

                <div className="node-actions">
                  <button
                    type="button"
                    className={`done-toggle-btn ${isDone ? "is-done" : ""}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleDone(node.id);
                    }}
                    aria-pressed={isDone}
                  >
                    <span className="check-icon">
                      {isDone && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    {isDone ? "Done" : "Mark done"}
                  </button>
                  <div className="action-docs-indicator">View details</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
