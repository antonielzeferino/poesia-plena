"use client";

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

  useEffect(() => {
    const fetchPoems = async () => {
      try {
        const response = await fetch("/api/poems");
        if (!response.ok) {
          throw new Error("Erro ao buscar poemas");
        }
        const data = await response.json();
        setPoems(data.poems);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-500">Carregando...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <>
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
    </>
  );
};

export default ListPoems