import { useState, useRef, useEffect } from "react";
import { ChevronRightIcon } from "./icons/UIIcons";

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
  variant?: "minimal" | "button";
}

export function SortDropdown({
  options,
  value,
  onChange,
  variant = "minimal",
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          variant === "button"
            ? "flex items-center justify-between gap-4 rounded-full border border-border bg-bg-tertiary px-6 py-3 text-sm font-medium text-text-secondary transition-all hover:border-primary focus:outline-none min-w-[140px]"
            : "flex items-center gap-1 text-sm font-medium text-text-primary focus:outline-none"
        }
      >
        <span className="truncate">
          {variant === "minimal" && (
            <span className="text-text-secondary font-normal mr-2">
              Sort by:
            </span>
          )}
          {selectedLabel}
        </span>
        <span
          className={`shrink-0 transition-transform duration-200 ${isOpen ? "-rotate-90" : "rotate-90"}`}
        >
          <ChevronRightIcon className="h-3 w-3" />
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-white py-1 shadow-lg z-20">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-bg-secondary ${
                value === option.value
                  ? "font-medium text-black"
                  : "text-text-secondary"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
