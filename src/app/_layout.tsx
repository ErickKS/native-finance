import { useEffect } from "react";
import { Slot, Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";

import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

import { Loading } from "@/components/loading";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function MainRootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return <Loading />;

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView className="flex-1">
        <RootLayout />
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

function RootLayout() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(auth)/sign-in");
    }
  }, [isLoaded]);

  // useEffect(() => {
  //   router.push("/(auth)/sign-in");
  // }, []);

  return (
    <SafeAreaView className="flex-1 bg-light">
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            contentStyle: { backgroundColor: "#E0DED9" },
          }}
        />

        <Stack.Screen
          name="history"
          options={{
            headerShown: false,
            animation: "fade",
            contentStyle: { backgroundColor: "#E0DED9" },
          }}
        />

        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
            animation: "fade",
            contentStyle: { backgroundColor: "#E0DED9" },
          }}
        />

        <Stack.Screen
          name="new-transaction"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#E0DED9" },
          }}
        />
        <Stack.Screen
          name="(auth)/sign-in"
          options={{
            headerShown: false,
            animation: "slide_from_bottom",
            contentStyle: { backgroundColor: "#E0DED9" },
          }}
        />

        <Stack.Screen
          name="(auth)/sign-up"
          options={{
            headerShown: false,
            animation: "slide_from_right",
            contentStyle: { backgroundColor: "#E0DED9" },
          }}
        />
      </Stack>
    </SafeAreaView>
  );
}
