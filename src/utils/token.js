import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";
const EXPIRES = process.env.JWT_EXPIRES || "7d";

export const signToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
