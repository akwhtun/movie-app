import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./context/ThemeProvider";
import { NextAuthProvider } from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie App",
  description: "This is my next js movie project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
