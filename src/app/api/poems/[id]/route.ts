import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> } 
) {
  const { id } = await params;

  try {
    if (!id) {
      return NextResponse.json(
        { message: "ID do poema é obrigatório" },
        { status: 400 }
      );
    }

    const poem = await prisma.poem.delete({
      where: { id },
      include: {
        author: {
          select: { username: true },
        },
        likes: true,
        comments: true,
        savedBy: true,
      },
    });

    return NextResponse.json(poem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar o poema", error },
      { status: 500 }
    );
  }
}
