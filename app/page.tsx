import { Hero } from "@/components/landing/Hero";
import { Builder } from "@/components/builder/Builder";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Builder />
    </main>
  );
}
