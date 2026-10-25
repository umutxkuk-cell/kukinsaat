export const dynamic = "force-dynamic";

// Basit sağlık kontrolü. Site artık veritabanı gerektirmediği için yalnızca
// uygulamanın ayakta olduğunu bildirir.
export function GET() {
  return Response.json({ ok: true });
}
