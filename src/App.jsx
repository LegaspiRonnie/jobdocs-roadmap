import { useEffect, useState } from "react";
import { DOCUMENTATION_DATA } from "./data/documentationData";
import RoadmapView from "./components/RoadmapView";
import DocumentDetail from "./components/DocumentDetail";

const SAVED_PROGRESS_KEY = "jobdocs-roadmap-progress";
const DEVELOPER_FACEBOOK_URL =
  import.meta.env.VITE_DEVELOPER_FACEBOOK_URL || "https://www.facebook.com/ronniehortizuela.legaspi";

export default function App() {
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [checkedDocs, setCheckedDocs] = useState(() => {
    try {
      const savedProgress = window.localStorage.getItem(SAVED_PROGRESS_KEY);
      return savedProgress ? JSON.parse(savedProgress) : {};
    } catch {
      return {};
    }
  });

  const currentDoc = DOCUMENTATION_DATA.find((doc) => doc.id === selectedDocId);
  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const remainingCount = DOCUMENTATION_DATA.length - completedCount;
  const progressPercent = Math.round((completedCount / DOCUMENTATION_DATA.length) * 100);

  useEffect(() => {
    window.localStorage.setItem(SAVED_PROGRESS_KEY, JSON.stringify(checkedDocs));
  }, [checkedDocs]);

  useEffect(() => {
    const handlePopState = (event) => {
      if (event.state?.view === "doc" && typeof event.state.docId === "string") {
        setSelectedDocId(event.state.docId);
      } else {
        setSelectedDocId(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (currentDoc) {
      window.history.pushState({ view: "doc", docId: selectedDocId }, "", `#doc-${selectedDocId}`);
    } else {
      window.history.replaceState({ view: "list" }, "", window.location.pathname + window.location.search);
    }
  }, [currentDoc, selectedDocId]);

  const toggleDocCheck = (id) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f4f6f8;
          --surface: #ffffff;
          --surface2: #f8fafc;
          --border: #d7dde5;
          --accent: #1f4e79;
          --accent-rgb: 31, 78, 121;
          --text: #1f2933;
          --muted: #667085;
          --success: #2f6f4e;
          --success-soft: #edf7f1;
        }

        body {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-y: scroll;
        }

        .app-container {
          width: min(1060px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 48px;
        }

        .site-header {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 14px 18px;
          margin-bottom: 18px;
        }

        .site-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .site-brand-mark {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #eef3f8;
          border: 1px solid #c9d6e4;
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-family: 'Space Grotesk', sans-serif;
        }

        .site-brand-text strong {
          display: block;
          color: #17212f;
          font-size: 14px;
        }

        .site-brand-text span {
          display: block;
          color: var(--muted);
          font-size: 12px;
          margin-top: 1px;
        }

        .site-nav {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--muted);
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .app-header {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(280px, 0.65fr);
          gap: 18px;
          align-items: stretch;
          margin-bottom: 24px;
        }

        .hero-panel,
        .progress-panel {
          background: var(--surface);
          border: 1px solid var(--border);
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        }

        .hero-panel {
          border-radius: 12px;
          padding: 28px;
          border-top: 5px solid var(--accent);
        }

        .eyebrow {
          display: inline-flex;
          width: fit-content;
          align-items: center;
          padding: 6px 10px;
          border-radius: 6px;
          background: #eef3f8;
          color: var(--accent);
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          margin-bottom: 16px;
        }

        .logo-title {
          max-width: 720px;
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1.08;
          font-weight: 800;
          color: #17212f;
          margin-bottom: 14px;
        }

        .title-gradient {
          color: var(--accent);
        }

        .sub-title {
          max-width: 760px;
          font-size: 15px;
          line-height: 1.8;
          color: var(--muted);
        }

        .hero-note-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }

        .hero-note {
          padding: 8px 10px;
          border-radius: 6px;
          background: var(--surface2);
          border: 1px solid var(--border);
          color: #344054;
          font-size: 12px;
          font-weight: 700;
        }

        .progress-panel {
          border-radius: 12px;
          padding: 22px;
          display: grid;
          align-content: space-between;
          gap: 18px;
          border-top: 5px solid #6b7280;
        }

        .progress-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 50px;
          line-height: 1;
          font-weight: 600;
          color: var(--accent);
        }

        .progress-label {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.5;
          margin-top: 6px;
        }

        .progress-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .mini-stat {
          border-radius: 8px;
          padding: 12px;
          background: var(--surface2);
          border: 1px solid var(--border);
        }

        .mini-stat strong {
          display: block;
          font-size: 20px;
          color: var(--text);
        }

        .mini-stat span {
          display: block;
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
          margin-top: 2px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .progress-track-line {
          height: 10px;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
          border: 1px solid #d1d5db;
        }

        .progress-fill-line {
          height: 100%;
          background: var(--accent);
          border-radius: inherit;
          transition: width 0.35s ease;
        }

        .section-intro {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: end;
          margin: 8px 0 18px;
          padding: 0 2px;
        }

        .section-intro h2 {
          font-size: 22px;
          color: #17212f;
          margin-bottom: 6px;
        }

        .section-intro p {
          color: var(--muted);
          font-size: 13px;
          line-height: 1.6;
          max-width: 700px;
        }

        .site-footer {
          background: #ffffff;
          border: 1px solid var(--border);
          border-radius: 12px;
          margin-top: 28px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          color: var(--muted);
          font-size: 13px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.04);
        }

        .site-footer strong {
          color: var(--text);
        }

        .footer-link {
          color: var(--accent);
          font-weight: 800;
          text-decoration: none;
        }

        .footer-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 760px) {
          .site-header,
          .site-footer {
            align-items: flex-start;
            flex-direction: column;
          }

          .site-nav {
            white-space: normal;
          }

          .app-header {
            grid-template-columns: 1fr;
          }

          .section-intro {
            display: block;
          }
        }
      `}</style>

      <div className="app-container">
        <div className="site-header">
          <div className="site-brand">
            <div className="site-brand-mark">JD</div>
            <div className="site-brand-text">
              <strong>JobDocs Roadmap</strong>
              <span>Employment document preparation guide</span>
            </div>
          </div>
          <nav className="site-nav" aria-label="Application sections">
            <span>Roadmap</span>
            <span>/</span>
            <span>Requirements</span>
            <span>/</span>
            <span>Progress</span>
          </nav>
        </div>

        {!currentDoc && (
          <>
            <header className="app-header">
              <div className="hero-panel">
                <div className="eyebrow">Employment Document Tracker</div>
                <h1 className="logo-title">
                  JobDocs <span className="title-gradient">Roadmap</span>
                </h1>
                <p className="sub-title">
                  A formal guide for preparing common employment documents in the Philippines.
                  Review the numbered sequence, open each document for requirements and processing notes,
                  then mark the item as completed once you have finished it.
                  Progress is saved locally on this browser without requiring an account.
                </p>
                <div className="hero-note-row">
                  <span className="hero-note">Recommended processing order</span>
                  <span className="hero-note">Requirements and estimated timeline</span>
                  <span className="hero-note">Local progress saving</span>
                </div>
              </div>

              <aside className="progress-panel">
                <div>
                  <div className="progress-number">{progressPercent}%</div>
                  <p className="progress-label">completed across your employment document preparation list</p>
                </div>
                <div className="progress-track-line">
                  <div className="progress-fill-line" style={{ width: `${progressPercent}%` }} />
                </div>
                <div className="progress-stats">
                  <div className="mini-stat">
                    <strong>{completedCount}</strong>
                    <span>Completed</span>
                  </div>
                  <div className="mini-stat">
                    <strong>{remainingCount}</strong>
                    <span>Pending</span>
                  </div>
                </div>
              </aside>
            </header>

            <div className="section-intro">
              <div>
                <h2>Numbered Document Flow</h2>
                <p>
                  Start from the first item and proceed downward. Each record includes its purpose,
                  current completion status, and a link to the detailed requirements and instructions.
                </p>
              </div>
            </div>
          </>
        )}

        {currentDoc ? (
          <DocumentDetail
            doc={currentDoc}
            onBack={() => window.history.back()}
          />
        ) : (
          <RoadmapView
            data={DOCUMENTATION_DATA}
            checkedDocs={checkedDocs}
            onSelectNode={(id) => setSelectedDocId(id)}
            onToggleDone={toggleDocCheck}
          />
        )}

        <footer className="site-footer">
          <p>
            Developer: <strong>Ronnie Legaspi</strong>
          </p>
          <a
            className="footer-link"
            href={DEVELOPER_FACEBOOK_URL}
            target="_blank"
            rel="noreferrer"
          >
            Facebook Profile
          </a>
        </footer>
      </div>
    </>
  );
}
