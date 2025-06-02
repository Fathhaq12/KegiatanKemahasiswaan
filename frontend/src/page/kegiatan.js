import React, { useEffect, useState } from "react";
import { getKegiatan } from "../api";
import Loading from "../components/loading";

function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
                className="column is-4"
                key={k.id}
                style={{ display: "flex" }}
              >
                <div
                  className="card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 260,
                  }}
                >
                  <header className="card-header">
                    <p className="card-header-title">{k.nama_kegiatan}</p>
                  </header>
                  <div className="card-content" style={{ flex: 1 }}>
                    <div className="content" style={{ minHeight: 80 }}>
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
                        }}
                      >
                        {k.deskripsi}
                      </span>
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
