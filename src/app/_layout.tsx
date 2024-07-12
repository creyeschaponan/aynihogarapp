import { Stack } from "expo-router";
import AuthProvider from "../providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
const queryClient = new QueryClient();

export default function Layout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Stack
              screenOptions={{
                headerShown: false,
                animationDuration: 200,
                animation: "flip",
              }}
            >
              <Stack.Screen name="(auth)" options={{ title: "Sign In" }} />
            </Stack>
          </AuthProvider>
        </QueryClientProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
