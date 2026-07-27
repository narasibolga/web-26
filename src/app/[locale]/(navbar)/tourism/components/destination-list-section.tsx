import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Section } from "../../../(components)/_primitives/section";
import { destinationImageSources } from "../tourism-images";

type DestinationListSectionProps = {
  locale: string;
};

type Destination = {
  name: string;
  label: string;
  alt: string;
  description: string;
};

export async function DestinationListSection({
  locale,
}: DestinationListSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const destinations = t.raw("destinations.items") as Destination[];

  return (
    <Section containerClassName="max-w-none gap-0 p-0 md:px-0">
      {destinations.map((destination, index) => (
        <article
          key={destination.name}
          className="grid min-h-[50vh] md:grid-cols-2"
        >
          <div
            className={cn(
              "relative min-h-[50vh]",
              index % 2 === 1 && "md:order-2",
            )}
          >
            <Image
              src={destinationImageSources[index]}
              alt={destination.alt}
              fill
              sizes="100%"
              className="object-cover"
            />
          </div>

          <div
            className={cn(
              "flex flex-col items-center justify-center gap-3 px-6 py-20 text-center md:px-16",
              index === 1
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground",
            )}
          >
            <p className={cn("text-primary-foreground text-sm uppercase")}>
              {destination.label}
            </p>
            <h3 className="font-serif text-4xl tracking-tighter md:text-5xl">
              {destination.name}
            </h3>
            <p className={cn("max-w-md text-primary-foreground/75")}>
              {destination.description}
            </p>
          </div>
        </article>
      ))}
    </Section>
  );
}
