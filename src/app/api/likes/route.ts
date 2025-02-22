import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
   try {
     const { searchParams } = new URL(request.url);
     const poemId = searchParams.get("poemId");
     const session = await getServerSession(authOptions);
     const userId = session?.user?.id;

     if (!poemId) {
       return NextResponse.json({ error: "O ID do poema é obrigatório" }, { status: 400 });
     }

     const totalLikes = await prisma.like.count({
       where: {
         poemId,
       },
     });

     let liked = false;
     if (userId) {
       const like = await prisma.like.findUnique({
         where: {
           userId_poemId: {
             userId,
             poemId,
           },
         },
       });
       liked = !!like;
     }

     return NextResponse.json({ liked, totalLikes }, { status: 200 });

   } catch (error) {
     console.error("Erro ao buscar likes:", error);
     return NextResponse.json({ error: "Erro ao buscar likes" }, { status: 500 });
   }
}

export async function POST(request: NextRequest) {
  try {
    const { poemId, liked } = await request.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;


    if (!userId || !poemId || typeof liked !== "boolean") {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    if (liked) {
      const like = await prisma.like.create({
        data: {
          userId,
          poemId,
        },
      });
      return NextResponse.json(like, { status: 200 });
    } else {
      await prisma.like.deleteMany({
        where: {
          userId,
          poemId,
        },
      });
      return NextResponse.json({ message: "Like removido" }, { status: 200 });
    }
  } catch (error) {
    console.error("Erro ao processar o like:", error);
    return NextResponse.json(
      { error: "Erro ao processar o like" },
      { status: 500 }
    );
  }
}
