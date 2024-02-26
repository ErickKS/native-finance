import { Text, View } from "react-native";
import { Box1, Icon, ReceiptSearch } from "iconsax-react-native";

import { useCurrency } from "@/hooks/useCurrency";

import { Chart } from "./chart";

interface AnalyticsSectionProps {
  expense: number;
  income: number;
}

export function AnalyticsSection({ expense, income }: AnalyticsSectionProps) {
  const formattedExpense = useCurrency(expense);
  const formattedIncome = useCurrency(income);

  return (
    <View className="mt-7 px-4">
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

          {expense && income === 0 ? (
            <View className="items-center justify-center mt-12">
              <ReceiptSearch size={32} color="#FFFFFF" />
              <Text className="text-sm text-white font-medium mt-1">No transactions</Text>
              <Text className="text-sm text-white font-medium">to analyze</Text>
            </View>
          ) : (
            <>
              <Chart expense={expense} income={income} />

              <View className="flex-row justify-center p-3">
                {expense > income ? (
                  <Text className="text-sm text-white font-medium text-center">Expenses outweigh income</Text>
                ) : (
                  <Text className="text-sm text-white font-medium text-center">More income than expenses</Text>
                )}
              </View>
            </>
          )}
        </View>

        <View className="flex-1" style={{ gap: 16 }}>
          <View className="justify-between p-4 bg-primary rounded-2xl flex-grow">
            <Box1 size={20} color={"#FFFFFF"} />

            <View>
              <Text className="text-sm text-white font-medium">Expenses</Text>
              <Text className="text-xl text-white font-medium">{formattedExpense}</Text>
            </View>
          </View>
          <View className="justify-between p-4 bg-dark rounded-2xl flex-grow">
            <Box1 size={20} color={"#FFFFFF"} />
            <View>
              <Text className="text-sm text-white font-medium">Income</Text>
              <Text className="text-xl text-white font-medium">{formattedIncome}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
