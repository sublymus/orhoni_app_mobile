import { useThemeColor } from "@/hooks/useThemeColors";
import { Dimensions, Image, Pressable, ScrollView, StyleProp, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native"
import { Row } from "./Row";
import { ThemedText } from "./ThemedText";
import { CARD_GAP, MIN_SCREEN_MAX_WIDTH } from "@/constants/Functions";
import { Separator } from "./Separator";

type Props = {
    title?: string,
    subtitle?: string,
    canClose?: boolean,
    background?: string,
    height?: number,
    width?: number,
    style?: StyleProp<ViewStyle>
    children?: React.ReactNode
    position?: 'top' | 'center' | 'bottom';
    onClose?: () => any
}

export function StackModal({ position = 'center', title, subtitle, canClose, background, style, children, height, width, onClose, ...rest }: Props) {

    const colors = useThemeColor();

    width = width || Dimensions.get('window').width;
    width = width < MIN_SCREEN_MAX_WIDTH ? width : MIN_SCREEN_MAX_WIDTH
    console.log(style);

    return <View style={[styles.modal, styles.cardCtn, {
    },
        style,
    canClose ? styles.closableModal : {}
    ]} {...rest}

    >
        <View style={[{ flex: 1, position: 'relative', alignItems:'center' }, canClose ? (position == 'bottom' ? {
            justifyContent: 'flex-end'
        } : position == 'top' ? {
            justifyContent: 'flex-start'
        } : {
            justifyContent: 'center'
        }) : {},]}>
            <Pressable style={[styles.background, { backgroundColor: canClose ? background : undefined }]} onPress={(e) => {
                e.preventDefault();
                e.stopPropagation()
                if (e.currentTarget == e.target && canClose) {
                    onClose?.()
                }
            }}>

            </Pressable>

            <View style={[styles.card, {
                width,
                backgroundColor: colors.background,
            },
            canClose ? (position == 'bottom' ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            } :
                position == 'top' ? {
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0
                } :
                    {}) : {}
            ]}>
                <Row style={styles.top}>
                    <View style={{ maxWidth: width - 80, gap: 8 }}>
                        {
                            title && <ThemedText variant="h3">{title}</ThemedText>
                        }
                        {
                            subtitle && <ThemedText variant="discret">{subtitle}</ThemedText>
                        }
                    </View>
                    {
                        canClose && <TouchableOpacity style={[styles.close, { borderColor: colors.discret2 }]} onPress={() => onClose?.()}>
                            <Image source={require('@/assets/icons/x.png')} style={{ width: 24, height: 24, transform: 'scale(0.8)' }} tintColor={colors.color} />
                        </TouchableOpacity>
                    }
                </Row>
                <Separator/>
                <ScrollView style={{ flex: 0, maxHeight: height || Dimensions.get('window').height - 100 }}>
                    <View>
                        {
                            children
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    </View>
}

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        bottom: 0,
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom:0
    },
    closableModal: {
        top: 0,
        left: 0,
        right: 0,
        flex: 1,
        zIndex: 2,
    },
    cardCtn: {
        // alignItems: 'center',
        // flex: 1,
    },
    card: {
        borderRadius: 20,
        maxWidth: MIN_SCREEN_MAX_WIDTH,
        overflow: 'hidden'
    },
    top: {
        padding: CARD_GAP,
        justifyContent: 'space-between'
    },
    close: {
        padding: 0,
        borderRadius: 8,
        borderWidth: 2
    }
})