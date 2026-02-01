import { Link } from "react-router-dom";
import peopleBanner from "@/assets/homePageBanner/peopleBanner.png";
import peopleBannerMobile from "@/assets/homePageBanner/peopleBannerMobile.png";
import starIcon from "@/assets/homePageBanner/starIcon.png";
import versaceLogo from "@/assets/homePageBanner/brands/versace.png";
import zaraLogo from "@/assets/homePageBanner/brands/zara.png";
import gucciLogo from "@/assets/homePageBanner/brands/gucci.png";
import pradaLogo from "@/assets/homePageBanner/brands/prada.png";
import calvinKleinLogo from "@/assets/homePageBanner/brands/calvinKlein.png";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "200+", label: "International Brands" },
  { value: "2,000+", label: "High-Quality Products" },
  { value: "30,000+", label: "Happy Customers" },
];

const brands = [
  { name: "Versace", logo: versaceLogo },
  { name: "Zara", logo: zaraLogo },
  { name: "Gucci", logo: gucciLogo },
  { name: "Prada", logo: pradaLogo },
  { name: "Calvin Klein", logo: calvinKleinLogo },
];

export function HomeBanner() {
  return (
    <div className="w-full">
      {/* Main Hero Section */}
      <section className="relative bg-[#F2F0F1] overflow-hidden">
        {/* Desktop Layout */}
        <div
          className="hidden lg:block min-h-[600px] bg-no-repeat bg-bottom-right bg-contain"
          style={{ backgroundImage: `url(${peopleBanner})` }}
        >
          {/* Decorative Stars - Desktop */}
          <img
            src={starIcon}
            alt=""
            className="absolute top-[40%] right-[40%] w-10 z-20"
          />
          <img
            src={starIcon}
            alt=""
            className="absolute top-[8%] right-[10%] w-16 z-20"
          />

          {/* Desktop Content */}
          <div className="relative z-10 flex w-full h-full">
            <div className="flex-1 max-w-[55%] px-16 xl:px-24 py-16 flex flex-col justify-center">
              <h1 className="font-integral-cf text-[56px] xl:text-[64px] font-bold leading-[1.15] text-black mb-5">
                FIND CLOTHES
                <br />
                THAT MATCHES
                <br />
                YOUR STYLE
              </h1>
              <p className="text-base text-black/60 max-w-[500px] mb-8 leading-relaxed">
                Browse through our diverse range of meticulously crafted
                garments, designed to bring out your individuality and cater to
                your sense of style.
              </p>
              <Link
                to="/products"
                className="inline-block bg-black text-white px-12 py-3.5 rounded-full font-medium text-sm hover:bg-black/90 transition-colors w-fit"
              >
                Shop Now
              </Link>

              {/* Stats - Desktop horizontal */}
              <div className="flex items-start gap-0 mt-10">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={`flex flex-col ${
                      index !== stats.length - 1
                        ? "pr-8 mr-8 border-r border-black/10"
                        : ""
                    }`}
                  >
                    <span className="text-[32px] font-bold text-black leading-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs text-black/60 whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden overflow-hidden">
          {/* Content */}
          <div className="px-4 pt-10 pb-6 relative">
            {/* Star icon - positioned at top right of content */}
            <img
              src={starIcon}
              alt=""
              className="absolute top-full right-[10%] w-6 z-20"
            />
            <img
              src={starIcon}
              alt=""
              className="absolute top-[120%] right-[80%] w-6 z-20"
            />
            <h1 className="font-integral-cf text-[32px] md:text-[40px] font-black leading-[1.15] text-black mb-3 pr-8">
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </h1>
            <p className="text-sm text-black/60 mb-5 leading-relaxed">
              Browse through our diverse range of meticulously crafted garments,
              designed to bring out your individuality and cater to your sense
              of style.
            </p>

            {/* Centered Shop Now button */}
            <div className="flex justify-center mb-6">
              <Link
                to="/products"
                className="bg-black w-full text-center  text-white py-4 px-16 rounded-full font-medium text-sm hover:bg-black/90 transition-colors"
              >
                Shop Now
              </Link>
            </div>

            {/* Stats - 2 rows: first row 2 items, second row 1 centered */}
            <div className="flex flex-col items-center">
              {/* First row: 200+ and 2,000+ */}
              <div className="flex justify-center">
                <div className="flex flex-col items-center px-6 border-r border-black/10">
                  <span className="text-2xl font-bold text-black">
                    {stats[0].value}
                  </span>
                  <span className="text-[10px] text-black/60">
                    {stats[0].label}
                  </span>
                </div>
                <div className="flex flex-col items-center px-6">
                  <span className="text-2xl font-bold text-black">
                    {stats[1].value}
                  </span>
                  <span className="text-[10px] text-black/60">
                    {stats[1].label}
                  </span>
                </div>
              </div>
              {/* Second row: 30,000+ centered */}
              <div className="flex flex-col items-center mt-3">
                <span className="text-2xl font-bold text-black">
                  {stats[2].value}
                </span>
                <span className="text-[10px] text-black/60">
                  {stats[2].label}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Image */}
          <img
            src={peopleBannerMobile}
            alt="Fashion models"
            className="w-full h-auto"
          />
        </div>
      </section>

      {/* Brands Section */}
      <section className="bg-black py-5 lg:py-7">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 lg:px-16">
          {/* Mobile: 2 rows */}
          <div className="lg:hidden flex flex-col gap-5">
            <div className="flex items-center justify-center gap-7">
              {brands.slice(0, 3).map((brand) => (
                <img
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  className="h-[22px] object-contain brightness-0 invert"
                />
              ))}
            </div>
            <div className="flex items-center justify-center gap-10">
              {brands.slice(3).map((brand) => (
                <img
                  key={brand.name}
                  src={brand.logo}
                  alt={brand.name}
                  className="h-[22px] object-contain brightness-0 invert"
                />
              ))}
            </div>
          </div>
          {/* Desktop: Single row */}
          <div className="hidden lg:flex items-center justify-between gap-8">
            {brands.map((brand) => (
              <img
                key={brand.name}
                src={brand.logo}
                alt={brand.name}
                className="h-8 object-contain brightness-0 invert"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
