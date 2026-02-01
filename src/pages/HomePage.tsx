import { HomeBanner } from "@/components/HomeBanner";
import { ProductSection, BrowseDressStyle, ReviewCarousel } from "@/components";

export function HomePage() {
  return (
    <div>
      {/* Hero Banner - Full Width */}
      <div
        className="w-screen -mt-8"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <HomeBanner />
      </div>

      {/* Product Sections */}
      <ProductSection
        title="NEW ARRIVALS"
        category="men's clothing"
        limit={4}
        useBreakout
      />

      {/* Wider Sections Container (Handled internally by components via useBreakout) */}
      <ProductSection
        title="TOP SELLING"
        category="women's clothing"
        limit={4}
        useBreakout
      />

      {/* Browse by Dress Style */}
      <BrowseDressStyle useBreakout />

      {/* Customer Reviews Carousel - Full Width with Overflow */}
      <div
        className="w-screen overflow-hidden"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
        }}
      >
        <ReviewCarousel />
      </div>
    </div>
  );
}
