"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type AdminCtx = { isAdmin: boolean; setIsAdmin: (v: boolean) => void };
const Ctx = createContext<AdminCtx | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  return <Ctx.Provider value={{ isAdmin, setIsAdmin }}>{children}</Ctx.Provider>;
}
export function useAdmin() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAdmin must be used within AdminProvider");
  return c;
}