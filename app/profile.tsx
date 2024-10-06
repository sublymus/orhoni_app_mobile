import { CardInput } from "@/components/CardInput";
import { LogoRect } from "@/components/LogoRect";
import { NavBarBottom } from "@/components/NavBarBottom";
import { PageButton } from "@/components/PageButton";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { Separator } from "@/components/Separator";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from "react-native";



export default function Page() {

    const colors = useThemeColor();
    const c = useColorScheme()
    
    return (
        <RootView>
            <ScrollView style={styles.profile}>
                <Row style={styles.top}>
                    <View style={styles.logo}>
                        <LogoRect />
                    </View>
                    <TouchableOpacity style={styles.infos}>
                        <Image source={require('@/assets/3d-images/video-camera-dynamic-color_256_256.png')} style={{ width: 80, height: 80 }}/>
                        <ThemedText variant="h2">{'Kouassi Noga Wilfried'}</ThemedText>
                        <ThemedText variant="normal" color="discret" style={{fontSize:16, marginTop:4}}>{'+7(999) 862-74-41'}</ThemedText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.close} onPress={()=>router.back()}>
                        <Image source={require('@/assets/icons/x.png')} style={{ width: 24, height: 24 }} tintColor={colors.color} />
                    </TouchableOpacity>
                </Row>
                <CardInput onChange={()=>{}} placeholder="Name" initialValue="Kouassi Noga" autoFocus={!'Kouassi Noga'} maxLenght={20} minLenght={0} showLenght style={{
                    marginTop:30
                }} />

                <PageButton title="Public Address" iconSource={require('@/assets/icons/marker-outline.png')}  onPress={()=>router.push('/profile/address')}/>
                <Separator style={{ marginLeft:70 }} />
                <PageButton title="Public Contact" description="Different way to contact you" iconSource={require('@/assets/icons/phone-guide.png')} onPress={()=>router.push('/profile/contact')}/>
                <Separator style={{ marginLeft:70 }} />
                <PageButton title="Add external accounts" description="Use them to log in Orhoni" iconSource={require('@/assets/icons/user-lock-outline.png')} onPress={()=>router.push('/profile/social')}/>
                
                <ThemedText variant="h2" style={{marginVertical:24}}>More</ThemedText>
                
                <PageButton title="Setting"  iconSource={require('@/assets/icons/settings-sliders-outline.png')}/>
                <Separator style={{ marginLeft:70 }} />
                <PageButton title={"Language : "+('English')}  iconSource={require('@/assets/icons/globe.png')} iconRightStyle={{transform:[{rotate:'90deg'}]}}/>
                <Separator style={{ marginLeft:70 }} />
                <PageButton title={"Theme : "+(c=='dark'?'Dark':'Light')}  iconSource={require('@/assets/icons/brightness.png')}  rightIconSource={null}/>
                <Separator style={{ marginLeft:70 }} />
                <PageButton title="Logout"  iconSource={require('@/assets/icons/sign-out-alt.png')} rightIconSource={null}/>
                <View>

                </View>
                <View style={{ height: 100, width: 200 }}><Text></Text></View>
            </ScrollView>
            <NavBarBottom />
        </RootView>
    )
}

const styles = StyleSheet.create({
    profile: {
        flex: 1,
        padding: 24,
        paddingTop:12,
        paddingBottom: 200
    },
    top: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        position:'relative',
    },
    logo:{
        position:'absolute',
        left:0
    },
    infos:{
        marginTop:20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    close:{
        position:'absolute',
        right:0
    }
})