import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
         const savedPoem = await prisma.savedPoem.findUnique({
            where: {
               userId_poemId: { userId, poemId },
            },
         });

         return NextResponse.json({ saved: !!savedPoem });
      }

      const savedPoems = await prisma.savedPoem.findMany({
         where: { userId },
         include: {
            poem: true,
         },
      });

      return NextResponse.json({ savedPoems });
   } catch (error) {
      console.error("Erro ao buscar poemas salvos:", error);
      return NextResponse.json({ error: "Erro ao buscar poemas salvos" }, { status: 500 });
   }
}

export async function POST(req: NextRequest) {
   try {
      const { poemId, saved } = await req.json();
      const session = await getServerSession(authOptions);

      if (!session?.user?.id) {
         return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
      }

      const userId = session.user.id;

      if (saved) {
         await prisma.savedPoem.create({
            data: { userId, poemId },
         });
      } else {
         await prisma.savedPoem.delete({
            where: { userId_poemId: { userId, poemId } },
         });
      }

      return NextResponse.json({ success: true });
   } catch (error) {
      return NextResponse.json({ error: "Erro ao salvar o poema" }, { status: 500 });
   }
}
