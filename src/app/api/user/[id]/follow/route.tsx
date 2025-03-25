import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// Rota GET - Verifica se o usuário está seguindo
export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   const { id } = await params;
   const session = await getServerSession(authOptions);

   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const loggedUserId = session.user.id;

   try {
      const existingFollow = await prisma.follow.findFirst({
         where: {
            followingId: id,
            followerId: loggedUserId,
         },
      });

      return NextResponse.json({
         isFollowing: existingFollow ? true : false,
      }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 });
   }
}

export async function POST(req: Request) {
   const session = await getServerSession(authOptions);
   if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
   }

   const { userId } = await req.json();
   const loggedUserId = session.user.id;

   if (!userId) {
      return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
   }

   if (userId === loggedUserId) {
      return NextResponse.json({ error: "You cannot follow yourself" }, { status: 400 });
   }

   try {
      const existingFollow = await prisma.follow.findFirst({
         where: {
            followingId: userId,
            followerId: loggedUserId,
         },
      });

      if (existingFollow) {
         await prisma.follow.delete({
            where: { id: existingFollow.id },
         });
         return NextResponse.json({ success: true, isFollowing: false });
      } else {
         await prisma.follow.create({
            data: {
               followingId: userId,
               followerId: loggedUserId,
            },
         });
         return NextResponse.json({ success: true, isFollowing: true });
      }
   } catch (error) {
      return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 });
   }
}
