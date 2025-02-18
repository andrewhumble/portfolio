import React from 'react';
import labels from "@/constants/labels.json";

const IntroSection = () => {
  return (
    <h1 className="font-mackinac font-medium text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white">
      <span className="dark:text-gray-400">{labels.intro.title}</span>
      {labels.intro.role} focused on{" "}
      {labels.intro.focuses.map((focus, index, array) => (
        <span key={focus}>
          <span className="italic text-blue-600 dark:text-blue-400">{focus}</span>
          {index === array.length - 1 ? "." : index === array.length - 2 ? ", and " : ", "}
        </span>
      ))}
    </h1>
  );
};

export default IntroSection;