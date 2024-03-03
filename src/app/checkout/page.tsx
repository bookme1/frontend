"use client";
import { Controls } from "@/components/books/Controls";
import { BreadCrumbs } from "@/components/common/BreadCrumbs";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Signed in as {session.user && session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );

  return (
    <>
      <p>Hello! Its checkout</p>
    </>
  );
}
