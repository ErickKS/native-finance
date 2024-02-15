import { Slot, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";

import { Loading } from "@/components/loading";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return <Loading />;

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Slot />
    </SafeAreaView>
  );
}
