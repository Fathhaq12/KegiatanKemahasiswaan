import React, { useState } from "react";
import { createKegiatan } from "../api";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

function InputKegiatan() {
  const navigate = useNavigate();
  // Cek login di awal render
  React.useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [navigate]);

  const [form, setForm] = useState({
    nama_kegiatan: "",
    deskripsi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.nama_kegiatan || !form.deskripsi) {
      setError("Semua field wajib diisi!");
      return;
    }
    setLoading(true);
    try {
      // Set tanggal otomatis sesuai tanggal hari ini (format YYYY-MM-DD)
      const today = new Date();
      const tanggal = today.toISOString().slice(0, 10);
      await createKegiatan({ ...form, tanggal });
      setSuccess("Kegiatan berhasil diajukan! Menunggu persetujuan admin.");
      setTimeout(() => navigate("/kegiatan"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menginput kegiatan");
    }
    setLoading(false);
  };

  if (loading) return <Loading text="Menyimpan kegiatan..." />;

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 500 }}>
        <h1 className="title has-text-centered">Input Kegiatan</h1>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Nama Kegiatan</label>
            <div className="control">
              <input
                className="input"
                type="text"
                name="nama_kegiatan"
                value={form.nama_kegiatan}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Deskripsi</label>
            <div className="control">
              <textarea
                className="textarea"
                name="deskripsi"
                value={form.deskripsi}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          {error && <p className="help is-danger">{error}</p>}
          {success && <p className="help is-success">{success}</p>}
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link" type="submit">
                Simpan
              </button>
            </div>
            <div className="control">
              <button
                className="button is-light"
                type="button"
                onClick={() => navigate(-1)}
              >
                Batal
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default InputKegiatan;
