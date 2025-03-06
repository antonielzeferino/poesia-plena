import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(req: NextRequest, 
   { params }: { params: Promise<{ id: string }> }
 ) {
   const { id } = (await params);
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { poem: true },
    });

    if (!comment) {
      return NextResponse.json({ error: "Comentário não encontrado" }, { status: 404 });
    }

    const isOwner = comment.poem.authorId === session.user.id;
    const isAuthor = comment.userId === session.user.id;

    if (!isOwner && !isAuthor) {
      return NextResponse.json({ error: "Sem permissão" }, { status: 403 });
    }

    await prisma.comment.delete({ where: { id } });

    return NextResponse.json({ message: "Comentário deletado" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
