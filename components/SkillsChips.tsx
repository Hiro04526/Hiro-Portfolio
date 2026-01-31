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

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => {
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
          return base;
        })}
      </div>
    </>
  );
}