import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

interface TransactionItemProps {
  name: string;
  value: number;
}

export function TransactionItem({ name, value }: TransactionItemProps) {
  const formatUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <View className="flex-row items-center mt-4">
      <View className="justify-center items-center h-12 w-12 bg-dark rounded-2xl">
        <Feather name="dollar-sign" size={20} color={"#E0DED9"} />
      </View>

      <View className="relative -top-0.5 flex-1 ml-3">
        <Text className="text-lg text-dark font-medium leading-none capitalize">{name}</Text>

        <Text className="text-sm text-dark/80 font-medium leading-none">{value > 0 ? "Deposit" : "Payment"}</Text>
      </View>

      <View>
        <Text className={`text-lg font-bold ${value > 0 ? "text-dark" : "text-dark/80"}`}>{formatUSD.format(value)}</Text>
      </View>
    </View>
  );
}
