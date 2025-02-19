"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type CreatePoemFormProps = {
  id: string;
};

const CreatePoemForm = ({ id }: CreatePoemFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setAuthorId(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    const poemData = {
      title,
      content,
      authorId,
    };

    try {
      const response = await fetch('/api/poems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(poemData),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar poema');
      }

      const result = await response.json();
      console.log('Poema criado:', result);
      router.push(`/poema/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-foreground">Título:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 rounded bg-contrast"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-foreground">Conteúdo:</label>
        <textarea
          id="content"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="w-full p-2 rounded bg-contrast"
          rows={6}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`p-2 bg-blue-500 text-white rounded ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? 'Criando...' : 'Criar Poema'}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </form>
  );
};

export default CreatePoemForm;
