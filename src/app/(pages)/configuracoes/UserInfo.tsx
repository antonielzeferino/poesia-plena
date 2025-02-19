"use client";

import { useEffect, useState } from "react";

type Poem = {
  id: string;
  title: string;
  content: string;
};

type User = {
  id: string;
  username: string;
  name?: string;
  poems: Poem[];
  following: { id: string }[];
  followers: { id: string }[];
};

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user/config`);
        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        setError("Erro ao carregar as informações do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!user) return <p>Usuário não encontrado</p>;

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div>
        <p className="text-foreground">{user.username || "Não disponível"}</p>
        {user.name && <p className="text-foreground text-[12px] opacity-50">{user.name}</p>}
      </div>
      <div className="flex gap-4">
        <p className="text-foreground">posts: <span>{user.poems.length}</span></p>
        <p className="text-foreground">seguindo: <span>{user.following.length}</span></p>
        <p className="text-foreground">seguidores: <span>{user.followers.length}</span></p>
      </div>
    </div>
  );
};

export default UserInfo;
