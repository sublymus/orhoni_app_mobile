import { LogoRect } from "@/components/LogoRect";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { StackModal } from "@/components/StackModal";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useUserStore } from "@/stores/UserStore";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";



const icon = `iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAACXBIWXMAAAHYAAAB2AH6XKZyAAAANlBMVEVHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAR2LVAAAAEXRSTlMAd7GLL+754wdHnSBo08JYEzo9MwIAAAKCSURBVHja7ZfLcsMgDEVlXuJt+P+f7SgOFpQwuIvOdNGzCsZSri4gEvjnDxLc4XNCgwcMHGgwZX+4AGus81hvjiG+3qB39nP4oWuPliKhrlVjEvLb1GFhQmH9AaimeP1OnmV0Cj8HuShze0/BgE2XagfEWT9hTiDcVU+yMJkkS5dNi+NUoVhbgjql0BQDF8VPJlvS7Nso0ryCAUXPzjaiDGiBIc26TNl6fC+76C4dIUhSX44J0w4z/Tuy1iq6Cmgy9G96mPCXSq7IcA2ucwgEvzhQdJ+YynTDGvjOjhqhh73lID+sg+CYgk3NTCLvC2cTPMOpxbiE81IKrjpDX1DoNhQskFxeIDXQIN/tK6+hxBYW2Ezmu9dHshoa5O8drwMsCfrKwAm4hAJw6rfPDtHBQHvm2qkqQwmk7FS+thKRJnv4WayEUOdgohwb2TrB2NzkuM8rn7dVCWOzMAFmCQW2FBbQEZNGw1toAZ8j1CkC05/pLWSCWM4k2JKW3xOuXbDBVe4dn2rIsCGvKuDGuYIXcWm14Ga7wOJKAG8oyYpkRmMwSwUN2TbQDM8r7loNad8pDQ12CvO9qtNdn7c1OvYRaweygw4aGx81fXGwUCL1jp2Do4+xyfUvL1pZceMg+5huvSeFtary5OByQ6t2yZsY7x8Dai+AD2Vbswuj+Bju4XvOmXe8626zPWd3/WiK146lnbAndjdt8Vr70u3MCE89mHjsgSXZanXatX3UMxF6pjt437Lyuhm5Zwqa0CIR5fDrTT3zIDsAq6Iwr20gorIALm89GG8pU294IGGPTXVJsvCAIrqIGDOPRIFnXP9cUByKRuoQr6F38ANssd+G//8nf48vpk8/OkZFcfkAAAAASUVORK5CYII=`
 
