import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { CardItem } from "../CardItem";
import { CARD_BIG, CARD_GAP, CARD_MIN } from "@/constants/Functions";


export function AddressSection() {

    const colors = useThemeColor();

    return <View style={styles.section}>
        <TouchableOpacity style={styles.title}>
            <Row>
                <ThemedText variant="h2">Addresses</ThemedText>
                <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 24, height: 24 }} tintColor={colors.color} />
            </Row>
        </TouchableOpacity>
        <Row style={[styles.items, { columnGap: CARD_GAP }]}>
            <CardItem width={CARD_BIG} height={CARD_MIN} title="Home" type={'big-cover'} style={{alignItems:'center', justifyContent:'center'}} image={require('@/assets/images/address-2.jpg')} />
            {
                Array.from({ length: 2 }).map((c, i) => (
                    <CardItem key={i} width={CARD_MIN} height={CARD_MIN} title="Office"  type={'mini'} image={require('@/assets/images/address-2.jpg')} />
                ))
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
    items: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    }
})