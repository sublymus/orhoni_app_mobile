import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TouchableOpacity, View, ViewProps } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { limit } from "@/constants/Functions";

type Props = {
    onPress?:()=>any
}

export function ScanItem({ onPress }: Props) {

    const colors = useThemeColor();

    return <TouchableOpacity style={[styles.scan, { borderColor: colors.discret2 }]} onPress={onPress}>
        <Row style={styles.photoCtn}>
            <Image source={require('@/assets/images/3408.webp')} style={styles.photo} />
            {/* {<Image source={require('@/assets/icons/qrcode.png')} style={styles.icon_geo} tintColor={colors.color} />} */}
        </Row>
        <View style={[styles.infos, { backgroundColor: colors.background }]}>

            <ThemedText style={styles.name} variant="h3">{limit(' de la beuFifi dJjexter de la beu', 25)}</ThemedText>
            <Row style={{ alignItems: 'flex-start', gap: 8 }}>
                <Image source={require('@/assets/icons/marker-outline.png')} style={styles.icon_geo} tintColor={colors.primary} />
                <ThemedText style={styles.address} variant="discret">{limit('5, проспект Космонавтов, СЖМ, Ворошиловjский район, Rostov-sur-le-Don, Rostov-on-Don, Oblast de Rostov, District fédéral du Sud, 344092, Russie', 150)}</ThemedText>
            </Row>
            <ThemedText style={[styles.dateTime]} variant="h4">{new Date().toLocaleDateString('en', {
                day:'numeric',
                year:'numeric',
                month:'long'
            })}</ThemedText>
        </View>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    scan: {
        gap: 12,
        width: 160,
        height: 180,
        alignSelf: 'stretch',
        alignItems: 'flex-start',
        borderRadius: 20,
        borderWidth: 2,
        overflow: 'hidden'
    },
    photoCtn: {
        // gap:12
        height: 130,
        width: 160
    },
    photo: {
        height: 130,
        width: 160,
        borderRadius: 20,
    },
    name: {
        maxHeight: 18,
    },
    icon_geo: {
        width: 24,
        height: 24
    },
    address: {
        maxHeight: 42,

        overflow: 'hidden'
    },
    infos: {
        height: 100,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        borderRadius: 20,
        justifyContent: 'space-around',
        padding: 8
    },
    dateTime: {
        opacity:0.6
    }

})