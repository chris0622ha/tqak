export const metadata = {
  title: "tqak — AccuratKey & TrivQuic",
  description: "tqak by chris0622ha — the AccuratKey typing trainer and the TrivQuic trivia game.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,800;1,9..144,500&family=Manrope:wght@400;600;800&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, background: "#f4efe6", color: "#17141f", fontFamily: "'Manrope', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
