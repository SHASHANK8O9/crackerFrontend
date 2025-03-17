import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

// password is "Abhi@3321"
const users: User[] = [
  {
    id: 1,
    email: "admin@example.com",
    password: "$2a$12$B./PpJrP9onlKXbTif547uAYCPFJyhIc0Ym9Wdu.dbytKv.LuCNju",
    role: "admin",
  }, // Replace with a bcrypt hash
];
export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = users.find((u) => u.email === email);
  console.log(user);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = await generateToken({ id: user.id, role: user.role });

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
