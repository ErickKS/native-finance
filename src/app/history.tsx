import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";

import { TransactionItem } from "@/components/transaction-item";
import { Nav } from "@/components/nav";
import { useTransactionStore } from "@/stores/transaction-store";
import { Feather } from "@expo/vector-icons";

export default function History() {
  const { transactions, deleteTransaction } = useTransactionStore();
  const [swipeableEnabled, setSwipeableEnabled] = useState(true);

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

  const rightSwipeActions = (id: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          deleteTransaction(id);
          setSwipeableEnabled(true);
        }}
        activeOpacity={0.8}
        className="flex-row justify-center items-center h-12 px-3 mt-4 mr-4 bg-primary rounded-2xl"
      >
        <Feather name={"trash"} size={20} color={"#E0DED9"} />
        <Text className="ml-2 text-sm text-white font-medium">Delete</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1">
      <View className="mt-5 mb-6 items-center mx-4">
        <Text className="text-xl text-dark font-semibold">Transactions History</Text>
      </View>

      <View className="flex-row h-10 p-1 mx-4 rounded-xl bg-dark " style={{ gap: 8 }}>
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
            {filteredTransactions().map((transaction) => (
              <Swipeable
                renderRightActions={() => (swipeableEnabled ? rightSwipeActions(transaction.id) : null)}
                key={transaction.id}
                enabled={swipeableEnabled}
                onSwipeableWillClose={() => setSwipeableEnabled(true)}
              >
                <TransactionItem category={transaction.category} amount={transaction.amount} date={transaction.date} />
              </Swipeable>
            ))}
          </>
        ) : (
          <View className="justify-center items-center mt-4 mx-4 p-4 bg-gray rounded-2xl">
            <Text className="text-sm text-dark font-medium text-center">You don't have any transactions, please add one.</Text>
          </View>
        )}
      </ScrollView>

      <Nav />
    </View>
  );
}
