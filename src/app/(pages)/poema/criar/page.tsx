import { getServerSession } from 'next-auth';
import CreatePoemForm from './CreatePoemForm';
import { authOptions } from '@/lib/auth';
import withAuth from '@/lib/withAuth';

const CreatePoemPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="container mx-auto p-4">
        <p>Você precisa estar logado para criar um poema.</p>
      </div>
    );
  }

  const userId = session.user.id;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Criar Poema</h1>
      <CreatePoemForm id={userId} />
    </div>
  );
};

export default withAuth(CreatePoemPage);
