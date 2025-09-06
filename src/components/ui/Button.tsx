"use client";
import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" };
export function Button({ className, variant = "primary", ...rest }: Props) {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
        variant === "primary" ? "bg-black text-white" : "bg-gray-200 text-black",
        className
      )}
      {...rest}
    />
  );
} 