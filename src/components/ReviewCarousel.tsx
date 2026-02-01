import { useRef } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StarRating } from "./StarRating";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons/UIIcons";
import { MOCK_REVIEWS } from "@/data/reviews";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    partialVisibilityGutter: 80,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    partialVisibilityGutter: 50,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    partialVisibilityGutter: 40,
    slidesToSlide: 1,
  },
};

interface ReviewCardProps {
  review: {
    id: string;
    author: string;
    rating: number;
    content: string;
    isVerified?: boolean;
  };
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white border border-black/10 rounded-[20px] p-6 md:p-7 h-[200px] mx-2 flex flex-col">
      <StarRating rating={review.rating} size="sm" showCount={false} />
      <div className="flex items-center gap-1.5 mt-3 mb-3">
        <span className="font-bold text-text-primary">{review.author}</span>
        {review.isVerified && (
          <svg
            className="w-5 h-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      <p className="text-sm text-text-secondary leading-relaxed line-clamp-4 flex-1">
        "{review.content}"
      </p>
    </div>
  );
}

export function ReviewCarousel() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const carouselRef = useRef<any>(null);

  const handleNext = () => {
    carouselRef.current?.next();
  };

  const handlePrevious = () => {
    carouselRef.current?.previous();
  };

  return (
    <section className="pt-12 md:pt-16 pb-6 md:pb-8 mt-8 md:mt-12 relative">
      <div className="max-w-[1350px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between mb-8 md:mb-10 relative">
          <h2 className="font-integral-cf text-[28px] md:text-[48px] font-black text-black leading-tight">
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors"
              aria-label="Previous"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full hover:bg-bg-secondary transition-colors"
              aria-label="Next"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="hidden md:block absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-linear-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <Carousel
          ref={carouselRef}
          responsive={responsive}
          infinite
          autoPlay={false}
          arrows={false}
          partialVisible
          renderButtonGroupOutside={false}
          containerClass=""
          itemClass="h-full"
        >
          {MOCK_REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
