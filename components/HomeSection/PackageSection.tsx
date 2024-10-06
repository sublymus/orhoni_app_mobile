import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { CardItem } from "../CardItem";
import { CARD_BIG, CARD_GAP, CARD_MIN, IS_MIN_SCREEN } from "@/constants/Functions";


export function PackageSection() {

    const colors = useThemeColor();

    return <View style={styles.section}>
        <TouchableOpacity style={styles.title}>
            <Row>
                <ThemedText variant="h2">Addresses</ThemedText>
                <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 24, height: 24 }} tintColor={colors.color} />
            </Row>
        </TouchableOpacity>
        <Row style={[styles.items, { columnGap: CARD_GAP }]}>
            <CardItem width={CARD_BIG} height={CARD_MIN} title="Current" type={'big-cover'} image={require('@/assets/3d-images/medal-dynamic-premium256x256.png')} imageStyle={{height:CARD_MIN, width:CARD_MIN,transform:'scale(0.8)'}}  />
            {/* <CardItem width={IS_MIN_SCREEN?CARD_MIN:CARD_BIG} height={CARD_MIN} title="Upgrade"  type={'mini'} image={require('@/assets/3d-images/wallet-dynamic-color256x256.png')} /> */}
            
            <CardItem width={IS_MIN_SCREEN?CARD_MIN:CARD_BIG} height={CARD_MIN} title="Upgrade"  type={'mini'} image={require('@/assets/3d-images/wallet-dynamic-premium256x256.png')} imageStyle={{transform:'scale(0.8)'}} />
            <CardItem width={IS_MIN_SCREEN?CARD_MIN:CARD_BIG} height={CARD_MIN} title="History"  type={'mini'} image={require('@/assets/3d-images/copy-dynamic-color256x256.png')} imageStyle={{transform:'scale(0.8)'}}/>
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
    items: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    }
})