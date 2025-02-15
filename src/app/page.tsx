import ListPoems from "@/components/ListPoems";

export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-background">
      <main className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Poemas Recentes</h1>

      <ListPoems />

      </main>
    </div>
  );
}
