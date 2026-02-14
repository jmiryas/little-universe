import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Great_Vibes,
} from "next/font/google";
import "./globals.css";

// 1. Playfair Display (Ditambah style italic)
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"], // Wajib agar kata 'Universe' bisa miring
  variable: "--font-playfair",
  display: "swap",
});

// 2. Plus Jakarta Sans
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-jakarta",
  display: "swap",
});

// 3. Great Vibes
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Little Universe",
  description: "Our Little Universe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // PENTING: Variabel font dimasukkan ke tag html agar dibaca global oleh Tailwind v4
    <html
      lang="id"
      className={`${playfair.variable} ${jakarta.variable} ${greatVibes.variable}`}
    >
      <body className="font-sans bg-primary-50 text-stone-700 antialiased overflow-x-hidden">
        {/* Background Decoration */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-primary-200 rounded-full blur-[120px] opacity-40"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-love-200 rounded-full blur-[120px] opacity-30"></div>
        </div>

        {children}
      </body>
    </html>
  );
}
