"use client"

import React, { useRef } from "react";
import { useMediaQuery } from 'react-responsive';
import { navBarBreakpoint } from '@/lib/constants';
import { IconBrandGithub, IconFileCv } from '@tabler/icons-react';
import NavBar from "@/components/NavBar";
import IntroSection from "@/components/IntroSection";
import CurrentPosition from "@/components/CurrentPosition";
import ProjectCard from "@/components/ProjectCard";
import Fretboard from "@/components/Fretboard";
import TextFade from "@/components/TextFade";
import Separator from "@/components/Separator";
import Footer from "@/components/Footer";

export default function Page() {
  const fretboard = useRef<{ pluckStrings: () => void } | null>(null);
  const tooSmallForFretboard = useMediaQuery({ query: '(max-width: 480px)' });
  const menuIsHorizontal = useMediaQuery({ query: `(max-width: ${navBarBreakpoint})` });

  return (
    <div className="bg-white dark:bg-[#121212] md:flex overflow-x-hidden">
      <NavBar fretboardRef={fretboard} />
      <main className={`${menuIsHorizontal ? 'mt-14' : ''} min-h-screen max-w-full bg-gray-100 dark:bg-[#0A0A0A] ml-2 mr-2 md:mr-0 md:ml-16 px-4 md:px-16 md:mt-8 pb-12 rounded-t-2xl md:rounded-tl-2xl border border-gray-200 dark:border-[#232323]`}>
        <div className="mx-auto px-4 md:pt-48 pt-12 md:px-6">
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
        <div className={`${tooSmallForFretboard ? 'pt-12' : ''} md:pt-24 relative z-20 flex flex-col md:flex-row justify-between gap-4 md:gap-6 flex-wrap`}>
          <div className="flex-1">
            <TextFade direction="up">
              <ProjectCard
                title="PomoPlaylist.com"
                description="Leveraging the Spotify API to listen to turn music into a Pomodoro timer for productivity and fun."
                link="https://www.pomoplaylist.com/"
                imageSrc="/pomoplaylist.png"
                imageAlt="PomoPlaylist"
                size={24}
                skills={['Python', 'Flask', 'APIs']}
              />
            </TextFade>
          </div>
          <div className="flex-1">
            <TextFade direction="up">
              <ProjectCard
                title="Patent Proposal (US20240103797A1)"
                description='"Indicating health, status, or condition of a monitored target using degraded audio quality." — a.k.a. using music for system health monitoring'
                link="https://patents.google.com/patent/US20240103797A1/en?oq=US20240103797A1"
                imageSrc="/patent-figure.jpg"
                imageAlt="Patent Figure"
                size={24}
                skills={['SQL', 'Python', 'Audio Manipulation']}
              />
            </TextFade>
          </div>
        </div>
        <div className="pt-6 relative z-20 flex flex-col md:flex-row justify-between gap-4 md:gap-8 flex-wrap">
          <div className="flex-1">
            <TextFade direction="up">
              <ProjectCard
                title="andrewhumble.dev"
                description="This site! Hosted publicly on GitHub."
                link="https://github.com/andrewhumble/portfolio"
                size={10}
                icon={IconBrandGithub}
                skills={['Typescript', 'NextJS', 'Tailwind']}
              />
            </TextFade>
          </div>
          <div className="flex-1 pb-6">
            <TextFade direction="up">
              <ProjectCard
                title="Cheaper-Dubbing"
                description="75% cheaper video translation dubbing using Whisper + ElevenLabs TTS"
                link="https://github.com/andrewhumble/cheaper-dubbing"
                size={10}
                icon={IconBrandGithub}
                skills={['Python', 'OpenAI Whisper', 'ElevenLabs']}
              />
            </TextFade>
          </div>
        </div>
        <div className="flex-1 pb-12">
          <TextFade direction="up">
            <ProjectCard
              title="My Resume"
              description="One view of what I've done, written in LaTeX."
              link="/andrewhumble_resume.pdf"
              size={10}
              icon={IconFileCv}
              skills={['LaTeX']}
            />
          </TextFade>
        </div>
        <Separator />
        <Footer />
      </main>
    </div>
  );
}