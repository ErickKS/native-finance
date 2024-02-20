import { useState } from "react";
import { TouchableOpacity, View, Text, TouchableWithoutFeedback } from "react-native";
import { useOAuth, useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { shadow } from "@/constants/styles";

enum Strategy {
  Apple = "oauth_apple",
  Google = "oauth_google",
}

export default function SignUp() {
  useWarmUpBrowser();
  const { isLoaded, signUp, setActive } = useSignUp();

  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: "oauth_apple" });
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: "oauth_google" });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  async function onSignUpPress() {
    if (!isLoaded) return;

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error("OAuth error: ", err);
    }
  }

  async function onPressVerify() {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      await setActive({ session: completeSignUp.createdSessionId });

      router.push("/");
    } catch (err: any) {
      console.error("OAuth error: ", err);
    }
  }

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
    <View className="flex-1 px-4 bg-light">
      {!pendingVerification && (
        <View className="flex-1">
          <View className="items-center mt-20 mb-12 space-y-3">
            <Text className="text-4xl text-dark font-semibold">Registration</Text>
            <Text className="max-w-[200px] w-full text-lg text-dark font-medium text-center leading-6">Let's create your account</Text>
          </View>

          <View>
            <View className="flex-row" style={{ gap: 16 }}>
              <Input onChangeText={(text) => setFirstName(text)} blurOnSubmit={true} placeholder="First Name">
                <Input.Icon>
                  <Feather name="user" size={24} color={"#222222"} />
                </Input.Icon>
              </Input>

              <Input onChangeText={(text) => setLastName(text)} blurOnSubmit={true} placeholder="Last Name">
                <Input.Icon>
                  <Feather name="user" size={24} color={"#222222"} />
                </Input.Icon>
              </Input>
            </View>

            <Input onChangeText={(text) => setEmailAddress(text)} blurOnSubmit={true} autoCapitalize="none" placeholder="Email">
              <Input.Icon>
                <MaterialCommunityIcons name="email" size={24} color={"#222222"} />
              </Input.Icon>
            </Input>

            <Input
              onChangeText={(text) => setPassword(text)}
              blurOnSubmit={true}
              secureTextEntry={true}
              autoCapitalize="none"
              placeholder="Password"
            >
              <Input.Icon>
                <MaterialCommunityIcons name="key-outline" size={24} color={"#222222"} />
              </Input.Icon>
            </Input>

            <Button onPress={onSignUpPress}>Sign Up</Button>

            <Text className="text-center text-base text-dark mt-5">
              Have an account?{" "}
              <TouchableWithoutFeedback onPress={() => router.push("/(auth)/sign-in")}>
                <Text className="pr-2 text-base text-dark font-semibold">Sign In</Text>
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
      )}

      {pendingVerification && (
        <View>
          <View className="items-center mt-20 mb-12 space-y-3">
            <Text className="text-4xl text-dark font-semibold">Enter Verify Code</Text>
            <Text className="max-w-[200px] w-full text-lg text-dark font-medium text-center leading-6">We send a code in your email.</Text>
          </View>

          <View>
            <Input onChangeText={(text) => setCode(text)} blurOnSubmit={true} placeholder="Enter Code">
              <Input.Icon>
                <MaterialCommunityIcons name="key-outline" size={24} color={"#222222"} />
              </Input.Icon>
            </Input>

            <Button onPress={onPressVerify}>Verify Email</Button>
          </View>
        </View>
      )}
    </View>
  );
}
