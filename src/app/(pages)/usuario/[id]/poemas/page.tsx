import { User } from "@/types";
import Link from "next/link";

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
      if (!data) {
         throw new Error("Dados não encontrados");
      }
      return data.poems;
   } catch (err) {
      console.error("Erro na requisição:", err);
      return null;
   }
};

const userPoems = async ({ params }: { params: Promise<{ id: string }> }) => {
   const { id } = await params;

   const poems = await getUser(id);

   return (
      <div className="flex flex-col flex-grow items-center gap-4">
         {poems && poems.length > 0 ? (
            poems.map((poem) => (
               <div key={poem.id} className="border-b p-4 bg-contrast rounded-md text-start border-muted  shadow-md shadow-foreground/5 w-full">

                  <Link href={`/poema/${poem.id}`}>
                     <h2 className="text-lg font-semibold text-foreground">{poem.title}</h2>
                  </Link>
                  {poem.author && (
                     <div className="flex justify-between">
                        <Link href={`/usuario/${poem.author.id}`} className="text-sm text-muted">Por: {poem.author.username}</Link>
                        <span className="text-md text-muted">
                           {new Date(poem.createdAt).toLocaleDateString('pt-BR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                           })}
                        </span>
                     </div>
                  )}
                  <hr className="border border-stone-500" />
                  <p className="text-foreground mt-2 line-clamp-3 text-justify break-words hyphens-auto">
                     {poem.content}
                  </p>
                  <Link href={`/poema/${poem.id}`} className="text-link hover:underline text-sm">
                     Ler mais
                  </Link>
               </div>
            ))
         ) : (
            <p className="text-gray-500">Nenhum poema encontrado.</p>
         )}
      </div>
   );
};
export default userPoems;