export default function Page() {

    const {phone_connexion} = useUserStore()
    const colors = useThemeColor();
    
    
    const [modalChildren, setModalChildren] = useState<{ title: string, subtitle: string, children: React.ReactNode } | null>(null);

    const [switchLelft, setSwitchLeft] = useState(2);// 2 =>  84
    const [type, setType] = useState<'social' | 'phone'>('social');
    useEffect(() => {
        setSwitchLeft(type == 'social' ? 2 : 84)
    }, [type])

    const [email, setEmail] = useState('');
    const [emailRef, setEmailRef] = useState<TextInput | null>();

    const [phone, setPhone] = useState('');
    const [phoneRef, setPhoneRef] = useState<TextInput | null>();

    const [password, setPassword] = useState('');
    const [passwordRef, setPasswordRef] = useState<TextInput | null>();

    const [loading, setLoading] = useState(false)
    
    return (
        <RootView>
            <ScrollView>
                <View style={[styles.conatiner]}>
                    <LogoRect />
                    <ThemedText variant="h2" style={{ marginVertical: 16 }}>connect to Orhoni</ThemedText>
                    <Pressable onPress={() => {
                        const t = type == 'phone' ? 'social' : 'phone';
                        setType(t);
                    }}>
                        <Row style={[styles.swith, { backgroundColor: colors.discret2 }]}>
                            <View style={[styles.move, { left: switchLelft, backgroundColor: colors.background }]}>
                            </View>
                            <View style={styles.switchText}>
                                <ThemedText variant="h3">{'Email'}</ThemedText>
                            </View>
                            <View style={styles.switchText}>
                                <ThemedText variant="h3">{'Phone'}</ThemedText>
                            </View>
                        </Row>
                    </Pressable>
                    <View style={[styles.formCtn, { display: type == 'social' ? 'flex' : 'none' }]}>
                        <Pressable style={[styles.card, { borderColor: colors.discret2, justifyContent: 'flex-start' }]} onPress={() => emailRef?.focus()}>
                            <TextInput value={email} placeholder="Email" textContentType="emailAddress" style={{ fontSize: 16, color: colors.color }} ref={(ref) => {
                                setEmailRef(ref)
                            }} onChangeText={(text) => {
                                setEmail(text);
                            }} />
                        </Pressable>
                        <Pressable style={[styles.card, { borderColor: colors.contrast, backgroundColor: colors.contrast }]} onPress={() => {
                            setModalChildren({
                                title: 'You will receive sms',
                                subtitle: 'renew after interval time',
                                children: VerificationCode()
    });
                        }}>
                            <ThemedText style={{ color: colors.background }}>Log in</ThemedText>
                        </Pressable>
                        <Pressable style={[styles.card, { borderColor: colors.discret2, backgroundColor: colors.discret2, justifyContent: 'space-between' }]} onPress={() => {

                        }}>
                            <Image source={require('@/assets/icons/fingerprint.png')} style={[{ width: 24, height: 24 }]} tintColor={colors.color} />
                            <ThemedText>Use Fingerprint</ThemedText>
                            <View style={[{ width: 24, height: 24 }]}></View>
                        </Pressable>
                        <Row style={{ justifyContent: 'space-between', alignSelf: 'stretch', gap: 24, marginVertical: 16 }}>
                            <Pressable style={[styles.card, { borderColor: colors.discret2, flex: 1 }]} onPress={() => {

                            }}>
                                <Image source={require('@/assets/icons/google.png')} style={[{ width: 24, height: 24 }]} tintColor={colors.color} />
                            </Pressable>
                            <Pressable style={[styles.card, { borderColor: colors.discret2, flex: 1 }]} onPress={() => {
                                setModalChildren({
                                    title: 'Qr Code',
                                    subtitle: 'scan the qr code from an already connected mobile. setting/devices/add new',
                                    children: <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 24 }}>
                                        <QRCode size={200}
                                            value="Just some string value"
                                            logo={{ uri: icon }}
                                            // logoSize={200}
                                            logoBackgroundColor='transparent'
                                        />
                                    </View>
                                })
                            }}>
                                <Image source={require('@/assets/icons/qrcode.png')} style={[{ width: 24, height: 24 }]} tintColor={colors.color} />
                            </Pressable>
                        </Row>
                    </View>
                    <View style={[styles.formCtn, { marginTop: 24, gap: 24, display: type == 'phone' ? 'flex' : 'none' }]}>
                    <Pressable style={[styles.card, { borderColor: colors.discret2, justifyContent: 'flex-start' }]} onPress={() => phoneRef?.focus()}>
                            <TextInput value={phone} placeholder="Phone Number" textContentType="telephoneNumber" keyboardType="phone-pad" style={{ fontSize: 16, color: colors.color }} ref={(ref) => {
                                setPhoneRef(ref)
                            }} onChangeText={(text) => {
                                setPhone(text);
                            }} />
                        </Pressable>
                        <Pressable style={[styles.card, { borderColor: colors.discret2, justifyContent: 'flex-start' }]} onPress={() => passwordRef?.focus()}>
                            <TextInput value={password} placeholder="Password" textContentType="password" secureTextEntry keyboardType="default" style={{ fontSize: 16, color: colors.color }} ref={(ref) => {
                                setPasswordRef(ref)
                            }} onChangeText={(text) => {
                                setPassword(text);
                            }} />
                        </Pressable>
                        <Pressable style={[styles.card, { borderColor: colors.contrast, backgroundColor: colors.contrast }]} onPress={() =>{
                            
                            if(loading) return;
                            
                            if(!(password && phone)) return;

                            phone_connexion({password,phone}).then(user=>{
                                setLoading(false);
                                if(user?.id){
                                    router.replace('/');
                                }else{
                                    setModalChildren({
                                        title: 'Connexion Error',
                                        subtitle: 'Try again',
                                        children: <ThemedText>{user?.toString()}</ThemedText>
                                    })
                                }
                            })
                        }}>
                            <ThemedText style={{ color: colors.background }}>Log in</ThemedText>
                        </Pressable>

                    </View>
                    <Link href={'/setting/about'} style={{ marginTop: 'auto' }}>
                        <ThemedText variant="discret" >Terms of Use, </ThemedText>
                        <ThemedText variant="h4" style={{ marginTop: 'auto' }}>learn more</ThemedText>
                    </Link>
                    <ThemedText variant="discret" >Orhoni  - Ⓒ 2021 - 2024 Version:1.0.8 </ThemedText>

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
        padding: 24,
        paddingTop: 12,
        gap: 16,
        paddingBottom: 100,
        alignItems: 'center',
        marginTop: 24,
        justifyContent: 'flex-start',
        height: Dimensions.get('window').height
    },
    move: {
        position: 'absolute',
        width: 80,
        height: 40,
        borderRadius: 50,
    },
    swith: {
        padding: 2,
        paddingVertical: 13,
        borderRadius: 50,
        gap: 2
    },
    switchText: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        borderRadius: 20,
        borderWidth: 2,
        paddingVertical: 12,
        paddingHorizontal: 24
    },
    formCtn: {
        alignSelf: 'stretch',
        gap: 16,
    }
})


function VerificationCode() {


    return <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 24 }}>
        <QRCode size={200}
            value="Just some string value"
            // logo={{ uri: icon }}
            // logoSize={200}
            logoBackgroundColor='transparent'
        />
    </View>
}