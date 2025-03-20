import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Poem } from "@prisma/client";

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
          url: "https://poesiaplena.com/og-image.jpg",
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
      images: ["https://poesiaplena.com/og-image.jpg"],
    },
    verification: {
      google: "teWyDbkkLKbIO8Rk7k0Q2H-nSE_0_MGJpzSmw8Kmjck",
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
      </body>
    </html>
  );
}
