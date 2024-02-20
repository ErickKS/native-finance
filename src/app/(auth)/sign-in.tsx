import { useState } from "react";
import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { shadow } from "@/constants/styles";

enum Strategy {
  Apple = "oauth_apple",
  Google = "oauth_google",
}

export default function SignIn() {
  useWarmUpBrowser();
  const router = useRouter();

  const [email, setEmail] = useState("");

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

  function handleSignIn() {
    // if (!email) return;

    router.push("/");
  }

  return (
    <View className="flex-1 px-4 bg-light">
      <View className="items-center mt-20 mb-12 space-y-3">
        <Text className="text-4xl text-dark font-semibold">Hello Again!</Text>
        <Text className="max-w-[200px] w-full text-lg text-dark font-medium text-center leading-6">Welcome back you're been missed!</Text>
      </View>

      <View>
        <Input onChangeText={(text) => setEmail(text)} blurOnSubmit={true} autoCapitalize="none" placeholder="Enter Email">
          <Input.Icon>
            <MaterialCommunityIcons name="email" size={24} color={"#222222"} />
          </Input.Icon>
        </Input>

        <Button onPress={handleSignIn}>Sign In</Button>

        <Text className="text-center text-base text-dark mt-5">
          Create a new account?{" "}
          <TouchableWithoutFeedback onPress={() => router.push("/(auth)/sign-up")}>
            <Text className="pr-2 text-base text-dark font-semibold">Sign Up</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>

      <View className="flex-1 items-center justify-end mb-8 space-y-4">
        <Text className="text-base text-dark/80 font-medium uppercase">Or</Text>

        <View className="flex-row space-x-5">
          <TouchableOpacity
            onPress={() => onSelectAuth(Strategy.Google)}
            style={shadow}
            className="justify-center items-center h-12 max-w-[132px] w-full bg-gray rounded-xl"
          >
            <Ionicons name="logo-google" size={24} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onSelectAuth(Strategy.Apple)}
            style={shadow}
            className="justify-center items-center h-12 max-w-[132px] w-full bg-gray rounded-xl"
          >
            <Ionicons name="logo-apple" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
