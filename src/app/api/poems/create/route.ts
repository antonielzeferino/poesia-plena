import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { title, content, authorId } = await request.json();

    console.log(title)
    const poem = await prisma.poem.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json(poem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar o poema", error},
      { status: 500 }
    );
  }
}
