import { NextRequest, NextResponse } from "next/server";

// The actual password lives only in the OWNER_PASSWORD environment variable
// on the server (set in Vercel project settings, never committed to git,
// never sent to the browser in any form — not even hashed). This route is
// the only thing that ever compares against it. On success it sets a cookie
// equal to OWNER_AUTH_TOKEN (a separate, random secret also only on the
// server) — the cookie's value itself proves nothing to the client; it only
// works because middleware.ts checks it against the same server-side value.
export async function POST(req: NextRequest) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const real = process.env.OWNER_PASSWORD;
  const token = process.env.OWNER_AUTH_TOKEN;

  if (!real || !token) {
    return NextResponse.json({ ok: false, error: "Server not configured" }, { status: 500 });
  }
  if (password !== real) {
    // Small delay to make brute-forcing slower without a full rate limiter.
    await new Promise(r => setTimeout(r, 600));
    return NextResponse.json({ ok: false, error: "Wrong password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("owner_auth", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
