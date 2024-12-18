import React from "react";
import { Appearance, Pressable, useColorScheme } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { useDispatch, useSelector } from "react-redux";
// import { setTheme } from "@/redux/slice/userSlice";// Replace with your theme slice path
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const ThemeToggleButton = () => {
    const themeType = useColorScheme() || 'light';
  const dispatch = useDispatch();

  const handleThemeChange = (themeName : 'light'|'dark'| null) => {
    Appearance.setColorScheme(themeName);
  }

  const handleThemeToggle = () => {
    // dispatch(setTheme(themeType)); // Action to toggle the theme
    handleThemeChange(themeType === 'light' ? 'dark' : 'light');
  };

  return (
    <Pressable onPress={handleThemeToggle} >
      <ThemedText>{themeType === "light" ? <Ionicons name="moon" size={20} color={Colors[themeType].icon} /> :<Ionicons name="sunny" size={20} color={Colors[themeType].icon} /> }</ThemedText>
    </Pressable>
  );
};

export default ThemeToggleButton;
