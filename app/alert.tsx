import { LogoRect } from "@/components/LogoRect";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavBarBottom } from "@/components/NavBarBottom";
import { TrackableSection } from "@/components/HomeSection/TrackableStyle";
import { ScanSection } from "@/components/HomeSection/ScanSection";
import { AddressSection } from "@/components/HomeSection/AddressSection";
import { AstuceSection } from "@/components/HomeSection/AstuceSection";
import { PackageSection } from "@/components/HomeSection/PackageSection";
import { router } from "expo-router";


export default function Page() {

    const colors = useThemeColor();

    return (
        <RootView>
            <ScrollView style={styles.conatiner}>
               <ThemedText>Package</ThemedText>
            </ScrollView>
            <NavBarBottom />
        </RootView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingBottom: 200
    },
})