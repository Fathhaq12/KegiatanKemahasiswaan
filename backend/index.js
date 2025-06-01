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

// DB sync
const start = async () => {
  try {
    await mysqlDb.sync();
    await pgDb.sync();
    app.listen(5000, () => console.log("Server running on port 5000"));
  } catch (err) {
    console.error(err);
  }
};
start();
