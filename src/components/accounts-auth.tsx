import { TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";
import { Apple, Google } from "iconsax-react-native";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { shadow } from "@/constants/styles";

enum Strategy {
  Apple = "oauth_apple",
  Google = "oauth_google",
}

export function AccountAuth() {
  useWarmUpBrowser();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });

  async function onSelectAuth(strategy: Strategy) {
    const selectedAuth = {
      [Strategy.Apple]: appleAuth,
      [Strategy.Google]: googleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push("/");
      }
    } catch (err) {
      console.error("OAuth error: ", err);
    }
  }

  return (
    <View className="flex-row space-x-5">
      <TouchableOpacity
        onPress={() => onSelectAuth(Strategy.Google)}
        style={shadow}
        className="justify-center items-center h-12 max-w-[132px] w-full bg-gray rounded-xl"
      >
        <Google size={24} color="#222222" variant="Bold" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSelectAuth(Strategy.Apple)}
        style={shadow}
        className="justify-center items-center h-12 max-w-[132px] w-full bg-gray rounded-xl"
      >
        <Apple size={24} color="#222222" variant="Bold" />
      </TouchableOpacity>
    </View>
  );
}
