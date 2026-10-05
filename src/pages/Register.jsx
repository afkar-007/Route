import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Register.css";
import logo from "../images/logo.svg";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailPattern = /^[^\s@]+@gmail\.com$/;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!name.trim(" ")) {
        setError("name field is empty");
        return;
      }

      if (name.length < 3) {
        setError("Username must have at least 3 characters");
        return;
      }
      if (!email.trim(" ")) {
        setError("E-mail field is empty");
      }
      if (email.length < 10) {
        setError("Enter a valid email");
        return;
      }
      if (!emailPattern.test(email)) {
        setError("Enter a valid email");
        return;
      }
      if (!password.trim(" ")) {
        setError("Password field is empty");
      }
      if (password.length < 4) {
        setError("Password must have at least 4 characters");
        return;
      }
      if (!confirmPassword.trim(" ")) {
        setError(" Confirm password field is empty");
      }

      if (password !== confirmPassword) {
        setError("Password Not match");
        return;
      }

      if (password === confirmPassword) {
        setError(null);
      }

      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      const response = await fetch("http://localhost:3015/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if(!response.ok){
        setError(data.message)
      }



      if (response.ok) {
        alert(data.message);
        navigate("/login");
        setName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      }
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="route66-register-page">
      {/* Background Effects */}

      <div className="register-ambient register-ambient-one"></div>
      <div className="register-ambient register-ambient-two"></div>
      <div className="register-background-grid"></div>

      <section className="register-container">
        {/* LEFT SIDE */}

        <div className="register-visual">
          <span className="register-eyebrow">JOIN THE COMMUNITY</span>

          <div className="register-brand-logo">
            <div className="register-logo-ring"></div>

            <img src={logo} alt="Route66 Logo" />
          </div>

          <h1>
            ROUTE<span>66</span>
          </h1>

          <div className="register-gold-divider"></div>

          <p>
            One account.
            <br />
            Endless connections.
          </p>

          <div className="register-live-status">
            <span className="register-live-dot"></span>
            START YOUR JOURNEY
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="register-form-section">
          <div className="register-card">
            {/* CARD TOP */}

            <div className="register-card-top">
              <div className="register-card-label">
                <span></span>
                CREATE ACCOUNT
              </div>
            </div>

            {/* TITLE */}

            <h2>
              Create
              <br />
              <span>your account.</span>
            </h2>

            <p className="register-description">
              Join Route66 and connect with your people, conversations and
              community.
            </p>

            {/* FORM */}

            <form onSubmit={handleRegister}>
              {/* NAME */}

              <div className="register-input-group">
                <label htmlFor="register-name">FULL NAME</label>

                <div className="register-input-wrapper">
                  <i className="bi bi-person"></i>

                  <input
                    type="text"
                    id="register-name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="register-input-group">
                <label htmlFor="register-email">EMAIL ADDRESS</label>

                <div className="register-input-wrapper">
                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    id="register-email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="register-input-group">
                <label htmlFor="register-password">PASSWORD</label>

                <div className="register-input-wrapper">
                  <i className="bi bi-lock"></i>

                  <input
                    type={showPassword ? "text" : "password"}
                    id="register-password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
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

              {/* CONFIRM PASSWORD */}

              <div className="register-input-group">
                <label htmlFor="register-confirm-password">
                  CONFIRM PASSWORD
                </label>

                <div className="register-input-wrapper">
                  <i className="bi bi-shield-lock"></i>

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="register-confirm-password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                  >
                    <i
                      className={
                        showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                      }
                    ></i>
                  </button>
                </div>
              </div>

              <p className="errorRegister">{error}</p>

              {/* REGISTER BUTTON */}

              <button type="submit" className="route66-register-button">
                {loading ? (
                  <span>REGISTERING...</span>
                ) : (
                  <span>CREATE ROUTE66 ACCOUNT</span>
                )}

                <i className="bi bi-arrow-up-right"></i>
              </button>
            </form>

            {/* LOGIN LINK */}

            <div className="register-login-account">
              <span>Already have an account?</span>

              <Link to="/login">Sign in</Link>
            </div>

            {/* SECURITY */}

            <div className="register-security-info">
              <i className="bi bi-shield-check"></i>

              <span>Your account is protected with secure authentication</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="register-footer">
        ROUTE66
        <span>•</span>
        CONNECT WITHOUT LIMITS
      </footer>
    </main>
  );
}

export default Register;
