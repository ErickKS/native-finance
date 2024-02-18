import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";

import { Nav } from "@/components/nav";

import { shadow } from "@/constants/styles";

export default function Profile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);

  useEffect(() => {
    if (!user) return;

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.emailAddresses[0].emailAddress);
  }, [user]);

  return (
    <View className="flex-1">
      <View className="flex-1 px-4">
        <View className="mt-5 mb-6 items-center">
          <Text className="text-xl text-dark font-semibold">Profile</Text>
        </View>

        <View className="items-center mt-10">
          <Image source={{ uri: user?.imageUrl }} className="relative h-32 w-32 rounded-full bg-gray" />

          <Text className="mt-4 text-2xl text-dark font-semibold">
            {firstName} {lastName}
          </Text>
          <Text className="text-base text-dark/80 font-semibold">{email}</Text>
        </View>

        <View className="items-center mt-20">
          <TouchableOpacity
            onPress={() => {
              signOut();
              router.push("/(auth)/sign-in");
            }}
            className="flex-row justify-center items-center h-12 max-w-[132px] w-full bg-primary rounded-xl"
            style={shadow}
          >
            <Feather name="log-out" size={24} color={"#E0DED9"} />
            <Text className="ml-2 text-sm text-light font-semibold">Log out</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Nav />
    </View>
  );
}
