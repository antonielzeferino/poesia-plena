import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { message: "ID do poema é obrigatório" },
        { status: 400 }
      );
    }

    const poem = await prisma.poem.delete({
      where: { id },
    });

    return NextResponse.json(poem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao deletar o poema", error },
      { status: 500 }
    );
  }
}
