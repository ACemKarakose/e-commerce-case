import { StarRating } from "./StarRating";

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
  isVerified?: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="rounded-2xl border border-border-light bg-bg-primary p-6">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between">
        <StarRating rating={review.rating} showCount={false} size="sm" />
        <button className="text-text-muted hover:text-text-secondary">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>

      {/* Author */}
      <div className="mb-3 flex items-center gap-2">
        <span className="font-semibold text-text-primary">{review.author}</span>
        {review.isVerified && (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-text-white">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        )}
      </div>

      {/* Content */}
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">
        "{review.content}"
      </p>

      {/* Date */}
      <p className="text-xs text-text-muted">Posted on {review.date}</p>
    </div>
  );
}
