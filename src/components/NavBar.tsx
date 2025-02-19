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

const DarkModeToggle: React.FC<{
    checked: boolean;
    onChange: () => void;
    size: number;
    moonColor: string;
}> = DarkModeSwitch as unknown as React.FC;

export const NavBar: React.FC<NavBarProps> = ({ fretboardRef, className }) => {
    const { theme, toggleTheme } = useTheme();

    const handleToggleTheme = () => {
        toggleTheme();
        if (fretboardRef?.current) {
            fretboardRef?.current.pluckStrings();
        }
    }

    return (
        <nav className={`${className} fixed bottom-0 h-screen flex flex-col pb-12 mx-4 text-black dark:text-white justify-between z-50`}>
            <div className="flex justify-center mt-9">
                <Link href="/">
                    <IconTerminal2 size={24} />
                </Link>
            </div>
            <div className="flex flex-col justify-end">
                <div className="flex justify-center rounded mb-6">
                    <DarkModeToggle
                        checked={theme === 'dark'}
                        onChange={handleToggleTheme}
                        size={20}
                        moonColor={theme === "dark" ? "#FFF" : "#000"}
                    />
                </div>
                <div className="flex justify-center rounded">
                    <Menu />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;