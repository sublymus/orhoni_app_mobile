import { StackModal } from "@/components/StackModal";
import { RootView } from "@/components/RootView";
import { useThemeColor } from "@/hooks/useThemeColors";
import { useRoute } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { CARD_GAP } from "@/constants/Functions";
import { addressIcons } from "@/constants/LocalIcons";
import { AddressInterface } from "@/interfaces/app";

export default function Page() {
    const params = useLocalSearchParams();
    const colors = useThemeColor();

    return (
        <RootView>
            <ScrollView style={styles.conatiner}>
                <Text>Address {params.mode}</Text>
            </ScrollView>
            <StackModal
                background="#4235"
                canClose
                position="bottom"
                // height={200}
                title="What's your name?"
                subtitle="This name is displayed in your reviews andThis name is displayed in your reviews and comments"
                onClose={() => {
                    console.log('Close Stack Modal');
                }}
            >
                <AddDetails address={{
                    latitude: '',
                    longitude: '',
                    address: 'https://miro.com/,app/board/uXjVP5XV8OI=/'
                }} onAdded={((added) => {

                })} />
                <Confirm address={{
                    latitude: '',
                    longitude: '',
                    address: 'https://miro.com/,app/board/uXjVP5XV8OI=/'
                }} onConfirm={() => {
                    console.log('Confirm');

                }} />
            </StackModal>
        </RootView>
    )
}

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
        gap: CARD_GAP * 2
    }}>
        <View>
            <ThemedText variant="discret">Confirm and add details</ThemedText>
            <ScrollView horizontal>
                <Row style={{ gap: 10, paddingHorizontal: 24, paddingVertical: 8 }}>
                    <View style={{ width: 32, height: 32, borderWidth: 2, borderColor: colors.bleu + '55', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Image source={require('@/assets/icons/plus.png')} style={{ width: 16, height: 16, transform: 'scale(0.8)' }} tintColor={colors.bleu} />
                    </View>
                    {
                        Object.keys(addressIcons).map(k => (
                            <Row key={k} style={{ borderWidth: 2, borderColor: colors.bleu + '55', backgroundColor: colors.bleu + '23', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Image source={addressIcons[k as keyof typeof addressIcons]} style={{ width: 32, height: 32, transform: 'scale(0.8)' }} tintColor={colors.bleu} />
                                <ThemedText style={{ color: '#fff' }}>{k}</ThemedText>
                            </Row>
                        ))
                    }
                </Row>
            </ScrollView>
        </View>
        <TouchableOpacity style={{
            backgroundColor: colors.bleu,
            borderRadius: CARD_GAP,
            alignItems: 'center',
            justifyContent: 'center',
            padding: CARD_GAP
        }} onPress={() => onAdded({ description: 'des', icon: 'ic', name: 'na' })}>
            <ThemedText style={{ color: '#fff' }}>Confirm and add details</ThemedText>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingBottom: 200
    }
})