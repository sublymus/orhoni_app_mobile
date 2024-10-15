import { CheckBox } from "@/components/CheckBox";
import { LoadingIcon } from "@/components/LoadingIcon";
import { MiniConfirm } from "@/components/MiniConfirm";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { StackModal } from "@/components/StackModal";
import { ThemedText } from "@/components/ThemedText";
import { devicesData } from "@/constants/Data";
import { useThemeColor } from "@/hooks/useThemeColors";
import { ContactInterface, DeviceInterface } from "@/interfaces/app";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View, ViewStyle, useColorScheme } from "react-native";

import UAParser from "ua-parser-js";

const devices = {
    'default': require('@/assets/icons/laptop-mobile-outline.png'),
    'ios': require('@/assets/icons/apple.png'),
    'windows': require('@/assets/icons/windows.png'),
    'android': require('@/assets/icons/android.png'),
    'linux': require('@/assets/icons/linux.png'),
    'mac os': require('@/assets/icons/apple.png'),
}

const navigators = {
    'chrome': require('@/assets/icons/x.png'),
    'mobile safari': require('@/assets/icons/x.png'),
    'safari': require('@/assets/icons/x.png'),
    'firfox': require('@/assets/icons/x.png'),
    'ie': require('@/assets/icons/x.png'),
}


export default function Page() {

    const colors = useThemeColor();
    const [modalChildren, setModalChildren] = useState<{ title: string, subtitle: string, children: React.ReactNode } | null>(null);
    const theme = useColorScheme()

    const [seleted, setSelected] = useState('')

    return (
        <RootView>
            <ScrollView >
                <View style={styles.conatiner}>
                    <Row style={styles.top}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} style={styles.topIcon} tintColor={colors.color} />
                        </TouchableOpacity>
                        <ThemedText variant="h1">Devices</ThemedText>
                        <Image source={require('@/assets/icons/menu-dots.png')} style={[styles.topIcon, { transform: [{ rotate: '90deg' }, { scale: 0.8 }] }]} tintColor={colors.color} />
                    </Row>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Row style={[styles.addBtn, { backgroundColor: colors.bleu + '33' }]}>
                            <Image source={require('@/assets/icons/laptop-mobile-outline.png')} style={{ width: 20, height: 20 }} tintColor={colors.bleu} />
                            <Text style={{ color: colors.bleu, fontWeight: 600 }}>Add New Device</Text>
                            <Image source={require('@/assets/icons/qrcode.png')} style={{ marginLeft: 'auto', width: 20, height: 20 }} tintColor={colors.bleu} />
                        </Row>
                    </TouchableOpacity>
                    {
                        devicesData.map(a => (
                            <DeviceItem key={a.user_agent + a.created_at} device={a} onPress={()=>{
                                setModalChildren({
                                    title: 'Disconnection',
                                    subtitle: 'you will be disconnected from this device',
                                    children: <MiniConfirm onCancel={() => {
                                        setModalChildren(null);
                                    }} onConfirm={() => {
                                        setModalChildren(null)
                                    }} />
                                })
                            }}/>
                        ))
                    }
                </View>
            </ScrollView>
            {
                modalChildren && <StackModal canClose width={Dimensions.get('window').width - 48} background="#3445" position="center" onClose={() => {
                    setModalChildren(null)
                }} {...modalChildren}>{modalChildren.children}</StackModal>
            }
        </RootView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingTop: 12,
        gap: 16,
        paddingBottom: 100
    },
    top: {
        justifyContent: 'space-between'
    },
    topIcon: {
        width: 24,
        height: 24
    },
    addBtn: {
        padding: 12,
        gap: 12,
        borderRadius: 10,
    }
})



type Props = {
    device: DeviceInterface,
    onPress?: () => any
}

const cacheDevise: Record<string, UAParser.IResult> = {}

