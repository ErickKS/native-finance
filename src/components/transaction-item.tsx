import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useCurrency } from "@/hooks/useCurrency";

interface TransactionItemProps {
  category: string;
  amount: number;
  date: Date;
}

export function TransactionItem({ category, amount, date }: TransactionItemProps) {
  const formattedExpense = useCurrency(amount);

  function getIcon(category: string) {
    const categoryIcons: { [key: string]: string } = {
      rent: "home-city-outline",
      food: "silverware-fork-knife",
      leisure: "controller-classic-outline",
      shopping: "cart-outline",
      salary: "cash",
      investment: "chart-bar-stacked",
      transfers: "transfer",
      others: "piggy-bank-outline",
    };

    return categoryIcons[category] as any;
  }

  const time = new Date(date);

  return (
    <View className="flex-row items-center mt-4 pr-4 mx-4 bg-light">
      <View className="justify-center items-center h-12 w-12 bg-dark rounded-2xl">
        <MaterialCommunityIcons name={getIcon(category)} size={20} color={"#E0DED9"} />
      </View>

      <View className="relative -top-0.5 flex-1 ml-3">
        <Text className="text-lg text-dark font-medium leading-none capitalize">{category}</Text>

        <Text className="text-sm text-dark/80 font-medium leading-none">
          {amount > 0 ? "Deposit" : "Payment"} • {time.getDate() + "/" + (time.getMonth() + 1)}
        </Text>
      </View>

      <View>
        <Text className={`text-lg font-bold ${amount > 0 ? "text-dark" : "text-primary"}`}>{formattedExpense}</Text>
      </View>
    </View>
  );
}
