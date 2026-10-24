"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../lib/firebase";

const INK = "#17141f", CARD = "#fffaf1";
const F = "'Manrope', system-ui, sans-serif";
const card = { background: CARD, border: `2px solid ${INK}`, borderRadius: 20, padding: 20, marginTop: 16 };
const link = (bg, fg) => ({ display: "block", textAlign: "center", padding: "13px", border: `2px solid ${INK}`, borderRadius: 999, background: bg, color: fg, fontWeight: 800, textDecoration: "none", marginTop: 10 });

export default function Account() {
  const [user, setUser] = useState(undefined);
  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u || null)), []);
  return (
    <main style={{ fontFamily: F, color: INK, maxWidth: 480, margin: "0 auto", padding: "40px 24px 80px" }}>
      <a href="/" style={{ color: INK, fontWeight: 800, textDecoration: "none" }}>← tqak</a>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 38, margin: "20px 0 4px" }}>Your account</h1>
      {user === undefined && <p>Loading…</p>}
      {user === null && (<div style={card}><p style={{ marginTop: 0 }}>You're not signed in.</p><a href="/login" style={link("#5b3df5", "#fff")}>Sign in or create an account</a></div>)}
      {user && (
        <>
          <div style={card}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>Signed in as</div>
            <div style={{ fontSize: 18, fontWeight: 800, wordBreak: "break-all" }}>{user.email}</div>
            <p style={{ fontSize: 13, color: "#4a4458", marginBottom: 0 }}>This is the same account you use in AccuratKey — sign in there with the same method and your data is waiting. TrivQuic keeps its own separate sign-in.</p>
          </div>
          <div style={card}>
            <div style={{ fontWeight: 800 }}>Open an app</div>
            <a href="https://accuratkey.vercel.app" style={link("#5b3df5", "#fff")}>AccuratKey</a>
            <a href="https://trivquic.vercel.app" style={link("#ff4f8b", INK)}>TrivQuic</a>
          </div>
          <button onClick={() => signOut(auth).then(() => (window.location.href = "/"))} style={{ ...link("#fff", INK), width: "100%", cursor: "pointer", fontFamily: F, fontSize: 15 }}>Sign out</button>
          <p style={{ fontSize: 13, marginTop: 20 }}>To delete your account, email <a href="mailto:tqaksupport@gmail.com">tqaksupport@gmail.com</a>.</p>
        </>
      )}
    </main>
  );
}
