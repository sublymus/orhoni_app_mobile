import { RootView } from "@/components/RootView";
import { useThemeColor } from "@/hooks/useThemeColors";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Page() {

    const colors = useThemeColor();

    return (
        <RootView>
            <ScrollView style={styles.conatiner}>
                <Text>Social</Text>
            </ScrollView>
        </RootView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingBottom: 200
    }
})