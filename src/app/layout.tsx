import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Poem } from "@prisma/client";
import Link from "next/link";

async function fetchPopularPoems() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/poems?sort=popular&limit=3`);
    if (!res.ok) throw new Error("Erro ao buscar poemas populares");
    const data = await res.json();
    return data.poems || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const popularPoems = await fetchPopularPoems();
  const poemTitles = popularPoems.map((poem: Poem) => poem.title).join(", ");

  return {
    title: "Poesia Plena - Plataforma de Poesia Livre",
    description: `Leia os melhores poemas como "${poemTitles}". Descubra poesias livres, criativas e emocionantes na Poesia Plena.`,
    keywords: `poesia, poesia livre, poemas, plataforma de poesia, escritores, ${poemTitles}`,
    openGraph: {
      title: "Poesia Plena - Plataforma de Poesia Livre",
      description: `Leia os melhores poemas como "${poemTitles}". Descubra poesias livres, criativas e emocionantes na Poesia Plena.`,
      type: "website",
      url: "https://poesiaplena.com",
      images: [
        {
          url: "/images/logo.png",
          width: 1200,
          height: 630,
          alt: "Poesia Plena",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@poesiaplena",
      title: "Poesia Plena - Plataforma de Poesia Livre",
      description: `Leia os melhores poemas como "${poemTitles}". Descubra poesias livres, criativas e emocionantes na Poesia Plena.`,
      images: ["/images/logo.png"],
    },
    verification: {
      google: "teWyDbkkLKbIO8Rk7k0Q2H-nSE_0_MGJpzSmw8Kmjck",
    },
    icons: {
      icon: "/images/logo.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="px-2 flex flex-col flex-grow pb-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 pb-8 text-center">
          <p>Desenvolvido por <Link href="https://antonielzeferino.vercel.app" target="_blank" className="text-blue-600 hover:underline">Antoniel Zeferino</Link></p>
        </footer>
      </body>
    </html>
  );
}
