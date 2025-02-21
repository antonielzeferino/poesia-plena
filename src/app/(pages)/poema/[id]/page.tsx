import MenuSidebar from "@/components/MenuSideBar";
import { notFound } from "next/navigation";

type Poem = {
  title: string;
  content: string;
  author: {
    username: string;
  };
};

async function getPoem(id: string): Promise<Poem | null> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/poems/${id}`, {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) return null;

    return res.json();
  } catch (error) {
    console.error("Erro ao buscar poema:", error);
    return null;
  }
}

async function PoemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const poem = await getPoem(id);

  if (!poem) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <MenuSidebar poemId={id} />
      <main className="w-full md:px-6 pb-4">
        <h1 className="text-2xl text-foreground mb-4 font-light font-mono text-center">{poem.title}</h1>
        <p className="text-sm text-muted">Por {poem.author.username}</p>
        <p className="text-foreground whitespace-pre-wrap max-w-max">{poem.content}</p>
      </main>
    </div>
  );
}

export default PoemPage;
