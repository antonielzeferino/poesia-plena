import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const searchQuery = searchParams.get("search") || "";
  const sortOrder = searchParams.get("sort") || "recent";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("limit") || "10", 10);

  try {
    const poems = await prisma.poem.findMany({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { content: { contains: searchQuery, mode: "insensitive" } },
          { categories: { some: { name: { contains: searchQuery, mode: "insensitive" } } } },
          { tags: { some: { name: { contains: searchQuery, mode: "insensitive" } } } },
        ],
      },
      orderBy:
        sortOrder === "popular"
          ? { likes: { _count: "desc" } } 
          : sortOrder === "oldest"
          ? { createdAt: "asc" } 
          : { createdAt: "desc" },
          
      include: {
        author: { select: { username: true , id: true, name: true} },
        _count: { select: { likes: true } }, 
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    const totalPoems = await prisma.poem.count({
      where: {
        OR: [
          { title: { contains: searchQuery, mode: "insensitive" } },
          { content: { contains: searchQuery, mode: "insensitive" } },
          { categories: { some: { name: { contains: searchQuery, mode: "insensitive" } } } },
          { tags: { some: { name: { contains: searchQuery, mode: "insensitive" } } } },
        ],
      },
    });

    const totalPages = Math.ceil(totalPoems / pageSize);

    return NextResponse.json({ poems, totalPages, currentPage: page }, { status: 200 });
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
