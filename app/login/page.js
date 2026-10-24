"use client";
import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut, deleteUser } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

const INK = "#17141f", PAPER = "#f4efe6", CARD = "#fffaf1", ACC = "#5b3df5";
const F = "'Manrope', system-ui, sans-serif";
const inp = { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: `2px solid ${INK}`, borderRadius: 12, fontSize: 16, fontFamily: F, background: "#fff", marginTop: 6 };
const btn = (bg, fg) => ({ width: "100%", padding: "13px", border: `2px solid ${INK}`, borderRadius: 999, background: bg, color: fg, fontWeight: 800, fontSize: 15, fontFamily: F, cursor: "pointer", marginTop: 12 });

export default function Login() {
  const [mode, setMode] = useState("in");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [adult, setAdult] = useState(false);
  const [kind, setKind] = useState("me"); // "me" | "child"
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const up = mode === "up";

  const run = async (fn) => {
    setMsg("");
    if (up && !adult) { setMsg(kind === "child" ? "Please confirm the parent statement first." : "Please confirm the age statement first."); return; }
    setBusy(true);
    try {
      const cred = await fn();
      if (up && kind === "child") {
        // Record the parent's declaration on the ACCOUNT. If we can't save it, undo the sign-up
        // so a child account is never left without its restrictions.
        try {
          await setDoc(doc(db, "accounts", cred.user.uid), { email: cred.user.email, childUse: true, childUseDeclaredAt: serverTimestamp(), childUseSource: "tqak" }, { merge: true });
        } catch (err) {
          try { await deleteUser(cred.user); } catch { await signOut(auth).catch(() => {}); }
          setMsg("We couldn't save the child-account setting, so no account was created. Please try again later.");
          setBusy(false); return;
        }
      }
      window.location.href = "/account";
    }
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
      <p style={{ color: "#4a4458", marginTop: 0 }}>{up ? "Accounts are made by a parent or adult. If it's for a child, choose that below — the child's account is heavily restricted." : "One account for the tqak apps."}</p>
      <div style={{ background: CARD, border: `2px solid ${INK}`, borderRadius: 20, padding: 20 }}>
        {up && (
          <>
            <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>Who is this account for?</div>
            <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
              {[["me", "Me (adult)"], ["child", "My child"]].map(([k, l]) => (
                <button key={k} type="button" onClick={() => { setKind(k); setAdult(false); }}
                  style={{ flex: 1, padding: "10px", borderRadius: 12, border: `2px solid ${INK}`, background: kind === k ? ACC : "#fff", color: kind === k ? "#fff" : INK, fontWeight: 800, fontFamily: F, cursor: "pointer" }}>{l}</button>
              ))}
            </div>
            {kind === "child" && (
              <div style={{ background: "#fff", border: `2px dashed ${INK}`, borderRadius: 12, padding: 10, fontSize: 13, marginBottom: 8 }}>
                <b>Restricted child account.</b> Use <u>your own</u> email, not your child's. We only collect the parent's email. The child gets no username, no leaderboards, no multiplayer, no friends or chat and no photo uploads, and their progress stays on the device.
              </div>
            )}
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, marginBottom: 6 }}>
              <input type="checkbox" checked={adult} onChange={(e) => setAdult(e.target.checked)} style={{ marginTop: 4 }} />
              {kind === "child"
                ? <span>I am this child's parent or legal guardian. This account will be used by a minor, and I understand it will be restricted. I have read the <a href="/privacy" style={{ color: ACC }}>Privacy page</a>.</span>
                : <span>I am 13 or older (if under 18, with a parent's permission). I have read the <a href="/privacy" style={{ color: ACC }}>Privacy page</a>.</span>}
            </label>
          </>
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
