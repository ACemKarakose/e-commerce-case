import { useState } from "react";
import { CloseIcon } from "./icons";

export function Announcement() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative flex w-full items-center justify-center bg-primary px-4 py-2 text-sm font-medium text-text-white sm:px-6 lg:px-8">
      <p className="text-center font-light">
        Sign up and get 20% off to your first order.{" "}
        <span className="cursor-pointer font-bold underline transition-colors hover:text-gray-300">
          Sign Up Now
        </span>
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="hidden md:inline-flex absolute right-4 p-1 text-text-white transition-colors hover:text-gray-300 sm:right-6 lg:right-8"
        aria-label="Close announcement"
      >
        <CloseIcon />
      </button>
    </div>
  );
}
