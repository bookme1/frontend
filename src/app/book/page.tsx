"use client";

import { redirect } from "next/navigation";

export default function Home() {
  redirect("/");
  return <p>Сторінка не знайдена! Перенаправлення...</p>;
}
