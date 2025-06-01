import React, { useState } from "react";
import Navbar from "../components/navbar";
import { loginUser } from "../api";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await loginUser({ username: username, password });
      localStorage.setItem("isLoggedIn", "true");
      // Simpan data user ke localStorage agar navbar bisa akses username dan role
      if (res && res.data && res.data.safeUserData) {
        localStorage.setItem("userData", JSON.stringify(res.data.safeUserData));
      }
      alert("Login berhasil!");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Login gagal!");
    }
    setLoading(false);
  };

  if (loading) return <Loading text="Memproses login..." />;

  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: 400 }}>
          <h1 className="title has-text-centered">Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
