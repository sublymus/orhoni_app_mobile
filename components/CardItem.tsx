import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { Row } from "./Row";
import { CARD_BIG, CARD_MIN } from "@/constants/Functions";

type url<T> = T extends (p: infer U) => any ? U : never

type Props = ViewProps & {
    isFill?: boolean,
    type: 'mini' | 'big-inner' | 'big-contain' | 'big-cover'
    icon?: 'warning' | 'disable' | 'new' | 'plus',
    image?: ImageSourcePropType
    imageStyle?: ViewStyle
    title?: string
    height?: number,
    width?: number,
    onPress?:()=>any
}

export function CardItem({ icon, type, image, isFill, title, style, height, width,onPress,imageStyle, ...rest }: Props) {

    const colors = useThemeColor();
    
    return <TouchableOpacity onPress={onPress} style={[styles.container, { width }, style]} {...rest}>
        <Row style={[
            styles.card,
            {
                borderColor: colors.discret2,
                height,
                width
            },
            type == 'big-inner' && {
                padding: 10,
                gap: 8
            }
        ]}>
            <Image style={[
                styles.image,
                (type=='big-cover')&&{
                    height,
                    width:CARD_BIG
                },
                (type == 'mini' || type == 'big-contain') && {
                    width: width||CARD_MIN,
                    height: height||CARD_MIN
                },
                (type == 'big-inner') && {
                    width: 40,
                    height: 40
                },
                imageStyle
            ]} source={image} />
            {
                type == 'big-inner' &&
                <ThemedText style={[styles.title, { flexShrink: 1 }]}>{title}</ThemedText>
            }
        </Row>
        <ThemedText style={styles.title}>{type != 'big-inner' && title}</ThemedText>

        {
            icon && <View style={[styles.iconCtn, { backgroundColor: colors.background }]}>
                <Image style={[styles.icon]} source={
                    icon == 'disable' ? require('@/assets/icons/ban.png') :
                        icon == 'new' ? require('@/assets/icons/star.png') :
                            icon == 'plus' ? require('@/assets/icons/plus.png') :
                                icon == 'warning' ? require('@/assets/icons/question.png') : ''
                } tintColor={colors.discret} />
            </View>
        }

    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center',
        position:'relative',
    },
    card: {
        borderWidth: 2,
        borderRadius: 25,
        overflow:'hidden',
        justifyContent: 'center',
        alignItems:'center'
    },
    iconCtn: {
        width: 20,
        height: 20,
        top: 0,
        right: 0,
        position: 'absolute',
        borderRadius: 20,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: 12,
        height: 12,
    },
    image: {

    },
    title: {
        fontWeight: 500,
        flexWrap: 'nowrap'
    }
})

