"use client"

import React, { useRef } from "react";
import { useMediaQuery } from 'react-responsive';
import { navBarBreakpoint } from '@/lib/constants';
import NavBar from "@/components/NavBar";
import IntroSection from "@/components/IntroSection";
import CurrentPosition from "@/components/CurrentPosition";
import ProjectShowcase from "@/components/ProjectShowcase";
import Fretboard from "@/components/Fretboard";
import Footer from "@/components/Footer";
import WritingShowcase from "@/components/WritingShowcase";

export default function Page() {
  const fretboard = useRef<{ pluckStrings: () => void } | null>(null);
  const tooSmallForFretboard = useMediaQuery({ query: '(max-width: 480px)' });
  const menuIsHorizontal = useMediaQuery({ query: `(max-width: ${navBarBreakpoint})` });

  return (
    <div className="bg-gray-50 dark:bg-[#121212] md:flex overflow-x-hidden">
      <NavBar fretboardRef={fretboard} />
      <main className={`${menuIsHorizontal ? 'mt-14' : ''} min-h-screen max-w-full bg-white dark:bg-zinc-950 ml-2 mr-2 md:mr-0 md:ml-16 px-4 md:px-32 md:mt-8 pb-12 rounded-t-2xl md:rounded-tl-2xl border border-gray-200 dark:border-[#232323]`}>
        <div className="mx-auto md:pt-48 pt-12">
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="md:w-2/3 relative z-10">
              <IntroSection />
              <CurrentPosition />
            </div>
            <div className="md:w-1/3 relative z-10">
              {!tooSmallForFretboard && <Fretboard ref={fretboard} />}
            </div>
          </div>
        </div>
        <ProjectShowcase />
        <WritingShowcase />
        <Footer />
      </main>
    </div>
  );
}