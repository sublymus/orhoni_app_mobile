import { CardInput } from "@/components/CardInput";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColors";
import { router } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Page() {

    const colors = useThemeColor();
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    return (
        <RootView>
            <ScrollView >
                <View style={styles.conatiner}>
                    <Row style={styles.top}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} style={styles.topIcon} tintColor={colors.color} />
                        </TouchableOpacity>
                        <ThemedText variant="h1">Passoword</ThemedText>
                        <Image source={require('@/assets/icons/menu-dots.png')} style={[styles.topIcon, { transform: [{ rotate: '90deg' }, { scale: 0.8 }] }]} tintColor={colors.color} />
                    </Row>
                    <ThemedText variant="normal" color="discret" style={{ marginTop: 30 }}>Security</ThemedText>
                    <ThemedText variant="h1">Secure your account</ThemedText>
                    <ThemedText variant="normal" color="discret">you can add a password to your account.</ThemedText>

                    {/* <CardInput initialValue={currentPassword} secureTextEntry={true} placeholder="Current Password" minLenght={0} maxLenght={40} onChange={(text)=>{
                        setCurrentPassword(text)
                    }}
                    /> */}
                    <CardInput initialValue={newPassword} secureTextEntry={true} placeholder="New Password" minLenght={0} maxLenght={40} onChange={(text)=>{
                        setNewPassword(text)
                    }}
                    />
                    <CardInput initialValue={confirmPassword}secureTextEntry={true} blurChange required  placeholder="Confirm Password" minLenght={0} maxLenght={40} onChange={(text)=>{
                        setConfirmPassword(text)
                    }}
                    />
                    <View style={{
                        alignItems:'center',
                        justifyContent:'center',
                        backgroundColor:colors.discret2,
                        borderRadius:20,
                        padding:20
                    }}>
                        <ThemedText variant="h3">Save Password</ThemedText>
                    </View>
                </View>
            </ScrollView>
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
    social: {
        borderRadius: 20,
        borderWidth: 2,
        padding: 16,
        overflow:'hidden'
    },
    list:{
        flexWrap:'wrap',
        gap:12
    }
})