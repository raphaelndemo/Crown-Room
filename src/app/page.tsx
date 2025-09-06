'use client';

import Image from 'next/image';
import Link from 'next/link';
import { NavbarDemo } from '@/components/resizable-navbar';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';
import ServiceCard from '@/components/ui/service-card'; 
import { BridalCarousel } from '@/components/bridal-carousel';
import Footer from '@/components/ui/footer';
import HeroVideo from '@/components/hero-video';



export default function HomePage() {
  const words = [
    { text: 'Build' },
    { text: 'awesome' },
    { text: 'apps' },
    { text: 'with' },
    { text: 'Aceternity.', className: 'text-blue-500' },
  ];

  const services = [
    { name: 'Braids', image: '/images/braids2.png', slug: 'braids' },
    { name: 'Natural Hair', image: '/images/natural_hair.png', slug: 'natural-hair' },
    { name: "Women's Haircut", image: '/images/haircut.png', slug: 'womens-haircut' },
    { name: 'Men’s Haircut', image: '/images/men_haircut.png', slug: 'mens-haircut' },
    { name: 'Locs', image: '/images/locs.png', slug: 'locs' },
    { name: 'Silk Press', image: '/images/silk_press.png', slug: 'silk-press' },
    { name: 'Weaves', image: '/images/weaves.png', slug: 'weaves' },
    { name: 'Eyelashes', image: '/images/eyelashes.png', slug: 'eyelashes' },
    { name: 'Nails', image: '/images/nails.png', slug: 'nails' },
    { name: 'Color', image: '/images/colors.png', slug: 'color' },
    { name: 'Kids', image: '/images/kids.png', slug: 'kids' },
    { name: 'Makeup', image: '/images/makeup2.png', slug: 'makeup' },
  ];

   const steps = [
    {
      title: '1) Find a stylist',
      text: 'Browse verified pros near you by style, rating, or availability.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm9.2 16.4-4.7-4.7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: '2) Book & pay',
      text: 'Pick a time that fits. Checkout is secure and fast.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M3 8h18v10H3zM3 8l18 0M7 4v4m10-4v4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: '3) Get styled',
      text: 'Show up, relax, glow up. We’ll handle the rest.',
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
          <path
            d="M12 3v7m0 0 3-3m-3 3-3-3M5 14h14m-12 4h10"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <main className="px-4 sm:px-6 lg:px-12 ">
      {/* Nav */}
      <section>
        <NavbarDemo />
      </section>
      <section>
      <div className="-mx-4 sm:-mx-6 lg:-mx-12">
        <HeroVideo />
      </div>

      </section>
      

      {/* Service cards */}
      <section aria-labelledby="service-heading" className="py-12">
        <div className="max-w-7xl mx-auto">
          <h2
            id="service-heading"
            className="text-center text-2xl sm:text-3xl font-bold mb-8 text-black"
          >
            Find Pros by Service
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {services.map((s) => (
              <ServiceCard
                key={s.slug}
                title={s.name}
                bgImage={s.image}
                href={`/search?service=${s.slug}`}
                className="min-h-[170px] sm:min-h-[180px] md:min-h-[200px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section
      aria-labelledby="cta-heading"
      className="py-14"
    >
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-violet-50 via-fuchsia-50 to-rose-50 ring-1 ring-black/5 px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-10">
          {/* Image */}
          <div className="order-1 lg:order-none">
            <div className="relative mx-auto w-full max-w-md sm:max-w-lg">
              <Image
                src="/images/hero4.png"
                alt="Barber trimming a client’s hair"
                width={1200}
                height={1000}
                priority={false}
                className="w-full h-auto shadow-lg object-cover"
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 60vw, 92vw"
              />
              {/* subtle frame */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
            </div>
          </div>

          {/* Copy + CTA */}
          <div className="space-y-6">
            <h2
              id="cta-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-900"
            >
              Hairdressing in 3 simple steps
            </h2>
            <p className="text-base sm:text-lg text-gray-700 max-w-prose">
              Whether it’s braids, a silk press, or a quick trim—booking with Crown Room is
              fast, seamless, and made for your schedule.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/#"
                className="inline-flex items-center justify-center rounded-lg bg-pink-600 px-5 py-2.5 text-white font-semibold transition hover:bg-pink-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/60"
                aria-label="Book a hairdressing appointment"
              >
                Book now
              </Link>
              <Link
                href="/search"
                className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-gray-900 font-semibold ring-1 ring-inset ring-gray-200 transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400/60"
                aria-label="Explore stylists"
              >
                Explore stylists
              </Link>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className="group rounded-sm bg-white p-5 shadow-sm ring-1 ring-gray-200 transition hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white">
                    {s.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{s.text}</p>
                  <Link
                    href="/#"
                    className="mt-3 inline-block text-sm font-medium text-pink-700 hover:text-pink-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-500/50 rounded"
                    aria-label={`Learn more about ${s.title}`}
                  >
                    Learn more →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <h2 className="text-3xl font-bold text-center mb-8 text-neutral-800">
        Bridal <span className="text-rose-600">Package</span>
      </h2>
      <p className="max-w-3xl mx-auto text-center text-base sm:text-lg text-gray-700 mb-8 px-4">
        Our Bridal Package blends professional bridal hair and makeup with styles that last—from elegant updos, silk-press finishes, and knotless braids to loc styling and soft-glam makeup. Includes a trial, timeline planning, on-location service, and photo-ready touch-ups. Add bridesmaids or mother-of-the-bride options to customize your wedding-day look.
      </p>
      <BridalCarousel />
    </section>
    <section>
      <div className="-mx-4 sm:-mx-6 lg:-mx-12">
        <Footer />
      </div>

    </section>
     
    </main>
  );
}
