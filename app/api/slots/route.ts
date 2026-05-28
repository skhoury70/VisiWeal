import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Missing date parameter" }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({ date, takenSlots: [] });
  }

  const { data: bookings } = await supabase
    .from("bookings")
    .select("time_slot")
    .eq("date", date);

  const takenSlots = (bookings ?? []).map((b) => b.time_slot);

  return NextResponse.json({ date, takenSlots });
}
