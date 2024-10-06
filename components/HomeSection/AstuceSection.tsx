import { useThemeColor } from "@/hooks/useThemeColors";
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { CardItem } from "../CardItem";
import { AstuceItem } from "./AstuceItem";

let w = Dimensions.get('window').width;
w = w > 560 ? 560 : w;
const gap = w < 360 ? 12 : 16;
const size = (w - 7 * gap) / 4;
const card_big = size * 2 + gap - 2
const card_min = size

export function AstuceSection() {

    const colors = useThemeColor();

    return <View style={styles.section}>
        <TouchableOpacity style={styles.title}>
            <Row>
                <ThemedText variant="h2">Astuces / Tricks</ThemedText>
                <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 23, height: 24 }} tintColor={colors.color} />
            </Row>
        </TouchableOpacity>
        <ScrollView horizontal>
            <Row style={styles.items}>
                {
                    [
                        { title: 'All about Qr Code', icon: 'https://static-00.iconduck.com/assets.00/qr-scan-icon-512x512-9bsp061y.png', subtitle: 'new code, edit code, disable', tintColor: colors.color },
                        { title: 'Manage Trackable', icon: 'https://cdn-icons-png.flaticon.com/512/1673/1673221.png' },
                        { title: 'Define personal data to help us', icon: 'https://cdn-icons-png.flaticon.com/512/5763/5763612.png', subtitle: 'new code, edit code, disable' },
                        { title: 'Choose Package ', icon: 'https://cdn-icons-png.flaticon.com/256/4108/4108843.png', subtitle: 'new code, edit code, disable' },
                    ].map((c, i) => (
                        <AstuceItem key={i} astuce={c} tintColor={c.tintColor} />
                    ))
                }
            </Row>
        </ScrollView>
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
        justifyContent: 'flex-start',
        gap:12
    }
})