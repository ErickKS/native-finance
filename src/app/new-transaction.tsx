import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { NewExpense } from "@/components/new-expense";
import { NewIncome } from "@/components/new-income";

import { shadow } from "@/constants/styles";
import { Feather } from "@expo/vector-icons";

export default function NewTransaction() {
  const router = useRouter();
  const categories = ["expense", "income"];
  const [selectedCategory, setSelectedCategory] = useState<"expense" | "income">("expense");

  return (
    <View className="flex-1 px-4">
      <View className="relative mt-5 mb-6 items-center">
        <Text className="text-xl text-dark font-semibold">New Transaction</Text>

        <TouchableOpacity activeOpacity={0.8} onPress={() => router.back()} className="absolute -top-0.5 left-0">
          <Feather name="chevron-left" size={28} color={"#222222"} />
        </TouchableOpacity>
      </View>

      <View className="flex-row mx-auto h-10 w-[80%] p-1 rounded-xl bg-dark" style={[{ gap: 8 }, shadow]}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            activeOpacity={0.8}
            onPress={() => setSelectedCategory(category as "expense" | "income")}
            className={`flex-grow justify-center items-center h-full rounded-lg ${selectedCategory === category && "bg-light"}`}
          >
            <Text className={`text-sm font-semibold capitalize ${selectedCategory === category ? "text-dark" : "text-light"}`}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="flex-1">{selectedCategory === "expense" ? <NewExpense /> : <NewIncome />}</View>
    </View>
  );
}
