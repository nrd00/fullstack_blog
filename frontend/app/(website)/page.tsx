import FeatureCategory from "@/components/FeatureCategory";
import FeaturePost from "@/components/FeaturePost";
import Hero from "@/components/Hero";
import ContactPage from "@/components/Contact";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <FeaturePost />
        <FeatureCategory />
        <ContactPage />
      </main>
    </>
  );
}
