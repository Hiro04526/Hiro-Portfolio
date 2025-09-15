"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAdmin } from "@/app/context/AdminContext";

type Props = { skills: string[] };

export function SkillsChips({ skills }: Props) {
  const { isAdmin, setIsAdmin } = useAdmin();
  const [showPwd, setShowPwd] = useState(false);
  const [pwd, setPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleVerify = async () => {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (!res.ok) {
        setErr("Incorrect password.");
      } else {
        setIsAdmin(true);
        setShowPwd(false);
        setPwd("");
      }
    } catch {
      setErr("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    if (!isAdmin) {
      setShowPwd(true);
      return;
    }
    // if already admin, log out (clear cookie) and flip context
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      // ignore; still flip local state so UI reflects intent
    } finally {
      setIsAdmin(false);
    }
  };
  
  return (
    <>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
          const isSupabase = skill === "Supabase";
          const base = (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground cursor-default"
            >
              {skill}
            </motion.div>
          );

          if (!isSupabase) return base;

          return (
            <motion.button
              key={skill}
              type="button"
              onClick={() => setShowPwd(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="px-3 py-1 rounded-full text-sm bg-secondary text-secondary-foreground cursor-default"
              title={isAdmin ? "Admin mode enabled" : "Enter admin password"}
            >
              {isAdmin ? "Supabase (Admin)" : "Supabase"}
            </motion.button>
          );
        })}
      </div>

      {/* Simple modal */}
      {showPwd && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-secondary text-secondary-foreground p-4 shadow-xl">
            <h4 className="mb-2 text-lg font-semibold">Enter Admin Password</h4>
            <input
              type="password"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="••••••••"
            />
            {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setShowPwd(false)}
                className="rounded bg-secondary px-3 py-1 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleVerify}
                disabled={loading}
                className="rounded bg-emerald-600 px-3 py-1 text-sm text-white disabled:opacity-50"
              >
                {loading ? "Verifying…" : "Unlock Admin"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}