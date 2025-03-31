"use client"

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function UserEdit() {
   const [formData, setFormData] = useState({
      name: "",
      bio: "",
   });
   const [loading, setLoading] = useState(true);
   const [originalData, setOriginalData] = useState({ name: "", bio: "" });
   const [userId, setUserId] = useState("")
   const router = useRouter();

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const response = await fetch("/api/user");
            if (!response.ok) {
               throw new Error("Erro ao buscar usuário");
            }
            const data = await response.json();
            setFormData({ name: data.name, bio: data.bio });
            setOriginalData({ name: data.name, bio: data.bio });
            setUserId(data.id)
         } catch (error) {
            console.error(error);
         } finally {
            setLoading(false);
         }
      };
      fetchUser();
   }, []);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [id]: value,
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const updatedData = {
         name: formData.name.trim() || originalData.name,
         bio: formData.bio.trim() || originalData.bio,
      };
      try {
         const response = await fetch("/api/user", {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
         });

         if (!response.ok) {
            throw new Error("Erro ao atualizar perfil");
         }

         alert("Informações atualizado com sucesso");
         router.push(`/usuario/${userId}`);
      } catch (error) {
         console.error(error);
      }
   };

   if (loading) {
      return <div className="text-center text-muted">Carregando...</div>;
   }

   return (
      <div className="flex flex-col flex-grow items-center justify-center bg-background p-6">
         <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-contrast shadow-lg rounded-xl">
            <h2 className="text-lg font-bold text-foreground text-center mb-4">Editar Perfil</h2>
            <div className="mb-4">
               <label htmlFor="name" className="block text-sm font-medium text-muted">
                  Nome
               </label>
               <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-muted rounded-lg p-2 focus:ring-2 focus:ring-foreground focus:outline-none bg-background text-foreground"
                  placeholder="Digite o nome"
               />
            </div>
            <div className="mb-4">
               <label htmlFor="bio" className="block text-sm font-medium text-muted">
                  Biografia
               </label>
               <textarea
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-muted rounded-lg p-2 focus:ring-2 focus:ring-foreground focus:outline-none bg-background text-foreground"
                  placeholder="Digite a biografia"
                  rows={4}
               />
            </div>
            <button
               type="submit"
               className="w-full bg-foreground text-background py-2 px-4 rounded-lg hover:opacity-80 transition"
            >
               Salvar
            </button>
         </form>
      </div>
   );
}

export default UserEdit;
