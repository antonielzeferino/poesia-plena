"use client";

import Loading from "@/app/Loading";
import { LinkIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Favorite = () => {
  const [poems, setPoems] = useState<{ id: string; title: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPoems = async () => {
      try {
        const response = await fetch("/api/poems/savedPoems");
        const data = await response.json();

        if (data.savedPoems) {
          setPoems(data.savedPoems.map((item: { poem: { id: string; title: string; content: string } }) => item.poem));
        }
      } catch (error) {
        console.error("Erro ao buscar poemas salvos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPoems();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">

      {loading ? (
        <Loading />
      ) : poems.length === 0 ? (
        <p className="text-gray-500">Você ainda não salvou nenhum poema.</p>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4">Poemas Favoritos</h1>
          <ul className="space-y-4">
            {poems.map((poem) => (
              <li key={poem.id} className="border p-4 rounded-lg shadow-md bg-contrast">
                <h2 className="text-lg font-semibold">{poem.title}</h2>
                <p className="text-foreground line-clamp-4">{poem.content}</p>
                <Link href={`/poema/${poem.id}`} className="text-link hover:underline text-sm flex items-center gap-1">
                  <LinkIcon />
                  <span>Ver poema</span>
                </Link>
              </li>

            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Favorite;
