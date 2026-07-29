import { HugeiconsIcon } from "@hugeicons/react";
import {
  categoryColor,
  categoryIcon,
  type LocationCategory,
} from "@/lib/locations";
import { cn } from "@/lib/utils";

type LocationImagePlaceholderProps = {
  category: LocationCategory;
  name: string;
  className?: string;
};

export function LocationImagePlaceholder({
  category,
  name,
  className,
}: LocationImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={name}
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-muted",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(145deg, color-mix(in oklch, ${categoryColor[category]} 28%, transparent), transparent 70%)`,
      }}
    >
      <span
        aria-hidden="true"
        className="flex size-20 items-center justify-center rounded-full border border-background/60 bg-background/85 shadow-sm"
        style={{ color: categoryColor[category] }}
      >
        <HugeiconsIcon
          icon={categoryIcon[category]}
          size={36}
          strokeWidth={1.5}
        />
      </span>
    </div>
  );
}
