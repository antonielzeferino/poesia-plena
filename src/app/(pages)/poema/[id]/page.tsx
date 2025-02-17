import MenuSidebar from "@/components/MenuSideBar";
import { prisma } from "@/lib/prisma";
import withAuth from "@/lib/withAuth";
import { notFound } from "next/navigation";

type Poem = {
  title: string;
  content: string;
  author: {
    username: string;
  };
};

async function PoemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const poem: Poem | null = await prisma.poem.findUnique({
    where: { id },
    select: {
      title: true,
      content: true,
      author: {
        select: { username: true },
      },
    },
  });

  if (!poem) {
    return notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <MenuSidebar />
      <main className="w-full md:px-6 pb-4">
        <h1 className="text-2xl text-foreground mb-4 font-light font-mono text-center">{poem.title}</h1>
        <p className="text-sm text-muted">Por {poem.author.username}</p>
        <p className="text-foreground whitespace-pre-wrap max-w-max">{poem.content}</p>
      </main>
    </div>
  );
}

export default withAuth(PoemPage)