"use client";
import { useState, useEffect, useRef } from "react";

const INK = "#17141f", PAPER = "#f4efe6", CARD = "#fffaf1";
const AK = { name: "AccuratKey", url: "https://accuratkey.vercel.app", color: "#5b3df5", soft: "#e4defd", on: "#fff" };
const TQ = { name: "TrivQuic", url: "https://trivquic.vercel.app", color: "#ff4f8b", soft: "#ffd9e6", on: "#17141f" };
const SERIF = "'Fraunces', Georgia, serif";
const MONO = "'IBM Plex Mono', ui-monospace, monospace";

function useReveal() {
  const ref = useRef(null); const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setVis(true); return; }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); o.disconnect(); } }, { threshold: 0.12 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, vis];
}

function Counter({ to }) {
  const [v, setV] = useState(0); const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const o = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; o.disconnect();
      const s = performance.now();
      const tick = (t) => { const p = Math.min((t - s) / 1200, 1); setV(Math.round((1 - Math.pow(1 - p, 3)) * to)); if (p < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    o.observe(el); return () => o.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}</span>;
}

const Arrow = () => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden><path d="M3 9h12M10 4l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;

function Button({ href, app, children, ghost }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 22px", borderRadius: 999, fontWeight: 800, fontSize: 15, textDecoration: "none",
        background: ghost ? "transparent" : app.color, color: ghost ? INK : app.on, border: `2px solid ${ghost ? INK : app.color}`,
        transform: h ? "translate(-2px,-2px)" : "none", boxShadow: h ? `4px 4px 0 ${INK}` : `0 0 0 ${INK}`, transition: "all .15s" }}>
      {children}<Arrow />
    </a>
  );
}

const FACTS = {
  ak: {
    tag: "Typing trainer", n: "01",
    title: "Type fast by typing accurately first.",
    body: "No Backspace, so your fingers learn the right key the first time. Work through a real curriculum, play arcade-style typing games, and keep a daily streak going.",
    stats: [[180, "levels"], [32, "games"], [10, "keyboard layouts"]],
    points: ["Levels from home row to long literature passages", "32 typing games: arcade, memory, puzzle, speed and spelling", "Daily Challenge with a leaderboard and streaks", "Keys to earn and spend on themes, fonts and sounds", "One account, a profile for everyone at home. No ads"],
  },
  tq: {
    tag: "Trivia game", n: "02",
    title: "Fast trivia. No mercy.",
    body: "Pick a category, set the timer, and answer before it runs out. Take a friend 1v1 in Duels, or host a room and invite a whole group with a game code.",
    stats: [[960, "questions"], [6, "categories"], [14, "languages"]],
    points: ["Geography, science, history, math, sports and entertainment", "Easy, medium, hard or mixed, with rounds of 10, 20 or 30", "1v1 Duels and multiplayer rooms joined by a 6-letter code", "Achievements, profiles, friends and a global leaderboard", "Sign in with Google to keep your stats. Kid-safe mode for under 13"],
  },
};

