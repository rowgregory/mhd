import { auth } from "@/auth";
import prisma from "@/prisma/client";
import type { Role } from "@prisma/client";

export type Actor = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
};

export async function getActor(): Promise<Actor | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, name: true, role: true },
  });
  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
}
