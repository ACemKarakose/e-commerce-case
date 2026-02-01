import { useRef, useEffect, useState } from "react";
import { useFilterStore } from "@/store";
import { PriceSlider } from "./PriceSlider";
import {
  CloseIcon,
  ChevronRightIcon,
  CheckIcon,
  ChevronUpIcon,
} from "../icons/UIIcons";

// Mock Data for Filters (Same as Desktop)
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

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
}: MobileFilterDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { setPriceRange } = useFilterStore();
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    50, 200,
  ]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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

  const handleApply = () => {
    setPriceRange(localPriceRange);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-end bg-black/50 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        ref={drawerRef}
        className={`relative w-full rounded-t-[20px] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } max-h-[85vh] flex flex-col mt-20`}
      >
        <div className="flex items-center justify-between border-b border-border p-6 shrink-0">
          <h2 className="text-xl font-bold text-text-primary">Filters</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-muted transition-colors hover:bg-bg-secondary hover:text-text-primary"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col gap-6">
            {/* Categories */}
            <div className="border-b border-border pb-6">
              <button
                onClick={() => toggleSection("categories")}
                className="mb-4 flex w-full items-center justify-between"
              >
                <h4 className="text-lg font-bold text-text-primary">
                  Categories
                </h4>
                <span
                  className={`transition-transform duration-200 ${
                    openSections.categories ? "rotate-180" : ""
                  }`}
                >
                  <ChevronUpIcon />
                </span>
              </button>

              {openSections.categories && (
                <div className="space-y-3">
                  {CATEGORIES.map((category) => (
                    <button
                      key={category}
                      className="flex w-full items-center justify-between text-text-secondary hover:text-text-primary"
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

            {/* Price */}
            <div className="border-b border-border pb-6">
              <button
                onClick={() => toggleSection("price")}
                className="mb-4 flex w-full items-center justify-between"
              >
                <h4 className="text-lg font-bold text-text-primary">Price</h4>
                <span
                  className={`transition-transform duration-200 ${
                    openSections.price ? "rotate-180" : ""
                  }`}
                >
                  <ChevronUpIcon />
                </span>
              </button>
              {openSections.price && (
                <div className="px-2">
                  <PriceSlider
                    min={0}
                    max={400}
                    initialValue={[50, 200]}
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
                  className={`transition-transform duration-200 ${
                    openSections.colors ? "rotate-180" : ""
                  }`}
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
                  className={`transition-transform duration-200 ${
                    openSections.size ? "rotate-180" : ""
                  }`}
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

            {/* Style */}
            <div className="space-y-4 pb-6">
              <button
                onClick={() => toggleSection("style")}
                className="mb-2 flex w-full items-center justify-between"
              >
                <h4 className="text-lg font-bold text-text-primary">
                  Dress Style
                </h4>
                <span
                  className={`transition-transform duration-200 ${
                    openSections.style ? "rotate-180" : ""
                  }`}
                >
                  <ChevronUpIcon />
                </span>
              </button>
              {openSections.style && (
                <div className="space-y-3">
                  {STYLES.map((style) => (
                    <button
                      key={style}
                      className="flex w-full items-center justify-between text-text-secondary hover:text-text-primary"
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
          </div>
        </div>

        <div className="p-4 border-t border-border shrink-0">
          <button
            onClick={handleApply}
            className="w-full rounded-full bg-black py-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
