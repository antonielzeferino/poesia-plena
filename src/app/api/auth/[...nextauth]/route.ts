import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

// Definindo a estrutura personalizada para a sessão
interface SessionUser {
  username: string;
  id: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Usuário", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Preencha todos os campos.")
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        })

        if (!user) {
          throw new Error("Usuário não encontrado.")
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password)
        if (!isValidPassword) {
          throw new Error("Senha incorreta.")
        }

        // Retorne apenas o username do usuário
        return {
          username: user.username,
          id: user.id,
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Salvando o username no token
      if (user) {
        token.username = user.username
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token?.username) {
        session.user = { username: token.username, id: token.id } as SessionUser;
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
