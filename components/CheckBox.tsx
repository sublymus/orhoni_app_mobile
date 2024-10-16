import { useThemeColor } from "@/hooks/useThemeColors";
import { Image, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"

type Props ={
    onChange?:(value:boolean)=>any,
    value:boolean,
    style?:ViewStyle
}

export function CheckBox({onChange,value, style}:Props) {
    
    
    const colors = useThemeColor();

    return <TouchableOpacity onPress={()=>onChange?.(!value)} style={[{
        backgroundColor:value?colors.bleu:undefined,
        borderRadius:5,
        borderWidth:1,
        width: 16, 
        height: 16,
        borderColor:value?colors.bleu:colors.discret
    },style]}>
        {
            value && <Image source={require('@/assets/icons/check.png')} style={{ width: 16, height: 16, transform:'scale(0.7)' }} tintColor={'#fff'}/>
        }
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    
})