import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TransactionProps {
  id: string;
  type: "expense" | "income";
  category: string;
  amount: number;
  date: Date;
}

interface StateProps {
  transactions: TransactionProps[];
  addTransaction: (transaction: TransactionProps) => void;
  deleteTransaction: (id: string) => void;
}

export const useTransactionStore = create(
  persist<StateProps>(
    (set) => ({
      transactions: [],
      addTransaction: (newTransaction) => {
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },
      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== id),
        }));
      },
    }),
    {
      name: "fin-tracker:transaction",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
