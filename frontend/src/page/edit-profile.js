import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../components/loading";
import { updateUser } from "../api";
import "bulma/css/bulma.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function EditProfile() {
  const [form, setForm] = useState({ username: "", email: "", role: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Ambil data user dari localStorage
    const stored = localStorage.getItem("userData");
    if (stored) {
      const user = JSON.parse(stored);
      setForm({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Ambil id user dari localStorage jika ada
      const stored = localStorage.getItem("userData");
      let id = null;
      if (stored) {
        const user = JSON.parse(stored);
        id = user.id;
      }
      if (!id) throw new Error("ID user tidak ditemukan");
      await updateUser(id, form);
      alert("Profile berhasil diupdate!");
      // Update localStorage agar navbar ikut berubah
      localStorage.setItem("userData", JSON.stringify({ ...form, id }));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.msg || err.message || "Gagal update profile"
      );
    }
    setLoading(false);
  };

  if (loading) return <Loading text="Menyimpan perubahan..." />;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 400 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <button
            className="button is-small is-light"
            style={{ marginRight: 12 }}
            onClick={() => navigate(-1)}
            aria-label="Kembali"
            type="button"
          >
            <span className="icon">
              <i className="fas fa-arrow-left"></i>
            </span>
          </button>
          <h1
            className="title has-text-centered"
            style={{ flex: 1, margin: 0 }}
          >
            Edit Profile
          </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="username"
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
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Role</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                disabled
              />
            </div>
          </div>
          {error && <p className="help is-danger">{error}</p>}
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link" type="submit">
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditProfile;
