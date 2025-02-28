"use client";

import Loading from "@/app/Loading";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

type Poem = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  author?: { username: string };
};

const SearchPage: React.FC = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPoems = async () => {
    if (!query) {
      setPoems([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/poems/search?q=${query}&page=${currentPage}`);
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

  useEffect(() => {
    fetchPoems();
  }, [query, currentPage]);

  const handleSearchClick = () => {
    setQuery(inputValue);
    setCurrentPage(1); 
  };

  return (
    <div className="pt-2">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Digite um título ou trecho..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)} 
          className="w-full p-2 border border-gray-300/50 rounded-md bg-contrast text-foreground"
        />
        <button
          onClick={handleSearchClick} 
          className="py-2 px-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
        >
          <Search />
        </button>
      </div>

      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}
      
      {poems.length > 0 ? (
        <ul className="space-y-4 mt-4">
          {poems.map((poem) => (
            <li key={poem.id} className="border-b p-4 bg-contrast rounded-md text-start border-gray-500 dark:border-white/70">
              <h2 className="text-lg font-semibold text-foreground">{poem.title}</h2>
              {poem.author && (
                <p className="text-sm text-muted">Por {poem.author.username}</p>
              )}
              <p className="text-foreground mt-2 line-clamp-3 text-justify break-words hyphens-auto">
                {poem.content}
              </p>
              <Link href={`/poema/${poem.id}`} className="text-link hover:underline text-sm">
                Ler mais
              </Link>
            </li>
          ))}
        </ul>
      ) : query && !loading ? (
        <p className="text-muted mt-4">Nenhum poema encontrado.</p>
      ) : null}

      {poems.length > 0 && (
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
            className="px-4 py-2 bg-gray-600 text-gray-200 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
