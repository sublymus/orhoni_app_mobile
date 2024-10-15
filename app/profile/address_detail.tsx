import { useThemeColor } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { CARD_GAP, limit } from "@/constants/Functions";
import { addressIcons } from "@/constants/LocalIcons";
import { AddressInterface, AddressResultInterface, FromApiLocation } from "@/interfaces/app";
import { CardInput } from "@/components/CardInput";
import { useEffect, useState } from "react";
import MapView, { Marker, MarkerAnimated, PROVIDER_GOOGLE } from 'react-native-maps';
import { useUserStore } from "@/stores/UserStore";
import { AsyncStorage } from "@/Functions/AsyncStorage";
import { StackModal } from "@/components/StackModal";
import { addressesData, mapStyle } from "@/constants/Data";
import { PageButton } from "@/components/PageButton";
import { useAppStore } from "@/stores/Appstore";



let lastPlace = 0


export default function Page() {
    const params = useLocalSearchParams();
    const colors = useThemeColor();
    const { theme ,isSystem} = useAppStore();
    const system = useColorScheme()
    const { userRegion, setUserRegion } = useUserStore()

    const [page, setPage] = useState<'confirm' | 'detail'>('confirm');
    const [collected, setCollected] = useState<Partial<AddressInterface> | null>(null)

    const [search, setSearch] = useState(collected?.address);



    const changePosition = async (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setCollected({
            ...collected,
            longitude: longitude + '',
            latitude: latitude + ''
        })

        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            const a = await response.json() as AddressResultInterface

            setSearch(a.display_name,)
            if (!a) return
            if (a.place_id !== lastPlace) {
                lastPlace = a.place_id;
                setCollected({
                    ...collected,
                    address: a.display_name,
                    longitude: longitude + '',
                    latitude: latitude + ''
                })
                setUserRegion({
                    longitude: longitude,
                    latitude: latitude
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={styles.root}>
            <View style={[styles.mapCtn, { backgroundColor: colors.background, }]}>
                {/* <Image source={require('@/assets/images/Scene-1.jpg')} style={{ height: 'auto', width: Dimensions.get('screen').width, aspectRatio: Dimensions.get('screen').width / Dimensions.get('screen').height }} /> */}
                <MapView
                    style={[styles.map, { height: Dimensions.get('window').height - 230, }]}
                    initialRegion={userRegion}
                    // region={(collected?.latitude) ? {
                    //     latitude: parseFloat(collected.latitude || '0.0'),
                    //     longitude: parseFloat(collected.longitude || '0.0'),
                    //     latitudeDelta: 0.0,
                    //     longitudeDelta: 0.0
                    // } : undefined}
                    zoomEnabled
                    zoomControlEnabled
                    // cameraZoomRange={{ animated: true }}
                    customMapStyle={(isSystem?system:theme) == 'dark' ? mapStyle.night : mapStyle.standard}
                    provider={PROVIDER_GOOGLE} //IOS
                    onRegionChange={(region) => {
                        // console.log(region);//on drag
                    }}
                    onPoiClick={changePosition}
                    onPress={changePosition}
                >
                    <Marker
                        coordinate={{
                            latitude: parseFloat(collected?.latitude || '0.0'),
                            longitude: parseFloat(collected?.longitude || '0.0'),
                        }}
                        title={'Current user Region'}
                        description={'Description Lorem ipsum Current user Region '}
                        image={require('@/assets/icons/map-marker-plus-outline.png')}

                        onPress={() => {
                            console.log('Press');
                        }}
                    />
                    {/* <Marker draggable
                        coordinate={userRegion || { longitude: 0, latitude: 0 }}
                        onDragEnd={(e) =>{
                            console.log(e.nativeEvent.coordinate);  
                        }}
                        onPress={()=>{
                            console.log('Press');
                            
                        }}
                    /> */}
                </MapView>
            </View>
            <Row style={styles.top}>
                <TouchableOpacity style={[styles.returnIcon, { backgroundColor: colors.background }]} onPress={() => router.back()}>
                    <Image source={require('@/assets/icons/back.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                </TouchableOpacity>
                <Row style={[styles.search, { backgroundColor: colors.background }]}>
                    <Image source={require('@/assets/icons/search.png')} style={{ width: 20, height: 20 }} tintColor={colors.color} />
                    <TextInput value={search} placeholder="Search for address area" style={{ fontSize: 16 }} />
                </Row>
            </Row>
            <TouchableOpacity style={[
                styles.focusIcon,
                {
                    backgroundColor: colors.background,
                    bottom: 400
                }]} onPress={() => {
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
                    page == 'confirm' && <Confirm address={collected || {}} onConfirm={() => {
                        setPage('detail')
                    }} />
                }
                {
                    page == 'detail' && <AddDetails address={collected || {}} onAdded={((added) => {
                        // router.back();
                        console.log({...collected,...added});
                    })} />
                }
            </StackModal>
        </View>
    )
}

function MyCustomMarkerView() {
    return
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    returnIcon: {
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    focusIcon: {
        position: 'absolute',
        right: 16,
        width: 38,
        height: 38,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10
    },
    mapCtn: {
        flex: 1
    },
    map: {
        width: '100%',
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
        gap: CARD_GAP * 2,
        height: 190
    }}>
        {
          address.address &&  <Row style={{
                gap: CARD_GAP
            }}>
                <View style={{ width: 44, height: 44, backgroundColor: colors.bleu + '23', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                    <Image source={require('@/assets/icons/marker-outline.png')} style={{ width: 32, height: 32, transform: 'scale(0.8)' }} tintColor={colors.bleu} />
                </View>
                <View style={{ gap: 5, paddingRight: 24 }}>
                    <ThemedText variant="h3">{address.address?.split(',')[0]}</ThemedText>
                    <ThemedText variant="discret">{limit(address.address, 100)}</ThemedText>
                </View>
            </Row>
        }
        {
            address.address && <TouchableOpacity style={{
                backgroundColor: colors.bleu,
                borderRadius: CARD_GAP,
                alignItems: 'center',
                justifyContent: 'center',
                padding: CARD_GAP
            }} onPress={() => onConfirm()}>
                <ThemedText style={{ color: '#fff' }}>Confirm and add details</ThemedText>
            </TouchableOpacity>
        }{
            !address.address && <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <ThemedText color="discret">Click on map🗺️ to set your address</ThemedText>
            </View>
        }
    </View>
}

function AddDetails({ address, onAdded }: { address: Partial<AddressInterface>, onAdded: (added: { description: string, name: string, icon: string }) => any }) {
    const colors = useThemeColor();
    const [name, setName] = useState(address.name || address.address?.split(',')[0] || '')
    const [description, setDescription] = useState(address.description || '')
    const [iconName, setIconName] = useState(Object.keys(addressIcons)[0])
    return <View style={{
        padding: CARD_GAP * 1.5,
        gap: CARD_GAP * 0.5
    }}>
        <View>
            <ThemedText variant="discret">Confirm and add details</ThemedText>
            <ScrollView horizontal>
                <Row style={{ gap: 10, paddingHorizontal: 24, paddingVertical: 8 }}>
                    {
                        Object.keys(addressIcons).map(k => (
                            <Pressable key={k} style={{
                                padding: 5,
                                gap: 5,
                                borderWidth: 2,
                                borderColor: colors.bleu + '55',
                                backgroundColor: iconName == k ? colors.bleu + '23' : undefined,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                transform: iconName == k ? 'scale(1.1)' : 'scale(0.9)'
                            }}
                                onPress={() => {
                                    setIconName(k);
                                }}>
                                <Image source={addressIcons[k as keyof typeof addressIcons]} style={{ width: 24, height: 24, transform: 'scale(0.8)' }} tintColor={colors.bleu} />
                            </Pressable>
                        ))
                    }
                </Row>
            </ScrollView>
        </View>

        <CardInput initialValue={name} onChange={(n) => setName(n)} placeholder="Name" maxLenght={200} showLenght />
        <CardInput initialValue={description} onChange={(d) => setDescription(d)} placeholder="Description" maxLenght={200} showLenght />

        <TouchableOpacity style={{
            backgroundColor: colors.bleu,
            borderRadius: CARD_GAP,
            alignItems: 'center',
            justifyContent: 'center',
            padding: CARD_GAP
        }} onPress={() => onAdded({ description, icon: iconName, name })}>
            <ThemedText style={{ color: '#fff' }}>Save address</ThemedText>
        </TouchableOpacity>
    </View>
}
