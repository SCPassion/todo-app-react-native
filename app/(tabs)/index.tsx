import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Todo = Doc<"todos">;

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState<string>("");

  const homeStyles = createHomeStyles(colors);
  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  // if the query result is undefined, that is the loading state
  const isLoading = todos === undefined;
  if (isLoading) {
    return <LoadingSpinner />;
  }

  async function handleToggleTodo(id: Id<"todos">) {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.error("Error toggling todo: ", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  }

  async function handleDeleteTodo(id: Id<"todos">) {
    try {
      // Show an alert to confirm the deletion
      Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => await deleteTodo({ id }),
        },
      ]);
    } catch (error) {
      console.error("Error deleting todo: ", error);
      Alert.alert("Error", "Failed to delete todo");
    }
  }

  function handleEditTodo(todo: Todo) {
    setEditText(todo.text);
    setEditingId(todo._id);
  }

  async function handleSaveEdit() {
    if (!editingId) return;
    try {
      await updateTodo({
        id: editingId,
        text: editText.trim(),
      });
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo: ", error);
      Alert.alert("Error", "Failed to update todo");
    }
  }

  function handleCancelEdit() {
    setEditText("");
    setEditingId(null);
  }

  function renderTodoItem({ item }: { item: Todo }) {
    const isEditing = editingId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }} // Start from the top left corner to the bottom right corner
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.8}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#ffffff" />
              )}
            </LinearGradient>
          </TouchableOpacity>

          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
                style={homeStyles.editInput}
                value={editText}
                onChangeText={setEditText}
                autoFocus
                multiline
                placeholder="Edit your todo..."
                placeholderTextColor={colors.textMuted}
              />

              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="checkmark" size={16} color="#ffffff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="close" size={16} color="#ffffff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
              <Text
                style={[
                  homeStyles.todoText,
                  item.isCompleted && {
                    textDecorationLine: "line-through",
                    color: colors.textMuted,
                    opacity: 0.6,
                  },
                ]}
              >
                {item.text}
              </Text>

              <View style={homeStyles.todoActions}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleEditTodo(item)}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="pencil" size={14} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleDeleteTodo(item._id)}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.actionButton}
                  >
                    <Ionicons name="trash" size={14} color="#ffffff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </LinearGradient>
      </View>
    );
  }

  return (
    // LinearGradient is a component that allows you to use a gradient as a background, wrapping the inner content
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.safeArea}>
        <Header />

        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem} // the input must be called {item}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />} // This is a fallback component that will be rendered when the list is empty
          // showsVerticalScrollIndicator={false} // Get rid of the vertical scroll indicator
        />
        {/* ┌─────────────────────────────────────┐ ← style (OUTSIDE)
            │ FlatList Container                  │
            │ (The "box" that holds everything)   │
            │ ┌─────────────────────────────────┐ │ ← contentContainerStyle (INSIDE)
            │ │ Scrollable Content Area         │ │
            │ │ (The "paper" that moves)        │ │
            │ │ ┌─────────────┐                 │ │
            │ │ │ Todo Item 1 │                 │ │
            │ │ └─────────────┘                 │ │
            │ │ ┌─────────────┐                 │ │
            │ │ │ Todo Item 2 │                 │ │
            │ │ └─────────────┘                 │ │
            │ │ ┌─────────────┐                 │ │
            │ │ │ Todo Item 3 │                 │ │
            │ │ └─────────────┘                 │ │
            │ └─────────────────────────────────┘ │ */}

        {/* This will render all todos in the mobile screen, which might not be necessary */}
        {/* {todos?.map((todo) => <Text key={todo._id}>{todo.text}</Text>)} */}
      </SafeAreaView>
    </LinearGradient>
  );
}

// Allow style to be dynamic based on the theme by using a function
// This is very common in react native

// const createStyles = (colors: ColorScheme) => {
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center",
//       backgroundColor: colors.surface,
//     },
//     content: {
//       fontSize: 22,
//       textAlign: "center",
//     },
//   });
//   return styles;
// };
