import { createSettingsStyles } from "@/assets/styles/settings.styles";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Switch, Text, View } from "react-native";

export default function Preferences() {
  const [isAutoSync, setIsAutoSync] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
  const { colors, isDarkMode, toggleDarkMode } = useTheme();

  const settingStyles = createSettingsStyles(colors);

  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingStyles.section}
    >
      <Text style={settingStyles.sectionTitle}>Preferences</Text>

      {/* Dark Mode */}
      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.primary}
            style={settingStyles.iconContainer}
          >
            <Ionicons name="moon" size={18} color="#ffffff" />
          </LinearGradient>
          <Text style={settingStyles.settingText}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={"#ffffff"}
          trackColor={{
            true: colors.primary,
            false: colors.border,
          }}
          ios_backgroundColor={"red"} // Setting ios_backgroundColor to red to override the default color when the switch is off, aka false
        />
      </View>

      {/* Notifications */}
      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.warning}
            style={settingStyles.iconContainer}
          >
            <Ionicons name="notifications" size={18} color="#ffffff" />
          </LinearGradient>
          <Text style={settingStyles.settingText}>Notifications</Text>
        </View>
        <Switch
          value={isNotificationEnabled}
          onValueChange={() => setIsNotificationEnabled(!isNotificationEnabled)}
          thumbColor={"#ffffff"}
          trackColor={{
            true: colors.warning,
            false: colors.border,
          }}
          ios_backgroundColor={"red"} // Setting ios_backgroundColor to red to override the default color when the switch is off, aka false
        />
      </View>

      {/* Auto Sync */}
      <View style={settingStyles.settingItem}>
        <View style={settingStyles.settingLeft}>
          <LinearGradient
            colors={colors.gradients.success}
            style={settingStyles.iconContainer}
          >
            <Ionicons name="sync" size={18} color="#ffffff" />
          </LinearGradient>
          <Text style={settingStyles.settingText}>Auto Sync</Text>
        </View>
        <Switch
          value={isAutoSync}
          onValueChange={() => setIsAutoSync(!isAutoSync)}
          thumbColor={"#ffffff"}
          trackColor={{
            true: colors.success,
            false: colors.border,
          }}
          ios_backgroundColor={"red"} // Setting ios_backgroundColor to red to override the default color when the switch is off, aka false
        />
      </View>
    </LinearGradient>
  );
}
