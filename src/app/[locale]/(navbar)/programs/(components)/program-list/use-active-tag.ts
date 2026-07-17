import { useSearchParams } from "next/navigation";

export function useActiveTag(): string {
  const searchParams = useSearchParams();
  return searchParams.get("tag") ?? "all";
}
