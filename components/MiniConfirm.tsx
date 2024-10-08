import { View } from "react-native-reanimated/lib/typescript/Animated"
import { Row } from "./Row"
import { ThemedText } from "./ThemedText"
import { StyleSheet, TouchableOpacity } from "react-native"
import { useThemeColor } from "@/hooks/useThemeColors"


type Props = {
    onConfirm: () => any
    onCancel: () => any,
    confirm?:{
        text?:string,
        color?:string
        background?:string
    }
    cancel?:{
        text?:string,
        color?:string
        background?:string
    }
}

export function MiniConfirm({ onCancel,onConfirm,confirm, cancel}: Props) {

    const colors = useThemeColor();
    
    return <Row style={styles.body}>
        <TouchableOpacity style={[styles.btn, { backgroundColor: (cancel?.background) || colors.discret2 }]} onPress={()=>onCancel()}>
            <ThemedText variant="h3">{cancel?.text||'Cancel'}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: (confirm?.background) || colors.red+'33'}]} onPress={()=>onConfirm()}>
            <ThemedText variant="h3" style={{color:confirm?.text||colors.red}}>{confirm?.text||'Confirm'}</ThemedText>
        </TouchableOpacity>
    </Row>
}

const styles = StyleSheet.create({
    body: {
        padding: 24,
        justifyContent:'space-around'
    },
    btn: {
        padding: 12,
        borderRadius:10
    },
})