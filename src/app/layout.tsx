import "@/styles/globals.css";
import { Metadata } from "next";
import { firaSans } from "@/styles/fonts";
import { Icons } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${firaSans.className}, scroll-smooth`}>
      <head></head>
      <body className="bg-main">
        <main>{children}</main>
      </body>
      <Icons />
    </html>
  );
}
