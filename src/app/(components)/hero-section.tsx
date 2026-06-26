export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col py-16 justify-end">
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero content */}
      <h1 className="font-serif text-shadow-2xs mt-auto text-white z-10 text-center text-5xl">
        Discover the magic of Sibolga.
      </h1>
    </section>
  );
}
