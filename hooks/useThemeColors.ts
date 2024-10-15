import { Colors } from "@/constants/Colors";
import { useAppStore } from "@/stores/Appstore";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

export function useThemeColor() {
    const {theme:prefTheme, isSystem, setTheme}= useAppStore();

    const system = useColorScheme()
    const theme =(isSystem) ? system  : prefTheme
    
    return Colors[theme??'light'];
}
