import { AddressItem } from "@/components/AddressItem";
import { ExternalLink } from "@/components/ExternalLink";
import { ExternalLinkButton } from "@/components/ExternalLinkButton";
import { LangModal } from "@/components/LangModal";
import { MiniConfirm } from "@/components/MiniConfirm";
import { NavBarBottom } from "@/components/NavBarBottom";
import { PageButton } from "@/components/PageButton";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { Separator } from "@/components/Separator";
import { StackModal } from "@/components/StackModal";
import { ThemModal } from "@/components/ThemModal";
import { ThemedText } from "@/components/ThemedText";
import { addressesData, langs } from "@/constants/Data";
import { themeIcons } from "@/constants/LocalIcons";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useAppStore } from "@/stores/Appstore";
import { useUserStore } from "@/stores/UserStore";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";


export default function Page() {

    const colors = useThemeColor();

    const [modalChildren, setModalChildren] = useState<{ title: string, subtitle: string, children: React.ReactNode } | null>(null);
    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'App link',
                message: 'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
                url: 'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en'
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(' // shared with activity type of result.activityType');

                } else {
                    console.log('// shared');

                }
            } else if (result.action === Share.dismissedAction) {
                console.log('// dismissed');

            }
        } catch (error: any) {
            alert(error.message);
        }
    };
    const { disconnection, deleteUserAccount } = useUserStore()
    const {
        fingerprint,
        notification,
        setFingerprint,
        setNotification,
    } = useAppStore();

    return (
        <RootView>
            <ScrollView >
                <View style={styles.conatiner}>
                    <Row style={styles.top}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} style={styles.topIcon} tintColor={colors.color} />
                        </TouchableOpacity>
                        <ThemedText variant="h1">Setting</ThemedText>
                        <View style={styles.topIcon}></View>
                    </Row>
                    <PageButton title="Add external accounts" description="Use them to log in Orhoni" iconSource={require('@/assets/icons/user-lock-outline.png')} onPress={() => router.push('/profile/social')} />
                    <Separator style={{ marginLeft: 70 }} />
                    <PageButton title="Add password" iconSource={require('@/assets/icons/password-lock.png')} onPress={() => router.push('/setting/password')} />
                    <Separator style={{ marginLeft: 70 }} />
                    <PageButton title="Use fingerPrint as default" iconSource={require('@/assets/icons/fingerprint.png')} right="switch" switchValue={fingerprint} onPress={(value) => {
                        setFingerprint(!!value)
                    }} />
                    <Separator style={{ marginLeft: 70 }} />
                    <PageButton title="Notification Push" iconSource={require('@/assets/icons/bell-outline.png')} right="switch" switchValue={notification} onPress={(value) => {
                        setNotification(!!value)
                    }} />
                    <Separator style={{ marginLeft: 70 }} />
                    <PageButton title="Devices" iconSource={require('@/assets/icons/laptop-mobile-outline.png')} onPress={() => router.push('/setting/devices')} />

                    <ThemedText variant="h2" style={{ marginVertical: 24 }}>More</ThemedText>

                    <LangModal setModalChildren={setModalChildren} />
                    <Separator style={{ marginLeft: 70 }} />
                   
                    <ThemModal setModalChildren={setModalChildren} />

                    <ThemedText variant="h2" style={{ marginVertical: 24 }}>About</ThemedText>

                    <PageButton title="About Orhoni Team" iconSource={require('@/assets/icons/discussion-group.png')} onPress={() => router.push('/setting/about')} />
                    <Separator style={{ marginLeft: 70 }} />
                    <PageButton title="Share with frends" iconSource={require('@/assets/icons/share-outline.png')} onPress={onShare} />
                    <Separator style={{ marginLeft: 70 }} />
                    <ExternalLinkButton href={'https://play.app.goo.gl/?link=https://play.google.com/store/apps/details?id=com.myapp'} title="Rate the app" iconSource={require('@/assets/icons/star-outline.png')} />
                    <Separator style={{ marginLeft: 70 }} />
                    <ExternalLinkButton href={'tg://t.me'} title="Contact the support team" iconSource={require('@/assets/icons/user-headset.png')} onPress={() => router.push('/setting/about')} />
                    <Separator style={{ marginLeft: 70 }} />

                    <ThemedText variant="h2" style={{ marginVertical: 24 }}>Account</ThemedText>

                    <PageButton title="Logout" iconSource={require('@/assets/icons/sign-out-alt.png')} rightIconSource={null} onPress={() => {
                        setModalChildren({
                            title: 'Log Out',
                            subtitle: 'you will be logged out, and can log in later',
                            children: <MiniConfirm onCancel={() => {
                                setModalChildren(null);
                            }} onConfirm={() => {
                                setModalChildren(null);
                                disconnection();
                                router.dismissAll();
                                router.replace('/login');
                            }} />
                        })
                    }} />
                    <PageButton title="Delete" iconSource={require('@/assets/icons/trash-outline.png')} rightIconSource={null} onPress={() => {
                        setModalChildren({
                            title: 'Delete account',
                            subtitle: 'Your account will be deleted, including all the information you have added',
                            children: <MiniConfirm onCancel={() => {
                                setModalChildren(null);
                            }} onConfirm={() => {
                                setModalChildren(null);
                                deleteUserAccount();
                                router.dismissAll();
                                router.replace('/login');
                            }} />
                        })
                    }} />
                </View>
            </ScrollView>
            {
                modalChildren && <StackModal canClose width={Dimensions.get('window').width - 48} background="#3445" position="center" onClose={() => {
                    setModalChildren(null)
                }} {...modalChildren}>{modalChildren.children}</StackModal>
            }
            <NavBarBottom />
        </RootView>
    )
}



const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingTop: 12,
        paddingBottom: 100,
    },
    top: {
        justifyContent: 'space-between',
        paddingBottom:24
    },
    topIcon: {
        width: 24,
        height: 24
    }
})