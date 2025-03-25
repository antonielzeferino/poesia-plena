import Image from "next/image";
import UserPicture from "../../../../../public/images/userPic.png";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Edit } from "lucide-react";
import FollowBtn from "@/components/FollowBtn";
import { User } from "@/types";

const getUser = async (id: string) => {
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

   const isUser: boolean = user?.id == session?.user.id
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
      <div>
         <div className="max-w-4xl mx-auto">
            <div className="w-full flex flex-wrap gap-4">
               <div className="p-2 md:p-4 w-full bg-contrast rounded-md shadow-box-shadow flex gap-4 items-center">
                  <Image
                     src={UserPicture}
                     alt="imagem do usuário"
                     width={50}
                     height={50}
                     className="rounded-full"
                  />
                  <div className={`overflow-hidden`}>
                     <div className={`${isUser ? "flex gap-2" : "flex-col gap-2"}`}>
                        <h3 className="line-clamp-1 text-sm font-bold">{user.username}</h3>
                        {isUser ? (
                           <Link href={`/usuario/${id}/editar`}>
                             <Edit />
                           </Link>
                        ) : (
                           <FollowBtn userId={user.id} />
                        )}
                     </div>
                     <p className="text-sm text-muted">por aqui desde: {userCreatedAt}</p>
                  </div>
               </div>
               <div className="p-4 w-full bg-contrast rounded-md shadow-box-shadow flex flex-col gap-1">
                  <h3 className="text-sm font-bold">Biografia</h3>
                  <p className="text-sm font-normal">{user.bio}</p>
               </div>
               <div className="p-4 w-full bg-contrast rounded-md shadow-box-shadow flex flex-col gap-4">
                  <div className="flex gap-2 max-w-[300px]">
                     <div className="flex gap-1 me-8">
                        <h3 className="text-sm font-bold">Seguidores:</h3>
                        <p className="text-sm font-normal">{user.followers.length}</p>
                     </div>
                     <div className="flex gap-1">
                        <h3 className="text-sm font-bold">Seguindo:</h3>
                        <p className="text-sm font-normal">{user.following.length}</p>
                     </div>
                  </div>
                  <Link href={`/usuario/${id}/poemas`}>
                     <div className="flex gap-2">
                        <h3 className="text-sm font-bold">Poemas</h3>
                        <p className="text-sm font-normal">{user.poems.length}</p>
                     </div>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserPage;
