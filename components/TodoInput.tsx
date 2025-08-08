import { createHomeStyles } from "@/assets/styles/home.styles";
import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";
import { Text, View } from "react-native";

export default function TodoInput() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const [todo, setTodo] = useState(""); // Keep track of the todo input, will be used to add to the convex db

  return (
    <View>
      <Text>TodoInput</Text>
    </View>
  );
}
