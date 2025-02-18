import React from "react";
import { IconMenu } from "@tabler/icons-react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { IconTerminal2 } from "@tabler/icons-react";
import { useTheme } from "@/providers/ThemeProvider";
import Link from "next/link";

interface NavBarProps {
    fretboardRef: React.RefObject<{ pluckStrings: () => void } | null>;
    className?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ fretboardRef, className }) => {
    const { theme, toggleTheme } = useTheme();

    const handleToggleTheme = () => {
        toggleTheme();
        if (fretboardRef?.current) {
            fretboardRef?.current.pluckStrings();
        }
    }

    return (
        <nav className={`${className} py-2 bottom-0 flex flex-row justify-between items-center ml-6 mr-4 text-black dark:text-white`}>
            <div className="flex items-center">
                <Link href="/">
                    <IconTerminal2 size={24} />
                </Link>
            </div>
            <div className="flex items-center space-x-4"> {/* Added space between items */}
                <div className="flex rounded">
                    <DarkModeSwitch
                        checked={theme === 'dark'}
                        onChange={handleToggleTheme}
                        size={20}
                        moonColor={theme === "dark" ? "#FFF" : "#000"}
                    />
                </div>
                <div className="rounded">
                    <IconMenu
                        className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:rounded hover:border hover:border-gray-200 cursor-pointer"
                        size={36}
                        onClick={() => window.location.reload()}
                    />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
