"use client";
import HeadComponent from "./components/HeadComponent";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div className="max-w-screen-lg min-h-screen mx-auto p-4">
      <HeadComponent />

      <main className="flex flex-col gap-8 row-start-2 items-start">
        <Hero />
      </main>
    </div>
  );
}
