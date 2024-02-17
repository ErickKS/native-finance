import { useState, useEffect } from "react";

export function useAnimatedCurrency(finalValue: number, animationDuration: number = 1500): [string] {
  const [animatedValue, setAnimatedValue] = useState<string>("");

  useEffect(() => {
    let start: number | null = null;
    let requestId: number;

    const formatUSD = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

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
        setAnimatedValue(formatUSD.format(targetValue));
        requestId = requestAnimationFrame(updateNumber);
      } else {
        setAnimatedValue(formatUSD.format(finalValue));
        cancelAnimationFrame(requestId);
      }
    };

    requestId = requestAnimationFrame(updateNumber);

    return () => cancelAnimationFrame(requestId);
  }, [finalValue, animationDuration]);

  return [animatedValue];
}
