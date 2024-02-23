import { useState } from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Key, Lock1, Sms, User } from "iconsax-react-native";

import { Input } from "@/components/input";
import { Button } from "@/components/button";

import { AccountAuth } from "@/components/accounts-auth";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();

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
                  <User size={24} color={"#222222"} variant="Bold" />
                </Input.Icon>
              </Input>

              <Input onChangeText={(text) => setLastName(text)} blurOnSubmit={true} placeholder="Last Name">
                <Input.Icon>
                  <User size={24} color={"#222222"} variant="Bold" />
                </Input.Icon>
              </Input>
            </View>

            <Input onChangeText={(text) => setEmailAddress(text)} blurOnSubmit={true} autoCapitalize="none" placeholder="Email">
              <Input.Icon>
                <Sms size={24} color={"#222222"} variant="Bold" />
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
                <Lock1 size={24} color={"#222222"} variant="Bold" />
              </Input.Icon>
            </Input>

            <Button onPress={onSignUpPress}>Sign Up</Button>

            <Text className="text-center text-base text-dark mt-5">
              Have an account?{" "}
              <TouchableWithoutFeedback onPress={() => router.back()}>
                <Text className="pr-2 text-base text-dark font-semibold">Sign In</Text>
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

            <Button onPress={onPressVerify}>Verify Email</Button>
          </View>
        </View>
      )}
    </View>
  );
}
