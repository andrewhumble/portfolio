import React from 'react';

interface SkillPillProps {
    skill: string;
    className: string;
}

export default function SkillPill({ skill, className }: SkillPillProps) {
    return (
        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium text-primary dark:text-primary-dark rounded-full max-w-36 w-fit ${className}`}>
            {skill}
        </span>
    );
}
