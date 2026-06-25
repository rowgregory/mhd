import { ReactNode } from "react";
import AdminBar from "../components/AdminBar";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminBar />
      {children}
    </>
  );
}
