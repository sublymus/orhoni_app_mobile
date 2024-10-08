import { Colors } from "@/constants/Colors";
import { useAppStore } from "@/stores/Appstore";
import { useColorScheme } from "react-native";

export function useThemeColor() {
    const {theme:prefThem}= useAppStore();

    const system = useColorScheme()
    const theme =(prefThem == 'system') ? system  : prefThem
    
    return Colors[theme??'light'];
}