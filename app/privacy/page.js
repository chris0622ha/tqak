export const metadata = { title: "Privacy — tqak" };
const P = { fontFamily: "'Manrope', system-ui, sans-serif", color: "#17141f", lineHeight: 1.7 };
export default function Privacy() {
  return (
    <main style={{ ...P, maxWidth: 720, margin: "0 auto", padding: "48px 24px 96px" }}>
      <a href="/" style={{ color: "#17141f", fontWeight: 800 }}>← tqak</a>
      <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 40, margin: "24px 0 8px" }}>Privacy</h1>
      <p style={{ color: "#4a4458" }}>Last updated October 24, 2026</p>
      <p><b>Browsing tqak collects nothing.</b> You only share information if you choose to create an account.</p>
      <h2>Accounts</h2>
      <p>Accounts are for people 13 or older (with a parent's permission if under 18), and for parents or guardians who set one up for a child. If you create an account we receive your email address and a sign-in ID (from Google, or the email and password you choose; passwords are handled by Google Firebase Authentication and we never see them). The account is the same one used by AccuratKey, so AccuratKey's Privacy and Children's Privacy pages also apply.</p>
      <h2>Accounts for children</h2>
      <p>A child under 13 cannot make their own account. A parent or guardian can create one for them using the parent's own email, after stating that they are the parent and that a minor will use it. We keep a record of that statement and its date. Child accounts are heavily restricted: no username, leaderboards, multiplayer, friends, chat or photo uploads, and the child's progress stays on the device and is not sent to us. We collect nothing from the child beyond the parent's email. This is a parent's statement, not an identity check.</p>
      <h2>When a child asks a parent to approve</h2>
      <p>A child can type a parent's email address so we can send the parent one message to approve a restricted account. We use that address only to send the message, and we do not store it. If the parent does not approve, nothing is created. The approval page records the parent's statement and date, as described above. It confirms the parent controls that email address; it is not an identity check.</p>
      <h2>No ads, no tracking, no selling</h2>
      <p>We do not run ads, analytics trackers or advertising cookies, do not sell personal information, and do not share it for advertising or AI training. Fonts are served from tqak itself.</p>
      <h2>Who receives data</h2>
      <p>Only the providers that run the service on our behalf: Google Firebase (sign-in) and Vercel (hosting, which keeps ordinary server logs such as IP address). They may not use it for their own purposes.</p>
      <h2>How long we keep it</h2>
      <p>Account details are kept until you ask us to delete the account, or until it has been unused for 24 months. Hosting logs are kept by Vercel on its normal schedule.</p>
      <h2>Security</h2>
      <p>Sign-in is handled by Firebase Authentication over encrypted connections, and we collect only what sign-in needs. No system is perfectly secure.</p>
      <h2>Your choices</h2>
      <p>Email <a href="mailto:tqaksupport@gmail.com">tqaksupport@gmail.com</a> to see, correct or delete your information. Parents can do the same for a child.</p>
      <h2>If a child signs up on their own</h2>
      <p>If you think a child under 13 created an account without a parent, email us and we will delete it promptly.</p>
      <h2>The apps shown here</h2>
      <p>AccuratKey and TrivQuic are separate sites with their own policies. TrivQuic has its own sign-in and does not share data with tqak.</p>
      <ul>
        <li><a href="https://accuratkey.vercel.app/privacy">AccuratKey privacy</a> · <a href="https://accuratkey.vercel.app/childrens-privacy">children</a></li>
        <li><a href="https://trivquic.vercel.app/privacy">TrivQuic privacy</a> · <a href="https://trivquic.vercel.app/childrens-privacy">children</a></li>
      </ul>
    </main>
  );
}
