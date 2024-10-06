import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { CardItem } from "../CardItem";
import { CARD_BIG, CARD_GAP, CARD_MIN } from "@/constants/Functions";

interface AstuceInterface {
    title: string,
    subtitle?: string,
    icon: string,
}

type Props = ViewProps & {
    astuce: AstuceInterface,
    onPress?: () => any,
    tintColor?: string
}

export function AstuceItem({ astuce, onPress, style, tintColor, ...rest }: Props) {

    const colors = useThemeColor();

    return <TouchableOpacity style={[styles.astuce, { borderColor: colors.discret2 }, style]} {...rest} onPress={() => onPress?.()}>
        <Image source={{ uri: astuce.icon }} style={styles.icon} tintColor={tintColor} />
        <View style={styles.textZoon}>
            <ThemedText style={styles.title}>{astuce.title}</ThemedText>
            <ThemedText style={[styles.subtitle, { color: colors.discret }]}>{astuce.subtitle||'Let see more'}</ThemedText>
        </View>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    astuce: {
        width: 130,
        height: 130,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        borderRadius: 20,
        borderWidth: 2,
        overflow: 'hidden',
        padding: 8
    },
    textZoon:{
        flex:1,
        gap:2,
        justifyContent:'flex-end'
    },
    icon: {
        width: 36,
        height: 36,
    },
    title: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 13,
        opacity:0.8
    }

})