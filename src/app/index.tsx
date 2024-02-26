import { useState, useEffect } from "react";
import { Image, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { useTransactionStore } from "@/stores/transaction-store";

import { Nav } from "@/components/nav";
import { TransactionItem } from "@/components/transaction-item";
import { AnalyticsSection } from "@/components/analytics-section";
import { Balance } from "@/components/balance";

import { shadow } from "@/constants/styles";
import { useUser } from "@clerk/clerk-expo";

// import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName);
  }, [user]);

  const { transactions } = useTransactionStore();
  const lastTwoTransactions = transactions.slice(0, 2);

  const expense = transactions.filter((item) => item.type === "expense");
  const income = transactions.filter((item) => item.type === "income");

  let total = 0;
  let totalExpense = 0;
  let totalIncome = 0;

  transactions.forEach((item) => {
    total += item.amount;
  });
  expense.forEach((expense) => {
    totalExpense += expense.amount * -1;
  });
  income.forEach((income) => {
    totalIncome += income.amount;
  });

  return (
    <View className="flex-1">
      <View className="flex-row justify-between items-center mt-5 px-4">
        <View style={shadow} className="flex-row items-center h-12 pr-3 bg-gray rounded-2xl">
          <Image source={{ uri: user?.imageUrl }} className="h-12 w-12 rounded-2xl bg-gray/80" />

          <Text className="ml-3 mr-1 text-base text-dark font-medium">Hello, {firstName}</Text>
          <Text className="text-base"> 👋</Text>
        </View>
      </View>

      <View className="mt-8 px-4">
        <Balance total={total} />
      </View>

      <AnalyticsSection expense={totalExpense} income={totalIncome} />

      <View className="flex-1 mt-8">
        <Text className="text-lg text-dark font-semibold px-4">Last Transactions</Text>

        <View>
          {transactions.length <= 0 ? (
            <View className="justify-center items-center mt-4 mx-4 p-4 bg-gray rounded-2xl">
              <Text className="text-sm text-dark font-medium text-center">You don't have any transactions, please add one.</Text>
            </View>
          ) : (
            <>
              {lastTwoTransactions.map((transaction, index) => (
                <TransactionItem key={index} category={transaction.category} amount={transaction.amount} date={transaction.date} />
              ))}
            </>
          )}
        </View>
      </View>

      <View className="absolute -right-10 top-0 -rotate-[30deg]">
        <Feather name="dollar-sign" size={160} color={"#c4c2be"} />
      </View>

      <Nav />
    </View>
  );
}
