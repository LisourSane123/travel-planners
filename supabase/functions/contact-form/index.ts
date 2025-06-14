import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { email, message } = await req.json();
  // Tu można dodać wysyłkę maila przez SendGrid lub logikę zapisu do bazy
  return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
});
