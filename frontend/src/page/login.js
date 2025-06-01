import React, { useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }
    setError("");
    try {
      await axios.post("http://localhost:5000/login", { email, password });
      alert("Login berhasil!");
      // Redirect atau simpan token jika perlu
    } catch (err) {
      setError(err.response?.data?.msg || "Login gagal!");
    }
  };

  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: 400 }}>
          <h1 className="title has-text-centered">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="help is-danger">{error}</p>}
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-link" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
