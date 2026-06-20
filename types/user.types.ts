import { Role } from "@prisma/client";

export type UserRecord = {
  id: string;
  email: string;
  name: string | null;
  role: Role;
  createdAt: Date;
};

export type Result<T = void> =
  | { success: true; data: T }
  | { success: false; error: string };