export function DeviceItem({ device, onPress }: Props) {

    const colors = useThemeColor();
    const result = cacheDevise[device.user_agent] || (cacheDevise[device.user_agent] = new UAParser().setUA(device.user_agent).getResult());

    const [isOpen, changeOpen] = useState(false);
    // Système d'exploitation
    return <Pressable android_ripple={{ color: colors.bleu }} onPress={() => {
        // onPress?.();
        changeOpen(!isOpen);
    }} style={[_styles.container, { borderColor: colors.discret2 }]}>
        <Row style={{ gap: 12 }}>
            <Image source={(devices as any)[result.os.name?.toLowerCase() || 'default'] || devices.default} style={{ width: 24, height: 24 }} tintColor={colors.color} />
            <ThemedText variant="h4">{result.browser.name}</ThemedText>
            <ThemedText variant="discret">{new Date(device.created_at).toLocaleString('en', {
                day: 'numeric',
                year: 'numeric',
                month: 'long'
            })}</ThemedText>
            <View style={{ marginRight: 'auto' }}></View>
            <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 24, height: 24, transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }} tintColor={colors.color} />
        </Row>
        <ManageDevice device={device} style={{ display: isOpen ? 'flex' : 'none', overflow: 'hidden' }} onDisconnect={onPress} />
    </Pressable>
}

const _styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 2,
        padding: 12,
        gap: 12
    }
})




type _Props = {
    device: DeviceInterface,
    onDisconnect?: () => any,
    style: ViewStyle
}



function ManageDevice({ device, onDisconnect, style }: _Props) {

    const colors = useThemeColor();
    const result = cacheDevise[device.user_agent] || (cacheDevise[device.user_agent] = new UAParser().setUA(device.user_agent).getResult());

    return <View style={[_style.manager, style]}>
        <Row style={_style.row}>
            <ThemedText variant="h4">{'Support :'}</ThemedText>
            <ThemedText>{result.browser.name}</ThemedText>
        </Row>
        <Row style={_style.row}>
            <ThemedText variant="h4">{'Device :'}</ThemedText>
            <ThemedText>{result.os.name}</ThemedText>
            <Image source={(devices as any)[result.os.name?.toLowerCase() || 'default'] || devices.default} style={{ width: 24, height: 24 }} tintColor={colors.color} />
        </Row>
        <Row style={_style.row}>
            <ThemedText variant="h4">{'Created at :'}</ThemedText>
            <ThemedText>{new Date(device.created_at).toLocaleString('en', {
                day: 'numeric',
                year: 'numeric',
                month: 'long'
            })}</ThemedText>
        </Row>
        <Row style={_style.row}>
            <ThemedText variant="h4">{'Last Activity :'}</ThemedText>
            <ThemedText>{new Date(device.created_at).toLocaleString('en', {
                day: 'numeric',
                year: 'numeric',
                month: 'long'
            })}</ThemedText>
        </Row>
        <Row style={_style.row}>
            <ThemedText variant="h4">{'Notification :'}</ThemedText>
            <Switch
                trackColor={{ false: colors.discret, true: colors.bleu }}
                thumbColor={device.enable ? colors.bleu : colors.contrast}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => { }}
                value={device.enable}
            />
        </Row>
        <Row style={_style.row}>
            <ThemedText variant="h4">{'Ip :'}</ThemedText>
            <ThemedText>{device.ip}</ThemedText>
        </Row>
        <TouchableOpacity onPress={() => {
            onDisconnect?.()
        }}>
            <Row style={{justifyContent:'flex-end'}}>
                <Row style={[_style.disconnect, { backgroundColor: colors.discret2 }]}>
                    <Image source={require('@/assets/icons/sign-out-alt.png')} style={{ width: 24, height: 24, }} tintColor={colors.color} />
                    <ThemedText>{'Disconnect'}</ThemedText>
                </Row>
            </Row>
        </TouchableOpacity>
    </View>
}

const _style = StyleSheet.create({
    manager: {
        padding: 24,
        paddingTop: 12,
        gap: 12,
    },
    row: {
        gap: 12,
        height: 25
    },
    disconnect: {
        justifyContent: 'flex-end',
        gap: 12,
        borderRadius: 10,
        paddingVertical:10,
        paddingHorizontal:14
    }
})

