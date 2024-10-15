import { PickImage } from "@/Functions/ImagePiker";
import { getUri } from "@/Functions/utils";
import { CardInput } from "@/components/CardInput";
import { LangModal } from "@/components/LangModal";
import { LogoRect } from "@/components/LogoRect";
import { MiniConfirm } from "@/components/MiniConfirm";
import { NavBarBottom } from "@/components/NavBarBottom";
import { PageButton } from "@/components/PageButton";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { Separator } from "@/components/Separator";
import { StackModal } from "@/components/StackModal";
import { ThemModal } from "@/components/ThemModal";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useUserStore } from "@/stores/UserStore";
import { router } from "expo-router";
import { useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";


// function base64ToBlob(base64:string, mimeType:string) {
//     // Décoder la chaîne base64 en un tableau d'octets (Uint8Array)
//     const byteCharacters = atob(base64); // 'atob' décode une chaîne base64 en ASCII
//     const byteNumbers = new Array(byteCharacters.length);
  
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
  
//     const byteArray = new Uint8Array(byteNumbers);
  
//     // Créer un objet Blob à partir du tableau d'octets
//     return new Blob([byteArray], { type: mimeType });
//   }



export default function Page() {

    const colors = useThemeColor();

    const [modalChildren, setModalChildren] = useState<{ title: string, subtitle: string, children: React.ReactNode } | null>(null);

    const { user, updateUser, disconnection } = useUserStore()
    const [image, setImage] = useState<string | null>(null);

  

    return (
        <RootView>
            <ScrollView style={styles.profile}>
                <Row style={styles.top}>
                    <View style={styles.logo}>
                        <LogoRect />
                    </View>
                    <TouchableOpacity style={styles.infos} onPress={async() => {
                        const r = await PickImage();
                        r?.uri && setImage(r?.uri)
                        r?.file && updateUser({
                            photos: [ r.file as any]
                        });
                    }}>
                        <View style={styles.photo}>
                            <Image source={image ? { uri: image } : user?.photos[0] ? getUri(user?.photos[0]) : require('@/assets/3d-images/video-camera-dynamic-color_256_256.png')} style={{ width: 95, height: 95 }} />
                        </View>
                        <ThemedText variant="h2">{user?.name}</ThemedText>
                        <ThemedText variant="normal" color="discret" style={{ fontSize: 16, marginTop: 4 }}>{'+7(999) 862-74-41'}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.close} onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/x.png')} style={{ width: 24, height: 24 }} tintColor={colors.color} />
                    </TouchableOpacity>
                </Row>
                <CardInput blurChange onChange={(name) => {
                    updateUser({
                        name
                    })
                }} placeholder="Name" initialValue={user?.name || ''} autoFocus={!user?.name} maxLenght={20} minLenght={0} showLenght style={{
                    marginTop: 30
                }} />

                <PageButton title="Public Address" iconSource={require('@/assets/icons/marker-outline.png')} onPress={() => router.push('/profile/address')} />
                <Separator style={{ marginLeft: 70 }} />
                <PageButton title="Public Contact" description="Different way to contact you" iconSource={require('@/assets/icons/phone-guide.png')} onPress={() => router.push('/profile/contact')} />
                <Separator style={{ marginLeft: 70 }} />
                <PageButton title="Add external accounts" description="Use them to log in Orhoni" iconSource={require('@/assets/icons/user-lock-outline.png')} onPress={() => router.push('/profile/social')} />

                <ThemedText variant="h2" style={{ marginVertical: 24 }}>More</ThemedText>

                <PageButton title="Setting" iconSource={require('@/assets/icons/settings-sliders-outline.png')} onPress={() => router.push('/setting')} />
                <Separator style={{ marginLeft: 70 }} />
                <LangModal setModalChildren={setModalChildren} />
                <Separator style={{ marginLeft: 70 }} />
                <ThemModal setModalChildren={setModalChildren} />
                <Separator style={{ marginLeft: 70 }} />
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
                            router.replace('/login')
                        }} />
                    })
                }} />
                <View>

                </View>
                <View style={{ height: 100, width: 200 }}><Text></Text></View>
            </ScrollView>
            <NavBarBottom />
            {
                modalChildren && <StackModal canClose width={Dimensions.get('window').width - 48} background="#3445" position="center" onClose={() => {
                    setModalChildren(null)
                }} {...modalChildren}>{modalChildren.children}</StackModal>
            }
        </RootView>
    )
}

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        padding: 24,
        paddingTop: 12,
        paddingBottom: 200
    },
    top: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
    },
    logo: {
        position: 'absolute',
        left: 0
    },
    infos: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        position: 'absolute',
        right: 0
    },
    photo: {
        backgroundColor: '#345',
        borderRadius: 80,
        width: 90,
        height: 90,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    }
})