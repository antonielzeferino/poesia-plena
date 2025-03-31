"use client"

import { Trash } from "lucide-react";
import { useState } from "react";

const DeleteBtn = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const userConfirmed = confirm("Tem certeza que deseja excluir esta postagem?");
    if (!userConfirmed) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`/api/poems/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errorData = await res.json();
        alert(`Erro ao excluir: ${errorData.message || "Erro desconhecido"}`);
        return;
      }

      alert("Postagem excluída com sucesso!");
      window.location.reload();
    } catch (error) {
      alert(`Erro ao excluir: ${error instanceof Error ? error.message : "Erro desconhecido"}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleDelete}
        className="bg-red-500/70 text-white flex items-center gap-2 px-3 py-1 rounded-md text-sm hover:bg-red-600 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Excluindo..." : <Trash size={14} />}
      </button>
    </div>
  );
}

export default DeleteBtn;
