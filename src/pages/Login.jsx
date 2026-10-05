import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import logo from "../images/logo.svg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailPattern = /^[^\s@]+@gmail\.com$/;
  const [error, setError] = useState(null);

  useEffect(()=>{
    const gateway = localStorage.getItem("gateway")

    if(gateway==="true"){
      navigate("/home")
    }

  },[])

 

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!email.trim(" ")) {
        return setError("E-mail field is empty");
      }

      if (!emailPattern.test(email)) {
        return setError("Enter a valid email");
      }

      if (email.length < 10) {
        return setError("Enter a valid email");
      }

      if (!password.trim(" ")) {
        return setError("Password field is empty");
      }

      if (password.length > 1) {
        setError(null);
      }

      const user = {
        email: email,
        password: password,
      };

      const response = await fetch("https://route66-backend-1-v5us.onrender.com/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      if (response.ok) {
        alert(data.message);

        localStorage.setItem("token", data.token);
        localStorage.setItem("id", data.id);
        localStorage.setItem("gateway", true);
        setError(null);
        setEmail("");
        setPassword("");

        navigate("/home");
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="route66-login-page">
      {/* BACKGROUND */}

      <div className="login-ambient login-ambient-one"></div>

      <div className="login-ambient login-ambient-two"></div>

      <div className="login-background-grid"></div>

      {/* MAIN CONTAINER */}

      <section className="login-container">
        {/* =========================================
                    LEFT BRAND SECTION
                ========================================= */}

        <div className="login-visual">
          <span className="login-eyebrow">WELCOME BACK</span>

          {/* LOGO */}

          <div className="login-brand-logo">
            <div className="login-logo-ring"></div>

            <img src={logo} alt="Route66 Logo" />
          </div>

          {/* BRAND */}

          <h1>
            ROUTE <span>66</span>
          </h1>

          <div className="login-gold-divider"></div>

          <p>
            Your conversations
            <br />
            are waiting.
          </p>

          {/* LIVE STATUS */}

          <div className="login-live-status">
            <span className="login-live-dot"></span>
            ROUTE66 IS LIVE
          </div>
        </div>

        {/* =========================================
                    RIGHT LOGIN SECTION
                ========================================= */}

        <div className="login-form-section">
          <div className="login-card">
            {/* TOP BAR */}

            <div className="login-card-top">
              <div className="login-card-label">
                <span></span>
                SECURE ACCESS
              </div>
            </div>

            {/* TITLE */}

            <h2>
              Welcome
              <br />
              <span>back.</span>
            </h2>

            <p className="login-description">
              Sign in to continue your conversations and stay connected with
              your community.
            </p>

            {/* FORM */}

            <form onSubmit={handleLogin}>
              {/* EMAIL */}

              <div className="login-input-group">
                <label htmlFor="login-email">EMAIL ADDRESS</label>

                <div className="login-input-wrapper">
                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    id="login-email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="login-input-group">
                <div className="login-password-label">
                  <label htmlFor="login-password">PASSWORD</label>

                  <Link to="/forgot-password" className="login-forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <div className="login-input-wrapper">
                  <i className="bi bi-lock"></i>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="login-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />

                  {/* SHOW / HIDE PASSWORD */}

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                    ></i>
                  </button>
                </div>
              </div>
              <p className="LoginError">{error}</p>

              {/* SIGN IN BUTTON */}

              <button type="submit" className="route66-login-button">
               {loading ? <span>Logining...</span> : <span>SIGN IN TO ROUTE66</span>}

                <i className="bi bi-arrow-up-right"></i>
              </button>
            </form>

            {/* CREATE ACCOUNT */}

            <div className="login-create-account">
              <span>Don't have an account?</span>

              <Link to="/register">Create account</Link>
            </div>

            {/* SECURITY */}

            <div className="login-security-info">
              <i className="bi bi-shield-check"></i>

              <span>End-to-end secure connection</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="login-footer">
        ROUTE66
        <span>•</span>
        CONNECT WITHOUT LIMITS
      </footer>
    </main>
  );
}

export default Login;
