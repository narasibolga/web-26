import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background gap-1 text-center">
      <h1 className="font-serif text-5xl leading-tight tracking-tight text-foreground">
        Lost in the wild.
      </h1>

      <p className="max-w-md text-foreground/70">
        This path doesn&apos;t lead anywhere… yet.
      </p>

      <Button
        variant="secondary"
        className="rounded-full px-8 text-sm font-medium tracking-wide uppercase border-0 mt-6"
      >
        <Link href="/">Back to home</Link>
      </Button>
    </main>
  );
}
