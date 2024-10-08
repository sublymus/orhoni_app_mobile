import { LogoRect } from "@/components/LogoRect";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavBarBottom } from "@/components/NavBarBottom";
import { TrackableSection } from "@/components/HomeSection/TrackableStyle";
import { ScanSection } from "@/components/HomeSection/ScanSection";
import { AddressSection } from "@/components/HomeSection/AddressSection";
import { AstuceSection } from "@/components/HomeSection/AstuceSection";
import { PackageSection } from "@/components/HomeSection/PackageSection";
import { router } from "expo-router";


export default function Page() {

    const colors = useThemeColor();

    return (
        <RootView>
            <ScrollView style={styles.conatiner}>
                <Row style={styles.topBar}>
                    <LogoRect />
                    <Row style={styles.topBarRight}>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/search.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/bell-outline.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image source={require('@/assets/icons/user-outline.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                        </TouchableOpacity>
                    </Row>
                </Row>
                <TouchableOpacity style={styles.profile} onPress={()=>router.push('/profile/setting')}>
                    <View style={styles.photo}>
                        <Image source={require('@/assets/3d-images/video-camera-dynamic-color_256_256.png')} style={{ width: 80, height: 80 }} />
                    </View>
                    <Image source={require('@/assets/icons/pencil-outline.png')} style={{ width: 16, height: 16 }} tintColor={colors.discret} />
                    <Row >
                        <ThemedText>{'+7 999 862-7441'} {'. '}</ThemedText><ThemedText style={{ color: colors.discret }}>{'Add user name'}</ThemedText>
                    </Row>
                </TouchableOpacity>
                
                <TrackableSection />
                <ScanSection />
                <AddressSection />
                <AstuceSection />
                {/* <AlertSection /> */}
                <PackageSection />

                <View style={{ height: 160, width: 200 }}><Text>.</Text></View>
            </ScrollView>
            <NavBarBottom />
        </RootView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingBottom: 200
    },
    topBar: {
        alignSelf: 'stretch',
        justifyContent: 'space-between',
    },
    topBarRight: {
        gap: 16
    },
    profile: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8
    },
    photo: {
        backgroundColor: '#345',
        borderRadius: 80,
        width: 90,
        height: 90,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        alignSelf: 'stretch',
        alignItems: 'flex-start',
    },
})