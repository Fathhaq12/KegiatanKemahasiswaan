import React, { useEffect, useState } from "react";
import { getKegiatan } from "../api";
import Loading from "../components/loading";

function KegiatanPage() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("approved");

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getKegiatan();
        setKegiatan(res.data);
      } catch (err) {
        setError("Harap login terlebih dahulu untuk melihat daftar kegiatan anda.");
      }
      setLoading(false);
    };
    fetchAll();
  }, []);

  const filteredKegiatan =
    statusFilter === "all"
      ? kegiatan
      : kegiatan.filter((k) => k.status === statusFilter);

  if (loading) return <Loading text="Memuat data kegiatan..." />;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Daftar Kegiatan HIMATIF</h1>
        <div className="field is-grouped is-grouped-right" style={{ marginBottom: 20 }}>
          <div className="control">
            <div className="select">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="all">Semua Status</option>
              </select>
            </div>
          </div>
        </div>
        {error && <p className="help is-danger">{error}</p>}
        <div className="columns is-multiline">
          {filteredKegiatan.length === 0 ? (
            <div className="column is-12 has-text-centered">
              Tidak ada kegiatan dengan status <b>{statusFilter}</b>
            </div>
          ) : (
            filteredKegiatan.map((k, i) => (
              <div className="column is-4" key={k.id}>
                <div className="card" style={{ height: "100%" }}>
                  <header className="card-header">
                    <p className="card-header-title">{k.nama_kegiatan}</p>
                  </header>
                  <div className="card-content">
                    <div className="content">
                      <strong>Tanggal:</strong> {k.tanggal}
                      <br />
                      <strong>Deskripsi:</strong>
                      <br />
                      {k.deskripsi}
                    </div>
                  </div>
                  <footer className="card-footer">
                    <span className="card-footer-item">
                      <span className={`tag is-light is-${k.status === "approved" ? "success" : k.status === "pending" ? "warning" : "danger"}`}>
                        {k.status}
                      </span>
                    </span>
                  </footer>
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