function Showcase({ id, app, f, flip }) {
  const [ref, vis] = useReveal();
  const [load, setLoad] = useState(false);
  const [ok, setOk] = useState(false);
  return (
    <section id={id} ref={ref} style={{ maxWidth: 1180, margin: "0 auto", padding: "88px 24px 24px", opacity: vis ? 1 : 0, transform: vis ? "none" : "translateY(36px)", transition: "all .7s ease" }}>
      <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
        <div style={{ order: flip ? 2 : 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
            <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 13, color: app.color }}>{f.n}</span>
            <span style={{ height: 2, width: 36, background: app.color }} />
            <span style={{ fontFamily: MONO, fontWeight: 600, fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase" }}>{f.tag}</span>
          </div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(34px,5vw,56px)", lineHeight: 1.04, margin: "0 0 18px", letterSpacing: -1 }}>
            <span style={{ background: `linear-gradient(transparent 62%, ${app.soft} 62%)` }}>{app.name}</span>
          </h2>
          <p style={{ fontSize: 19, fontFamily: SERIF, fontStyle: "italic", margin: "0 0 14px" }}>{f.title}</p>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#4a4557", margin: "0 0 26px", maxWidth: 480 }}>{f.body}</p>
          <div style={{ display: "flex", gap: 28, marginBottom: 26, flexWrap: "wrap" }}>
            {f.stats.map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 40, lineHeight: 1, color: app.color }}>{f.stats[0][0] === 960 && n === 960 ? <><Counter to={n} />+</> : <Counter to={n} />}</div>
                <div style={{ fontFamily: MONO, fontSize: 11, marginTop: 6, textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
              </div>
            ))}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 30px", display: "grid", gap: 10 }}>
            {f.points.map(p => (
              <li key={p} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.5 }}>
                <span aria-hidden style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, background: app.color, color: app.on, fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>✓</span>{p}
              </li>
            ))}
          </ul>
          <Button href={app.url} app={app}>Open {app.name}</Button>
        </div>

        <div style={{ order: flip ? 1 : 2 }}>
          <div style={{ position: "relative" }}>
            <div aria-hidden style={{ position: "absolute", inset: 0, transform: "translate(14px,14px)", background: app.color, borderRadius: 22 }} />
            <div style={{ position: "relative", border: `2px solid ${INK}`, borderRadius: 22, background: CARD, overflow: "hidden", height: 480 }}>
              <div style={{ height: 40, borderBottom: `2px solid ${INK}`, display: "flex", alignItems: "center", gap: 10, padding: "0 14px", background: app.soft }}>
                <span style={{ width: 11, height: 11, borderRadius: "50%", border: `2px solid ${INK}` }} />
                <span style={{ width: 11, height: 11, borderRadius: "50%", border: `2px solid ${INK}` }} />
                <span style={{ flex: 1, textAlign: "center", fontFamily: MONO, fontSize: 12, fontWeight: 600 }}>{app.url.replace("https://", "")}</span>
              </div>
              {load ? (
                <div style={{ position: "relative", height: "calc(100% - 40px)" }}>
                  {!ok && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO, fontSize: 13 }}>Loading…</div>}
                  <iframe src={app.url + "?embed=1"} title={app.name} onLoad={() => setOk(true)} style={{ width: "100%", height: "100%", border: 0, display: "block" }} />
                </div>
              ) : (
                <button onClick={() => setLoad(true)} style={{ all: "unset", cursor: "pointer", boxSizing: "border-box", width: "100%", height: "calc(100% - 40px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center" }} aria-label={`Load a live preview of ${app.name}`}>
                  <span style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 64, color: app.color, lineHeight: 1 }}>{app.name[0]}</span>
                  <span style={{ fontWeight: 800 }}>Try it right here</span>
                  <span style={{ fontFamily: MONO, fontSize: 12, border: `2px solid ${INK}`, borderRadius: 999, padding: "8px 16px", background: app.color, color: app.on }}>Load live preview</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [y, setY] = useState(0);
  useEffect(() => { const f = () => setY(window.scrollY); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <>
      <style>{`
        *{box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:${TQ.color};color:#fff}
        a:focus-visible,button:focus-visible{outline:3px solid ${AK.color};outline-offset:3px}
        @keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .nl{color:${INK};text-decoration:none;font-weight:800;font-size:14px;padding:8px 14px;border-radius:999px;border:2px solid transparent}
        .nl:hover{border-color:${INK}}
        @media (max-width:860px){.split{grid-template-columns:1fr!important}.split>div{order:unset!important}.herogrid{grid-template-columns:1fr!important}}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 50, background: y > 10 ? PAPER + "f2" : PAPER, borderBottom: `2px solid ${INK}`, backdropFilter: "blur(8px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#top" style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 26, color: INK, textDecoration: "none", letterSpacing: -1 }}>tqak<span style={{ color: TQ.color }}>.</span></a>
          <nav style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <a className="nl" href="#accuratkey">AccuratKey</a>
            <a className="nl" href="#trivquic">TrivQuic</a>
            <a className="nl" href="https://github.com/chris0622ha" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px 40px" }}>
          <div className="herogrid" style={{ display: "grid", gridTemplateColumns: "1.15fr .85fr", gap: 40, alignItems: "end" }}>
            <h1 style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(48px,9vw,112px)", lineHeight: 0.95, letterSpacing: -3, margin: 0 }}>
              Type<br />cleaner.<br /><span style={{ fontStyle: "italic", fontWeight: 500, color: AK.color }}>Think</span>{" "}<span style={{ fontStyle: "italic", fontWeight: 500, color: TQ.color }}>faster.</span>
            </h1>
            <div>
              <p style={{ fontSize: 18, lineHeight: 1.65, color: "#4a4557", margin: "0 0 24px" }}>
                A typing trainer that teaches accuracy first, and a trivia game that rewards quick answers. Free to play, and nothing to install.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Button href="#accuratkey" app={AK}>AccuratKey</Button>
                <Button href="#trivquic" app={TQ}>TrivQuic</Button>
              </div>
            </div>
          </div>
        </section>

        <div aria-hidden style={{ borderTop: `2px solid ${INK}`, borderBottom: `2px solid ${INK}`, background: INK, color: PAPER, overflow: "hidden", margin: "36px 0 0" }}>
          <div style={{ display: "flex", width: "max-content", animation: "slide 36s linear infinite", fontFamily: MONO, fontWeight: 600, fontSize: 14, textTransform: "uppercase", letterSpacing: 2 }}>
            {[0, 1].map(k => <div key={k} style={{ display: "flex", whiteSpace: "nowrap" }}>
              {["180 typing levels", "32 typing games", "960+ trivia questions", "1v1 duels", "10 keyboard layouts", "14 languages", "no ads", "free"].map(t => <span key={t} style={{ padding: "13px 26px" }}>{t} <span style={{ color: TQ.color }}>✦</span></span>)}
            </div>)}
          </div>
        </div>

        <Showcase id="accuratkey" app={AK} f={FACTS.ak} />
        <Showcase id="trivquic" app={TQ} f={FACTS.tq} flip />
      </main>

      <footer style={{ marginTop: 96, borderTop: `2px solid ${INK}`, background: INK, color: PAPER }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "56px 24px 36px" }}>
          <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: "clamp(56px,14vw,168px)", lineHeight: 0.9, letterSpacing: -4 }}>tqak<span style={{ color: TQ.color }}>.</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginTop: 32, fontFamily: MONO, fontSize: 13 }}>
            <span>Made by chris0622ha</span>
            <span style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <a href={AK.url} target="_blank" rel="noopener noreferrer" style={{ color: PAPER }}>AccuratKey</a>
              <a href={TQ.url} target="_blank" rel="noopener noreferrer" style={{ color: PAPER }}>TrivQuic</a>
              <a href="https://github.com/chris0622ha" target="_blank" rel="noopener noreferrer" style={{ color: PAPER }}>GitHub</a>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
