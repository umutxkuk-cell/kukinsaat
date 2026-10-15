import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export const dynamic = "force-dynamic";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
};

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Geçersiz istek." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Ad soyad en az 2 karakter olmalıdır." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Geçerli bir e-posta adresi girin." }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ ok: false, error: "Mesaj en az 10 karakter olmalıdır." }, { status: 400 });
  }

  try {
    await db.insert(contactMessages).values({
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    });
  } catch (err) {
    console.error("contact insert failed", err);
    return NextResponse.json(
      { ok: false, error: "Mesaj kaydedilemedi. Lütfen daha sonra tekrar deneyin." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}