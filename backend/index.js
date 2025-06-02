import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { mysqlDb, pgDb } from "./config/database.js";

import UserRoute from "./routes/UserRoute.js";
import KegiatanRoute from "./routes/KegiatanRoute.js";
import { refreshToken } from "./controller/RefreshToken.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// User routes (register, login, logout, CRUD user, etc)
app.use("/api", UserRoute);

// Refresh token route (karena tidak ada di UserRoute)
app.post("/api/refresh-token", refreshToken);

// Kegiatan routes
app.use("/api", KegiatanRoute);

// Welcome message
app.get("/", (req, res) => {
  res.send("API Kemahasiswaan is running.");
});

// DB sync
const start = async () => {
  try {
    await mysqlDb.sync();
    await pgDb.sync();
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.error(err);
  }
};
start();
