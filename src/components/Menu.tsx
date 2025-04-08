import React, { useState } from 'react';
import { IconMenu } from "@tabler/icons-react";
import { IconExternalLink, IconX } from "@tabler/icons-react";
import { useMediaQuery } from 'react-responsive';
import { navBarBreakpoint  } from '@/lib/constants';
import TextFade from "@/components/TextFade";
import Link from 'next/link';
import Image from 'next/image';

const Menu = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    const menuIsHorizontal = useMediaQuery({ query: `(max-width: ${navBarBreakpoint})` });
  
    const toggleMenu = () => {
        if (isMenuVisible) {
            setIsClosing(true);
            setTimeout(() => {
                setIsMenuVisible(false);
                setIsClosing(false);
            }, 300);
        } else {
            setIsMenuVisible(true);
            setIsClosing(false);
        }
    };
  
    const closeMenu = () => {
        setIsMenuVisible(true);
        toggleMenu();
    };

    const getTextFadeDirection = () => {
        if (isClosing) {
            return menuIsHorizontal ? "up" : "down"; // Closing direction
        }
        return menuIsHorizontal ? "down" : "up"; // Opening direction
    };

    return (
        <div className="relative">
            <IconMenu
                className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded hover:border hover:border-gray-200 cursor-pointer"
                size={36}
                onClick={!isClosing ? toggleMenu : undefined}
            />

            {isMenuVisible && (
                <TextFade direction={getTextFadeDirection()} duration={1}>
                    <div
                        style={{
                            ...(menuIsHorizontal ? { right: "0%" } : { left: "170%" })
                        }}
                        className={`absolute ${menuIsHorizontal ? 'mt-6' : 'bottom-0 mt-[-6]'} w-52 h-fit bg-white dark:bg-[#121212] rounded-2xl shadow-lg dark:text-zinc-200 text-zinc-900 pr-12 transform transition-all duration-300 ${isClosing ? "translate-y-10 opacity-0" : "translate-y-0 opacity-100"
                            }`}
                    >
                        <button
                            className="absolute top-4 right-4 text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-400 transition duration-100"
                            onClick={closeMenu}
                        >
                            <IconX size={24} stroke={1.5} />
                        </button>
                        <div className="flex flex-col justify-between p-6">
                            <Image src="/headshot.png" alt="Avatar" className="mb-8 rounded-full" width={60} height={60} />
                            <div className="flex flex-col w-full">
                            {[
                                    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/andrewhumble' },
                                    { name: 'GitHub', url: 'https://github.com/andrewhumble' },
                                    // { name: 'Medium', url: 'https://medium.com/@yourprofile' },
                                    { name: 'Email', url: 'mailto:cahumble7@gmail.com' }
                                ].map(({ name, url }) => (
                                    <span key={name} className="text-xl md:text-2xl font-bold font-mackinac mb-1">
                                        <Link
                                            href={url}
                                            className={`${hoveredLink && hoveredLink !== name ? "text-zinc-500" : ""} inline-flex items-center hover:underline hover:underline-offset-4 py-1 transition duration-300`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onMouseEnter={() => setHoveredLink(name)}
                                            onMouseLeave={() => setHoveredLink(null)}
                                        >
                                            {name}
                                            {hoveredLink === name && <TextFade direction="right" duration={0.5} distance={10}><IconExternalLink className="h-5 w-5 ml-2 inline-block" /></TextFade>}
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
