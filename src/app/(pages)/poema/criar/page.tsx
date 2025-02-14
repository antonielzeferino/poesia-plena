import { getServerSession } from 'next-auth';
import CreatePoemForm from './CreatePoemForm';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';

const CreatePoemPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container mx-auto p-4">
        <p>Você precisa estar logado para criar um poema.</p>
      </div>
    );
  }

  const user = await prisma.user.findUnique({
    where: { username: session.user.username },
  });

  if(!user) {
    return (
      <div>Ocorreu um errousuário não encontrado</div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Poema</h1>
      <CreatePoemForm user={user} />
    </div>
  );
};

export default CreatePoemPage;
