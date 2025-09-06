"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""),
  }));

  const renderWords = () => (
    <div className="whitespace-normal">
      {wordsArray.map((word, idx) => (
        <span key={`word-${idx}`} className="inline">
          {word.text.map((char, index) => (
            <span key={`char-${index}`} className={cn("text-white", word.className)}>
              {char}
            </span>
          ))}
          {" "}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        "mx-auto my-6 flex flex-wrap items-start gap-1",
        "max-w-[min(92vw,60ch)]",
        className
      )}
    >
      {/* Reveal container: avoids overflow on tiny screens */}
      <motion.div
        className="overflow-hidden pb-1 w-0"
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        viewport={{ amount: 0.6, once: true }}
        transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
      >
        <div
          className={cn(
            "leading-tight break-words supports-[text-wrap:balance]:[text-wrap:balance]",
            // Bold everywhere + bigger on small screens via clamp
            "font-extrabold text-white tracking-tight",
            "text-[clamp(1.75rem,8vw,3.75rem)]"
          )}
        >
          {renderWords()}
        </div>
      </motion.div>

      {/* Cursor that scales with font-size */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn(
          "self-end mb-[0.2em] inline-block rounded-sm w-[3px] h-[1em] bg-pink-500",
          cursorClassName
        )}
      />
    </div>
  );
};
