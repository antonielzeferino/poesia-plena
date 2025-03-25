"use client";
import { useEffect, useState, useTransition } from "react";

export default function FollowBtn({ userId }: { userId: string }) {
   const [isPending, startTransition] = useTransition();
   const [isFollowing, setIsFollowing] = useState(false);

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await fetch(`/api/user/${userId}/follow`);
            if (!response.ok) {
               throw new Error("Erro ao buscar usuário");
            }
            const data: { isFollowing: boolean } = await response.json();
            setIsFollowing(data.isFollowing)
         } catch (err) {
            console.log(err)
         }
      };

      fetchUser();
   }, [userId]);

   const handleFollow = async () => {
      startTransition(async () => {
         try {
            const response = await fetch(`/api/user/${ userId }/follow`, {
               method: "POST",
               body: JSON.stringify({ userId }),
               headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
               throw new Error("Erro ao seguir/desseguir");
            }

            setIsFollowing((prev) => !prev);
         } catch (error) {
            console.error("Erro:", error);
         }
      });
   };

   return (
      <button
         onClick={handleFollow}
         disabled={isPending}
         className={`px-3 py-1 text-sm rounded-xl ${
            isFollowing
               ? "bg-gray-400/40"
               : "bg-blue-500 text-white hover:bg-blue-600"
         }`}
      >
         {isPending
            ? "Atualizando..."
            : isFollowing
            ? "Deixar de seguir"
            : "Seguir"}
      </button>
   );
}
