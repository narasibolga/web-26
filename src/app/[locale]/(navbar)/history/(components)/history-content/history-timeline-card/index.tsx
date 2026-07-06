"use client";

import { motion } from "motion/react";
import Image from "next/image";

type Props = {
  era: {
    key: string;
    year: string;
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    attribution: string;
  };
};

export function HistoryTimelineCard({ era }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="rounded-xl bg-white p-6 shadow-sm md:p-8"
    >
      <div className="flex items-end justify-between gap-4 border-border border-b pb-4">
        <h3 className="max-w-1/2 text-pretty font-serif text-2xl text-primary">{era.title}</h3>
        <span className="font-serif text-4xl text-primary md:text-5xl">
          {era.year}
        </span>
      </div>

      <p className="mt-4 text-foreground text-sm leading-relaxed">
        {era.description}
      </p>

      <div className="relative mt-6 aspect-4/3 w-full overflow-hidden rounded-lg">
        <Image
          src={era.image}
          alt={era.imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 40vw"
        />
      </div>

      <p className="mt-2 text-center text-muted-foreground text-xs">
        {era.attribution}
      </p>
    </motion.div>
  );
}
