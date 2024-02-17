import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const datasets = [
  {
    name: "Expenses",
    value: 130,
    color: "#ED3F40",
  },
  {
    name: "Incomes",
    value: 130,
    color: "#FFFFFF",
  },
];

export function Chart() {
  return (
    <View className="flex-1">
      <PieChart
        data={datasets}
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
