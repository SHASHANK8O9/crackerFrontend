import { SignJWT, jwtVerify, JWTPayload } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
const secret = new TextEncoder().encode(SECRET_KEY);

interface UserPayload extends JWTPayload {
  id: number;
  role: string;
}

// ✅ Generate JWT Token (Edge-Compatible)
export const generateToken = async (user: UserPayload) => {
  return await new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secret);
};

// ✅ Verify JWT Token (Edge-Compatible)
export const verifyToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as UserPayload;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null; // Invalid or expired token
  }
};
