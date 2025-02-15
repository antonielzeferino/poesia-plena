import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
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
