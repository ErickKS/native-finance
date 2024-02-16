import { Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Button } from "@/components/button";
import { useState } from "react";
import { Input } from "@/components/input";
import { useRouter } from "expo-router";
import { shadow } from "@/constants/styles";

export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    // if (!email && !password) return;

    router.push("/");
  }

  return (
    <View className="flex-1 px-4 bg-light">
      <View className="items-center mt-20 mb-16 space-y-3">
        <Text className="text-4xl text-dark font-semibold">Hello Again!</Text>
        <Text className="max-w-[200px] w-full text-lg text-dark font-medium text-center leading-6">Welcome back you're been missed!</Text>
      </View>

      <View>
        <Input onChangeText={(text) => setEmail(text)} blurOnSubmit={true} placeholder="Enter Email">
          <Input.Icon>
            <MaterialCommunityIcons name="email" size={24} color={"#222222"} />
          </Input.Icon>
        </Input>

        <View className="my-5 space-y-3">
          <Input onChangeText={(text) => setPassword(text)} blurOnSubmit={true} placeholder="Enter Password">
            <Input.Icon>
              <MaterialCommunityIcons name="lock" size={24} color={"#222222"} />
            </Input.Icon>
          </Input>

          <TouchableOpacity activeOpacity={0.7}>
            <Text className="pr-2 text-right text-sm text-dark font-regular">Forget password?</Text>
          </TouchableOpacity>
        </View>

        <Button onPress={handleSignIn}>Sign In</Button>

        <Text className="text-center text-base text-dark mt-5">
          Create a new account?{" "}
          <TouchableWithoutFeedback>
            <Text className="pr-2 text-base text-dark font-semibold">Sign Up</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>

      <View className="flex-1 items-center justify-end mb-8 space-y-4">
        <Text className="text-base text-dark/80 font-medium uppercase">Or</Text>

        <View className="flex-row space-x-5">
          <TouchableOpacity style={shadow} className="justify-center items-center h-12 max-w-[132px] w-full bg-gray rounded-xl">
            <Ionicons name="logo-google" size={24} />
          </TouchableOpacity>

          <TouchableOpacity style={shadow} className="justify-center items-center h-12 max-w-[132px] w-full bg-gray rounded-xl">
            <Ionicons name="logo-apple" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
