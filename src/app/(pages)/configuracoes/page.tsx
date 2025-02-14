import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

import Link from "next/link";
import UserInfo from "@/app/(pages)/configuracoes/UserInfo";
import DeleteBtn from "@/components/DeleteBtn";

const prisma = new PrismaClient();

const Configuracoes = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="px-4 w-full flex flex-col flex-grow items-center">
        <div className="p-6 sm:mx-auto max-w-md w-full rounded-lg shadow-lg text-foreground my-auto bg-contrast">
          <h1 className="text-2xl font-bold mb-4">Configurações Gerais</h1>

          <div className="mb-4">
            <p className="text-red-500 font-semibold">Você ainda não fez login.</p>
          </div>

          <div className="flex justify-between mt-4">
            <Link href="/auth/signin">
              <button className="bg-medium-blue text-white px-4 py-2 rounded-lg hover:bg-dark-blue">
                Entrar
              </button>
            </Link>

            <Link href="/auth/signup">
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                Criar conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });

  if (!user) {
    return (
      <div className="px-4 w-full flex flex-col flex-grow items-center">
        <div className="p-6 sm:mx-auto max-w-md w-full rounded-lg shadow-lg text-foreground my-auto bg-contrast">
          <h1 className="text-2xl font-bold mb-4">Configurações Gerais</h1>

          <div className="mb-4">
            <p className="text-red-500 font-semibold">Usuário não encontrado.</p>
          </div>

          <div className="flex justify-between mt-4">
            <Link href="/auth/signin">
              <button className="bg-medium-blue text-white px-4 py-2 rounded-lg hover:bg-dark-blue">
                Entrar
              </button>
            </Link>

            <Link href="/auth/signup">
              <button className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                Criar conta
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const poems = await prisma.poem.findMany({ where: { authorId: user.id }, })

  return (
    <div className="w-full text-foreground">
      {user && <UserInfo user={user} />}
  
      {poems.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-md font-semibold">Seus Poemas</h2>
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {poems.map((poem) => (
              <li
                key={poem.id}
                className="border p-4 bg-contrast rounded-md text-start shadow-md"
              >
                <h3 className="text-sm font-semibold text-foreground">
                  {poem.title}
                </h3>
                <Link
                  href={`/poema/${poem.id}`}
                  className="text-link hover:underline text-sm block mt-2"
                >
                  Ler mais
                </Link>
                <DeleteBtn id={poem.id}/>
              </li>
            ))}
          </ul>
        </div>
      )}
  
      <div className="flex justify-between mt-6">
        <Link href="/api/auth/signout">
          <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </Link>
      </div>
    </div>
  );  
};

export default Configuracoes;
