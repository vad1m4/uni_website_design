import type { Metadata } from "next";
import { Shell } from "@/components/shell";
import "./globals.css";
export const metadata: Metadata = {
  title: {
    default: "get2max — Maximize Your Potential.",
    template: "%s | get2max",
  },
  description:
    "Practical knowledge. Better habits. Meaningful progress. Your personal space to learn, grow, and become a little better every day.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
