import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Chart } from "./chart";

interface AnalyticsSectionProps {
  expense: number;
  income: number;
}

export function AnalyticsSection({ expense, income }: AnalyticsSectionProps) {
  const formatUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <View className="mt-7">
      <View className="flex-row">
        <Text className="text-lg text-dark font-semibold">Analytics</Text>

        <View className="items-center justify-center h-6 px-2.5 bg-dark rounded-md ml-2.5">
          <Text className="text-xs text-light font-medium">All time</Text>
        </View>
      </View>

      <View className="flex-row h-64 mt-4" style={{ gap: 16 }}>
        <View className="flex-1 bg-dark rounded-2xl">
          <View className="items-center p-3">
            <Text className="text-sm text-white font-medium">Finance Trend</Text>
          </View>

          <Chart expense={expense} income={income} />

          <View className="flex-row justify-center p-3">
            {expense > income ? (
              <Text className="text-sm text-white font-medium text-center">Expenses outweigh income</Text>
            ) : (
              <Text className="text-sm text-white font-medium text-center">More income than expenses</Text>
            )}
          </View>
        </View>

        <View className="flex-1" style={{ gap: 16 }}>
          <View className="justify-between p-4 bg-primary rounded-2xl flex-grow">
            <Feather name="box" size={20} color={"#FFFFFF"} />

            <View>
              <Text className="text-sm text-white font-medium">Expenses</Text>
              <Text className="text-xl text-white font-medium">{formatUSD.format(expense)}</Text>
            </View>
          </View>
          <View className="justify-between p-4 bg-dark rounded-2xl flex-grow">
            <Feather name="box" size={20} color={"#FFFFFF"} />
            <View>
              <Text className="text-sm text-white font-medium">Income</Text>
              <Text className="text-xl text-white font-medium">{formatUSD.format(income)}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
