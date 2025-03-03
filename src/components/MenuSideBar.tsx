"use client";

import { useState, useEffect, JSX } from "react";
import { useRouter } from "next/navigation";
import { ThumbsUp, Bookmark, Send, MessageCircle, ChevronRight } from "lucide-react";
import CommentModal from "./CommentModal";

const MenuSidebar = ({ poemId }: { poemId: string }) => {
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({
    Curtir: false,
    Salvar: false,
    Enviar: false,
    Comentar: false,
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();

        if (response.ok && data) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();

    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/likes?poemId=${poemId}`);
        const data = await response.json();

        setLikeCount(data.totalLikes || 0);
        setActiveItems((prev) => ({
          ...prev,
          Curtir: data.liked || false,
        }));

        const savedResponse = await fetch(`/api/poems/savedPoems?poemId=${poemId}`);
        const savedData = await savedResponse.json();

        setActiveItems((prev) => ({
          ...prev,
          Salvar: savedData.saved || false,
        }));
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      }
    };

    fetchStats();
  }, [poemId]);

  const handleAuthAction = (action: () => void) => {
    if (!isAuthenticated) {
      router.push("/auth/signin");
      return;
    }
    action();
  };

  const toggleItem = async (label: string) => {
    handleAuthAction(async () => {
      if (label === "Curtir") {
        try {
          const newLikedState = !activeItems["Curtir"];
          setActiveItems((prev) => ({ ...prev, Curtir: newLikedState }));
          setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

          await saveLikeToDatabase(poemId, newLikedState);
        } catch (error) {
          console.error("Erro ao salvar o like no banco de dados:", error);
        }
      }

      if (label === "Salvar") {
        try {
          const newSavedState = !activeItems["Salvar"];
          setActiveItems((prev) => ({ ...prev, Salvar: newSavedState }));

          await savePoemToDatabase(poemId, newSavedState);
        } catch (error) {
          console.error("Erro ao salvar o poema no banco de dados:", error);
        }
      }

      if (label === "Comentar") {
        setIsCommentModalOpen(true);
      }
    });
  };


  const savePoemToDatabase = async (poemId: string, saved: boolean) => {
    const response = await fetch("/api/poems/savedPoems", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ poemId, saved }),
    });
    if (!response.ok) throw new Error("Erro ao salvar o poema no banco de dados");
  };

  const saveLikeToDatabase = async (poemId: string, liked: boolean) => {
    const response = await fetch("/api/likes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ poemId, liked }),
    });
    if (!response.ok) throw new Error("Erro ao salvar o like no banco de dados");
  };

  return (
    <>
      <CommentModal poemId={poemId} isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} />
      <div className="fixed top-1/2 right-0 transform -translate-y-1/2 transition-all duration-500 bg-contrast rounded-l-3xl shadow-lg flex flex-col items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute right-full top-1/2 -translate-y-1/2 p-2 rounded-full shadow-md ${isOpen ? "bg-muted translate-x-full" : "bg-[rgba(100,100,100,0.3)]"}`}
        >
          <ChevronRight className={`transition-transform ${!isOpen ? "rotate-180" : "text-black"}`} />
        </button>

        {isOpen && (
          <div className="flex flex-col items-center justify-around gap-4 py-8 px-2">
            <SidebarItem
              icon={<ThumbsUp />}
              label="Curtir"
              count={likeCount}
              active={activeItems["Curtir"]}
              toggleItem={toggleItem}
              color="bg-blue-400"
            />
            <SidebarItem
              icon={<Bookmark />}
              label="Salvar"
              active={activeItems["Salvar"]}
              toggleItem={toggleItem}
              color="bg-purple-400"
            />
            <br />
            <SidebarItem
              icon={<Send />}
              label="Enviar"
              active={activeItems["Enviar"]}
              toggleItem={() => handleAuthAction(() => { })}
              color="bg-green-400"
            />
            <SidebarItem
              icon={<MessageCircle />}
              label="Comentar"
              active={activeItems["Comentar"]}
              toggleItem={toggleItem}
              color="bg-teal-400"
            />

          </div>
        )}
      </div>
    </>
  );
};

const SidebarItem = ({ icon, label, active, toggleItem, color, count }: { icon: JSX.Element; label: string; active: boolean; toggleItem: (label: string) => void; color: string; count?: number; }) => {
  return (
    <button
      onClick={() => toggleItem(label)}
      className={`flex items-center p-2 rounded-full transition ${active ? `${color} text-white` : "hover:bg-gray-300 dark:hover:bg-gray-700"}`}
    >
      {icon} {/* like count */}
      {count !== undefined && count > 0 && <span className="ml-2 text-sm font-semibold">{count}</span>}
    </button>
  );
};

export default MenuSidebar;