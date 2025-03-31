import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
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

    const poem = await prisma.poem.findUnique({
      where: { id },
      select: {
        title: true,
        content: true,
        author: {
          select: { username: true , id: true},
        },
      },
    });

    if (!poem) {
      return NextResponse.json(
        { message: "Poema não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(poem, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar poema:", error);
    return NextResponse.json(
      { message: "Erro ao buscar poema" },
      { status: 500 }
    );
  }
}


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

    await prisma.like.deleteMany({
      where: { poemId: id },
    });
    await prisma.comment.deleteMany({
      where: { poemId: id },
    });
    await prisma.savedPoem.deleteMany({
      where: { poemId: id },
    });

    // Deletar o poema
    const poem = await prisma.poem.delete({
      where: { id },
    });

    return NextResponse.json(poem, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar o poema:", error);
    return NextResponse.json(
      { message: "Erro ao deletar o poema", error },
      { status: 500 }
    );
  }
}

