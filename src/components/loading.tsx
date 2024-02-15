import { ActivityIndicator, View } from "react-native";

export function Loading() {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator color={"#222222"} />
    </View>
  );
}
