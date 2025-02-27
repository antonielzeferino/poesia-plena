"use client";

import Loading from "@/app/Loading";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Poem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author?: { username: string };
};

const ListPoems: React.FC = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/poems/search?sort=${sortOrder}&page=${currentPage}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar poemas");
        }
        const data = await response.json();
        setPoems(data.poems);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, [sortOrder, currentPage]);

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
      <div className="mb-4">
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => {
            setSortOrder(e.target.value);
            setCurrentPage(1); // Resetar para a primeira página ao mudar a ordenação
          }}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-contrast text-foreground"
        >
          <option value="recent">Mais recentes</option>
          <option value="oldest">Mais antigos</option>
          <option value="popular">Mais populares</option>
        </select>
      </div>

      {/* Lista de poemas */}
      {poems.length > 0 ? (
        <ul className="space-y-4">
          {poems.map((poem) => (
            <li key={poem.id} className="border-b p-4 bg-contrast rounded-md text-start border-gray-500 dark:border-white/70">
              <h2 className="text-lg font-semibold text-foreground">{poem.title}</h2>
              {poem.author && (
                <div className="flex justify-between">
                  <p className="text-sm text-muted">Por {poem.author.username}</p>
                  <span className="text-md text-muted">
                    {new Date(poem.createdAt).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              )}
              <hr className="border border-stone-500" />
              <p className="text-foreground mt-2 line-clamp-3 text-justify break-words hyphens-auto">
                {poem.content}
              </p>
              <Link href={`/poema/${poem.id}`} className="text-link hover:underline text-sm">
                Ler mais
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted">Nenhum poema encontrado.</p>
      )}

      {/* Paginação */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <span className="text-sm text-muted">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próxima
        </button>
      </div>
    </>
  );
};

export default ListPoems;
