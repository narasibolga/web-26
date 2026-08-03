import {
  CustomerService01Icon,
  Hospital01Icon,
  PoliceStationIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type UsefulContactsSectionProps = { locale: string };
type Contact = {
  name: string;
  number: string;
  href: string;
  action: "call" | "message";
  kind: "police" | "hospital" | "tourism";
};

const contactIcons = {
  police: PoliceStationIcon,
  hospital: Hospital01Icon,
  tourism: CustomerService01Icon,
};

export async function UsefulContactsSection({
  locale,
}: UsefulContactsSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const contacts = t.raw("contacts.items") as Contact[];

  return (
    <Section
      className="bg-primary text-primary-foreground"
      containerClassName="gap-12 md:gap-16"
    >
      <div className="grid gap-6 md:grid-cols-[1fr_1.1fr] md:items-end">
        <SectionHeading className="max-w-2xl text-balance">
          {t("contacts.heading")}
        </SectionHeading>
        <p className="max-w-xl text-pretty text-primary-foreground/70 leading-7 md:justify-self-end">
          {t("contacts.description")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {contacts.map((contact) => (
          <article
            key={`${contact.name}-${contact.number}`}
            className="flex min-h-52 flex-col rounded-3xl bg-primary-foreground p-6 text-foreground sm:p-8"
          >
            <HugeiconsIcon
              icon={contactIcons[contact.kind]}
              className="size-8"
              strokeWidth={1.2}
            />
            <h3 className="mt-8 font-heading text-sm uppercase">
              {contact.name}
            </h3>
            <p className="mt-2 font-serif text-3xl leading-tight">
              {contact.number}
            </p>
            <a
              href={contact.href}
              className={cn(
                buttonVariants({ variant: "outline-foreground", size: "sm" }),
                "mt-6 w-fit",
              )}
            >
              {t(`contacts.${contact.action}`)}
            </a>
          </article>
        ))}
      </div>

      <p className="max-w-3xl text-primary-foreground/65 text-sm leading-6">
        {t("contacts.disclaimer")}
      </p>
    </Section>
  );
}
