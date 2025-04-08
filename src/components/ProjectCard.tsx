import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { IconExternalLink } from "@tabler/icons-react";
import TextFade from "@/components/TextFade";
import SkillPill from "@/components/SkillPill";

interface ProjectCardProps {
  title: string;
  description?: string;
  link: string;
  imageSrc?: string;
  imageAlt?: string;
  size?: number;
  icon?: React.ElementType;
  skills?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, imageSrc, imageAlt, size, icon, skills }) => {
  const [hoveredLink, setHoveredLink] = useState(false);

  return (
    <div style={{ height: `${size}rem` }} className="border w-full rounded-2xl overflow-hidden bg-gray-50 dark:bg-[#121212] dark:border-zinc-900 p-4 md:p-6">
      <div className="text-start">
        <h3 className="text-xl md:text-2xl font-bold font-mackinac dark:text-zinc-200 text-zinc-900">
          <Link
            href={link}
            className="inline-flex items-center hover:underline hover:underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredLink(true)}
            onMouseLeave={() => setHoveredLink(false)}
          >
            {title}
            {hoveredLink && (
              <TextFade direction="right" duration={0.5} distance={10}>
                {icon ? React.createElement(icon, { className: "min-h-6 min-w-6 ml-2 inline-block" }) : <IconExternalLink className="min-h-6 min-w-6 ml-2 inline-block" />}
              </TextFade>
            )}
          </Link>
        </h3>
        {/* <SkillPill className="bg-green-600 my-2" skill="Java" /> */}
        {skills && skills.length > 0 && ( // Added this block to display SkillPills
          <div className="flex flex-wrap gap-2 py-2">
            {skills.map((skill, index) => (
              <SkillPill key={index} className="bg-zinc-200 dark:bg-zinc-800" skill={skill} />
            ))}
          </div>
        )}
        <p className="font-sans text-lg dark:text-zinc-400 text-zinc-600">
          {description}
        </p>
        {imageSrc && imageAlt && (
          <div className="pt-6">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={500}
              height={400}
              className="w-full h-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
