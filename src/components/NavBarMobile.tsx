import React from "react";
import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { IconTerminal2 } from "@tabler/icons-react";
import { useTheme } from "@/providers/ThemeProvider";
import Link from "next/link";
import Menu from "@/components/Menu";

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
        <nav className={`${className} py-2 flex flex-row justify-between items-center ml-6 mr-4 text-black dark:text-primary-dark z-50`}>
            <div className="flex items-center">
                <Link href="/">
                    <IconTerminal2 size={24} />
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex rounded">
                    <DarkModeSwitch
                        checked={theme === 'dark'}
                        onChange={handleToggleTheme}
                        size={20}
                        moonColor={theme === "dark" ? "#FFF" : "#000"}
                    />
                </div>
                <div className="rounded">
                    <Menu />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
