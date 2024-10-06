import { useThemeColor } from "@/hooks/useThemeColors";
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Row } from "../Row";
import { ThemedText } from "../ThemedText";
import { CardItem } from "../CardItem";
import { CARD_BIG, CARD_GAP, CARD_MIN } from "@/constants/Functions";
import { ScanItem } from "./ScanItem";
import { More } from "../More";


export function ScanSection() {

    const colors = useThemeColor();

    return <View style={styles.section}>
        <TouchableOpacity style={styles.title}>
            <Row>
                <ThemedText variant="h2">Scans</ThemedText>
                <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 23, height: 24 }} tintColor={colors.color} />
            </Row>
        </TouchableOpacity>
        <ScrollView horizontal >
           <View style={styles.scroll}>
           {
                Array.from({ length: 6 }).map((c, i) => (
                    <ScanItem key={i}/>
                ))
            }
            <More style={{
                flex:1,
                height:'auto'
            }} />
           </View>
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
    scroll:{
        flexDirection:'row',
        gap:CARD_GAP
    }
})