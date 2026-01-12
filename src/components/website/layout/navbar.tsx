"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/images/logo.png";

const Navbar: React.FC<{ withLogo?: boolean, transparent?: boolean }> = ({ withLogo = true, transparent = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 200) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const links = [
        { name: "Track the Tour", href: "/track" },
        { name: "Lunch Box Challenge", href: "/challenge" },
        { name: "Nominate a School", href: "/nominate" },
        { name: "Vote", href: "/vote" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className={`w-full font-poppins sticky top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : (transparent ? "bg-transparent" : "bg-white")}`}>
            {/* Optional Top Border if part of design, removing for now to keep clean unless requested */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex ${withLogo ? "justify-between" : "justify-end"} items-center h-24`}>
                    {/* Logo Section */}
                    {withLogo && <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="relative block">
                            <Image
                                src={Logo}
                                alt="Maltina Nourishment Tour"
                                width={174}
                                height={246}
                                className="md:h-30 h-20 w-auto object-fit py-2"
                                priority
                            />

                        </Link>
                    </div>
                    }

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[#707070] hover:text-black font-normal hover:font-medium transition-all text-sm tracking-tight"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-black focus:outline-none p-2"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out origin-top z-40 ${isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 h-0"
                    }`}
            >
                <div className="px-4 py-6 space-y-4 flex flex-col items-center bg-white border-t">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="block w-full text-center px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:text-black hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden top-[96px]" // top-[height of navbar]
                    onClick={() => setIsOpen(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;
