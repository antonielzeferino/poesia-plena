"use client";
import { JSX, useState } from "react";
import { ThumbsUp, Bookmark, Send, MessageCircle, ChevronRight } from "lucide-react";

const MenuSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({
    Curtir: false,
    Salvar: false,
    Enviar: false,
    Comentar: false
  });

  const toggleItem = (label: string) => {
    setActiveItems(prev => ({
      ...prev,
      [label]: !prev[label] // Alterna o estado individual do item
    }));
  };

  return (
    <div className={`fixed top-1/2 right-0 transform -translate-y-1/2 transition-all duration-500 bg-contrast rounded-l-3xl shadow-lg flex flex-col items-center`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute right-full top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md shadow-gray-800 ${isOpen ? "bg-muted translate-x-full" : "bg-[rgba(100,100,100,0.3)]"}`}
      >
        <ChevronRight className={`transition-transform ${!isOpen ? "rotate-180" : "text-black"}`} />
      </button>

      {isOpen && (
        <div className="flex flex-col items-center justify-around gap-4 py-8 px-2">
          <SidebarItem icon={<ThumbsUp />} label="Curtir" active={activeItems["Curtir"]} toggleItem={toggleItem} color="bg-blue-400" />
          <SidebarItem icon={<Bookmark />} label="Salvar" active={activeItems["Salvar"]} toggleItem={toggleItem} color="bg-purple-400" />
          <br />
          <SidebarItem icon={<Send />} label="Enviar" active={activeItems["Enviar"]} toggleItem={toggleItem} color="bg-green-400" />
          <SidebarItem icon={<MessageCircle />} label="Comentar" active={activeItems["Comentar"]} toggleItem={toggleItem} color="bg-teal-400" />
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({
  icon,
  label,
  active,
  toggleItem,
  color
}: {
  icon: JSX.Element;
  label: string;
  active: boolean;
  toggleItem: (label: string) => void;
  color: string;
}) => {
  return (
    <button
      onClick={() => toggleItem(label)}
      className={`flex items-center p-2 rounded-full transition ${
        active ? `${color} text-white` : "hover:bg-gray-300 dark:hover:bg-gray-700"
      }`}
    >
      {icon}
    </button>
  );
};

export default MenuSidebar;
