import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export function Nav() {
  const router = useRouter();
  const route = useRoute();

  return (
    <View className="py-3 flex-row justify-between items-center">
      <View className="flex-row items-center h-14 px-1 bg-dark rounded-full">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/")}
          className={`flex-row items-center h-12 rounded-full px-4 ${route.name === "index" && "bg-light"}`}
        >
          <Feather name="home" size={26} color={route.name === "index" ? "#222222" : "#E0DED9"} />

          {route.name === "index" ? <Text className="ml-1 text-xs text-dark font-medium">Home</Text> : null}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/history")}
          className={`flex-row items-center h-12 rounded-full px-4 ${route.name === "history" && "bg-light"}`}
        >
          <Feather name="bar-chart-2" size={26} color={route.name === "history" ? "#222222" : "#E0DED9"} />

          {route.name === "history" ? <Text className="ml-1 text-xs text-dark font-medium">History</Text> : null}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/account")}
          className={`flex-row items-center h-12 rounded-full px-4 ${route.name === "account" && "bg-light"}`}
        >
          <Feather name="user" size={26} color={route.name === "account" ? "#222222" : "#E0DED9"} />

          {route.name === "account" ? <Text className="ml-1 text-xs text-dark font-medium">Account</Text> : null}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.navigate("/new-transaction")}
        activeOpacity={0.8}
        className="justify-center items-center h-14 w-14 bg-dark rounded-full"
      >
        <Feather name="plus" size={26} color={"#E0DED9"} />
      </TouchableOpacity>
    </View>
  );
}
