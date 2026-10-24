"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../lib/firebase";

const INK = "#17141f", PAPER = "#f4efe6", CARD = "#fffaf1", ACC = "#5b3df5";
const F = "'Manrope', system-ui, sans-serif";
const inp = { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: `2px solid ${INK}`, borderRadius: 12, fontSize: 16, fontFamily: F, background: "#fff", marginTop: 6 };
const btn = (bg, fg) => ({ width: "100%", padding: "13px", border: `2px solid ${INK}`, borderRadius: 999, background: bg, color: fg, fontWeight: 800, fontSize: 15, fontFamily: F, cursor: "pointer", marginTop: 12 });

export default function Login() {
  const [mode, setMode] = useState("in");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [adult, setAdult] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const up = mode === "up";

  const run = async (fn) => {
    setMsg("");
    if (up && !adult) { setMsg("Please confirm the age statement first."); return; }
    setBusy(true);
    try { await fn(); window.location.href = "/account"; }
    catch (e) {
      const c = String(e?.code || "");
      setMsg(c.includes("wrong-password") || c.includes("invalid-credential") ? "Wrong email or password."
        : c.includes("email-already") ? "That email already has an account — sign in instead."
        : c.includes("weak-password") ? "Password needs at least 6 characters."
        : c.includes("popup-closed") ? "" : c.includes("unauthorized-domain") ? "Sign-in isn't enabled for this site yet." : "Couldn't sign in. Please try again.");
    }
    setBusy(false);
  };

  return (
    <main style={{ fontFamily: F, color: INK, maxWidth: 440, margin: "0 auto", padding: "40px 24px 80px" }}>
      <a href="/" style={{ color: INK, fontWeight: 800, textDecoration: "none" }}>← tqak</a>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 38, margin: "20px 0 4px" }}>{up ? "Create your tqak account" : "Sign in to tqak"}</h1>
      <p style={{ color: "#4a4458", marginTop: 0 }}>One account for the tqak apps. Adults only — kids play without an account.</p>
      <div style={{ background: CARD, border: `2px solid ${INK}`, borderRadius: 20, padding: 20 }}>
        {up && (
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, marginBottom: 6 }}>
            <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} style={{ marginTop: 4 }} />
            <span>I am 18 or older, or a parent/guardian setting this up for my family. I have read the <a href="/privacy" style={{ color: ACC }}>Privacy page</a>.</span>
          </label>
        )}
        <button disabled={busy} style={btn("#fff", INK)} onClick={() => run(() => signInWithPopup(auth, new GoogleAuthProvider()))}>Continue with Google</button>
        <div style={{ textAlign: "center", margin: "14px 0 0", fontSize: 13, color: "#4a4458" }}>or use email</div>
        <label style={{ display: "block", marginTop: 8, fontWeight: 700, fontSize: 13 }}>Email
          <input style={inp} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label style={{ display: "block", marginTop: 10, fontWeight: 700, fontSize: 13 }}>Password
          <input style={inp} type="password" autoComplete={up ? "new-password" : "current-password"} value={pw} onChange={(e) => setPw(e.target.value)} />
        </label>
        <button disabled={busy} style={btn(ACC, "#fff")}
          onClick={() => run(() => (up ? createUserWithEmailAndPassword(auth, email.trim(), pw) : signInWithEmailAndPassword(auth, email.trim(), pw)))}>
          {up ? "Create account" : "Sign in"}
        </button>
        {!up && (
          <button type="button" style={{ background: "none", border: 0, color: ACC, fontWeight: 700, marginTop: 12, cursor: "pointer", fontFamily: F }}
            onClick={async () => { if (!email) { setMsg("Enter your email first."); return; } try { await sendPasswordResetEmail(auth, email.trim()); setMsg("If that email has an account, a reset link is on its way."); } catch { setMsg("If that email has an account, a reset link is on its way."); } }}>
            Forgot password?
          </button>
        )}
        {msg && <p role="alert" style={{ color: "#b3261e", fontWeight: 700, marginBottom: 0 }}>{msg}</p>}
      </div>
      <p style={{ textAlign: "center", marginTop: 18 }}>
        {up ? "Already have an account?" : "New here?"}{" "}
        <button style={{ background: "none", border: 0, color: ACC, fontWeight: 800, cursor: "pointer", fontFamily: F, fontSize: 16 }} onClick={() => { setMode(up ? "in" : "up"); setMsg(""); }}>{up ? "Sign in" : "Create an account"}</button>
      </p>
    </main>
  );
}
