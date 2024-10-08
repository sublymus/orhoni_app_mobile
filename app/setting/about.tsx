import { AddressItem } from "@/components/AddressItem";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { addressesData } from "@/constants/Data";
import { useThemeColor } from "@/hooks/useThemeColors";
import { Link, router } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const dataAbout = [{
    image: require('@/assets/images/1_tNBQey4xUwW_1p5DbRCKWg.webp'),
    type: 'image' as const
}, {
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, natus architecto asperiores expedita temporibus vel soluta ex quam itaque delectus tempora sed earum voluptatum tempore magnam non porro beatae voluptate!',
    image: require('@/assets/images/istockphoto-1346944001-612x612.jpg'),
    type: 'image-text' as const
}, {
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, natus architecto asperiores expedita temporibus vel soluta ex quam itaque delectus tempora sed earum voluptatum tempore magnam non porro beatae voluptate!',
    image: require('@/assets/images/pet-collar-QR.jpg'),
    type: 'text-image' as const
}, {
    image: require('@/assets/images/pets.jpg'),
    type: 'image' as const
}, {
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, natus architecto asperiores expedita temporibus vel soluta ex quam itaque delectus tempora sed earum voluptatum tempore magnam non porro beatae voluptate!',
    type: 'text' as const
},]


export default function Page() {

    const colors = useThemeColor();

    return (
        <RootView>
            <ScrollView >
                <Row style={styles.top}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/back.png')} style={styles.topIcon} tintColor={colors.color} />
                    </TouchableOpacity>
                    <ThemedText variant="h1">About</ThemedText>
                    <View style={styles.topIcon} />
                </Row>
                <View style={styles.sections}>
                    {
                        dataAbout.map(d => (
                            <View key={d.image}>
                                <Row style={styles.section}>
                                    {
                                        (d.type == 'image-text') && <>
                                            <Image style={styles.image} source={d.image} />
                                            <ThemedText style={styles.message}>{d.message}</ThemedText>
                                        </>
                                    }
                                    {
                                        (d.type == 'text-image') && <>
                                            <ThemedText style={styles.message}>{d.message}</ThemedText>
                                            <Image style={styles.image} source={d.image} />
                                        </>
                                    }
                                </Row>
                                {
                                    (d.type == 'image') && <Image style={[styles.image, { aspectRatio: 2 }]} source={d.image} />
                                }
                                {
                                    (d.type == 'text') && <ThemedText style={[styles.message, { paddingHorizontal: 24 }]}>{d.message}</ThemedText>
                                }
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </RootView>
    )
}

const styles = StyleSheet.create({
    top: {
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        paddingHorizontal: 24
    },
    topIcon: {
        width: 24,
        height: 24
    },
    section: {
        gap: 24,
        flex: 1,
        padding: 24,
    },
    sections: {
        paddingBottom: 100,
        gap: 24,
        flex: 1,
        alignSelf: 'stretch'
    },
    message: {
        flex: 1,
        padding: 0
    },
    image: {
        flex: 1,
        width: 'auto',
        height: 'auto',
        aspectRatio: 1
    }
})