import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("q")?.trim() || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = 10;

  const searchFilter: Prisma.PoemWhereInput | undefined = searchQuery
    ? {
        OR: [
          { title: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
          { author: { is: { username: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } } } },
          { content: { contains: searchQuery, mode: Prisma.QueryMode.insensitive } },
        ],
      }
    : undefined;

  try {
    const [poems, totalPoems] = await prisma.$transaction([
      prisma.poem.findMany({
        where: searchFilter,
        include: {
          author: { select: { username: true } },
        },
        orderBy: [
          { title: "asc" },
          { author: { username: "asc" } },
          { content: "asc" },
          { createdAt: "desc" }
        ],
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.poem.count({ where: searchFilter }),
    ]);

    return NextResponse.json(
      { poems, totalPages: Math.ceil(totalPoems / pageSize), currentPage: page },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao buscar poemas:", error);
    return NextResponse.json({ error: "Erro ao buscar poemas" }, { status: 500 });
  }
}
