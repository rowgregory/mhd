"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const HIDDEN_ON = ["/login", "/dashboard"];

export default function ConditionalFooter() {
  const pathname = usePathname();
  const hidden = HIDDEN_ON.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  if (hidden) return null;
  return <Footer />;
}
