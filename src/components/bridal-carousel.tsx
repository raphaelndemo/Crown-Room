"use client";

import {Carousel} from "@/components/ui/carousel";
export function BridalCarousel() {
  const slideData = [
    {
      src: "/images/bride1.png",
    },
    {
      src: "/images/bride22.png",
    },
    {
      src: "/images/bride3.png",
    },
    {
      src: "/images/bride4.png",
    },
    
    {
      src: "/images/bride6.png",
    },
    {
      src: "/images/bride7.png",
    },
    {
      src: "/images/bride9.png",
    },
    {
      src: "/images/brides10.jpg",
    },
    {
      src: "/images/brides11.jpg",
    },
    {
      src: "/images/brides12.jpg",
    },
  ];
  return (
    <div className="relative overflow-hidden w-full h-full py-20">
      <Carousel slides={slideData} />
    </div>
  );
}
