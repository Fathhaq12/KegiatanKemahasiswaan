import React, { useEffect, useState } from "react";
import { getKegiatanForAdmin, updateKegiatanStatus } from "../api";
import Loading from "../components/loading";

function AdminPage() {
  const [kegiatan, setKegiatan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  useEffect(() => {
    const fetchKegiatan = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getKegiatanForAdmin();
        setKegiatan(res.data);
      } catch (err) {
        setError("Gagal memuat data kegiatan");
      }
      setLoading(false);
    };
    fetchKegiatan();
  }, []);

  // Filter kegiatan based on status
  const filteredKegiatan =
    statusFilter === "all"
      ? kegiatan
      : kegiatan.filter((k) => k.status === statusFilter);

  // Fungsi untuk update status kegiatan
  const handleUpdateStatus = async (id, status) => {
    try {
      await updateKegiatanStatus(id, status);
      setKegiatan((prev) =>
        prev.map((k) => (k.id === id ? { ...k, status } : k))
      );
      alert(`Status kegiatan berhasil diubah menjadi "${status}"`);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        alert("Anda tidak memiliki izin untuk mengubah status kegiatan ini.");
      } else {
        alert("Gagal mengubah status kegiatan");
      }
    }
  };

  if (loading) return <Loading text="Memuat data kegiatan..." />;

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Manajemen Kegiatan</h1>
        <div
          className="field is-grouped is-grouped-right"
          style={{ marginBottom: 20 }}
        >
          <div className="control">
            <div className="select">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="all">Semua Status</option>
              </select>
            </div>
          </div>
        </div>
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
              {filteredKegiatan.length === 0 ? (
                <tr>
                  <td colSpan="6" className="has-text-centered">
                    Tidak ada kegiatan dengan status {statusFilter}
                  </td>
                </tr>
              ) : (
                filteredKegiatan.map((k, i) => (
                  <tr key={k.id}>
                    <td>{i + 1}</td>
                    <td>{k.nama_kegiatan}</td>
                    <td>{k.tanggal}</td>
                    <td>{k.deskripsi}</td>
                    <td>
                      <span
                        className={`tag is-${
                          k.status === "approved"
                            ? "success"
                            : k.status === "pending"
                            ? "warning"
                            : "danger"
                        }`}
                      >
                        {k.status}
                      </span>
                    </td>
                    <td>
                      {k.status !== "approved" && (
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
                      )}
                      {k.status !== "rejected" && (
                        <button
                          className="button is-small is-danger"
                          title="Tolak"
                          onClick={() => handleUpdateStatus(k.id, "rejected")}
                        >
                          <span className="icon">
                            <i className="fas fa-times"></i>
                          </span>
                        </button>
                      )}
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
