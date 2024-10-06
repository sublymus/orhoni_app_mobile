import { useThemeColor } from "@/hooks/useThemeColors";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { CardItem } from "../CardItem";

let w = Dimensions.get('window').width;
w = w > 560 ? 560 : w;
const gap = w < 360 ? 12 : 16;
const size = (w-7*gap)/4;
const card_big = size*2+gap-2
const card_min = size

export function AlertSection() {
    
    const colors = useThemeColor();

    return  <View style={styles.section}>
    <TouchableOpacity style={styles.title}>
        <Row>
            <ThemedText variant="h2">Alerts</ThemedText>
            <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 23, height: 24 }} tintColor={colors.color} />
        </Row>
    </TouchableOpacity>
    <Row style={[styles.trackableItems, { columnGap: gap }]}>
        <CardItem style={[styles.addPerson]} width={card_big} height={card_min} title="Add new Person" type={'big-inner'} icon="plus" image={require('@/assets/3d-images/video-camera-dynamic-color_128x128.png')} />
        <CardItem style={[styles.addPet]} width={card_big} height={card_min} title="Add new Pet" type={'big-inner'} icon="plus" image={require('@/assets/3d-images/video-camera-dynamic-color_128x128.png')} />
        <CardItem style={[styles.addObject]} width={card_big} height={card_min} title="Add new Object" type={'big-inner'} icon="plus" image={require('@/assets/3d-images/video-camera-dynamic-color_128x128.png')} />
        {/* <View style={styles.separator}></View> */}
        {
            Array.from({ length: 6 }).map((c, i) => (
                <CardItem key={i} style={[styles.trackable]} width={card_min} height={card_min} title="Add " type={'mini'} icon="plus" image={require('@/assets/3d-images/video-camera-dynamic-color_128x128.png')} />
            ))
        }
    </Row>
</View>
}

const styles =StyleSheet.create({
    section: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
    },
    title: {
        alignSelf: 'flex-start',
        marginVertical: 24
    },
    addPerson: {
        flex: 0
    },
    addPet: {
        flex: 0
    },
    addObject: {
        flex: 0
    },
    trackable: {
        flex: 0
    },
    separator: {
    },
    trackableItems: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    }
})