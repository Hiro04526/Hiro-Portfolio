import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // clear cookie
  res.cookies.set("admin", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
    secure: true,
  });
  return res;
}