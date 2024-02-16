import { useState, useEffect } from "react";

interface AnimatedNumberProps {
  value: number;
}

export function useAnimatedNumber(finalValue: number, animationDuration: number = 1500): [number] {
  const [animatedValue, setAnimatedValue] = useState<number>(0);

  useEffect(() => {
    let start: number | null = null;
    let requestId: number;

    const updateNumber = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentageComplete = progress / animationDuration;

      const integerPart = Math.floor(finalValue);
      const decimalPart = finalValue - integerPart;

      const targetIntegerValue = integerPart * percentageComplete;
      const targetDecimalValue = decimalPart * percentageComplete;

      const targetValue = targetIntegerValue + targetDecimalValue;

      if (progress < animationDuration) {
        setAnimatedValue(targetValue);
        requestId = requestAnimationFrame(updateNumber);
      } else {
        setAnimatedValue(finalValue);
        cancelAnimationFrame(requestId);
      }
    };

    requestId = requestAnimationFrame(updateNumber);

    return () => cancelAnimationFrame(requestId);
  }, [finalValue]);

  return [animatedValue];
}
