"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";  // Importando useRouter
import Link from "next/link";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();  // Usando o useRouter para navegação

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Realizando o login usando o NextAuth
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      setError("Usuário ou senha incorretos.");
    } else if (result?.ok) {
      // Se o login for bem-sucedido, redireciona para a página inicial
      router.push("/");  // Usando o router.push para navegação
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow px-4">
      <h2 className="font-bold text-3xl mb-6 text-foreground text-center">Bem Vindo(a)!</h2>

      <div className="p-6 shadow-lg w-full max-w-sm min-h-[420px] bg-white rounded-tl-[5rem] rounded-br-[5rem] flex flex-col items-center">
        <h2 className="text-xl font-semibold text-center text-gray-800 sm:mt-4">Entrar</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 px-4 flex-grow overflow-auto">
          {/* Campo de Usuário */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">Usuário</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu usuário"
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-background"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Campo de Senha */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-background"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition w-full"
          >
            Entrar
          </button>

          {/* Exibição de erro caso o login falhe */}
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>

        <p className="text-sm text-gray-600 text-center pb-2">
          Ainda não tem uma conta?{" "}
          <Link href="/auth/signup" className="text-blue-600 font-medium hover:underline">
            Cadastre-se
          </Link>!
        </p>
      </div>
    </div>
  );
};

export default Signin;
