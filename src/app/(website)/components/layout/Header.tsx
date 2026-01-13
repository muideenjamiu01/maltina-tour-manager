"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Track the Tour", href: "#" },
  { label: "Nominate a School", href: "#" },
  { label: "Lunch Box Challenge", href: "#" },
  { label: "Vote", href: "#" },
  { label: "FAQ", href: "#" },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO — increased size */}
        <Image
          src="/assets/logo.png"
          alt="Maltina"
          width={200}           // intrinsic width
          height={200}          // intrinsic height
          className="h-16 w-auto" // displayed height: 64px
          priority
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-black font-semibold hover:text-orange-700 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        {/* Mobile Navigation Dropdown */}
        {open && (
          <nav className="absolute top-full left-0 w-full  shadow-md md:hidden flex flex-col gap-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-black font-semibold hover:text-orange-700 transition"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

      </div>
    </header>
  )
}
