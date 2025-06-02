import React, { useEffect, useState } from "react";
import { getKegiatan } from "../api";
import Loading from "../components/loading";
import { useNavigate } from "react-router-dom";

function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApproved = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getKegiatan();
        // Filter only approved kegiatan
        setKegiatan(res.data.filter((k) => k.status === "approved"));
      } catch (err) {
        // Jangan tampilkan error, tetap tampilkan halaman kosong
        setKegiatan([]);
      }
      setLoading(false);
    };
    fetchApproved();
  }, []);

  if (loading) return <Loading text="Memuat data kegiatan..." />;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Daftar Kegiatan HIMATIF</h1>
        {/* Hapus error agar tidak mengganggu user publik */}
        <div className="columns is-multiline">
          {kegiatan.length === 0 ? (
            <div className="column is-12 has-text-centered">
              Tidak ada kegiatan yang tersedia
            </div>
          ) : (
            kegiatan.map((k, i) => (
              <div
                className="column is-4 d-flex"
                key={k.id}
                style={{ display: "flex" }}
              >
                <div
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    minHeight: 320,
                    width: "100%",
                  }}
                >
                  <header className="card-header" style={{ minHeight: 56 }}>
                    <p className="card-header-title">{k.nama_kegiatan}</p>
                  </header>
                  <div
                    className="card-content"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div className="content" style={{ flex: 1 }}>
                      <strong>Tanggal:</strong> {k.tanggal}
                      <br />
                      <strong>Deskripsi:</strong>
                      <br />
                      <span
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          minHeight: 80,
                        }}
                      >
                        {k.deskripsi}
                      </span>
                    </div>
                    <div style={{ marginTop: "auto" }}>
                      <button
                        className="button is-link is-small"
                        style={{ borderRadius: 20, marginTop: 10 }}
                        onClick={() => navigate(`/kegiatan/${k.id}`)}
                      >
                        Baca lebih lanjut
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default KegiatanPage;
