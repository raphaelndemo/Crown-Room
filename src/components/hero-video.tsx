'use client';

import Link from 'next/link';
import { motion, type Variants, cubicBezier } from 'framer-motion';

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  },
};

export default function HeroVideo() {
  return (
    <section aria-label="Salon hero" className="relative isolate w-full overflow-hidden bg-black">
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover motion-reduce:hidden"
        autoPlay muted loop playsInline preload="metadata" poster="/images/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/35" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-black/50 via-black/20 to-black/40" />

      <div className="mx-auto flex min-h-[70vh] md:min-h-[82vh] lg:min-h-[88vh] max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="max-w-3xl text-center"
        >
          <motion.h1
            variants={fadeUp}
            className="mx-auto max-w-[min(92vw,60ch)] leading-tight supports-[text-wrap:balance]:[text-wrap:balance] text-[clamp(1.75rem,7vw,4rem)] font-extrabold tracking-tight text-white"
          >
            Book Trusted Hair &amp; Beauty Services Near You
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-white/90 max-w-xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Book braids, silk press, cuts, color—on your schedule. Verified pros, clean pricing, and zero awkward phone calls.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/#"
              className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-white font-semibold shadow-sm transition hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              Book now
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-lg bg-white/95 px-5 py-2.5 text-gray-900 font-semibold ring-1 ring-inset ring-white/20 backdrop-blur transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore stylists
            </Link>
          </motion.div>

          
        </motion.div>
      </div>
    </section>
  );
}
