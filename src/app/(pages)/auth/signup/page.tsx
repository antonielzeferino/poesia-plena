"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log(response)
      const data = await response.json();

      if (response.ok) {

        router.push("/auth/signin");
      } else {
        setError(data.message || "Erro ao criar conta. Tente novamente.");
      }
    } catch (err) {
      console.log(err)
      console.error("Erro ao fazer requisição:", err);
      setError("Erro ao tentar criar a conta. Tente novamente.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow px-10">
      <h2 className="font-bold text-3xl mb-6 text-foreground text-center">Crie sua Conta</h2>

      <div className="p-6 shadow-lg w-full max-w-sm min-h-[420px] bg-contrast rounded-tl-[5rem] rounded-br-[5rem] flex flex-col items-center">
        <h2 className="text-xl font-semibold text-center text-foreground sm:mt-4">Cadastro</h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 px-4 flex-grow overflow-auto">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-muted">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu usuário"
              className="p-3 border border-muted rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-foreground"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-muted">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="p-3 border border-muted rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-700/40 text-foreground"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition w-full"
          >
            Cadastrar
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>

        <p className="text-sm text-foreground text-center pb-2">
          Já tem uma conta?{" "}
          <Link href="/auth/signin" className="text-blue-600 font-medium hover:underline">
            Entre aqui
          </Link>!
        </p>
      </div>
    </div>
  );
};

export default Signup;
