import { Image, Pressable, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Row } from "./Row"
import { useThemeColor } from "@/hooks/useThemeColors"
import { ThemedText } from "./ThemedText"
import { addressIcons } from "@/constants/LocalIcons";
import { CheckBox } from "./CheckBox";
import { Link, router } from "expo-router";
import { limit } from "@/constants/Functions";
import { AddressInterface } from "@/interfaces/app";


type Props = {
    onChangeSelect?: (seleted: boolean) => any,
    address: AddressInterface
}

export function AddressItem({ address, onChangeSelect }: Props) {

    const colors = useThemeColor();

    return <Pressable android_ripple={{color:colors.bleu}} onPress={() => 0} style={[styles.container, { borderColor: colors.bleu }]}>
        <Row>
            <Image source={(addressIcons as any)[address.icon] || addressIcons.home} style={{ width: 20, height: 20 }} tintColor={colors.bleu} />
            <ThemedText variant="h2" style={{ marginLeft: 12 }}>{address.name}</ThemedText>
            <CheckBox onChange={() => 0} value={false} style={{ marginLeft: 'auto' }} />
        </Row>
        <ThemedText>{limit(address.address, 50)}</ThemedText>
        {address.description && <ThemedText variant="discret">{limit(address.description, 30)}</ThemedText>}
        <Link href={{ pathname: '/profile/address_detail', params: { mode: 'edit' } }} asChild>
            <TouchableOpacity onPress={() => router.push('/profile/address_detail')}>
                <Row>
                    <Text style={{ color: colors.bleu }}>View on map</Text>
                    <Image source={require('@/assets/icons/angle-small-right.png')} style={{ width: 20, height: 20 }} tintColor={colors.bleu} />
                </Row>
            </TouchableOpacity>
        </Link>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 1,
        padding: 12,
        gap: 12
    }
})