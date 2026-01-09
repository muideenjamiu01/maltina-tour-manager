"use client"

import Link from "next/link"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-orange-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Role Login</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  Admin
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  Facilitator
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-yellow-200 transition-colors text-sm">
                  Judge Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-2 text-right">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center w-12 h-12 bg-yellow-400 rounded-full hover:bg-yellow-300 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-6 h-6 text-orange-600" />
            </button>
          </div>
        </div>

        <div className="border-t border-orange-500 pt-8 text-center">
          <p className="text-sm">© Maltina Nourishment</p>
        </div>
      </div>
    </footer>
  )
}
