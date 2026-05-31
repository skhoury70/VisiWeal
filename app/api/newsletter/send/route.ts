import { NextRequest, NextResponse } from "next/server";
import { createTransporter } from "@/lib/email";
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

    const subject = body.subject.trim();
    const htmlContent = body.htmlContent.trim();
    const useDraft = body.draftId ? Number(body.draftId) : null;

    if (!supabase) {
      return NextResponse.json(
        { errors: { form: "Supabase not configured" } },
        { status: 500 }
      );
    }

    const { data: subscribers, error: subError } = await supabase
      .from("subscribers")
      .select("full_name, email")
      .order("id");

    if (subError) throw subError;
    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        { errors: { form: "No subscribers found" } },
        { status: 400 }
      );
    }

    const transporter = createTransporter();
    let sent = 0;
    let failed = 0;

    for (const sub of subscribers) {
      try {
        const personalizedHtml = htmlContent
          .replace(/\{\{full_name\}\}/g, sub.full_name)
          .replace(/\{\{email\}\}/g, sub.email);

        await transporter.sendMail({
          from: `"Visiweal Executive Insights" <info@visiweal.com>`,
          to: sub.email,
          subject,
          html: personalizedHtml,
        });
        sent++;
      } catch {
        failed++;
        console.error(`Failed to send to ${sub.email}`);
      }
    }

    const { data: campaign } = await supabase
      .from("newsletter_campaigns")
      .insert({
        draft_id: useDraft,
        subject,
        recipient_count: subscribers.length,
      })
      .select()
      .single();

    if (useDraft) {
      await supabase
        .from("newsletter_drafts")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", useDraft);
    }

    return NextResponse.json({
      success: true,
      sent,
      failed,
      total: subscribers.length,
      campaignId: campaign?.id,
    });
  } catch (e) {
    console.error("Newsletter send error:", e);
    return NextResponse.json(
      { errors: { form: "Something went wrong" } },
      { status: 500 }
    );
  }
}
