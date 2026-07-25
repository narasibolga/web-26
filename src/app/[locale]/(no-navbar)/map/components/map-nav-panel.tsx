"use client";

import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/hooks/use-media-query";

type MapNavPanelProps = {
  children: React.ReactNode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showSearch: boolean;
};

const SNAP_POINTS = ["110px", 0.5, 1];

export function MapNavPanel({
  children,
  searchQuery,
  onSearchChange,
  showSearch,
}: MapNavPanelProps) {
  const t = useTranslations("map");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const searchInput = showSearch && (
    <div className="relative">
      <HugeiconsIcon
        icon={Search01Icon}
        size={16}
        className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 text-muted-foreground"
      />
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
        className="h-10 rounded-xl border-border bg-muted pr-9 pl-9 text-foreground placeholder:text-muted-foreground"
      />
      {searchQuery && (
        <button
          type="button"
          aria-label={t("clearSearch")}
          onClick={() => onSearchChange("")}
          className="-translate-y-1/2 absolute top-1/2 right-2 rounded-full p-1 text-muted-foreground hover:bg-muted-foreground/20"
        >
          <HugeiconsIcon icon={Cancel01Icon} size={14} />
        </button>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <div className="pointer-events-none absolute top-16 bottom-4 left-4 z-20 w-[360px]">
        <div className="pointer-events-auto flex h-full max-h-[calc(100dvh-5rem)] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-md">
          {searchInput && (
            <div className="shrink-0 p-4 pb-2">{searchInput}</div>
          )}
          <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    );
  }

  return (
    <Drawer
      defaultOpen
      onOpenChange={(next, eventDetails) => {
        if (!next) {
          eventDetails.cancel();
        }
      }}
      swipeDirection="down"
      snapPoints={SNAP_POINTS}
      showSwipeHandle
      modal={false}
    >
      <DrawerContent
        className="border-border bg-background text-foreground"
        dragArea={
          searchInput ? (
            <DrawerHeader className="pb-2 text-left">
              {searchInput}
            </DrawerHeader>
          ) : (
            <div className="h-2" />
          )
        }
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
