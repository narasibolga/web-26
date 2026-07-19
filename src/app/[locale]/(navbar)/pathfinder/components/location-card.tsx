"use client";

import { ExternalLinkIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Link, useTypedLocale } from "@/i18n/navigation";
import { locations } from "@/lib/locations";
import type { ScoredLocation } from "@/lib/pathfinder";

export function PathfinderLocationCard({ result }: { result: ScoredLocation }) {
  const locale = useTypedLocale();

  const location = locations.find((l) => l.id === result.locationId);
  if (!location) return null;

  return (
    <Link
      href={`/map?location=${result.locationId}`}
      className="group hover:-translate-y-2 flex flex-col border border-border bg-background transition-all hover:rotate-1 hover:bg-white"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden">
        <Image
          src={location.images[0]}
          alt={location.name[locale]}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <h4 className="line-clamp-1 text-foreground uppercase">
          {location.name[locale]}
        </h4>
        <HugeiconsIcon
          icon={ExternalLinkIcon}
          size={16}
          className="text-foreground transition-colors"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
