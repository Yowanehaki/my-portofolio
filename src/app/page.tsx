// src/app/page.tsx
import Hero from "@/sections/hero";
import About from "@/sections/about";
import Projects from "@/sections/projects";
import Skills from "@/sections/skills";
import Contactme from "@/sections/contactme";

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contactme />
    </>
  );
}
