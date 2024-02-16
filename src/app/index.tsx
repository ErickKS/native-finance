import { Text, View } from "react-native";

import { Nav } from "@/components/nav";
import { shadow } from "@/constants/styles";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

export default function Home() {
  const balance = 1103.32;
  const [animatedValue] = useAnimatedNumber(balance);

  return (
    <View className="flex-1 px-4">
      <View className="flex-row justify-between items-center mt-5 ">
        <View style={shadow} className="flex-row items-center h-12 pr-3 bg-gray rounded-2xl">
          <View className="h-12 w-12 rounded-2xl border-2 border-dark bg-gray/80" />

          <Text className="ml-3 mr-1 text-base text-dark font-medium">Hello, Erick</Text>
          <Text className="text-base"> 👋</Text>
        </View>
      </View>

      <View className="mt-10 space-y-2">
        <Text className="text-xl text-dark/80 font-medium">Total Balance</Text>
        <Text className="text-4xl text-dark font-semibold">$ {animatedValue.toFixed(2)}</Text>
      </View>

      <Nav />
    </View>
  );
}
