import { createHomeStyles } from "@/assets/styles/home.styles";
import Header from "@/components/Header";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StatusBar, Text, TouchableOpacity } from "react-native";

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homeStyles = createHomeStyles(colors);

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
        <TouchableOpacity onPress={toggleDarkMode}>
          <Text>toggle the mode</Text>
        </TouchableOpacity>
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
