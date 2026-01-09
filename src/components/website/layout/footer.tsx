"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="w-full bg-[#FF6F38] text-white relative font-poppins">
            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center justify-center relative min-h-[200px]">
                {/* Main Links */}
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 text-sm md:text-base font-bold tracking-wide">
                    <Link href="/about" className="hover:text-white/80 transition-colors">
                        ABOUT
                    </Link>
                    <Link href="/faq" className="hover:text-white/80 transition-colors">
                        FAQ
                    </Link>
                    <Link href="/contact" className="hover:text-white/80 transition-colors">
                        CONTACT
                    </Link>
                    <Link href="/privacy" className="hover:text-white/80 transition-colors">
                        PRIVACY
                    </Link>
                    <Link href="/terms" className="hover:text-white/80 transition-colors">
                        TERMS
                    </Link>
                </nav>

                {/* Secondary Links */}
                <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-8 text-sm font-medium opacity-90">
                    <Link href="/admin" className="hover:underline">
                        Admin
                    </Link>
                    <Link href="/facilitator" className="hover:underline">
                        Facilitator
                    </Link>
                    <Link href="/judge" className="hover:underline">
                        Judge Login
                    </Link>
                </nav>

                {/* Copyright */}
                <div className="text-xs opacity-90 font-poppins">
                    &copy; Maltina Nourishment
                </div>

                {/* Scroll to Top Button - Absolutely positioned on desktop, center relative on mobile if desired, 
            but usually these are fixed or absolute. To match the image design: */}
                <button
                    onClick={scrollToTop}
                    className="mt-8 md:mt-0 md:absolute md:right-[22%] md:top-1/2 md:-translate-y-1/2 w-14 h-14 bg-[#FBC02D] hover:bg-[#F9A825] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                    aria-label="Scroll to top"
                >
                    <ArrowUp size={28} strokeWidth={3} />
                </button>
            </div>
        </footer>
    );
};

export default Footer;
