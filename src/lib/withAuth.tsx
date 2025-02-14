import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import React, { ComponentType } from "react"

export default function withAuth<T>(Component: ComponentType<any>) {
  const ProtectedComponent = async (props: T) => {
    const session = await getServerSession(authOptions)

    if (!session) {
      redirect("/auth/signin")
      return null
    }

    return <Component {...props} />
  }

  return ProtectedComponent
}
