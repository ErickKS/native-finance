import { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { useRouter } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";
import { Key, Sms } from "iconsax-react-native";

import { Button } from "@/components/button";
import { Input } from "@/components/input";

import { AccountAuth } from "@/components/accounts-auth";

export default function SignIn() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  async function handleSignIn() {
    if (!isLoaded) return;

    try {
      const { supportedFirstFactors } = await signIn.create({ identifier: email });

      const emailFactor = supportedFirstFactors.find((factor) => {
        return factor.strategy === "email_code";
      });

      // @ts-ignore
      const { emailAddressId } = emailFactor;

      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId,
      });

      setPendingVerification(true);
    } catch (err: any) {
      console.error("OAuth error: ", err);
    }
  }

  async function handleVerifyCode() {
    if (!isLoaded) return;

    try {
      const completeSignIn = await signIn.attemptFirstFactor({ strategy: "email_code", code });
      await setActive({ session: completeSignIn.createdSessionId });

      router.push("/");
    } catch (err: any) {
      console.error("OAuth error: ", err);
    }
  }

  return (
    <View className="flex-1 px-4 bg-light">
      {!pendingVerification && (
        <View className="flex-1">
          <View className="items-center mt-20 mb-12 space-y-3">
            <Text className="text-4xl text-dark font-semibold">Hello Again!</Text>
            <Text className="max-w-[200px] w-full text-lg text-dark font-medium text-center leading-6">
              Welcome back you're been missed!
            </Text>
          </View>

          <View>
            <Input onChangeText={(text) => setEmail(text)} blurOnSubmit={true} autoCapitalize="none" placeholder="Enter Email">
              <Input.Icon>
                <Sms size={24} color={"#222222"} variant="Bold" />
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

          <View className="flex-1 items-center justify-end mb-8">
            <Text className="mb-4 text-base text-dark/80 font-medium uppercase">Or</Text>

            <AccountAuth />
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
                <Key size={24} color={"#222222"} variant="Bold" />
              </Input.Icon>
            </Input>

            <Button onPress={handleVerifyCode}>Verify Email</Button>
          </View>
        </View>
      )}
    </View>
  );
}
