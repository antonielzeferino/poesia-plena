import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   try {
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
         return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

      const userId = session.user.id;
      const { searchParams } = new URL(req.url);
      const poemId = searchParams.get("poemId");

      if (poemId) {
         const comments = await prisma.comment.findMany({
            where: { poemId },
            include: {
               user: { select: { username: true } },
            },
            orderBy: { createdAt: "desc" },
         });

         return NextResponse.json({ comments });
      } else {
         return NextResponse.json({ error: "Poema não especificado", userId }, { status: 400 });
      }
   } catch (error) {
      console.error("Erro ao buscar comentários:", error);
      return NextResponse.json({ error: "Erro ao buscar comentários" }, { status: 500 });
   }
}

export async function POST(req: NextRequest) {
   try {
      const { poemId, content } = await req.json();
      
      if (!poemId || !content) {
         return NextResponse.json({ error: "PoemId e conteúdo são obrigatórios" }, { status: 400 });
      }

      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
         return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

      const userId = session.user.id;

      const newComment = await prisma.comment.create({
         data: {
            content,
            poemId,
            userId,
         },
         include: {
            user: {
               select: {
                  username: true,
               },
            },
         },
      });

      return NextResponse.json(newComment, { status: 201 });
   } catch (error) {
      console.error("Erro ao criar comentário:", error);
      return NextResponse.json({ error: "Erro ao criar comentário" }, { status: 500 });
   }
}
