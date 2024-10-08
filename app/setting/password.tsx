import {  AddressItem } from "@/components/AddressItem";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { addressesData } from "@/constants/Data";
import { useThemeColor } from "@/hooks/useThemeColors";
import { Link, router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Page() {

    const colors = useThemeColor();

    return (
        <RootView>
            <ScrollView >
                <View style={styles.conatiner}>
                    <Row style={styles.top}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} style={styles.topIcon} tintColor={colors.color} />
                        </TouchableOpacity>
                        <ThemedText variant="h1">Password</ThemedText>
                        <Image source={require('@/assets/icons/menu-dots.png')} style={[styles.topIcon, { transform: [{ rotate: '90deg' }, { scale: 0.8 }] }]} tintColor={colors.color} />
                    </Row>
                    
                </View>
            </ScrollView>
        </RootView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingTop: 12,
        gap: 16,
        paddingBottom: 100
    },
    top: {
        justifyContent: 'space-between'
    },
    topIcon: {
        width: 24,
        height: 24
    }
})