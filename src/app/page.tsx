import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getPoems() {
  try {
    return await prisma.poem.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: { username: true },
        },
      },
      orderBy: { createdAt: "asc" },
      take: 10,
    });
  } catch (error) {
    console.error("Erro ao buscar poemas:", error);
    return [];
  }
}

export default async function Home() {
  const poems = await getPoems();

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-background">
      <main className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-text mb-4">Poemas Recentes</h1>

        {poems.length > 0 ? (
          <ul className="space-y-4">
            {poems.map((poem) => (
              <li key={poem.id} className="border-b p-4 bg-contrast rounded-md text-start">
                <h2 className="text-lg font-semibold text-text">{poem.title}</h2>
                <p className="text-sm text-muted">Por {poem.author.username}</p>
                <p className="text-text mt-2 line-clamp-3 text-justify break-words hyphens-auto">
                  {poem.content}
                </p>
                <Link
                  href={`/poema/${poem.id}`}
                  className="text-link hover:underline text-sm"
                >
                  Ler mais
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Nenhum poema encontrado.</p>
        )}
      </main>
    </div>
  );
}
