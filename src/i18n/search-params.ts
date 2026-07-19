"use client";

import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "./navigation";

export function useUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return function updateSearchParams(
    mutate: (params: URLSearchParams) => void,
  ) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };
}
