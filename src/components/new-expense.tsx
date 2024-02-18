import { useState } from "react";
import { View, TouchableOpacity, Text, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import CurrencyInput from "react-native-currency-input";
import uuid from "react-native-uuid";

import { useTransactionStore } from "@/stores/transaction-store";

import { Button } from "@/components/button";

import { expenseCategories } from "@/constants/transactions-category";
import { shadow } from "@/constants/styles";

export function NewExpense() {
  const router = useRouter();
  const { addTransaction } = useTransactionStore();
  const [expenseCategorySelected, setExpenseCategorySelected] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  function handleAddTransaction() {
    if (!expenseCategorySelected || !amount) {
      return Alert.alert("Transaction", "Report the category and the amount!");
    }

    addTransaction({
      id: uuid.v4() as string,
      type: "expense",
      category: expenseCategorySelected,
      amount: amount * -1,
      date: new Date(),
    });

    router.navigate("/");
  }

  return (
    <View className="flex-1 mt-6">
      <View className="flex-1">
        <View className="items-center">
          <Text className="text-base text-dark font-medium">Your spending was categorized below</Text>
          <Text className="text-sm text-dark/80 font-medium">Tap to change it</Text>
        </View>

        <View className="flex-row flex-wrap justify-between mt-4" style={{ rowGap: 16 }}>
          {expenseCategories.map(({ category, icon }) => (
            <TouchableOpacity
              key={category}
              activeOpacity={0.8}
              onPress={() => setExpenseCategorySelected(category)}
              style={shadow}
              className="flex-row items-center h-12 w-[48%] px-3 bg-gray rounded-xl"
            >
              <MaterialCommunityIcons name={icon as any} size={24} color={"#222222"} />

              <Text className="flex-1 mx-3 text-base text-dark font-medium capitalize">{category}</Text>

              <View className="justify-center items-center h-4 w-4 rounded-full border-2 border-dark">
                <View className={`h-2 w-2 rounded-full ${expenseCategorySelected === category && "bg-dark"}`} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="items-center mt-10">
          <Text className="text-xl text-dark font-medium">Amount</Text>

          <CurrencyInput
            value={amount}
            onChangeValue={setAmount}
            prefix="$ "
            delimiter=","
            separator="."
            precision={2}
            minValue={0}
            placeholder="$ 00.00"
            placeholderTextColor={"#222222c5"}
            className="h-12 w-full px-3 pt-1 mt-3 bg-gray rounded-xl text-xl text-dark text-center font-medium placeholder:font-medium"
            style={shadow}
          />
        </View>
      </View>

      <View className="py-3">
        <Button onPress={handleAddTransaction}>Save</Button>
      </View>
    </View>
  );
}
