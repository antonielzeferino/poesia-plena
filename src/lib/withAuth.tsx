import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ComponentType } from "react";

export default function withAuth<T extends Record<string, unknown>>(
  Component: ComponentType<T>
) {
  return async function ProtectedComponent(props: T) {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/auth/signin");
      return null;
    }

    return <Component {...props} />;
  };
}
