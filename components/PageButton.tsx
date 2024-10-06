import { Image, ImageSourcePropType, ImageStyle, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Row } from "./Row";
import { useThemeColor } from "@/hooks/useThemeColors";
import { ThemedText } from "./ThemedText";

type Props = {
    style?: ViewStyle,
    iconSource?: ImageSourcePropType,
    iconStyle?:ImageStyle
    rightIconSource?: ImageSourcePropType|null,
    iconRightStyle?:ImageStyle
    title: string,
    description?: string,
    tintColor?: string,
    onPress?: () => any,
    separator?: boolean,
}

export function PageButton({ iconSource, title, description, style, tintColor, onPress, rightIconSource, iconRightStyle,iconStyle }: Props) {

    const colors = useThemeColor();

    return <TouchableOpacity style={[styles.page, style]} onPress={onPress}>
        <Row>
            <View style={[styles.iconCtn, { backgroundColor: colors.discret2 }]}>
                {iconSource && <Image source={iconSource} style={[{ width: 24, height: 24 },iconStyle]} tintColor={tintColor||colors.color} />}
            </View>
            <Row style={styles.right}>
                <View style={{ flex: 1 }}>
                    <ThemedText variant="h3">{title}</ThemedText>
                    {description && <ThemedText style={{marginTop:5}} color="discret">{description}</ThemedText>}
                </View>
                {rightIconSource!==null && <Image source={rightIconSource||require('@/assets/icons/angle-small-right.png')} style={[{ width: 20, height: 20, marginLeft: 'auto' },iconRightStyle]} tintColor={tintColor || colors.color} />}
            </Row>
        </Row>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    page: {
        paddingVertical: 12,
    },
    text: {
        marginLeft: 24,
        flex: 1
    },
    iconCtn: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    right: {
        flex: 1,
        marginLeft: 24
    },
})