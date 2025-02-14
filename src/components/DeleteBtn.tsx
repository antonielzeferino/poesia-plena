"use client"

import { Trash } from "lucide-react";

const DeleteBtn = ({ id }: {id: string}) => {
  const handleDelete = async () => {
    try {
      await fetch(`/api/poems/${id}`, {
        method: "DELETE",
      });
      alert("postagem excluída com sucesso!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="mt-3 bg-red-500 text-white flex items-center gap-2 px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
    >
      <Trash size={16} /> Excluir
    </button>
  );
}

export default DeleteBtn;