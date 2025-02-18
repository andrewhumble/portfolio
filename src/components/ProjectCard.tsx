import React, { useState } from 'react';
import Link from "next/link";
import Image from 'next/image';
import { IconExternalLink } from "@tabler/icons-react";
import TextFade from "@/components/TextFade";

interface ProjectCardProps {
  title: string;
  description?: string;
  link: string;
  imageSrc?: string;
  imageAlt?: string;
  size?: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, link, imageSrc, imageAlt, size }) => {
  const [hoveredLink, setHoveredLink] = useState(false);

  return (
    <div style={{height: `${size}rem`}} className="border w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-950 dark:border-zinc-900 p-4 md:p-6">
      <div className="text-start">
        <h3 className="text-xl md:text-2xl font-bold font-mackinac mb-1 dark:text-zinc-200 text-zinc-900">
          <Link
            href={link}
            className="inline-flex items-center hover:text-blue-600 dark:hover:text-blue-400 hover:underline hover:underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHoveredLink(true)}
            onMouseLeave={() => setHoveredLink(false)}
          >
            {title}
            {hoveredLink && <TextFade direction="right" duration={0.5} distance={10}><IconExternalLink className="min-h-6 min-w-6 ml-2 inline-block" /></TextFade>}
          </Link>
        </h3>
        <p className="font-sans text-lg dark:text-zinc-500 text-zinc-600">
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
