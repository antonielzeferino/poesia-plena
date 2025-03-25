import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
   request: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
   const { id } = await params

   if (!id) {
      return NextResponse.json({ error: "User ID not provided" }, { status: 400 });
   }

   try {
      const user = await prisma.user.findUnique({
         where: { id },
         include: {
            poems: true,
            comments: true,
            followers: { select: { id: true } },
            following: true,
            likes: true,
            savedPoems: true
         }
      });

      if (!user) {
         return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      return NextResponse.json(user, { status: 200 });
   } catch (error) {
      return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 });
   }
}