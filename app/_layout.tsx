import { Stack } from "expo-router";

export default function RootLayout() {
  // Stack is a layout component that allows you to navigate between screens

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: "Home" }} />
    </Stack>
  );
}
