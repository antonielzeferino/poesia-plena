import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation";
import React, { ComponentType } from "react";

export default function withAuth<T extends Record<string, unknown>>(
  Component: ComponentType<T>
) {
  const ProtectedComponent = async (props: T) => {
    const session = await getServerSession(authOptions);

    if (!session) {
      redirect("/auth/signin");
      return null;
    }

    return <Component {...props} />;
  };

  return ProtectedComponent;
}
