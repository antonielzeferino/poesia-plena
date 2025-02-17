"use client";

import { useEffect, useState } from "react";
import { Poem, User } from "@prisma/client";

type PoemWithRelations = Poem & {
  author: User & {
    following: { id: string }[];
    followers: { id: string }[];
  };
};

const UserInfo = ({ userId }: { userId: string }) => {
  const [poems, setPoems] = useState<PoemWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchPoems = async () => {
      try {
        const res = await fetch(`/api/poems/${userId}`, {
          method: "GET",
        });
        if (!res.ok) throw new Error("Erro ao buscar poemas");

        const data = await res.json();
        setPoems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPoems();
  }, [userId]);

  if (loading) return <p>Carregando...</p>;
  if (!poems.length) return <p>Nenhum poema encontrado</p>;

  const author = poems[0]?.author;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <p className="text-foreground">{author.username || "Não disponível"}</p>
        </div>
        <div>
          {author.name && (
            <p className="text-foreground text-[12px] opacity-50">{author.name}</p>
          )}
        </div>
      </div>
      <div className="flex gap-4">
        <p className="text-foreground">
          posts: <span>{poems.length}</span>
        </p>
        <p className="text-foreground">
          seguindo: <span>{author.following.length}</span>
        </p>
        <p className="text-foreground">
          seguidores: <span>{author.followers.length}</span>
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
