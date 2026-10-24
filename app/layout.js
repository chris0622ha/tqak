import "@fontsource/fraunces/latin-500.css";
import "@fontsource/fraunces/latin-800.css";
import "@fontsource/manrope/latin-400.css";
import "@fontsource/manrope/latin-600.css";
import "@fontsource/manrope/latin-800.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "@fontsource/ibm-plex-mono/latin-600.css";

export const metadata = {
  title: "tqak — AccuratKey & TrivQuic",
  description: "tqak is the home of the AccuratKey typing trainer and the TrivQuic trivia game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#f4efe6", color: "#17141f", fontFamily: "'Manrope', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
