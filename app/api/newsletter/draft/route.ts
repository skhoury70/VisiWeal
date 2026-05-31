import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const errors: Record<string, string> = {};

    if (!body.subject?.trim()) errors.subject = "Subject is required";
    if (!body.htmlContent?.trim()) errors.htmlContent = "HTML content is required";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    if (!supabase) {
      return NextResponse.json(
        { errors: { form: "Supabase not configured" } },
        { status: 500 }
      );
    }

    const { data, error } = await supabase
      .from("newsletter_drafts")
      .insert({
        subject: body.subject.trim(),
        html_content: body.htmlContent.trim(),
        status: body.scheduled ? "scheduled" : "draft",
        scheduled_at: body.scheduled || null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, draft: data });
  } catch (e) {
    console.error("Draft save error:", e);
    return NextResponse.json(
      { errors: { form: "Failed to save draft" } },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!supabase) {
      return NextResponse.json({ drafts: [] });
    }

    const { data, error } = await supabase
      .from("newsletter_drafts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ drafts: data || [] });
  } catch {
    return NextResponse.json({ drafts: [] });
  }
}
