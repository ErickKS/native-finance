import { useEffect } from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";

import { Loading } from "@/components/loading";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function MainRootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return <Loading />;

  return (
    <GestureHandlerRootView className="flex-1">
      <RootLayout />
    </GestureHandlerRootView>
  );
}

function RootLayout() {
  const router = useRouter();

  // const { isLoaded, isSignedIn } = useAuth();
  // useEffect(() => {
  //   if (isLoaded && !isSignedIn) {
  //     router.push("/(auth)/sign-in");
  //   }
  // }, [isLoaded]);
  useEffect(() => {
    router.push("/(auth)/sign-in");
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Slot />
    </SafeAreaView>
  );
}
