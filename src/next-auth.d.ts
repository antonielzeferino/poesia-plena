import type NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    username: string
    id: string
  }

  interface Session {
    user: User
  }
}
