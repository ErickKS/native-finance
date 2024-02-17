import { Text, View } from "react-native";

import { useAnimatedCurrency } from "@/hooks/useAnimatedCurrency";

import { Nav } from "@/components/nav";

import { shadow } from "@/constants/styles";
import { TransactionItem } from "@/components/transaction-item";
import { AnalyticsSection } from "@/components/analytics-section";
import { Feather } from "@expo/vector-icons";

export default function Home() {
  const balance = 1203.32;
  const [animatedValue] = useAnimatedCurrency(balance);

  return (
    <View className="flex-1 px-4">
      <View className="flex-row justify-between items-center mt-5">
        <View style={shadow} className="flex-row items-center h-12 pr-3 bg-gray rounded-2xl">
          <View className="h-12 w-12 rounded-2xl border-2 border-dark bg-gray/80" />

          <Text className="ml-3 mr-1 text-base text-dark font-medium">Hello, Erick</Text>
          <Text className="text-base"> 👋</Text>
        </View>
      </View>

      <View className="mt-8 space-y-2">
        <Text className="text-xl text-dark/80 font-medium">Total Balance</Text>
        <Text className="text-4xl text-dark font-semibold">{animatedValue}</Text>
      </View>

      <AnalyticsSection />

      <View className="mt-8">
        <Text className="text-lg text-dark font-semibold">Last Transactions</Text>

        <View>
          <TransactionItem name="food" value={-200} />
          <TransactionItem name="pix" value={150} />
        </View>
      </View>

      <View className="absolute -right-10 top-0 -rotate-[30deg]">
        <Feather name="dollar-sign" size={160} color={"#c4c2be"} />
      </View>

      <Nav />
    </View>
  );
}
