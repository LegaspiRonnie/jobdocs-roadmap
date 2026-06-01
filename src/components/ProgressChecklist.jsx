export default function ProgressChecklist({ data, checkedDocs, onToggleCheck }) {
  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / data.length) * 100);

  return (
    <>
      <style>{`
        .checklist-wrapper {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
        }

        .progress-header-card {
          margin-bottom: 20px;
        }

        .progress-text-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 6px;
        }

        .progress-track-line {
          height: 8px;
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill-line {
          height: 100%;
          background: linear-gradient(90deg, #38bdf8, #34d399);
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .checkbox-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-bottom: 8px;
          cursor: pointer;
          user-select: none;
          transition: border-color 0.15s;
        }

        .checkbox-item-row:hover {
          border-color: rgba(56, 189, 248, 0.3);
        }

        .checkbox-item-row.is-done {
          border-color: rgba(52, 211, 153, 0.3);
          background: rgba(52, 211, 153, 0.03);
        }

        .checkbox-left-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .checkbox-label-title {
          font-size: 14px;
          font-weight: 600;
        }

        .custom-box-ui {
          width: 22px;
          height: 22px;
          border: 2px solid var(--border);
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s;
        }

        .checkbox-item-row.is-done .custom-box-ui {
          background: #34d399;
          border-color: #34d399;
        }
      `}</style>

      <div className="checklist-wrapper">
        <div className="progress-header-card">
          <div className="progress-text-row">
            <span>📋 Completion Tracker</span>
            <span style={{ color: "#34d399" }}>{progressPercent}% Complete</span>
          </div>
          <div className="progress-track-line">
            <div className="progress-fill-line" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {data.map((doc) => {
          const isDone = !!checkedDocs[doc.name];
          return (
            <div 
              key={doc.id} 
              className={`checkbox-item-row ${isDone ? "is-done" : ""}`}
              onClick={() => onToggleCheck(doc.name)}
            >
              <div className="checkbox-left-info">
                <span style={{ fontSize: "18px" }}>{doc.icon}</span>
                <span className="checkbox-label-title">{doc.name}</span>
              </div>

              <div className="custom-box-ui">
                {isDone && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
