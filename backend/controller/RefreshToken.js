import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.sendStatus(401);

    const user = await User.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });

    if (!user) return res.sendStatus(403);

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return res.sendStatus(403);
        const userPlain = user.toJSON();
        const { password: _, refresh_token: __, ...safeUserData } = userPlain;
        const accessToken = jwt.sign(
          safeUserData,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.json({ accessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
