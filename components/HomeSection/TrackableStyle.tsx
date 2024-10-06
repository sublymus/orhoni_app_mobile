import { useThemeColor } from "@/hooks/useThemeColors";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { CardItem } from "../CardItem";
import { CARD_BIG, CARD_GAP, CARD_MIN } from "@/constants/Functions";
import { More } from "../More";

export function TrackableSection() {

    const colors = useThemeColor();

    return <View style={styles.section}>
        <TouchableOpacity style={styles.title}>
            <Row>
                <ThemedText variant="h2">Trackables</ThemedText>
                <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 23, height: 24 }} tintColor={colors.color} />
            </Row>
        </TouchableOpacity>
        <Row style={[styles.trackableItems, { columnGap: CARD_GAP }]}>
            <CardItem width={CARD_BIG} height={CARD_MIN} title="Add new Person" type={'big-inner'} icon="plus" image={require('@/assets/3d-images/bleu_3d_user.png')} />
            <CardItem width={CARD_BIG} height={CARD_MIN} title="Add new Pet" type={'big-inner'} icon="plus" image={require('@/assets/3d-images/pet_hand.png')} />
            <CardItem width={CARD_BIG} height={CARD_MIN} title="Add new Object" type={'big-inner'} icon="plus" image={require('@/assets/3d-images/cube-dynamic-color256x256.png')} />
            {/* <View style={styles.separator}></View> */}
            {
                Array.from({ length: 5 }).map((c, i) => (
                    <CardItem key={i} width={CARD_MIN} height={CARD_MIN} type={'mini'} icon="plus" image={require('@/assets/3d-images/plus-dynamic-color256x256.png')} />
                ))
            }
            {
                6 > 5 && <More/>
            }
        </Row>
    </View>
}

const styles = StyleSheet.create({
    section: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
    },
    title: {
        alignSelf: 'flex-start',
        marginVertical: 24
    },
    separator: {
    },
    trackableItems: {
        flex: 1,
        flexWrap: 'wrap',
        alignItems:'flex-start',
        justifyContent: 'flex-start'
    },
    
})