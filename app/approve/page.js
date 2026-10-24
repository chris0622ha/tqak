"use client";
import { useEffect, useState } from "react";
import { isSignInWithEmailLink, signInWithEmailLink, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";

const INK = "#17141f", CARD = "#fffaf1", ACC = "#5b3df5";
const F = "'Manrope', system-ui, sans-serif";
const inp = { width: "100%", boxSizing: "border-box", padding: "12px 14px", border: `2px solid ${INK}`, borderRadius: 12, fontSize: 16, fontFamily: F, background: "#fff", marginTop: 6 };
const btn = { width: "100%", padding: "13px", border: `2px solid ${INK}`, borderRadius: 999, background: ACC, color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: F, cursor: "pointer", marginTop: 12 };

export default function Approve() {
  const [step, setStep] = useState("loading"); // loading | email | confirm | done | bad
  const [email, setEmail] = useState("");
  const [ok, setOk] = useState(false);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!isSignInWithEmailLink(auth, window.location.href)) { setStep("bad"); return; }
    setStep("email");
  }, []);

  const verify = async () => {
    setBusy(true); setMsg("");
    try {
      const cred = await signInWithEmailLink(auth, email.trim(), window.location.href);
      const snap = await getDoc(doc(db, "accounts", cred.user.uid));
      if (snap.exists() && !snap.data().childUse) {
        await signOut(auth);
        setMsg("That email already has a regular account, so it can't be turned into a child account. Use a different parent email.");
        setBusy(false); return;
      }
      setStep("confirm");
    } catch { setMsg("That link didn't work. It may have expired or the email doesn't match. Ask for a new one."); }
    setBusy(false);
  };

  const approve = async () => {
    if (!ok) { setMsg("Please tick the statement first."); return; }
    setBusy(true); setMsg("");
    try {
      const u = auth.currentUser;
      await setDoc(doc(db, "accounts", u.uid), { email: u.email, createdAt: serverTimestamp(), childUse: true, childUseDeclaredAt: serverTimestamp(), childUseSource: "tqak-email-approval" }, { merge: true });
      setStep("done");
    } catch { setMsg("We couldn't save that. Nothing was approved. Please try again later."); }
    setBusy(false);
  };

  return (
    <main style={{ fontFamily: F, color: INK, maxWidth: 460, margin: "0 auto", padding: "40px 24px 80px" }}>
      <a href="/" style={{ color: INK, fontWeight: 800, textDecoration: "none" }}>← tqak</a>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 34, margin: "20px 0 8px" }}>Parent approval</h1>
      <div style={{ background: CARD, border: `2px solid ${INK}`, borderRadius: 20, padding: 20 }}>
        {step === "loading" && <p>Loading…</p>}
        {step === "bad" && <p style={{ margin: 0 }}>This page is opened from the approval email. If your child asked you to approve an account, use the link in that email.</p>}
        {step === "email" && (<>
          <p style={{ marginTop: 0 }}>A child asked to set up a restricted account using your email. First, confirm this is your email address.</p>
          <label style={{ fontWeight: 700, fontSize: 13 }}>Your email<input style={inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <button style={btn} disabled={busy} onClick={verify}>Continue</button>
        </>)}
        {step === "confirm" && (<>
          <p style={{ marginTop: 0 }}><b>Restricted child account.</b> The child gets no username, leaderboards, multiplayer, friends, chat or photo uploads, and their progress stays on their device. We hold only your email.</p>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14 }}>
            <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} style={{ marginTop: 4 }} />
            <span>I am this child's parent or legal guardian. This account will be used by a minor, and I approve it with these restrictions. I have read the <a href="/privacy" style={{ color: ACC }}>Privacy page</a>.</span>
          </label>
          <button style={btn} disabled={busy} onClick={approve}>Approve restricted account</button>
        </>)}
        {step === "done" && (<>
          <p style={{ marginTop: 0, fontWeight: 800 }}>Approved ✅</p>
          <p>The restricted account is ready. To let your child play, log in to AccuratKey with this email on their device, or keep control of the login yourself.</p>
          <a href="/account" style={{ ...btn, display: "block", textAlign: "center", textDecoration: "none", boxSizing: "border-box" }}>Go to account</a>
        </>)}
        {msg && <p role="alert" style={{ color: "#b3261e", fontWeight: 700, marginBottom: 0 }}>{msg}</p>}
      </div>
    </main>
  );
}
