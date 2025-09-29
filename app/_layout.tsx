import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import PriceAlertModal from "@/components/PriceAlertModal";
import { AlertProvider } from "@/context/AlertContext";
import { AuthProvider, useAuth } from "@/context/Auth0Context";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { usePriceAlertNotifications } from "@/hooks/usePriceAlertNotifications";
import LoginScreen from "./Login";

export const unstable_settings = {
  anchor: "(tabs)",
};


export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <AlertProvider>
        <InnerLayout colorScheme={colorScheme || "light"} />
      </AlertProvider>
    </AuthProvider>
  );
}

function InnerLayout({ colorScheme }: { colorScheme: string }) {
  const { modalVisible, modalInfo, closeModal } = usePriceAlertNotifications();
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <LoginScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="graph"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="light" />
      <PriceAlertModal
        visible={modalVisible}
        symbol={modalInfo?.symbol || ""}
        currentPrice={
          typeof modalInfo?.currentPrice === "number"
            ? modalInfo.currentPrice
            : 0
        }
        alert={modalInfo?.alert}
        onClose={closeModal}
      />
    </ThemeProvider>
  );
}
