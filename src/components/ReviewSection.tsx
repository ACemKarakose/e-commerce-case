import { useState } from "react";
import { ReviewCard, type Review } from "./ReviewCard";
import { FilterIcon } from "./icons";
import { SortDropdown } from "./SortDropdown";

interface ReviewSectionProps {
  reviews: Review[];
  totalReviews: number;
}

type SortOption = "latest" | "rating-high" | "rating-low";

const SORT_OPTIONS = [
  { label: "Latest", value: "latest" },
  { label: "Highest Rating", value: "rating-high" },
  { label: "Lowest Rating", value: "rating-low" },
];

export function ReviewSection({ reviews, totalReviews }: ReviewSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [visibleCount, setVisibleCount] = useState(6);

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const visibleReviews = sortedReviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-text-primary">
          All Reviews{" "}
          <span className="font-normal text-text-muted">({totalReviews})</span>
        </h3>

        <div className="flex items-center gap-3">
          {/* Filter Button (Desktop Only) */}
          <button className="hidden h-12 w-12 items-center justify-center rounded-full bg-bg-secondary text-text-primary transition-colors hover:bg-bg-tertiary md:flex">
            <FilterIcon className="h-6 w-6" />
          </button>

          {/* Sort Dropdown */}
          <div className="hidden md:block">
            <SortDropdown
              options={SORT_OPTIONS}
              value={sortBy}
              onChange={(value) => setSortBy(value as SortOption)}
              variant="button"
            />
          </div>

          {/* Write Review Button */}
          <button className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-text-white transition-colors hover:bg-primary-hover">
            Write a Review
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-5 md:grid-cols-2">
        {visibleReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="rounded-full border border-border-light bg-bg-primary px-10 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-primary "
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}
