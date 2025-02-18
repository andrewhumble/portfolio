import React from 'react';
import Link from "next/link";
import labels from "@/constants/labels.json";

const CurrentPosition = () => {
  return (
    <div className="mt-8 md:mt-56 font-sans text-gray-600 dark:text-gray-400">
        <h2 className="text-md">{labels.current.label}</h2>
        <div className="flex items-center mt-1 text-md">
          <span className="text-gray-800 dark:text-white">{labels.current.position}
            <Link
              href={labels.current.company.url}
              className="underline underline-offset-4 inline-flex items-center gap-2 hover:text-gray-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{labels.current.company.name}</span>
            </Link>
          </span>
        </div>
    </div>
  );
};

export default CurrentPosition;