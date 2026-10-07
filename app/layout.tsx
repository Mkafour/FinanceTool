import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "FinanceCalc – Fast & Free Financial Calculators",
    description:
        "Free, mobile-friendly financial calculators for budgeting, loans, investments, and daily math.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable}`}
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
        >
        <Header />
        <main style={{ flex: 1, paddingTop: "2rem", paddingBottom: "2rem" }}>
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}