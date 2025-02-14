// @ts-expect-error: Necessário para a declaração do módulo

import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
    id: string
  }

  interface Session {
    user: User
  }
}
