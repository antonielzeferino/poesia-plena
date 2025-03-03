"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const CommentModal = ({ poemId, isOpen, onClose }: { poemId: string; isOpen: boolean; onClose: () => void }) => {
  const [comments, setComments] = useState<{ id: string; content: string; user: string }[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (isOpen) {
      setComments([{ id: "1", content: "Comentário de exemplo", user: "user example" }]);
    }
  }, [isOpen, poemId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poemId, content: newComment }),
      });

      if (!res.ok) throw new Error("Erro ao enviar comentário");

      const savedComment = await res.json();
      setComments([...comments, savedComment]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-0 bg-background left-0 flex items-center justify-center w-screen min-h-screen p-0">
      <div className="bg-background p-6 shadow-lg w-full min-h-screen max-w-7xl">
        <button onClick={onClose} className="relative top-0 left-full -translate-x-8 p-2 bg-gray-700 rounded-md">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Comentários</h2>
        
        <div className="space-y-3 max-h-40 overflow-y-auto">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="border-b p-2 bg-contrast rounded-md">
                <p className="text-sm font-medium">{comment.user}</p>
                <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">Nenhum comentário ainda.</p>
          )}
        </div>

        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-md text-sm"
            placeholder="Comentários em desenvolvimento..."
          />
          <button
            onClick={handleSubmit}
            className="w-full mt-2 bg-blue-500 text-white py-1 rounded-md hover:bg-blue-600 transition"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
