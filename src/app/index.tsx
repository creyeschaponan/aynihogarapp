import { ActivityIndicator } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "../providers/AuthProvider";
import { Image, View } from "react-native-animatable";

export default function Index() {
  const { session, loading, profile } = useAuth();
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-accent">
        <Image
          source={require("../../assets/icon.png")}
          className="w-60 h-60 mb-10 "
        />
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }
  if (!session) {
    return <Redirect href={"/(auth)/sign-in"} />;
  }

  if (session && !profile) {
    return <Redirect href={"/(users)/profile"} />;
  }

  return <Redirect href={"/(users)"} />;
}
