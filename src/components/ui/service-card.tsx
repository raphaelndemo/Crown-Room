'use client';

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ServiceCardProps = {
  title: string;
  bgImage: string;   
  href: string;
  className?: string;
  priority?: boolean; 
};

export default function ServiceCard({
  title,
  bgImage,
  href,
  className,
  priority = false,
}: ServiceCardProps) {
  return (
    <Link
      href={href as any}
      prefetch
      aria-label={title}
      className={cn(
        "relative group rounded-lg overflow-hidden shadow transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/70",
        "aspect-[4/5] min-h-[160px]",
        className
      )}
    >
      {/* Optimized image */}
      <Image
        src={bgImage}
        alt={title}
        fill
        className="object-cover select-none pointer-events-none"
        sizes="(min-width:1024px) 16.6vw, (min-width:768px) 25vw, (min-width:640px) 33vw, 50vw"
        quality={70}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />

      {/* Bottom gradient for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70" />

      {/* Text at the bottom */}
      <div className="absolute inset-x-0 bottom-0 p-3">
        <span className="inline-block rounded-md bg-black/40 backdrop-blur-sm px-3 py-1.5 text-white text-sm font-semibold">
          {title}
        </span>
      </div>

      <span className="sr-only">{title}</span>
    </Link>
  );
}
