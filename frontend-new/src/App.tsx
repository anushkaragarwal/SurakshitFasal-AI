import { useEffect , useRef, useState } from "react";
import { analysis, reports } from "./data";

export default function App() {
  const [screen, setScreen] = useState<
    "splash" | "role" | "login" |"farmer" | "inspector"
  >("splash");
    const [selectedRole, setSelectedRole] = useState<
    "farmer" | "inspector" | null
  >(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
      const timer = setTimeout(() => {
        setScreen("role");
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    if (screen === "splash") {
      return (
        <div className="splash-screen">

          <div className="blob blob1"></div>
          <div className="blob blob2"></div>

          <div className="splash-content">

            <div className="logo-circle">

              🌾

            </div>

            <h1>Surakshit Fasal AI</h1>

            <p>

              Smarter Spraying.
              Safer Harvests.

            </p>

            <div className="loading">

              <div className="loading-fill"></div>

            </div>

          </div>

        </div>
      );
    }
    if (screen === "role") {
      return (
        <div className="role-page">

          <div className="blob blob1"></div>
          <div className="blob blob2"></div>

          <div className="role-header">

            <h1>🌾 Surakshit Fasal AI</h1>

            <p>

              One Platform.
              Two Powerful Experiences.

            </p>

          </div>

          <div className="role-grid">

            <div
              className="role-card farmer"
              onClick={() => {
                setSelectedRole("farmer");
                setScreen("login");
              }}
            >

              <div className="role-icon">
                🌱
              </div>

              <h2>Farmer</h2>

              <p>

                Detect crop diseases,
                receive AI recommendations,
                weather advisory
                and safe pesticide guidance.

              </p>

              <button>

                Continue →

              </button>

            </div>

            <div
              className="role-card inspector"
              onClick={() => {
                setSelectedRole("inspector");
                setScreen("login");
              }}
            >

              <div className="role-icon">

                🛡

              </div>

              <h2>Inspector</h2>

              <p>

                Monitor inspections,
                verify reports,
                analyze compliance
                and identify unsafe crops.

              </p>

              <button>

                Continue →

              </button>

            </div>

          </div>

          <div className="features">

            <div>🤖 AI Disease Detection</div>

            <div>🌦 Smart Weather Advisory</div>

            <div>🧪 Safe Pesticide Guide</div>

            <div>📊 Inspector Dashboard</div>

          </div>

        </div>
      );
    }

  const handleImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);

    setSelectedImage(imageUrl);
    setShowResult(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    handleImage(file);
  };

  const handleAnalyze = () => {
    if (!selectedImage) {
      alert("Please upload a crop image first.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowResult(true);
    }, 2500);
  };

  if (screen === "login") {
    return (
      <div className="login-page">

        <div className="login-card">

          <div className="login-icon">
            {selectedRole === "farmer" ? "🌾" : "🛡"}
          </div>

          <h1>
            {selectedRole === "farmer"
              ? "Farmer Login"
              : "Inspector Login"}
          </h1>

          <p>
            Welcome back! Sign in to continue.
          </p>

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="login-btn"
            onClick={() => {

              if (selectedRole === "farmer") {
                setScreen("farmer");
              } else {
                setScreen("inspector");
              }

            }}
          >
            Login
          </button>

          <button
            className="back-link"
            onClick={() => setScreen("role")}
          >
            ← Back to Role Selection
          </button>

        </div>

      </div>
    );
  }

  if (screen === "inspector") {
    return (
      <div className="inspector-dashboard">

        <div className="blob blob1"></div>
        <div className="blob blob2"></div>

        <div className="inspector-header">

          <div>
            <h1>🛡 Inspector Dashboard</h1>
            <p>Food Safety Inspection & Compliance Center</p>
          </div>

          <button
            className="back-btn"
            onClick={() => setScreen("role")}
          >
            ← Back
          </button>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Reports</h3>
            <h2>156</h2>
            <p>Today's submissions</p>
          </div>

          <div className="stat-card">
            <h3>Flagged</h3>
            <h2>32</h2>
            <p>Need review</p>
          </div>

          <div className="stat-card">
            <h3>Critical</h3>
            <h2>12</h2>
            <p>Immediate action</p>
          </div>

          <div className="stat-card">
            <h3>AI Accuracy</h3>
            <h2>94%</h2>
            <p>Prediction confidence</p>
          </div>

        </div>

        <h2 className="section-title">
          High Priority Reports
        </h2>

        <div className="reports-list">

          <div className="report-card">

            <div>
              <h3>🍅 Tomato</h3>
              <p>Delhi</p>
            </div>

            <div>
              <p>Leaf Blight</p>
              <span className="risk-high">HIGH</span>
            </div>

            <button>Review</button>

          </div>

          <div className="report-card">

            <div>
              <h3>🌾 Wheat</h3>
              <p>Punjab</p>
            </div>

            <div>
              <p>Rust Disease</p>
              <span className="risk-medium">MEDIUM</span>
            </div>

            <button>Review</button>

          </div>

        </div>

        <div className="insight-card">

          <h2>🤖 AI Inspection Summary</h2>

          <ul>
            <li>✔ 82% reports are safe.</li>
            <li>⚠ 9 reports require field inspection.</li>
            <li>🌧 Rain may affect pesticide spraying.</li>
            <li>🧪 Monitor Delhi region this week.</li>
          </ul>

        </div>

      </div>
    );
  }

  if (screen === "farmer") {
    return (
      <div>
        {/* ---------------- Navbar ---------------- */}
        <div className="container">
          <div className="navbar">
            <div className="logo">
              <div style={{ fontSize: 42 }}>🌾</div>
              <div>
                <h2>Surakshit Fasal AI</h2>
                <p>AI Powered Crop Disease Detection</p>
              </div>
            </div>
            <button className="lang-btn">EN | हिंदी</button>
          </div>
        </div>

        {/* ---------------- Hero ---------------- */}
        <section className="container hero premium-hero">
          <div>
            <h1>
              AI-powered <span>Crop Protection</span>
              <br />
              for Every Farmer
            </h1>
            <p>
              Upload a crop image and receive instant AI-powered disease detection,
              government-approved pesticide recommendations, dosage guidance,
              harvest waiting period, and safety precautions—all in seconds.
            </p>
            <div
              style={{
                display: "flex",
                gap: 15,
                flexWrap: "wrap",
                marginTop: 30,
              }}
            >
              <div className="badge green">✓ Fast Analysis</div>
              <div className="badge" style={{ background: "#2563EB" }}>
                AI Powered
              </div>
              <div className="badge yellow">Safe Pesticides</div>
            </div>
          </div>

          {/* Upload Card */}
          <div className="upload-card">
            <div
              className="upload-box"
              onClick={() => fileInputRef.current?.click()}
            >
              <div
                style={{
                  fontSize: 82,
                  marginBottom: 18,
                  transition: ".3s",
                }}
              >
                📸
              </div>
              <h3
                style={{
                  fontSize: 24,
                  marginBottom: 12,
                }}
              >
                Upload Crop Image
              </h3>
              <p
                style={{
                  color: "#6B7280",
                  lineHeight: 1.7,
                }}
              >
                Drag & drop your crop image here
                <br />
                or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>

            {selectedImage && (
              <img
                src={selectedImage}
                alt="Crop Preview"
                style={{
                  width: "100%",
                  borderRadius: 20,
                  marginTop: 25,
                  maxHeight: 320,
                  objectFit: "cover",
                }}
              />
            )}

            <button className="primary-btn" onClick={handleAnalyze}>
              Analyze with AI
            </button>
          </div>
        </section>

        {/* ---------------- AI Analysis ---------------- */}
        <section className="container">

          <div className="weather-card">

            <div className="weather-header">

              <div>

                <h2>🌦 Smart Weather Advisory</h2>

                <p>
                  AI checks today's weather before recommending pesticide spraying.
                </p>

              </div>

              <div className="weather-temp">

                32°C

              </div>

            </div>

            <div className="weather-grid">

              <div className="weather-item">

                <h4>💧 Humidity</h4>

                <h3>68%</h3>

              </div>

              <div className="weather-item">

                <h4>🌬 Wind</h4>

                <h3>10 km/h</h3>

              </div>

              <div className="weather-item">

                <h4>🌧 Rain Chance</h4>

                <h3>80%</h3>

              </div>

            </div>

            <div className="weather-ai">

              <h3>🤖 AI Spray Recommendation</h3>

              <p>

                Rain is expected within the next few hours.

                Spraying today may reduce pesticide effectiveness.

                Wait until tomorrow morning for better results.

              </p>

            </div>

          </div>

        </section>
        {(loading || showResult) && (
          <section className="container">
            <div className="card fade">
              <h2>🤖 AI Analysis Report</h2>

              {loading ? (
                <>
                  <div className="loader"></div>
                  <p
                    style={{
                      textAlign: "center",
                      marginTop: 20,
                      color: "#6B7280",
                      fontSize: 18,
                    }}
                  >
                    AI is analyzing your crop image...
                  </p>
                </>
              ) : (
                <>
                  <div className="grid">
                    <div className="info-box">
                      <h4>Crop</h4>
                      <h3>{analysis.crop}</h3>
                    </div>

                    <div className="info-box">
                      <h4>Disease Detected</h4>
                      <h3>{analysis.disease}</h3>
                    </div>

                    <div className="info-box">
                      <h4>Confidence</h4>
                      <h3>{analysis.confidence}</h3>
                    </div>

                    <div className="info-box">
                      <h4>Risk Level</h4>
                      <div style={{ marginTop: 10 }}>
                        <span
                          className={`badge ${
                            analysis.risk === "Low"
                              ? "green"
                              : analysis.risk === "Medium"
                              ? "yellow"
                              : "red"
                          }`}
                        >
                          {analysis.risk}
                        </span>
                      </div>
                    </div>

                    <div className="info-box">
                      <h4>Recommended Pesticide</h4>
                      <h3>{analysis.pesticide}</h3>
                    </div>

                    <div className="info-box">
                      <h4>Dosage</h4>
                      <h3>{analysis.dosage}</h3>
                    </div>

                    <div className="info-box">
                      <h4>Waiting Period</h4>
                      <h3>{analysis.waitingPeriod}</h3>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: 30,
                      padding: 24,
                      background: "#F0FDF4",
                      borderRadius: 20,
                    }}
                  >
                    <h3
                      style={{
                        marginBottom: 16,
                        color: "#15803D",
                      }}
                    >
                      🛡 Safety Tips
                    </h3>

                    {analysis.tips.map((tip, index) => (
                      <p
                        key={index}
                        style={{
                          marginBottom: 12,
                          lineHeight: 1.7,
                        }}
                      >
                        ✅ {tip}
                      </p>
                    ))}
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* ---------------- Previous Reports ---------------- */}
        <section className="container">
          <div className="card">
            <h2>📋 Previous Reports</h2>

            {reports.map((report, index) => (
              <div key={index} className="report">
                <div>
                  <h3>{report.crop}</h3>
                  <p
                    style={{
                      color: "#6B7280",
                      marginTop: 5,
                    }}
                  >
                    {report.date}
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontWeight: 600,
                      marginBottom: 8,
                      textAlign: "right",
                    }}
                  >
                    {report.disease}
                  </p>

                  <span
                    className={`badge ${
                      report.risk === "Low"
                        ? "green"
                        : report.risk === "Medium"
                        ? "yellow"
                        : "red"
                    }`}
                  >
                    {report.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Footer ---------------- */}
        <footer
          style={{
            marginTop: 60,
            padding: "30px 0",
            textAlign: "center",
            color: "#6B7280",
          }}
        >
          © 2026 Surakshit Fasal AI • Built for Hackathon Demo 🌾
        </footer>
      </div>
    );
  }
  return null;
}