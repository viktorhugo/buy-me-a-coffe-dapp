"use client"

import { useState } from "react"
import { Menu, PanelBottomOpen, X } from "lucide-react"
import { cn } from "~/lib/utils"
import { Link } from "react-router"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

return (
        <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
            {/* Logo and desktop navigation */}
            <div className="flex items-center justify-between w-full">
                <div className="flex-shrink-0">
                    <span className="bg-clip-text text-2xl text-transparent bg-gradient-to-r from-cyan-400 to-pink-500">Buy me a coffee</span>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-8">
                    {/* {["Home", "Features", "About", "Contact"].map((item) => (
                    <Link
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className="text-gray-300 hover:text-white px-1 py-2 text-sm font-medium tracking-wider transition-colors duration-300 ease-in-out relative group"
                    >
                        {item}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </Link>
                    ))} */}
                    
                    <button 
                        type="button" 
                        className="text-white bg-gradient-to-br cursor-pointer from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2  flex items-center gap-2">
                        <PanelBottomOpen className="w-5 h-5 " />
                        Connect Wallet
                    </button>

                </div>
                </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
                <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                aria-expanded="false"
                >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
                </button>
            </div>
            </div>
        </div>

        {/* Mobile menu */}
        <div
            className={cn(
            "md:hidden transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-64" : "max-h-0",
            )}
        >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-md bg-black/40">
            {/* {["Home", "Features", "About", "Contact"].map((item) => (
                <Link
                    key={item}
                    to={`/${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium border border-transparent hover:border-white/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                    >
                    {item}
                </Link>
            ))} */}
            <button type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pink to Orange</button>
            </div>
        </div>
        </nav>
)
}
