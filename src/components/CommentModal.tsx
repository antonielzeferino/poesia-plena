"use client";

import { useState, useEffect } from "react";
import { X, Trash2 } from "lucide-react";

const CommentModal = ({
  poemId,
  isOpen,
  onClose,
}: {
  poemId: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [comments, setComments] = useState<{ id: string; content: string; user: { id: string; username: string } }[]>([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState<{ id: string; isOwner: boolean } | null>(null);
  const [authorId, setAuthorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCommentsAndPoem = async () => {
      try {
        const [userRes, poemRes, commentsRes] = await Promise.all([
          fetch("/api/user"),
          fetch(`/api/poems/${poemId}`),
          fetch(`/api/poems/comments?poemId=${poemId}`)
        ]);

        if (!userRes.ok || !poemRes.ok || !commentsRes.ok) throw new Error("Erro ao buscar dados");

        const [userData, poemData, commentsData] = await Promise.all([userRes.json(), poemRes.json(), commentsRes.json()]);
        console.log(userData, poemData, commentsData);
        setAuthorId(poemData.author.id);
        setCurrentUser({ id: userData.id, isOwner: userData.id === poemData.author.id });
        setComments(commentsData.comments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCommentsAndPoem();
  }, [poemId]);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      const res = await fetch("/api/poems/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ poemId, content: newComment }),
      });

      if (!res.ok) throw new Error("Erro ao enviar comentário");

      const savedComment = await res.json();
      setComments((prev) => [...prev, savedComment]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (commentId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm("Tem certeza que deseja deletar este comentário?")) return;
    
    try {
      const res = await fetch(`/api/poems/comments/${commentId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Erro ao deletar comentário");
      
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen || !currentUser || !authorId) return null;

  return (
    <div className="absolute top-0 z-20 bg-background left-0 flex items-center justify-center w-screen min-h-screen p-0">
      <div className="bg-background p-6 shadow-lg w-full min-h-screen max-w-7xl flex flex-col">
        <button onClick={onClose} className="relative top-0 left-full -translate-x-8 p-2 bg-gray-700 rounded-md w-min">
          <X size={20} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Comentários</h2>

        <div className="flex-1 py-4 px-2 space-y-3 overflow-y-auto max-h-[calc(100vh-200px-80px)]">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="border-b p-2 bg-contrast rounded-md relative"
              >
                <p className="text-[12px] font-medium text-muted">{comment.user.username}</p>
                <p className="text-foreground">{comment.content}</p>
                {(currentUser.isOwner || currentUser.id === comment.user.id) && (
                  <button
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                    onClick={(e) => handleDelete(comment.id, e)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
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
