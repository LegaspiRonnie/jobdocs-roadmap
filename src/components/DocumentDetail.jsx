export default function DocumentDetail({ doc, onBack }) {
  return (
    <>
      <style>{`
        .detail-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-top: 5px solid var(--accent);
          border-radius: 12px;
          padding: 26px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
          animation: slideIn 0.25s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .back-nav-link {
          background: transparent;
          border: none;
          color: var(--accent);
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .back-nav-link:hover {
          text-decoration: underline;
        }

        .detail-hero-block {
          display: flex;
          gap: 16px;
          align-items: center;
          border-bottom: 1px solid var(--border);
          padding-bottom: 20px;
          margin-bottom: 24px;
        }

        .detail-giant-icon {
          width: 60px;
          height: 60px;
          background: var(--surface2);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
        }

        .detail-main-title h2 {
          font-size: 22px;
          font-weight: 800;
          color: var(--text);
        }

        .detail-meta-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 24px;
        }

        .meta-pill {
          background: var(--surface2);
          border: 1px solid var(--border);
          padding: 12px;
          border-radius: 8px;
        }

        .meta-pill h4 {
          font-size: 11px;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 4px;
          letter-spacing: 0.5px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .meta-pill p {
          font-size: 13px;
          font-weight: 600;
          color: var(--text);
        }

        .content-heading {
          font-size: 14px;
          font-weight: 800;
          color: var(--accent);
          margin: 20px 0 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-family: 'Space Grotesk', sans-serif;
        }

        .requirements-ul {
          list-style-type: none;
          padding-left: 0;
          margin-bottom: 20px;
        }

        .requirements-ul li {
          font-size: 13.5px;
          padding: 8px 12px;
          background: #f8fafc;
          border-radius: 6px;
          margin-bottom: 6px;
          border-left: 3px solid #98a2b3;
        }

        .steps-ol {
          padding-left: 0;
          list-style: none;
          counter-reset: step-counter;
        }

        .steps-ol li {
          counter-increment: step-counter;
          position: relative;
          padding-left: 40px;
          margin-bottom: 16px;
          font-size: 13.5px;
          line-height: 1.6;
          color: #334155;
        }

        .steps-ol li::before {
          content: counter(step-counter);
          position: absolute;
          left: 0;
          top: 2px;
          width: 24px;
          height: 24px;
          background: var(--accent);
          color: white;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .tips-info-box {
          background: var(--success-soft);
          border: 1px solid #c8e6d3;
          border-radius: 8px;
          padding: 14px;
          margin-top: 24px;
          font-size: 13px;
          color: var(--success);
          line-height: 1.5;
        }

        @media (max-width: 640px) {
          .detail-card {
            padding: 20px;
          }

          .detail-meta-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="detail-card">
        <button className="back-nav-link" onClick={onBack}>
          Back to Roadmap System
        </button>

        <div className="detail-hero-block">
          <div className="detail-giant-icon">{doc.icon}</div>
          <div className="detail-main-title">
            <h2>{doc.name}</h2>
            <p style={{ fontSize: "13px", color: "var(--muted)" }}>{doc.shortDesc}</p>
          </div>
        </div>

        <div className="detail-meta-grid">
          <div className="meta-pill">
            <h4>Estimated Fees / Expenditures</h4>
            <p>{doc.estimatedCost}</p>
          </div>
          <div className="meta-pill">
            <h4>Expected Processing Timeline</h4>
            <p>{doc.estimatedTime}</p>
          </div>
        </div>

        <h3 className="content-heading">Required Submissions & Credentials</h3>
        <ul className="requirements-ul">
          {doc.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>

        <h3 className="content-heading">Step-by-Step Execution Guide</h3>
        <ol className="steps-ol">
          {doc.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>

        <div className="tips-info-box">
          <strong>Processing Note:</strong> {doc.tips}
        </div>
      </div>
    </>
  );
}
