import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { createTransporter } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET;
  if (
    cronSecret &&
    request.headers.get("authorization") !== `Bearer ${cronSecret}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!supabase) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    const { data: drafts, error } = await supabase
      .from("newsletter_drafts")
      .select("*")
      .eq("status", "scheduled")
      .lte("scheduled_at", new Date().toISOString())
      .order("scheduled_at", { ascending: true })
      .limit(1);

    if (error) throw error;

    if (!drafts || drafts.length === 0) {
      return NextResponse.json({ message: "No pending drafts" });
    }

    const draft = drafts[0];

    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("full_name, email")
      .order("id");

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers" });
    }

    const transporter = createTransporter();
    let sent = 0;
    let failed = 0;

    for (const sub of subscribers) {
      try {
        const personalizedHtml = draft.html_content
          .replace(/\{\{full_name\}\}/g, sub.full_name)
          .replace(/\{\{email\}\}/g, sub.email);

        await transporter.sendMail({
          from: `"Visiweal Executive Insights" <info@visiweal.com>`,
          to: sub.email,
          subject: draft.subject,
          html: personalizedHtml,
        });
        sent++;
      } catch {
        failed++;
      }
    }

    await supabase.from("newsletter_campaigns").insert({
      draft_id: draft.id,
      subject: draft.subject,
      recipient_count: subscribers.length,
    });

    await supabase
      .from("newsletter_drafts")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", draft.id);

    return NextResponse.json({ success: true, sent, failed, total: subscribers.length });
  } catch (e) {
    console.error("Cron send error:", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
