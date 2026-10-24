export const metadata = { title: "Privacy — tqak" };
const P = { fontFamily: "'Manrope', system-ui, sans-serif", color: "#17141f", lineHeight: 1.7 };
export default function Privacy() {
  return (
    <main style={{ ...P, maxWidth: 720, margin: "0 auto", padding: "48px 24px 96px" }}>
      <a href="/" style={{ color: "#17141f", fontWeight: 800 }}>← tqak</a>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, margin: "24px 0 8px" }}>Privacy</h1>
      <p><b>tqak collects nothing.</b> It has no accounts, no forms, no cookies, no analytics and no ads, and it does not store anything about you in your browser or on our servers.</p>
      <h2>Fonts</h2>
      <p>Fonts are served from tqak itself, not from Google or any other third party.</p>
      <h2>Hosting</h2>
      <p>The site is hosted on Vercel, which keeps ordinary server logs (such as IP address) for security and operations.</p>
      <h2>The apps shown here</h2>
      <p>tqak displays previews of AccuratKey and TrivQuic and links to them. They are separate sites with their own policies and no shared accounts or data. Children under 13 get a limited experience in both. See each app's Privacy and Children's Privacy pages:</p>
      <ul>
        <li><a href="https://accuratkey.vercel.app/privacy">AccuratKey privacy</a> · <a href="https://accuratkey.vercel.app/childrens-privacy">children</a></li>
        <li><a href="https://trivquic.vercel.app/privacy">TrivQuic privacy</a> · <a href="https://trivquic.vercel.app/childrens-privacy">children</a></li>
      </ul>
    </main>
  );
}
