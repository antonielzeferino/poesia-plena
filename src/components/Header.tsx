"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, UserCog, House, BookmarkCheck, Pen } from "lucide-react";
import { usePathname } from "next/navigation";
import BackBtn from "./BackBtn";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-white" : "text-gray-400";
  };

  return (
    <header className="text-gray-400 p-2 flex justify-between items-center rounded-b-3xl sticky top-0">
      <div className={`${pathname.includes("/poema/") ? "block" : "hidden"}`}>
        <BackBtn />
      </div>


      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="ml-auto focus:outline-none bg-gray-700 p-2 rounded-md hover:text-white transition-all duration-500"
      >
        {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {menuOpen && (
        <div className="absolute top-2 right-14 bg-gray-700 p-3 rounded-lg shadow-lg flex gap-6 transition-all duration-300">
          <div className="absolute top-2 right-0 transform translate-x-1/2 w-4 h-4 bg-gray-700 rotate-45"></div>

          <Link href="/" className={`hover:text-white ${isActive('/')}`}>
            <House className="w-6 h-6" />
          </Link>
          <Link href="/favoritos" className={`hover:text-white ${isActive('/favoritos')}`}>
            <BookmarkCheck className="w-6 h-6" />
          </Link>
          <Link href="/configuracoes" className={`hover:text-white ${isActive('/configuracoes')}`}>
            <UserCog className="w-6 h-6" />
          </Link>
          <Link href="/pesquisar" className={`hover:text-white ${isActive('/pesquisar')}`}>
            <Search className="w-6 h-6" />
          </Link>
          <Link href="/poema/criar" className={`hover:text-white ${isActive('/poema/criar')}`}>
            <Pen className="w-6 h-6" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
