import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";

import { Home2, ClipboardText, User, Add } from "iconsax-react-native";

export function Nav() {
  const router = useRouter();
  const route = useRoute();

  return (
    <View className="py-3 flex-row justify-between items-center mx-4">
      <View className="flex-row items-center h-14 px-1 bg-dark rounded-full">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/")}
          className={`flex-row items-center h-12 rounded-full px-4 ${route.name === "index" && "bg-light"}`}
        >
          <Home2 size={26} color={route.name === "index" ? "#222222" : "#E0DED9"} variant={route.name === "index" ? "Bold" : "Outline"} />

          {route.name === "index" ? <Text className="ml-1 text-xs text-dark font-medium">Home</Text> : null}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/history")}
          className={`flex-row items-center h-12 rounded-full px-4 ${route.name === "history" && "bg-light"}`}
        >
          <ClipboardText
            size={26}
            color={route.name === "history" ? "#222222" : "#E0DED9"}
            variant={route.name === "history" ? "Bold" : "Outline"}
          />

          {route.name === "history" ? <Text className="ml-1 text-xs text-dark font-medium">History</Text> : null}
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.navigate("/profile")}
          className={`flex-row items-center h-12 rounded-full px-4 ${route.name === "profile" && "bg-light"}`}
        >
          <User
            size={26}
            color={route.name === "profile" ? "#222222" : "#E0DED9"}
            variant={route.name === "profile" ? "Bold" : "Outline"}
          />

          {route.name === "profile" ? <Text className="ml-1 text-xs text-dark font-medium">Profile</Text> : null}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => router.navigate("/new-transaction")}
        activeOpacity={0.8}
        className="justify-center items-center h-14 w-14 bg-dark rounded-full"
      >
        <Add size={32} color={"#E0DED9"} />
      </TouchableOpacity>
    </View>
  );
}
