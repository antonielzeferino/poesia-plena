import Link from "next/link";

const Signin = () => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-10">
      <h2 className="font-bold text-3xl mb-6 text-gray-900 text-center">Bem Vindo(a)!</h2>

      <div className="p-6 shadow-lg w-full max-w-sm min-h-[420px] bg-white rounded-tl-[5rem] rounded-br-[5rem] flex flex-col items-center">
        {/* Título "Entrar" */}
        <h2 className="text-xl font-semibold text-center text-gray-800 sm:mt-4">Entrar</h2>

        {/* Formulário Responsivo */}
        <form className="w-full flex flex-col gap-4 px-4 flex-grow overflow-auto">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-medium text-gray-700">
              Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Digite seu usuário"
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Digite sua senha"
              className="p-3 border rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition w-full"
          >
            Entrar
          </button>
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
