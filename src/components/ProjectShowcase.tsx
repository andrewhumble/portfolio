import React from 'react';
import { projects } from '@/lib/constants';
import ProjectCard from './ProjectCard';


const ProjectShowcase: React.FC = () => {
  return (
    <div className='pt-12 relative bg-white dark:bg-zinc-950 z-20'>
      <div className="flex flex-row gap-2 items-center pb-2">
        <span className="flex w-fit text-sm uppercase font-mono">Projects</span>
        <hr className="my-4 border-border w-full" />
      </div>

      <div className="columns-1 md:columns-2 gap-4 md:gap-6">
        {projects.map((project) => (
          <div key={project.title} className="mb-4 md:mb-6 break-inside-avoid">
            <ProjectCard
              title={project.title}
              description={project.description}
              link={project.link}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              icon={project.icon}
              skills={project.skills}
              size={project.size}
            />
          </div>
        ))}
      </div>
      <div className="pb-6"></div>
    </div>
  );
};

export default ProjectShowcase;
