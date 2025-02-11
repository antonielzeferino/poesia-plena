"use client"

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4 flex flex-col rounded-b-3xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-lg font-semibold">Poesia Plena</Link>
        </div>
        <div className="flex items-center gap-4">
          <Search className="w-6 h-6" />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <nav
        className={`flex items-center justify-around gap-2 text-gray-300 border-t border-gray-700 text-sm transition-all duration-300 ${menuOpen ? "opacity-100 max-h-40 mt-2 pt-2" : "opacity-0 max-h-0 overflow-hidden"
          }`}
      >
        <Link href="/" className="hover:text-white">inicio</Link>
        <Link href="/auth/signin" className="hover:text-white">logar</Link>
        <Link href="/favoritos" className="hover:text-white">favoritos</Link>
        <Link href="/sobre" className="hover:text-white">sobre</Link>
      </nav>
    </header>
  );
}

export default Header;
