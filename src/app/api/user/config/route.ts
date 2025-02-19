import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
   const session = await getServerSession(authOptions);

   if (!session?.user) {
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
   }

   const user = await prisma.user.findUnique({
      where: { username: session.user.username },
      include: {
         poems: true,
         likes: true,
         savedPoems: true,
         comments: true,
         following: {
            include: { following: true },
         },
         followers: {
            include: { follower: true },
         },
      },
   });

   if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
   }

   return NextResponse.json(user);
}
