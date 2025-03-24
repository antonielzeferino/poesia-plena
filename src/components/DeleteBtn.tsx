"use client"

import { Trash } from "lucide-react";

const DeleteBtn = ({ id }: {id: string}) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/poems/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (res) {
        console.log("postagem excluída com sucesso!", res);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500/70 text-white flex items-center gap-2 px-3 py-1 rounded-md text-sm hover:bg-red-600 transition"
    >
      <Trash size={16} />
    </button>
  );
}

export default DeleteBtn;