import { Link } from "react-router-dom";

import casualImg from "@/assets/homePageBanner/browseCategory/casual.png";
import formalImg from "@/assets/homePageBanner/browseCategory/formal.png";
import partyImg from "@/assets/homePageBanner/browseCategory/party.png";
import gymImg from "@/assets/homePageBanner/browseCategory/gym.png";

const DRESS_STYLES = [
  { name: "Casual", image: casualImg, link: "/products?style=casual" },
  { name: "Formal", image: formalImg, link: "/products?style=formal" },
  { name: "Party", image: partyImg, link: "/products?style=party" },
  { name: "Gym", image: gymImg, link: "/products?style=gym" },
];

interface BrowseDressStyleProps {
  useBreakout?: boolean;
}

export function BrowseDressStyle({
  useBreakout = false,
}: BrowseDressStyleProps) {
  const content = (
    <div className="bg-[#F0F0F0] rounded-[40px] px-6 py-10 md:px-16 md:py-16">
      {/* Title */}
      <h2 className="font-integral-cf text-[28px] md:text-[48px] font-black text-center text-black mb-8 md:mb-12 leading-tight">
        BROWSE BY DRESS STYLE
      </h2>

      {/* Desktop Grid - 2 rows */}
      <div className="hidden lg:grid grid-cols-3 gap-5">
        {/* Row 1: Casual (smaller) + Formal (larger) */}
        <Link
          to={DRESS_STYLES[0].link}
          className="relative h-[289px] rounded-[20px] overflow-hidden bg-white group"
        >
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
            {DRESS_STYLES[0].name}
          </span>
          <img
            src={DRESS_STYLES[0].image}
            alt={DRESS_STYLES[0].name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <Link
          to={DRESS_STYLES[1].link}
          className="relative h-[289px] rounded-[20px] overflow-hidden bg-white group col-span-2"
        >
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
            {DRESS_STYLES[1].name}
          </span>
          <img
            src={DRESS_STYLES[1].image}
            alt={DRESS_STYLES[1].name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Row 2: Party (larger) + Gym (smaller) */}
        <Link
          to={DRESS_STYLES[2].link}
          className="relative h-[289px] rounded-[20px] overflow-hidden bg-white group col-span-2"
        >
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
            {DRESS_STYLES[2].name}
          </span>
          <img
            src={DRESS_STYLES[2].image}
            alt={DRESS_STYLES[2].name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <Link
          to={DRESS_STYLES[3].link}
          className="relative h-[289px] rounded-[20px] overflow-hidden bg-white group"
        >
          <span className="absolute top-6 left-6 text-2xl font-bold text-black z-10">
            {DRESS_STYLES[3].name}
          </span>
          <img
            src={DRESS_STYLES[3].image}
            alt={DRESS_STYLES[3].name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Mobile Grid - Single column */}
      <div className="lg:hidden flex flex-col gap-4">
        {DRESS_STYLES.map((style) => (
          <Link
            key={style.name}
            to={style.link}
            className="relative h-[190px] rounded-[20px] overflow-hidden bg-white group"
          >
            <span className="absolute top-5 left-5 text-xl font-bold text-black z-10">
              {style.name}
            </span>
            <img
              src={style.image}
              alt={style.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        ))}
      </div>
    </div>
  );

  if (useBreakout) {
    return (
      <section className="py-4 md:py-0 w-screen relative left-[50%] -translate-x-[50%]">
        <div className="max-w-[1640px] mx-auto px-4 lg:px-8 mt-10 mb-10">
          {content}
        </div>
      </section>
    );
  }

  return <section className="py-4 md:py-0">{content}</section>;
}
