import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

import { TransactionItem } from "@/components/transaction-item";
import { Nav } from "@/components/nav";
import { useTransactionStore } from "@/stores/transaction-store";

export default function History() {
  const { transactions } = useTransactionStore();
  const filters = ["day", "week", "month", "year"] as const;
  type Filter = (typeof filters)[number];
  const [selectedFilter, setSelectedFilter] = useState<Filter>("day");

  const filteredTransactions = () => {
    const currentDate = new Date();
    const filterDate = new Date();

    switch (selectedFilter) {
      case "day":
        filterDate.setDate(currentDate.getDate() - 1);
        break;
      case "week":
        filterDate.setDate(currentDate.getDate() - 7);
        break;
      case "month":
        filterDate.setMonth(currentDate.getMonth() - 1);
        break;
      case "year":
        filterDate.setFullYear(currentDate.getFullYear() - 1);
        break;
    }

    return transactions.filter((transaction) => new Date(transaction.date) >= filterDate);
  };

  return (
    <View className="flex-1 px-4">
      <View className="mt-5 mb-6 items-center">
        <Text className="text-xl text-dark font-semibold">Transactions History</Text>
      </View>

      <View className="flex-row h-10 p-1 rounded-xl bg-dark" style={{ gap: 8 }}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            activeOpacity={0.8}
            onPress={() => setSelectedFilter(filter)}
            className={`flex-grow justify-center items-center h-full rounded-lg ${selectedFilter === filter && "bg-light"}`}
          >
            <Text className={`text-sm font-semibold capitalize ${selectedFilter === filter ? "text-dark" : "text-light"}`}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 mt-3">
        {filteredTransactions().length > 0 ? (
          <>
            {filteredTransactions().map((transaction, index) => (
              <TransactionItem key={index} category={transaction.category} amount={transaction.amount} date={transaction.date} />
            ))}
          </>
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text>Empty</Text>
          </View>
        )}
      </ScrollView>

      <Nav />
    </View>
  );
}
