import { createSettingsStyles } from "@/assets/styles/settings.styles";
import ProgressStats from "@/components/ProgressStats";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

export default function SettingsScreen() {
  const [isAutoSync, setIsAutoSync] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const settingsStyles = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingsStyles.container}
    >
      <SafeAreaView style={settingsStyles.safeArea}>
        <View style={settingsStyles.header}>
          <View style={settingsStyles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingsStyles.iconContainer}
            >
              <Ionicons name="settings" size={28} color="#ffffff" />
            </LinearGradient>
            <Text style={settingsStyles.title}>Settings</Text>
          </View>
        </View>

        <ScrollView
          style={settingsStyles.scrollView}
          contentContainerStyle={settingsStyles.content}
          showsVerticalScrollIndicator={false}
        >
          <ProgressStats />
          <View style={settingsStyles.content}></View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
