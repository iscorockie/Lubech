"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({
  value,
  duration = 2000,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  // Extract numeric value from string (handles "30+", "100%", etc.)
  const getNumericValue = (val: string): number => {
    const numStr = val.replace(/[^0-9.]/g, "");
    return parseFloat(numStr) || 0;
  };

  const numericValue = getNumericValue(value);
  const isPercentage = value.includes("%");
  const hasPlus = value.includes("+");

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      const startTime = Date.now();
      const startValue = 0;

      const animate = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue =
          startValue + (numericValue - startValue) * easeOutQuart;

        setCount(currentValue);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(numericValue);
        }
      };

      animate();
    }
  }, [isInView, numericValue, duration]);

  const formatValue = (num: number): string => {
    if (isPercentage) {
      return Math.round(num).toString() + "%";
    }
    if (hasPlus) {
      return Math.round(num).toString() + "+";
    }
    return Math.round(num).toString();
  };

  return (
    <span ref={ref} className="font-numeric">
      {prefix}
      {isInView ? formatValue(count) : "0"}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
