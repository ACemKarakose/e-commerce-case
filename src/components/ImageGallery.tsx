import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // If only one image, duplicate it for gallery effect
  const displayImages = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <div className="flex h-auto flex-col-reverse gap-4 md:h-full md:min-h-[450px] md:flex-row">
      {/* Thumbnails */}
      <div className="flex flex-row md:flex-col h-20 md:h-full justify-between gap-3 w-full md:w-24 shrink-0">
        {displayImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative flex-1 overflow-hidden rounded-xl border-2 bg-bg-tertiary p-2 transition-all ${
              selectedIndex === index
                ? "border-primary"
                : "border-transparent hover:border-border"
            }`}
          >
            <img
              src={image}
              alt={`${alt} ${index + 1}`}
              className="h-full w-full object-contain"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 overflow-hidden rounded-2xl bg-bg-tertiary p-4 md:p-8 h-[350px] md:h-full flex items-center justify-center">
        <img
          src={displayImages[selectedIndex]}
          alt={alt}
          className="h-full w-full object-contain transition-all duration-300"
        />
      </div>
    </div>
  );
}
