"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DeleteBtn from "@/components/DeleteBtn";
import Loading from "@/app/Loading";
import { User, UserPen, UserX } from "lucide-react";

type Poem = { id: string; title: string; content?: string };
type User = {
  id: string;
  username: string;
  name?: string;
  poems: Poem[];
  following: { id: string }[];
  followers: { id: string }[];
};

const Configuracoes = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch("/api/user/config");
        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        setError("Você precisa estar logado para acessar as configurações.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Loading />;
  if (error) {
    return (
      <div className="px-4 w-full flex flex-col flex-grow items-center">
        <div className="p-6 sm:mx-auto max-w-md w-full rounded-lg shadow-lg text-foreground my-auto bg-contrast">
          <h1 className="text-2xl font-bold mb-4">Configurações Gerais</h1>
          <p className="text-red-500 font-semibold">{error}</p>
          <div className="flex justify-between mt-4">
            <Link href="/auth/signin">
              <button className="bg-medium-blue text-foreground px-4 py-2 rounded-lg hover:bg-dark-blue">
                Entrar
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                Criar conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-foreground mt-2 max-w-4xl mx-auto">
      <div className="flex flex-wrap items-center gap-4">
        <div>
          <p className="text-foreground">{user?.username || "Não disponível"}</p>
          {user?.name && <p className="text-foreground text-[12px] opacity-50">{user.name}</p>}
        </div>
        <div className="flex gap-4">
          <p className="text-foreground">posts: <span>{user?.poems.length}</span></p>
          <p className="text-foreground">seguindo: <span>{user?.following.length}</span></p>
          <p className="text-foreground">seguidores: <span>{user?.followers.length}</span></p>
        </div>
      </div>

      {user && user?.poems.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-md font-semibold">Seus Poemas</h2>
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
            {user.poems.map((poem) => (
              <li
                key={poem.id}
                className="bg-contrast rounded-md text-start shadow-md p-2 flex items-center justify-between transition hover:scale-105 hover:shadow-lg"
              >
                <Link href={`/poema/${poem.id}`}>
                  <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                    {poem.title}
                  </h3>
                </Link>
                <DeleteBtn id={poem.id} />
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2 mt-6 items-center">
        <Link href={`/usuario/${user?.id}/editar`} className="flex gap-2 bg-link px-4 py-2 rounded-lg text-black">
          <UserPen /> editar
        </Link>
        <Link href="/api/auth/signout">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex gap-2">
            <UserX /> sair
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Configuracoes;
