import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export type AdventureCardProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  href: React.ComponentProps<typeof Link>["href"];
  exploreLabel: string;
};

export function AdventureCard({
  title,
  imageSrc,
  imageAlt,
  href,
  exploreLabel,
}: AdventureCardProps) {
  return (
    <article className="flex flex-col gap-5">
      <div className="relative h-72 overflow-hidden rounded-2xl md:h-96 lg:h-[28rem]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      <div className="flex flex-col justify-between gap-4">
        <h3 className="truncate font-serif text-2xl text-primary-foreground">
          {title}
        </h3>

        <Button
          variant="outline"
          nativeButton={false}
          className="w-fit px-5"
          render={<Link href={href} />}
        >
          {exploreLabel}
        </Button>
      </div>
    </article>
  );
}
