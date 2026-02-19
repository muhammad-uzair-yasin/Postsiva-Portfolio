"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Quote, ExternalLink, Star } from "lucide-react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    text: string;
    author: string;
    rating: number;
    platform: string;
    country: string;
    link: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => {
    addAnimation();
  }, [addAnimation]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-7xl overflow-hidden  mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-8 py-12 w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] md:w-[450px] relative rounded-[3rem] border border-[#2551AF]/20 shadow-xl shadow-[rgba(37,81,175,0.1)] shrink-0 bg-white p-10 flex flex-col h-full transition-all duration-500 group hover:-translate-y-4"
            key={item.author + idx}
          >
            <div className="absolute -top-5 -left-5 w-12 h-12 bg-[#2551AF] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-[#2551AF]/30 z-10 rotate-[-10deg] group-hover:rotate-0 transition-transform duration-500">
              <Quote className="w-6 h-6" />
            </div>

            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
              <a href={item.link} target="_blank" className="w-10 h-10 bg-[#2551AF]/10 rounded-full flex items-center justify-center text-[#2551AF] hover:text-[#2551AF] hover:bg-[#2551AF]/10 transition-all">
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            <div className="flex gap-1.5 mb-8">
              {Array.from({ length: item.rating }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
              ))}
            </div>

            <div className="grow">
              <p className="text-[#2551AF] font-bold text-xl leading-relaxed mb-10 italic relative">
                <span className="relative z-10">&quot;{item.text}&quot;</span>
              </p>
            </div>

            <div className="flex items-center gap-4 pt-8 border-t border-[#2551AF]/10">
              <div className="w-12 h-12 rounded-full bg-[#2551AF]/10 flex items-center justify-center text-[#2551AF] font-black text-lg shadow-inner">
                {item.author[0]}
              </div>
              <div className="text-left">
                <div className="font-black text-[#2551AF] text-lg tracking-tight leading-tight">{item.author}</div>
                <div className="text-[#2551AF] font-bold text-sm uppercase tracking-widest mt-1 opacity-70">{item.country}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
