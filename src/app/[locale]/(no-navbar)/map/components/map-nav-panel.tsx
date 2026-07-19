"use client";

import { Cancel01Icon, Menu02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MapNavPanelProps = {
  children: React.ReactNode;
};

export function MapNavPanel({ children }: MapNavPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        type="button"
        variant="tertiary"
        size="icon"
        aria-expanded={open}
        aria-label="Toggle navigation"
        onClick={() => setOpen((v) => !v)}
        className="absolute right-4 bottom-4 z-30 size-10 rounded-full bg-secondary text-secondary-foreground shadow-md lg:hidden"
      >
        <HugeiconsIcon icon={open ? Cancel01Icon : Menu02Icon} size={18} />
      </Button>
      <div
        className={cn(
          "absolute top-0 left-0 z-20 h-full w-85 max-w-[85%] overflow-hidden border-secondary-foreground/15 border-r bg-secondary text-secondary-foreground transition-transform duration-300 ease-out lg:static lg:z-auto lg:max-w-none lg:translate-x-0 lg:border-b-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {children}
      </div>
    </>
  );
}
