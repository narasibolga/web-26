"use client";

import { Cancel01Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useMediaQuery } from "@/hooks/use-media-query";

type MapNavPanelProps = {
  children: React.ReactNode;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  showSearch: boolean;
  snapPoint: string | number | null;
  onSnapPointChange: (snapPoint: string | number | null) => void;
};

const SNAP_POINTS = ["110px", 0.5, 1];

export function MapNavPanel({
  children,
  searchQuery,
  onSearchChange,
  showSearch,
  snapPoint,
  onSnapPointChange,
}: MapNavPanelProps) {
  const t = useTranslations("map");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const searchInput = showSearch && (
    <InputGroup className="border-border bg-white">
      <InputGroupAddon>
        <HugeiconsIcon icon={Search01Icon} className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder={t("searchPlaceholder")}
      />
      {searchQuery && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label={t("clearSearch")}
            onClick={() => onSearchChange("")}
          >
            <HugeiconsIcon icon={Cancel01Icon} />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
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
      snapPoint={snapPoint}
      onSnapPointChange={onSnapPointChange}
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
