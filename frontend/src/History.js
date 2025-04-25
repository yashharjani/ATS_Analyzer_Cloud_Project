import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// Icon components
const FileTextIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const History = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resultsApiUrl, setResultsApiUrl] = useState("");

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await fetch("/config");
        const config = await response.json();
        setResultsApiUrl(config.resultsApiGateway);
      } catch (err) {
        setError("Failed to load configuration: " + err.message);
        setIsLoading(false);
      }
    };
    initialize();
  }, []);

  useEffect(() => {
    if (!resultsApiUrl) return;

    const fetchResults = async () => {
      try {
        const response = await fetch(`${resultsApiUrl}/results/all?user_id=default_user`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to fetch results: ${errorText}`);
        }

        const data = await response.json();
        setResults(data.results || []);
      } catch (err) {
        setError("Error fetching results: " + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [resultsApiUrl]);

  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(to bottom right, #f5f3ff, #dbeafe)",
    padding: "48px 16px",
  };

  const cardContainerStyle = {
    maxWidth: "64rem",
    margin: "0 auto",
  };

  const cardStyle = {
    backgroundColor: "white",
    overflow: "hidden",
    borderRadius: "12px",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  };

  const headerStyle = {
    background: "linear-gradient(to right, #2563eb, #7c3aed)",
    color: "white",
    padding: "24px",
  };

  const headerTitleStyle = {
    fontSize: "1.875rem",
    fontWeight: "bold",
  };

  const contentStyle = {
    padding: "24px 32px",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "16px",
  };

  const thStyle = {
    padding: "12px",
    textAlign: "left",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#1f2937",
  };

  const tdStyle = {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb",
    fontSize: "0.875rem",
    color: "#374151",
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "12px 24px",
    fontSize: "1rem",
    fontWeight: "500",
    color: "white",
    borderRadius: "6px",
    background: "linear-gradient(to right, #4b5563, #6b7280)",
    cursor: "pointer",
    border: "none",
    marginBottom: "16px",
    textDecoration: "none",
  };

  const errorStyle = {
    borderRadius: "6px",
    padding: "16px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fee2e2",
    marginBottom: "24px",
    color: "#dc2626",
    fontSize: "0.875rem",
  };

  const loadingStyle = {
    textAlign: "center",
    padding: "24px",
    color: "#4b5563",
    fontSize: "1rem",
  };

  const badgeStyle = {
    display: "inline-flex",
    alignItems: "center",
    padding: "4px 8px",
    borderRadius: "9999px",
    fontSize: "0.75rem",
    fontWeight: "500",
    backgroundColor: "#eff6ff",
    color: "#2563eb",
  };

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={cardContainerStyle}
      >
        <div style={cardStyle}>
          <div style={headerStyle}>
            <h1 style={headerTitleStyle}>Previous ATS Results</h1>
          </div>

          <div style={contentStyle}>
            <Link to="/" style={buttonStyle}>
              <span style={{ marginRight: "8px", height: "20px", width: "20px" }}>
                <ChevronLeftIcon />
              </span>
              Back to Main
            </Link>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={errorStyle}
              >
                {error}
              </motion.div>
            )}

            {isLoading && (
              <div style={loadingStyle}>
                <svg
                  className="animate-spin"
                  style={{ margin: "0 auto", height: "24px", width: "24px" }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    style={{ opacity: 0.25 }}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading results...
              </div>
            )}

            {!isLoading && results.length === 0 && (
              <div style={{ textAlign: "center", padding: "24px", color: "#4b5563" }}>
                No previous results found.
              </div>
            )}

            <AnimatePresence>
              {!isLoading && results.length > 0 && (
                <motion.table
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={tableStyle}
                >
                  <thead>
                    <tr>
                      <th style={thStyle}>Resume</th>
                      <th style={thStyle}>Job Description</th>
                      <th style={thStyle}>ATS Score</th>
                      <th style={thStyle}>Suggestions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results
                      .sort((a, b) => b.created_at - a.created_at) // Sort by most recent
                      .map((result) => (
                        <tr key={result.result_id}>
                          <td style={tdStyle}>{result.resume_id}</td>
                          <td style={tdStyle}>
                            {result.job_description.length > 100
                              ? result.job_description.substring(0, 100) + "..."
                              : result.job_description}
                          </td>
                          <td style={tdStyle}>
                            <span
                              style={{
                                color:
                                  result.ats_score >= 80
                                    ? "#16a34a"
                                    : result.ats_score >= 60
                                    ? "#ca8a04"
                                    : "#dc2626",
                              }}
                            >
                              {result.ats_score}%
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                              {result.missing_keywords.map((keyword, index) => (
                                <span key={index} style={badgeStyle}>
                                  {keyword}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </motion.table>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default History;