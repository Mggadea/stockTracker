// app/(tabs)/_layout.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="WatchList"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#294947ff", // siempre dark mode
          borderTopColor: "#222",
        },
        tabBarActiveTintColor: "#ffffff", // íconos/texto activos
        tabBarInactiveTintColor: "#bbbbbb", // íconos/texto inactivos
      }}
    >
      <Tabs.Screen
        name="WatchList"
        options={{
          title: "WatchList",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddAlert"
        options={{
          title: "Add Alert",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
