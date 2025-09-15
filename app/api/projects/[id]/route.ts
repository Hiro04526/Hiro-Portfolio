import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

// No need for custom typing for params, use destructuring
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isAdminCookie(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from("projects")
    .update(body)
    .eq("id", Number(params.id))  // Ensure `params.id` is correctly parsed
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

function isAdminCookie(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  return cookie.includes("admin=1");
}