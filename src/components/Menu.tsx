import React, { useState } from 'react';
import { IconMenu } from "@tabler/icons-react";
import TextFade from "@/components/TextFade";
import Link from 'next/link';
import { IconExternalLink, IconX } from "@tabler/icons-react";
import Image from 'next/image';

const Menu = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
    const openMenu = () => setIsMenuVisible(true);
  
    const closeMenu = () => {
      setIsClosing(true);
      setTimeout(() => {
        setIsMenuVisible(false);
        setIsClosing(false);
      }, 300); // Adjust to match the transition duration
    };

    return (
        <div className="relative">
            <IconMenu
                className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded hover:border hover:border-gray-200 cursor-pointer"
                size={36}
                onClick={openMenu}
            />

            {isMenuVisible && (
                <TextFade direction={isClosing ? "down" : "up"} duration={1}>
                    <div
                        style={{ left: "170%" }}
                        className={`absolute bottom-0 mt-[-8px] w-60 h-80 bg-white dark:bg-[#121212] rounded-2xl shadow-lg dark:text-zinc-200 text-zinc-900 pr-12 transform transition-all duration-300 ${isClosing ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
                            }`}
                    >
                        <button
                            className="absolute top-4 right-4 text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 transition duration-100"
                            onClick={closeMenu}
                        >
                            <IconX size={24} stroke={1.5} />
                        </button>
                        <div className="flex flex-col justify-between h-full p-6">
                            <Image src="/image.png" alt="Avatar" className="mb-4 rounded-full" width={60} height={60} />
                            <div className="flex flex-col w-full">
                                {['LinkedIn', 'GitHub', 'Medium', 'Email'].map((platform) => (
                                    <span key={platform} className="text-xl md:text-2xl font-bold font-mackinac mb-1">
                                        <Link
                                            href=""
                                            className={`${hoveredLink && hoveredLink !== platform ? "text-zinc-500" : ""} inline-flex items-center hover:underline hover:underline-offset-4 py-1 transition duration-200`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={() => setHoveredLink(platform)}
                                            onMouseLeave={() => setHoveredLink(null)}
                                        >
                                            {platform}
                                            {hoveredLink === platform && <TextFade direction="right" duration={0.5} distance={10}><IconExternalLink className="h-5 w-5 ml-2 inline-block" /></TextFade>}
                                        </Link>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </TextFade>
            )}
        </div>
    );
};

export default Menu;
