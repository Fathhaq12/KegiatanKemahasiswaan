import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getKegiatanById } from "../api";
import Loading from "../components/loading";

function KegiatanDetail() {
  const { id } = useParams();
  const [kegiatan, setKegiatan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Cek login, jika belum login redirect ke login
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getKegiatanById(id);
        setKegiatan(res.data);
      } catch (err) {
        setError("Gagal memuat detail kegiatan");
      }
      setLoading(false);
    };
    fetchDetail();
  }, [id, navigate]);

  if (loading) return <Loading text="Memuat detail kegiatan..." />;
  if (error)
    return (
      <section className="section">
        <div className="container">
          <button className="button is-light mb-4" onClick={() => navigate(-1)}>
            &larr; Kembali
          </button>
          <p className="has-text-danger">{error}</p>
        </div>
      </section>
    );

  if (!kegiatan)
    return (
      <section className="section">
        <div className="container">
          <button className="button is-light mb-4" onClick={() => navigate(-1)}>
            &larr; Kembali
          </button>
          <p>Data kegiatan tidak ditemukan.</p>
        </div>
      </section>
    );

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 600 }}>
        <button className="button is-light mb-4" onClick={() => navigate(-1)}>
          &larr; Kembali
        </button>
        <div className="card">
          <header className="card-header">
            <p className="card-header-title">{kegiatan.nama_kegiatan}</p>
          </header>
          <div className="card-content">
            <div className="content">
              <p>
                <strong>Tanggal:</strong> {kegiatan.tanggal}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`tag is-${
                    kegiatan.status === "approved"
                      ? "success"
                      : kegiatan.status === "pending"
                      ? "warning"
                      : "danger"
                  }`}
                >
                  {kegiatan.status}
                </span>
              </p>
              <p>
                <strong>Deskripsi:</strong>
                <br />
                {kegiatan.deskripsi}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default KegiatanDetail;
