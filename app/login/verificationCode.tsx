import { AddressItem } from "@/components/AddressItem";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { addressesData } from "@/constants/Data";
import { Shadows } from "@/constants/Shadows";
import { useThemeColor } from "@/hooks/useThemeColors";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Page() {

    const colors = useThemeColor();
    const inputRef1 = useRef<TextInput | null>(null);
    const inputRef2 = useRef<TextInput | null>(null);
    const inputRef3 = useRef<TextInput | null>(null);
    const inputRef4 = useRef<TextInput | null>(null);
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');
    useEffect(()=>{
        inputRef1.current?.focus();
    },[])
    const params = useLocalSearchParams();

    return (
        <RootView>
            <ScrollView >
                <View style={styles.conatiner}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image source={require('@/assets/icons/angle-small-left.png')} style={styles.topIcon} tintColor={colors.color} />
                    </TouchableOpacity>
                    <ThemedText variant="normal" style={{ marginVertical: 24 }}>Verification</ThemedText>
                    <ThemedText variant="h2">{`We sent you an ${params.email?'mail':'SMS'} code`}</ThemedText>
                    <Row>
                        <ThemedText variant="normal">{`On  ${params.email?'mail':'SMS'} : `}</ThemedText>
                        <ThemedText variant="normal" color="bleu">{params.value}</ThemedText>
                    </Row>
                    <Row style={styles.inputCtn}>
                        <View style={[styles.input, { backgroundColor: colors.back_item }]}>
                            <TextInput value={value1} ref={(ref) => inputRef1.current = ref} style={{ fontSize: 32 }} keyboardType="numeric" onChangeText={(v) => {
                                v && inputRef2.current?.focus();
                                setValue1(v.charAt(v.length - 1))
                            }} />
                        </View>
                        <View style={[styles.input, { backgroundColor: colors.back_item }]}>
                            <TextInput value={value2} ref={(ref) => inputRef2.current = ref} style={{ fontSize: 32 }} keyboardType="numeric" onChangeText={(v) => {
                                v && inputRef3.current?.focus();
                                setValue2(v.charAt(v.length - 1))
                            }} onKeyPress={(e) => {
                                if (e.nativeEvent.key == 'Backspace') {
                                    inputRef1.current?.focus()
                                }
                            }} />
                        </View>
                        <View style={[styles.input, { backgroundColor: colors.back_item }]}>
                            <TextInput value={value3} ref={(ref) => inputRef3.current = ref} style={{ fontSize: 32 }} keyboardType="numeric" onChangeText={(v) => {
                                v && inputRef4.current?.focus();
                                setValue3(v.charAt(v.length - 1))
                            }} onKeyPress={(e) => {
                                if (e.nativeEvent.key == 'Backspace') {
                                    inputRef2.current?.focus()
                                }
                            }} />
                        </View>
                        <View style={[styles.input, { backgroundColor: colors.back_item }]}>
                            <TextInput value={value4} ref={(ref) => inputRef4.current = ref} style={{ fontSize: 32 }} keyboardType="numeric" onChangeText={(v) => {
                                setValue4(v.charAt(v.length - 1))
                            }} onKeyPress={(e) => {
                                if (e.nativeEvent.key == 'Backspace') {
                                    inputRef3.current?.focus()
                                }
                            }} />
                        </View>
                    </Row>
                    <ThemedText color="bleu" style={{
                        textDecorationLine: 'underline',
                        textDecorationStyle: 'dotted',
                        alignSelf:'center'
                    }}>Code not received ?</ThemedText>
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
        paddingBottom: 100,
    },
    top: {
        justifyContent: 'space-between'
    },
    topIcon: {
        width: 24,
        height: 24,
    },
    inputCtn: {
        justifyContent: 'space-around',
        maxWidth: 400,
        marginTop: 44,
        marginBottom: 24,
        padding:10,
    },
    input: {
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        ...Shadows.dp2
    }
})

