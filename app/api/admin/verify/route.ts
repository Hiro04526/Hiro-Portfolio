import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { password } = await req.json();
  const ok = password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD;
  if (!ok) return NextResponse.json({ ok: false }, { status: 401 });

  // optionally set an httpOnly cookie so admin survives refresh
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "1", { httpOnly: true, path: "/", sameSite: "lax" });
  return res;
}