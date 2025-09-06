"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Props = { onApply?: (q: string) => void };
export default function FilterBar({ onApply }: Props) {
  const [q, setQ] = useState("");
  return (
    <div className="flex gap-2 items-center">
      <input className="border rounded px-2 py-1" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search services or stylists" />
      <Button onClick={() => onApply?.(q)}>Search</Button>
    </div>
  );
} 