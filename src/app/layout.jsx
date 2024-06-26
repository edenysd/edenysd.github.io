import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL("https://edenysd.github.io/"),
  author: "Edenys Denis González",
  title: `Edenys' Portfolio`,
  openGraph: {
    images: "/og-image.png",
  },
  description:
    "Edenys Denis González Portfolio. Hi! I am Computer Scientist. I talk mainly about web development, machine learning, data structures and algorithms.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.svg" />
        <meta
          name="google-site-verification"
          content="5Nn8isrexq1p_ml8HEyLhqXi1q4Ep1y_M5imfXdgAYg"
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}
