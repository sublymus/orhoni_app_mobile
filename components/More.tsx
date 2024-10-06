import { Image, StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { ThemedText } from "./ThemedText";
import { CARD_MIN } from "@/constants/Functions";
import { useThemeColor } from "@/hooks/useThemeColors";

type Props = ViewProps

export function More({style,...rest}:Props) {
    
    const colors = useThemeColor()

    return <TouchableOpacity >
    <View style={[styles.more, { borderColor: colors.discret2 },style]} {...rest}>
        <ThemedText>More</ThemedText>
        <Image source={require('@/assets/icons/arrow-small-left.png')} style={styles.moreImg} tintColor={colors.discret} />
    </View>
</TouchableOpacity>
}


const styles = StyleSheet.create({
    more: {
        borderWidth: 2,
        borderRadius: 25,
        width: CARD_MIN,
        height: CARD_MIN,
        alignItems: 'center',
        justifyContent: 'center'
    },
    moreImg: {
        width: 24,
        height: 24,
        transform: 'scale(-1)'
    }
})