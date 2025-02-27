import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  try {
    const poems = await prisma.poem.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    return NextResponse.json({ poems }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar poemas" }, { status: 500 });
  }
}

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
