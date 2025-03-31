import Image from "next/image";
import UserPicture from "../../../../../public/images/userPic.png";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Edit } from "lucide-react";
import FollowBtn from "@/components/FollowBtn";
import { User } from "@/types";

export const getUser = async (id: string) => {
   try {
      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/${id}`, {
         cache: "no-store",
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!res.ok) {
         throw new Error("Erro ao buscar usuário");
      }

      const data: User = await res.json();
      return data;
   } catch (err) {
      console.error("Erro na requisição:", err);
      return null;
   }
};

const UserPage = async ({ params }: { params: Promise<{ id: string }> }) => {
   const session = await getServerSession(authOptions);
   const { id } = await params;

   const user = await getUser(id);

   const isUser: boolean = user?.id == session?.user.id;
   if (!user) {
      return (
         <div className="flex justify-center items-center h-screen">
            <p className="text-xl font-bold">Usuário não encontrado</p>
         </div>
      );
   }

   const userCreatedAt = new Date(user.createdAt).toLocaleString("default", {
      month: "2-digit",
      year: "numeric",
   });

   return (
      <div className="w-full max-w-4xl mx-auto p-4 flex flex-col flex-1 justify-center items-center">
         <div className="w-full flex flex-col lg:flex-row gap-6">
            <div className="p-4 bg-contrast rounded-lg shadow-lg flex items-center gap-4 flex-1">
               <Image
                  src={UserPicture}
                  alt="imagem do usuário"
                  width={80}
                  height={80}
                  className="rounded-full border-2 border-primary transition-transform transform hover:scale-105"
               />
               <div className="overflow-hidden">
                  <div className="flex flex-col gap-2">
                     <h3 className="text-xl font-semibold text-primary">{user.name || user.username}</h3>
                     {user.name && (
                        <p className="text-sm text-muted">{user.username}</p>
                     )}
                     <p className="text-xs text-muted">por aqui desde {userCreatedAt}</p>
                     {isUser ? (
                        <Link href={`/usuario/${id}/editar`} className="flex gap-2 text-link">
                           <Edit /> editar
                        </Link>
                     ) : (
                        <FollowBtn userId={user.id} />
                     )}
                  </div>
               </div>
            </div>

            <div className="p-4 bg-contrast rounded-lg shadow-lg flex flex-col gap-4 flex-1">
               <div className="flex gap-4">
                  <div className="flex gap-2">
                     <h3 className="text-sm font-semibold">Seguidores:</h3>
                     <p className="text-sm">{user.followers.length}</p>
                  </div>
                  <div className="flex gap-2">
                     <h3 className="text-sm font-semibold">Seguindo:</h3>
                     <p className="text-sm">{user.following.length}</p>
                  </div>
               </div>

               <Link href={`/usuario/${id}/poemas`} className="flex gap-2 text-link">
                  <h3 className="underline font-semibold">Poemas</h3>
                  <p>{user.poems.length}</p>
               </Link>
            </div>
         </div>

         <div className="p-4 bg-contrast rounded-lg shadow-lg mt-6 w-full">
            <h3 className="text-sm font-semibold text-primary">Biografia</h3>
            <p className="text-sm text-muted whitespace-pre-wrap">{user.bio || "Sem biografia"}</p>
         </div>
      </div>
   );
};

export default UserPage;
