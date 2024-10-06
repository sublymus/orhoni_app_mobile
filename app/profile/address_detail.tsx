import { StackModal } from "@/components/StackModal";
import { RootView } from "@/components/RootView";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useRoute } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { CARD_GAP } from "@/constants/Functions";
import { addressIcons } from "@/constants/LocalIcons";
import { AddressInterface } from "@/interfaces/app";
import { CardInput } from "@/components/CardInput";
import { useState } from "react";
import { addressesData } from "@/constants/Data";

export default function Page() {
    const params = useLocalSearchParams();
    const colors = useThemeColor();

    const [page, setPage] = useState<'confirm' | 'detail'>('confirm')
    return (
        <View style={styles.root}>
            <View style={styles.mapCtn}>
                <Image source={require('@/assets/images/Scene-1.jpg')} style={{ height: 'auto', width: Dimensions.get('screen').width, aspectRatio: Dimensions.get('screen').width / Dimensions.get('screen').height }} />
            </View>
            <Row style={styles.top}>
                <TouchableOpacity style={[styles.returnIcon,{backgroundColor: colors.background}]} onPress={()=>router.back()}>
                    <Image source={require('@/assets/icons/back.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                </TouchableOpacity>
                <Row style={[styles.search, { backgroundColor: colors.background }]}>
                    <Image source={require('@/assets/icons/search.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                    <TextInput placeholder="Search for address area" style={{ fontSize: 16 }} />
                </Row>
            </Row>
            <TouchableOpacity style={[
                styles.focusIcon,
                {
                    backgroundColor:colors.background,
                    bottom:300
                }]} onPress={()=>{
                console.log('Focus');
                
            }}>
                    <Image source={require('@/assets/icons/location-crosshairs.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                </TouchableOpacity>
            <StackModal
                background="#0005"
                canClose={page == 'detail'}
                position="bottom"
                // height={400}
                title="What's your name?"
                subtitle="This name is displayed in your reviews andThis name is displayed in your reviews and comments"
                onClose={() => {
                    setPage('confirm')
                }}
            >
                {
                    page == 'confirm' && <Confirm address={addressesData[2]} onConfirm={() => {
                        setPage('detail')
                    }} />
                }
                {
                    page == 'detail' && <AddDetails address={addressesData[2]} onAdded={((added) => {
                        router.back();
                    })} />
                }
            </StackModal>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    returnIcon:{
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    focusIcon:{
        position:'absolute',
        right:16,
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    mapCtn: {
        backgroundColor: '#455',
        flex: 1
    },
    conatiner: {
        flex: 1,
        padding: 24,
        paddingBottom: 200
    },
    top: {
        position: 'absolute',
        marginTop: 50,
        top: 0,
        right: 0,
        left: 0,
        height: 44,
        paddingHorizontal: CARD_GAP,
        gap: CARD_GAP
    },
    search: {
        borderRadius: 10,
        paddingHorizontal: 8,
        gap: 8,
        height: 38,
        flex: 1,
        overflow: 'hidden',
    },
})

function Confirm({ address, onConfirm }: { address: Partial<AddressInterface>, onConfirm: () => any }) {
    const colors = useThemeColor();
    return <View style={{
        padding: CARD_GAP * 1.5,
        gap: CARD_GAP * 2
    }}>
        <Row style={{
            gap: CARD_GAP
        }}>
            <View style={{ width: 44, height: 44, backgroundColor: colors.bleu + '23', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                <Image source={require('@/assets/icons/marker-outline.png')} style={{ width: 32, height: 32, transform: 'scale(0.8)' }} tintColor={colors.bleu} />
            </View>
            <View style={{ gap: 5 }}>
                <ThemedText variant="h3">{address.address?.split(',')[0]}</ThemedText>
                <ThemedText variant="discret">{address.address}</ThemedText>
            </View>
        </Row>
        <TouchableOpacity style={{
            backgroundColor: colors.bleu,
            borderRadius: CARD_GAP,
            alignItems: 'center',
            justifyContent: 'center',
            padding: CARD_GAP
        }} onPress={() => onConfirm()}>
            <ThemedText style={{ color: '#fff' }}>Confirm and add details</ThemedText>
        </TouchableOpacity>
    </View>
}

function AddDetails({ address, onAdded }: { address: Partial<AddressInterface>, onAdded: (added: { description: string, name: string, icon: string }) => any }) {
    const colors = useThemeColor();
    return <View style={{
        padding: CARD_GAP * 1.5,
        gap: CARD_GAP * 0.5
    }}>
        <View>
            <ThemedText variant="discret">Confirm and add details</ThemedText>
            <ScrollView horizontal>
                <Row style={{ gap: 10, paddingHorizontal: 24, paddingVertical: 8 }}>
                    <View style={{ width: 38, height: 38, borderWidth: 2, borderColor: colors.bleu + '55', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Image source={require('@/assets/icons/plus.png')} style={{ width: 16, height: 16, transform: 'scale(0.8)' }} tintColor={colors.bleu} />
                    </View>
                    {
                        Object.keys(addressIcons).map(k => (
                            <Row key={k} style={{ padding: 5, gap: 5, borderWidth: 2, borderColor: colors.bleu + '55', backgroundColor: colors.bleu + '23', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Image source={addressIcons[k as keyof typeof addressIcons]} style={{ width: 24, height: 24, transform: 'scale(0.8)' }} tintColor={colors.bleu} />
                                <ThemedText style={{ color: '#fff' }}>{k}</ThemedText>
                            </Row>
                        ))
                    }
                </Row>
            </ScrollView>
        </View>
        <CardInput initialValue="" onChange={() => 0} placeholder="Description" maxLenght={200} showLenght />
        <TouchableOpacity style={{
            backgroundColor: colors.bleu,
            borderRadius: CARD_GAP,
            alignItems: 'center',
            justifyContent: 'center',
            padding: CARD_GAP
        }} onPress={() => onAdded({ description: 'des', icon: 'ic', name: 'na' })}>
            <ThemedText style={{ color: '#fff' }}>Save address</ThemedText>
        </TouchableOpacity>
    </View>
}
