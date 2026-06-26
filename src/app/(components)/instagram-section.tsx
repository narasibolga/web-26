import { ArrowRight01Icon, InstagramIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const INSTAGRAM_POST_URL = "https://www.instagram.com/p/xyz123/";

const posts = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    alt: "Pantai Sibolga",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    alt: "Pemandangan alam Sibolga",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    alt: "Keindahan alam Sumatera Utara",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    alt: "Kuliner khas Sibolga",
  },
];

export function InstagramSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1a4d3e] mb-6">
            Follow us on Instagram
          </h2>
          <p className="text-[#1a4d3e]/80 text-lg md:text-xl max-w-xl mb-10">
            Stay connected to the beauty and magic of
            <br className="hidden md:block" />
            NaraSibolga.
          </p>

          <Button
            variant="outline"
            nativeButton={false}
            className="rounded-full px-8 py-6 h-auto text-sm font-medium tracking-[0.15em] uppercase border-[#1a4d3e] text-[#1a4d3e] hover:bg-[#1a4d3e] hover:text-white transition-colors"
            render={
              <Link
                href={INSTAGRAM_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Narasibolga Instagram
            <HugeiconsIcon icon={ArrowRight01Icon} className="ml-2 size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={INSTAGRAM_POST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl md:rounded-3xl block"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute top-3 right-3 md:top-4 md:right-4 text-white/90">
                <HugeiconsIcon
                  icon={InstagramIcon}
                  className="size-6 md:size-7"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
