"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import Logo from "@/assets/images/logo.png";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {

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

    const links = [
        { name: "Track the Tour", href: "/track" },
        { name: "Lunch Box Challenge", href: "/challenge" },
        { name: "Nominate a School", href: "/nominate" },
        { name: "Vote", href: "/vote" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav className={`w-full ${isScrolled ? "shadow-xl" : ''} bg-white fixed top-0 z-50 `}>
            <div className="max-w-6xl 2xl:max-w-7xl mx-auto px-4 xl:px-0">
                <div className="flex justify-between items-center h-20 md:h-24 lg:justify-start">
                    {/* Mobile Menu - Sheet (Left side) */}
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`text-[#707070] hover:bg-[#E89515] hover:text-white`}
                            >
                                <Menu size={28} strokeWidth={2.5} />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px] bg-white p-0">
                            <SheetHeader className="p-6 pb-4 border-b">
                                <Image
                                    src={Logo}
                                    alt="Maltina Nourishment Tour"
                                    width={80}
                                    height={80}
                                    className="h-16 w-auto object-contain mx-auto"
                                />
                            </SheetHeader>
                            <nav className="flex flex-col py-4">
                                {links.map((link) => (
                                    <SheetClose asChild key={link.name}>
                                        <Link
                                            href={link.href}
                                            className={cn(
                                                "px-6 py-4 text-[#707070] hover:text-black hover:bg-gray-50",
                                                "text-base font-normal transition-colors border-b border-gray-100 last:border-0"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    </SheetClose>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>

                    {/* Logo Section - Center on mobile, left on desktop */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:transform-none lg:mr-auto">
                        <Image
                            src={Logo}
                            alt="Maltina Nourishment Tour"
                            width={100}
                            height={100}
                            className="h-16 md:h-20 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Spacer for mobile to balance layout */}
                    <div className="w-10 lg:hidden"></div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-[#707070] font-poppins hover:text-[#E89515] transition-colors text-sm xl:text-base whitespace-nowrap"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
