import { getServerSession } from 'next-auth';
import CreatePoemForm from './CreatePoemForm';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

async function CreatePoem() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      redirect("/auth/signup")
    );
  }

  const userId = session.user.id;

  return (
    <div className="p-4 w-full  max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Poema</h1>
      <CreatePoemForm id={userId} />
    </div>
  );
};

export default CreatePoem;
