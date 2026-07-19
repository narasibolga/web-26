import { useLocale } from "next-intl";
import { createNavigation } from "next-intl/navigation";
import { type Locale, routing } from "./routing";

export const { Link, usePathname, useRouter } = createNavigation(routing);

export function useTypedLocale(): Locale {
  return useLocale() as Locale;
}
