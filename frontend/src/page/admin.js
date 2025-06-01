import React, { useEffect, useState } from "react";
import { getKegiatan } from "../api";
import Loading from "../components/loading";
import axios from "axios";

function AdminPage() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPending = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getKegiatan();
        // Filter hanya status pending
        setKegiatan(res.data.filter((k) => k.status === "pending"));
      } catch (err) {
        setError("Gagal memuat data kegiatan");
      }
      setLoading(false);
    };
    fetchPending();
  }, []);

  // Fungsi untuk update status kegiatan
  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/kegiatan/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // Refresh data setelah update
      setKegiatan((prev) => prev.filter((k) => k.id !== id));
    } catch (err) {
      alert("Gagal mengubah status kegiatan");
    }
  };

  if (loading) return <Loading text="Memuat data kegiatan..." />;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Data Kegiatan Pending</h1>
        {error && <p className="help is-danger">{error}</p>}
        <div className="table-container">
          <table className="table is-fullwidth is-striped">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kegiatan</th>
                <th>Tanggal</th>
                <th>Deskripsi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {kegiatan.length === 0 ? (
                <tr>
                  <td colSpan="6" className="has-text-centered">
                    Tidak ada kegiatan pending
                  </td>
                </tr>
              ) : (
                kegiatan.map((k, i) => (
                  <tr key={k.id}>
                    <td>{i + 1}</td>
                    <td>{k.nama_kegiatan}</td>
                    <td>{k.tanggal}</td>
                    <td>{k.deskripsi}</td>
                    <td>{k.status}</td>
                    <td>
                      <button
                        className="button is-small is-success"
                        title="Setujui"
                        onClick={() => handleUpdateStatus(k.id, "approved")}
                        style={{ marginRight: 8 }}
                      >
                        <span className="icon">
                          <i className="fas fa-check"></i>
                        </span>
                      </button>
                      <button
                        className="button is-small is-danger"
                        title="Tolak"
                        onClick={() => handleUpdateStatus(k.id, "rejected")}
                      >
                        <span className="icon">
                          <i className="fas fa-times"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;
