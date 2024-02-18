import { Text } from "react-native";
import { useAnimatedCurrency } from "@/hooks/useAnimatedCurrency";

interface BalanceProps {
  total: number;
}

export function Balance({ total }: BalanceProps) {
  const [animatedValue] = useAnimatedCurrency(total);

  return (
    <>
      <Text className="text-xl text-dark/80 font-medium">Total Balance</Text>
      <Text className="mt-2 text-4xl text-dark font-semibold">{animatedValue}</Text>
    </>
  );
}
