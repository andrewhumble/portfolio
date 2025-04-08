import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { IconHelicopterLandingFilled } from "@tabler/icons-react";
import { useTheme } from "@/providers/ThemeProvider";
import { useMediaQuery } from 'react-responsive';
import { navBarBreakpoint  } from '@/lib/constants';
import Link from "next/link";
import Menu from "@/components/Menu";

interface NavBarProps {
    fretboardRef: React.RefObject<{ pluckStrings: () => void } | null>;
    className?: string;
    mobile?: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ fretboardRef, className }) => {
    const { theme, toggleTheme } = useTheme();
    const menuIsHorizontal = useMediaQuery({ query: `(max-width: ${navBarBreakpoint})` });

    const handleToggleTheme = () => {
        toggleTheme();
        if (fretboardRef?.current) {
            fretboardRef.current.pluckStrings();
        }
    };

    return menuIsHorizontal ? (
        <nav
            className={`${className} y-2 flex flex-row justify-between items-center py-2 px-6 text-black dark:text-primary-dark fixed top-0 left-0 right-0 z-50`}
            style={{ height: '3.5rem' }}
        >
            <div className="flex items-center">
                <Link href="/">
                    <IconHelicopterLandingFilled size={24} />
                </Link>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex rounded">
                    <DarkModeSwitch
                        checked={theme === "dark"}
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
    ) : (
        <nav className={`${className} fixed bottom-0 h-screen flex flex-col pb-12 mx-4 text-black dark:text-primary-dark justify-between z-50`}>
            <div className="flex justify-center mt-9">
                <Link href="/">
                    <IconHelicopterLandingFilled size={24} />
                </Link>
            </div>
            <div className="flex flex-col justify-end">
                <div className="flex justify-center rounded mb-6">
                    <DarkModeSwitch
                        checked={theme === "dark"}
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
