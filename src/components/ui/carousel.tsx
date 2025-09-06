"use client";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";

interface SlideData { src: string; }

interface SlideProps {
  slide: SlideData;
  index: number;
  current: number;
  handleSlideClick: (index: number) => void;
}

const Slide = ({ slide, index, current, handleSlideClick }: SlideProps) => {
  const slideRef = useRef<HTMLLIElement>(null);
  const xRef = useRef(0);
  const yRef = useRef(0);
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const animate = () => {
      if (!slideRef.current) return;
      slideRef.current.style.setProperty("--x", `${xRef.current}px`);
      slideRef.current.style.setProperty("--y", `${yRef.current}px`);
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = slideRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    xRef.current = e.clientX - (r.left + Math.floor(r.width / 2));
    yRef.current = e.clientY - (r.top + Math.floor(r.height / 2));
  };
  const handleMouseLeave = () => { xRef.current = 0; yRef.current = 0; };

  return (
    <div className="[perspective:1200px] [transform-style:preserve-3d]">
      <li
        ref={slideRef}
        className="flex flex-1 flex-col items-center justify-center relative text-center text-white
                   opacity-100 transition-all duration-300 ease-in-out w-[70vmin] h-[70vmin] mx-[4vmin] z-10"
        onClick={() => handleSlideClick(index)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: current !== index ? "scale(0.98) rotateX(8deg)" : "scale(1) rotateX(0deg)",
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "bottom",
        }}
      >
        <div
          className="absolute top-0 left-0 w-full h-full bg-[#1D1F2F] rounded-[1%] overflow-hidden transition-all duration-150 ease-out"
          style={{
            transform:
              current === index
                ? "translate3d(calc(var(--x) / 30), calc(var(--y) / 30), 0)"
                : "none",
          }}
        >
          <img
            className="absolute inset-0 w-[120%] h-[120%] object-cover opacity-100 transition-opacity duration-600 ease-in-out"
            style={{ opacity: current === index ? 1 : 0.5 }}
            alt=""
            src={slide.src}
            loading="lazy"
            decoding="async"
            draggable={false}
          />

          {/* removed overlay: <div className="absolute inset-0 bg-black/30 ..." /> */}
        </div>
      </li>
    </div>
  );
};

const CarouselControl = ({
  type,
  title,
  handleClick,
}: { type: "previous" | "next"; title: string; handleClick: () => void }) => (
  <button
    className={`w-10 h-10 flex items-center mx-2 justify-center bg-neutral-200 dark:bg-neutral-800 border-3 border-transparent rounded-full
                focus:border-pink-600 focus:outline-none hover:-translate-y-0.5 active:translate-y-0.5 transition duration-200 ${type === "previous" ? "rotate-180" : ""}`}
    title={title}
    onClick={handleClick}
  >
    <IconArrowNarrowRight className="text-neutral-600 dark:text-neutral-200" />
  </button>
);

interface CarouselProps {
  slides: SlideData[];
  autoplay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
}

export function Carousel({
  slides,
  autoplay = true,
  interval = 3500,
  pauseOnHover = true,
}: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const isHoveredRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);
  const reduceMotionRef = useRef(false);

  const clearTimer = () => {
    if (timerRef.current !== undefined) {
      window.clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  };

  const startTimer = () => {
    if (!autoplay || reduceMotionRef.current || slides.length <= 1) return;
    clearTimer();
    timerRef.current = window.setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, Math.max(1200, interval));
  };

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;

    const onChange = () => {
      reduceMotionRef.current = mq.matches;
      clearTimer();
      if (!reduceMotionRef.current && !document.hidden && !isHoveredRef.current) {
        startTimer();
      }
    };
    mq.addEventListener?.("change", onChange);

    const onVisibility = () => {
      if (document.hidden) clearTimer();
      else if (!isHoveredRef.current) startTimer();
    };
    document.addEventListener("visibilitychange", onVisibility);

    startTimer();
    return () => {
      clearTimer();
      mq.removeEventListener?.("change", onChange);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [slides.length, autoplay, interval]);

  const handlePreviousClick = () => {
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
    if (!isHoveredRef.current && !document.hidden) startTimer();
  };

  const handleNextClick = () => {
    setCurrent((p) => (p + 1) % slides.length);
    if (!isHoveredRef.current && !document.hidden) startTimer();
  };

  const handleSlideClick = (index: number) => {
    if (current !== index) setCurrent(index);
    if (!isHoveredRef.current && !document.hidden) startTimer();
  };

  return (
    <div
      className="relative w-[70vmin] h-[70vmin] mx-auto"
      role="region"
      aria-label="Image carousel"
      onMouseEnter={() => {
        isHoveredRef.current = true;
        if (pauseOnHover) clearTimer();
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        if (pauseOnHover) startTimer();
      }}
    >
      <ul
        className="absolute flex mx-[-4vmin] h-full transition-transform duration-1000 ease-in-out will-change-transform"
        style={{
          transform: `translateX(-${slides.length ? current * (100 / slides.length) : 0}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <Slide
            key={index}
            slide={slide}
            index={index}
            current={current}
            handleSlideClick={handleSlideClick}
          />
        ))}
      </ul>

      <div className="absolute flex justify-center w-full top-[calc(100%+1rem)]">
        <CarouselControl type="previous" title="Go to previous slide" handleClick={handlePreviousClick} />
        <CarouselControl type="next" title="Go to next slide" handleClick={handleNextClick} />
      </div>
    </div>
  );
}
