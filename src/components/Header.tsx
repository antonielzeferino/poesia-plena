"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Menu, X, UserCog, House, BookmarkCheck, Pen } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-white border-b-2 border-white" : "text-gray-400";
  };

  return (
    <header className="bg-gray-800 text-gray-400 sticky top-0 w-full mb-2 rounded-b-2xl">
      <div className=" p-4 flex flex-col md:flex-row md:justify-between md:items-center mx-auto  max-w-4xl">
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href="/">
            <h1 className="text-white text-lg font-semibold">Poesia Plena</h1>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden focus:outline-none bg-gray-700 p-2 rounded-md hover:text-white transition-all duration-500"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <nav className={`flex justify-evenly gap-6 ${menuOpen ? "block" : "hidden"} mt-4 md:mt-0 w-full md:w-auto md:bg-transparent p-4 md:p-0 rounded-md md:rounded-none max-md:border-t-2 max-md:border-gray-500 `}>
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
        </nav>
      </div>
    </header>
  );
};

export default Header;
