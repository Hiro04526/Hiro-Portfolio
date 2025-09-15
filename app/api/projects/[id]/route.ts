// app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/server/supabaseAdmin"

// Fix: Access dynamic param `id` from pathname
export async function PATCH(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const id = pathname.split("/").pop();  // Extracts the last part (id)

  if (!id || !isAdminCookie(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { data, error } = await supabaseAdmin
    .from("projects")
    .update(body)
    .eq("id", Number(id))  // Convert id to number for querying
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

// Admin authentication check
function isAdminCookie(req: NextRequest) {
  const cookie = req.cookies.get("admin")?.value || "";
  return cookie === "1";  // Compare correctly with the string '1'
}
