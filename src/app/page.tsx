import ListPoems from "@/components/ListPoems";

export default async function Home() {

  return (
    <div className="flex flex-col items-center justify-center bg-background">
      <main className="w-full text-center max-w-4xl mx-auto">
        <ListPoems />
      </main>
    </div>
  );
}
