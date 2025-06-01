import React, { useState } from "react";
import Navbar from "../components/navbar";
import { registerUser } from "../api";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password) {
      setError("Semua field wajib diisi!");
      return;
    }
    if (!form.email.endsWith("@upnyk.ac.id")) {
      setError("Email harus menggunakan domain @upnyk.ac.id!");
      return;
    }
    if (form.password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak sama!");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await registerUser(form);
      alert("Registrasi berhasil!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.msg || "Registrasi gagal!");
    }
    setLoading(false);
  };

  if (loading) return <Loading text="Mendaftarkan akun..." />;

  return (
    <>
      <section className="section">
        <div className="container" style={{ maxWidth: 400 }}>
          <h1 className="title has-text-centered">Register</h1>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Konfirmasi Password</label>
              <div className="control">
                <input
                  className="input"
                  type="password"
                  name="confirmPassword"
                  placeholder="Konfirmasi Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="help is-danger">{error}</p>}
            <div className="field is-grouped is-grouped-centered">
              <div className="control">
                <button className="button is-link" type="submit">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;
