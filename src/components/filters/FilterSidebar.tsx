import { useState } from "react";
import { useFilterStore } from "@/store";
import { PriceSlider } from "./PriceSlider";
import { ChevronUpIcon, ChevronRightIcon, CheckIcon } from "../icons/UIIcons";

// Mock Data for Filters
const CATEGORIES = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];
const COLORS = [
  { name: "Green", value: "#00C12B" },
  { name: "Red", value: "#F50606" },
  { name: "Yellow", value: "#F5DD06" },
  { name: "Orange", value: "#F57906" },
  { name: "Blue", value: "#06CAF5" },
  { name: "Navy", value: "#063AF5" },
  { name: "Purple", value: "#7D06F5" },
  { name: "Pink", value: "#F506A4" },
  { name: "White", value: "#FFFFFF", border: true },
  { name: "Black", value: "#000000" },
];
const SIZES = [
  "XX-Small",
  "X-Small",
  "Small",
  "Medium",
  "Large",
  "X-Large",
  "XX-Large",
  "3X-Large",
  "4X-Large",
];
const STYLES = ["Casual", "Formal", "Party", "Gym"];

export function FilterSidebar() {
  const { setPriceRange } = useFilterStore();
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    0, 1000,
  ]);
  const [selectedColor, setSelectedColor] = useState("Green");
  const [selectedSize, setSelectedSize] = useState("Large");

  // Accordion State
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    colors: true,
    size: true,
    style: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-[20px] border border-border px-6 py-5">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <h3 className="text-xl font-bold text-text-primary">Filters</h3>
        <button className="text-text-muted hover:text-text-primary">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        </button>
      </div>

      {/* Categories */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("categories")}
          className="mb-4 flex w-full items-center justify-between"
        >
          <h4 className="text-lg font-bold text-text-primary">Categories</h4>
          <span
            className={`transition-transform duration-200 ${openSections.categories ? "rotate-180" : ""}`}
          >
            <ChevronUpIcon />
          </span>
        </button>
        {openSections.categories && (
          <div className="space-y-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                className="flex w-full items-center justify-between text-sm text-text-secondary hover:text-text-primary"
              >
                <span>{category}</span>
                <span className="text-text-muted">
                  <ChevronRightIcon />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price Slider */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("price")}
          className="mb-4 flex w-full items-center justify-between"
        >
          <h4 className="text-lg font-bold text-text-primary">Price</h4>
          <span
            className={`transition-transform duration-200 ${openSections.price ? "rotate-180" : ""}`}
          >
            <ChevronUpIcon />
          </span>
        </button>
        {openSections.price && (
          <div className="px-2">
            <PriceSlider
              min={0}
              max={1000}
              onChange={(range) => setLocalPriceRange(range)}
            />
          </div>
        )}
      </div>

      {/* Colors */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("colors")}
          className="mb-4 flex w-full items-center justify-between"
        >
          <h4 className="text-lg font-bold text-text-primary">Colors</h4>
          <span
            className={`transition-transform duration-200 ${openSections.colors ? "rotate-180" : ""}`}
          >
            <ChevronUpIcon />
          </span>
        </button>
        {openSections.colors && (
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color.name)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all ${
                  selectedColor === color.name
                    ? "border-transparent ring-1 ring-black ring-offset-1"
                    : "border-transparent hover:ring-1 hover:ring-black/20 hover:ring-offset-1"
                } ${color.border ? "border-border" : ""}`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              >
                {selectedColor === color.name && (
                  <CheckIcon
                    className={
                      color.name === "White" ? "text-black" : "text-white"
                    }
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Size */}
      <div className="border-b border-border pb-6">
        <button
          onClick={() => toggleSection("size")}
          className="mb-4 flex w-full items-center justify-between"
        >
          <h4 className="text-lg font-bold text-text-primary">Size</h4>
          <span
            className={`transition-transform duration-200 ${openSections.size ? "rotate-180" : ""}`}
          >
            <ChevronUpIcon />
          </span>
        </button>
        {openSections.size && (
          <div className="flex flex-wrap gap-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "bg-bg-secondary text-text-secondary hover:bg-bg-tertiary hover:text-text-primary"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dress Style */}
      <div className="space-y-4 pb-6">
        <button
          onClick={() => toggleSection("style")}
          className="mb-2 flex w-full items-center justify-between"
        >
          <h4 className="text-lg font-bold text-text-primary">Dress Style</h4>
          <span
            className={`transition-transform duration-200 ${openSections.style ? "rotate-180" : ""}`}
          >
            <ChevronUpIcon />
          </span>
        </button>
        {openSections.style && (
          <div className="space-y-3">
            {STYLES.map((style) => (
              <button
                key={style}
                className="flex w-full items-center justify-between text-text-secondary text-sm hover:text-text-primary"
              >
                <span>{style}</span>
                <span className="text-text-muted">
                  <ChevronRightIcon />
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Apply Button */}
      <button
        onClick={() => setPriceRange(localPriceRange)}
        className="w-full rounded-full cursor-pointer bg-black py-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        Apply Filter
      </button>
    </div>
  );
}
