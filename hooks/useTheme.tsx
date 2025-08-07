/**
 * THEME CONTEXT SYSTEM
 *
 * This file implements a React Context pattern for theme management:
 *
 * ThemeProvider: Controls UI changes by managing theme state and triggering re-renders
 * - Manages dark/light mode state
 * - Persists theme choice in AsyncStorage
 * - Provides theme data to wrapped components
 * - Triggers re-renders when theme changes
 *
 * useTheme: Provides access to theme values in wrapped components
 * - Reads current theme values from context
 * - Allows components to reference and update theme variables
 * - Gets latest state whenever provider updates
 * - Throws error if used outside ThemeProvider
 *
 * Usage:
 * 1. Wrap your app: <ThemeProvider><App /></ThemeProvider>
 * 2. Use in components: const { colors, isDarkMode, toggleDarkMode } = useTheme()
 *
 * The Provider controls the "source of truth" while useContext provides the "access point"
 * for components to read and update theme variables.
 */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
// async storage is React native's simple, promise-based API for persisting small bits of data on a user's device.
// Think of it as the web's localStorage but for mobile, async and cross-platform.

export interface ColorScheme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
  success: string;
  warning: string;
  danger: string;
  shadow: string;
  gradients: {
    background: [string, string];
    surface: [string, string];
    primary: [string, string];
    success: [string, string];
    warning: [string, string];
    danger: [string, string];
    muted: [string, string];
    empty: [string, string];
  };
  backgrounds: {
    input: string;
    editInput: string;
  };
  statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
  bg: "#f8fafc",
  surface: "#ffffff",
  text: "#1e293b",
  textMuted: "#64748b",
  border: "#e2e8f0",
  primary: "#3b82f6",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  shadow: "#000000",
  gradients: {
    background: ["#f8fafc", "#e2e8f0"],
    surface: ["#ffffff", "#f8fafc"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#9ca3af", "#6b7280"],
    empty: ["#f3f4f6", "#e5e7eb"],
  },
  backgrounds: {
    input: "#ffffff",
    editInput: "#ffffff",
  },
  statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
  bg: "#0f172a",
  surface: "#1e293b",
  text: "#f1f5f9",
  textMuted: "#94a3b8",
  border: "#334155",
  primary: "#60a5fa",
  success: "#34d399",
  warning: "#fbbf24",
  danger: "#f87171",
  shadow: "#000000",
  gradients: {
    background: ["#0f172a", "#1e293b"],
    surface: ["#1e293b", "#334155"],
    primary: ["#3b82f6", "#1d4ed8"],
    success: ["#10b981", "#059669"],
    warning: ["#f59e0b", "#d97706"],
    danger: ["#ef4444", "#dc2626"],
    muted: ["#374151", "#4b5563"],
    empty: ["#374151", "#4b5563"],
  },
  backgrounds: {
    input: "#1e293b",
    editInput: "#0f172a",
  },
  statusBarStyle: "light-content" as const,
};

type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ColorScheme;
};

// Create a context for the theme
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create a provider for the ThemeContext
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State of the mode

  useEffect(() => {
    // Get the user's choice from the last login
    AsyncStorage.getItem("darkMode").then((value) => {
      if (value) setIsDarkMode(JSON.parse(value));
    });
  }, []);

  async function toggleDarkMode() {
    // Function to toggle the mode
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem("darkMode", JSON.stringify(newMode));
  }

  const colors = isDarkMode ? darkColors : lightColors;

  // Return the ThemeContext.Provider with the values
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = () => {
  // Use the useContext hook to get the context, this is the access point for the components to read and update theme variables.
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context; // outside can get the values, aka values={{isDarkMode, toggleDarkMode, colors}} in ThemeContext.Provider
};
