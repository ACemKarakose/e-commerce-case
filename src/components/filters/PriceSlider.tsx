import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useState, useEffect } from "react";
import "./PriceSlider.css"; // We'll create this or use styled-components/inline styles

interface PriceSliderProps {
  min: number;
  max: number;
  initialValue?: [number, number];
  onChange?: (range: [number, number]) => void;
}

export function PriceSlider({
  min,
  max,
  initialValue,
  onChange,
}: PriceSliderProps) {
  const [value, setValue] = useState<[number, number]>(
    initialValue || [min, max],
  );

  useEffect(() => {
    // Reset value to min/max range when min or max props change
    // eslint-disable-next-line
    setValue([min, max]);
  }, [min, max]);

  const handleSliderChange = (val: number | number[]) => {
    if (Array.isArray(val)) {
      setValue(val as [number, number]);
      onChange?.(val as [number, number]);
    }
  };

  return (
    <div className="px-2 pb-6 pt-2">
      <Slider
        range
        min={min}
        max={max}
        value={value}
        onChange={handleSliderChange}
        trackStyle={[{ backgroundColor: "black", height: 6 }]}
        handleStyle={[
          {
            backgroundColor: "black",
            borderColor: "black",
            height: 20,
            width: 20,
            marginTop: -7,
            opacity: 1,
            border: "none",
            boxShadow: "none",
          },
          {
            backgroundColor: "black",
            borderColor: "black",
            height: 20,
            width: 20,
            marginTop: -7,
            opacity: 1,
            border: "none",
            boxShadow: "none",
          },
        ]}
        railStyle={{ backgroundColor: "#F0F0F0", height: 6 }}
      />
      <div className="mt-4 flex items-center justify-between text-sm font-bold text-text-primary">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}
