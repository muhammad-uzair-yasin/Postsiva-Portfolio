import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const CONTACT_EMAIL = "uzairyasin395@gmail.com";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email"),
  subject: z.string().min(1, "Subject is required").max(200),
  message: z.string().min(1, "Message is required").max(5000),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const msg = Object.values(parsed.error.flatten().fieldErrors).flat().join(" ") || "Invalid input";
      return NextResponse.json(
        { success: false, error: msg },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = parsed.data;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject} – ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Something went wrong" },
      { status: 500 }
    );
  }
}
