import React from 'react';
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  byline: string;
  description: string;
  link: string;
}

const WritingCard: React.FC<ProjectCardProps> = ({ title, byline, description, link }) => {
  return (
    <div className="border w-full rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-950 dark:border-zinc-900 p-4 md:p-6">
      <div className="text-start">
        <h3 className="text-xl md:text-2xl font-bold font-mackinac dark:text-zinc-200 text-zinc-900 mb-1">
          <Link
            href={link}
            className="inline-flex items-center hover:text-blue-600 dark:hover:text-blue-400 hover:underline hover:underline-offset-4"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </Link>
        </h3>
        <span className="font-sans text-md dark:text-zinc-500 text-zinc-600">
            {byline}
        </span>
        <p className="font-sans text-lg dark:text-zinc-500 text-zinc-600 pt-6">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WritingCard;
