import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Hanya admin yang boleh akses user CRUD
const getUsers = async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Admin only kink" });
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const getUserById = async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Admin only kink" });
  try {
    const response = await User.findOne({
      where: { id: req.params.id },
    });
    if (!response) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Cek apakah username sudah terdaftar
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ msg: "Username sudah digunakan" });
    }

    // Cek apakah email sudah terdaftar
    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ msg: "Email sudah digunakan" });
    }

    // Enkripsi password dan simpan
    const encryptPassword = await bcrypt.hash(password, 5);
    await User.create({
      username,
      email,
      password: encryptPassword,
      role: role === "admin" ? "admin" : "mahasiswa", // default mahasiswa jika tidak diisi
    });

    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan di server" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    let updatedData = {
      username,
      email,
    };
    if (role) updatedData.role = role;

    if (password) {
      const encryptPassword = await bcrypt.hash(password, 5);
      updatedData.password = encryptPassword;
    }

    const result = await User.update(updatedData, {
      where: {
        id: req.params.id,
      },
    });

    if (result[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: "User tidak ditemukan atau tidak ada data yang berubah",
        updatedData: updatedData,
        result,
      });
    }

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteUser = async (req, res) => {
  if (req.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });
  try {
    await User.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      const userPlain = user.toJSON();
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;

      const decryptPassword = await bcrypt.compare(password, user.password);
      if (decryptPassword) {
        const accessToken = jwt.sign(
          safeUserData,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30m",
          }
        );
        const refreshToken = jwt.sign(
          safeUserData,
          process.env.REFRESH_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        await User.update(
          { refresh_token: refreshToken },
          {
            where: {
              id: user.id,
            },
          }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: false,
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
        });
        res.status(200).json({
          status: "Succes",
          message: "Login Berhasil",
          safeUserData,
          accessToken,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Password atau email salah",
        });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Password atau email salah",
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
    });
  }
};

const logout = async (req, res) => {
  // Ambil refreshToken dari body (bukan dari cookie)
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user || !user.refresh_token) return res.sendStatus(204);
  const userId = user.id;
  await User.update(
    { refresh_token: null },
    {
      where: {
        id: userId,
      },
    }
  );
  // Jika ingin hapus cookie, pastikan cookie-parser sudah digunakan di Express
  // res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

const getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user_id, {
      attributes: ["id", "username", "email", "role"],
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginHandler,
  logout,
  getProfile,
};
