import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

// Trim in the input to remove whitespace, we don't want to add empty todos
export default function TodoInput() {
  const { colors } = useTheme();
  const homeStyles = createHomeStyles(colors);
  const [newTodo, setNewTodo] = useState(""); // Keep track of the todo input, will be used to add to the convex db
  const addTodo = useMutation(api.todos.addTodo);

  async function handleAddTodo() {
    if (newTodo.trim()) {
      try {
        await addTodo({
          text: newTodo.trim(),
        });
        setNewTodo("");
      } catch (error) {
        // Alert is coming from react-native
        console.log("Error adding todo: ", error);
        Alert.alert("Error", "Failed to add todo");
      }
    }
  }

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          // onSubmitEditing={handleAddTodo} // This is a prop that is used to submit the todo when the user presses enter
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()} // Disable the button if the input is empty
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.empty
            }
            style={[
              homeStyles.addButton,
              !newTodo.trim() && homeStyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color="#ffffff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}
