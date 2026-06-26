import { Hero } from "./(components)/hero-section";
import { InstagramSection } from "./(components)/instagram-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <InstagramSection />
    </div>
  );
}
