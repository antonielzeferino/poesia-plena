import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type Poem = {
  title: string;
  content: string;
  author: {
    username: string;
  };
};

export default async function PoemPage({ params }: { params: { id: string } }) {
  const { id } = await params;

  // Busca o poema usando o ID
  const poem: Poem | null = await prisma.poem.findUnique({
    where: { id }, // Certifique-se de que o id seja numérico
    select: {
      title: true,
      content: true,
      author: {
        select: { username: true },
      },
    },
  });

  // Verifica se o poema foi encontrado
  if (!poem) {
    return notFound(); // Redireciona para a página 404 caso o poema não seja encontrado
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <main className="w-full max-w-md p-6 rounded-lg shadow-md">
        <h1 className="text-2xl text-text mb-4 font-light font-mono text-center">{poem.title}</h1>
        <p className="text-sm text-muted">Por {poem.author.username}</p>
        <p className="text-text mt-4 text-justify break-words hyphens-auto">{poem.content}</p>
      </main>
    </div>
  );
}
