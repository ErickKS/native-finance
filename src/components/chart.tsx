import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";

interface ChartProps {
  expense: number;
  income: number;
}

export function Chart({ expense, income }: ChartProps) {
  return (
    <View className="flex-1">
      <PieChart
        data={[
          {
            name: "Expenses",
            value: expense,
            color: "#ED3F40",
          },
          {
            name: "Income",
            value: income,
            color: "#FFFFFF",
          },
        ]}
        accessor="value"
        backgroundColor="transparent"
        width={160}
        height={160}
        chartConfig={{ decimalPlaces: 2, color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
        paddingLeft="46"
        hasLegend={false}
      />

      <View className="absolute top-[32px] left-[38px] bg-dark h-24 w-24 rounded-full" />
    </View>
  );
}
