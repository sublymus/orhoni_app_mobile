import { AddressItem } from "@/components/AddressItem";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { addressesData } from "@/constants/Data";
import { socilaIcons } from "@/constants/LocalIcons";
import { useThemeColor } from "@/hooks/useThemeColors";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function Page() {

    const colors = useThemeColor();
    const [socials , setSocial] = useState(['Whatsapp', 'Github']);

    return (
        <RootView>
            <ScrollView >
                <View style={styles.conatiner}>
                    <Row style={styles.top}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} style={styles.topIcon} tintColor={colors.color} />
                        </TouchableOpacity>
                        <ThemedText variant="h1">External Account</ThemedText>
                        <Image source={require('@/assets/icons/menu-dots.png')} style={[styles.topIcon, { transform: [{ rotate: '90deg' }, { scale: 0.8 }] }]} tintColor={colors.color} />
                    </Row>
                    <ThemedText variant="normal" color="discret" style={{ marginTop: 30 }}>Security</ThemedText>
                    <ThemedText variant="h1">Log in faster</ThemedText>
                    <ThemedText variant="normal" color="discret">add another way to connect to your account.</ThemedText>


                    <Row style={styles.list}>
                        {
                            Object.keys(socilaIcons).map(k => (
                                <Pressable key={k} android_ripple={{color:colors.bleu}} style={[styles.social, { backgroundColor: socials.map(c=>c.toLowerCase()).includes(k.toLowerCase()) ? colors.bleu + '33' : undefined, borderColor: colors.bleu + '33' }]}
                                    onPress={() =>{
                                        const includ = socials.map(c=>c.toLowerCase()).includes(k.toLowerCase());
                                        if(includ){
                                            setSocial(socials.filter(s=> s.toLowerCase() != (k.toLowerCase())))
                                        }else{
                                            setSocial([...socials,k])
                                        }
                                    }}>
                                    <Image source={socilaIcons[k as keyof typeof socilaIcons]} style={{ width: 24, height: 24 }} tintColor={colors.color} />
                                </Pressable>
                            ))
                        }
                    </Row>
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