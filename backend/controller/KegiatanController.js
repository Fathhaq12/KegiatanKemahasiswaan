import Kegiatan from "../models/KegiatanModel.js";

// User (mahasiswa) create kegiatan
export const createKegiatan = async (req, res) => {
  const { nama_kegiatan, tanggal, deskripsi } = req.body;
  try {
    const kegiatan = await Kegiatan.create({
      user_id: req.user_id,
      nama_kegiatan,
      tanggal,
      deskripsi,
    });
    res.status(201).json({ message: "Kegiatan created", kegiatan });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Admin: get all kegiatan, User: get own kegiatan
export const getKegiatan = async (req, res) => {
  try {
    let kegiatan;
    // Jika admin, tampilkan semua
    if (req.role === "admin") {
      kegiatan = await Kegiatan.findAll();
    }
    // Jika user login (user_id valid), tampilkan milik user
    else if (req.user_id && typeof req.user_id === "number") {
      kegiatan = await Kegiatan.findAll({ where: { user_id: req.user_id } });
    }
    // Jika tidak login atau token tidak valid, tampilkan yang approved (publik)
    else {
      kegiatan = await Kegiatan.findAll({ where: { status: "approved" } });
    }
    res.json(kegiatan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: update status
export const updateStatus = async (req, res) => {
  if (req.role !== "admin") return res.sendStatus(403);
  const { id } = req.params;
  const { status } = req.body;
  try {
    const kegiatan = await Kegiatan.findByPk(id);
    if (!kegiatan) return res.status(404).json({ message: "Not found" });
    kegiatan.status = status;
    await kegiatan.save();
    res.json({ message: "Status updated", kegiatan });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateKegiatan = async (req, res) => {
  const { id } = req.params;
  const { nama_kegiatan, tanggal, deskripsi } = req.body;
  try {
    const kegiatan = await Kegiatan.findByPk(id);
    if (!kegiatan) return res.status(404).json({ message: "Not found" });
    // Optional: hanya pemilik atau admin yang boleh update
    if (req.role !== "admin" && kegiatan.user_id !== req.user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    kegiatan.nama_kegiatan = nama_kegiatan ?? kegiatan.nama_kegiatan;
    kegiatan.tanggal = tanggal ?? kegiatan.tanggal;
    kegiatan.deskripsi = deskripsi ?? kegiatan.deskripsi;
    await kegiatan.save();
    res.json({ message: "Kegiatan updated", kegiatan });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteKegiatan = async (req, res) => {
  const { id } = req.params;
  try {
    const kegiatan = await Kegiatan.findByPk(id);
    if (!kegiatan) return res.status(404).json({ message: "Not found" });
    // Optional: hanya pemilik atau admin yang boleh hapus
    if (req.role !== "admin" && kegiatan.user_id !== req.user_id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await kegiatan.destroy();
    res.json({ message: "Kegiatan deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
