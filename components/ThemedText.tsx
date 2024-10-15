import { Colors } from "@/constants/Colors";
import { useThemeColor } from "@/hooks/useThemeColors";
import {  StyleSheet, type TextProps} from "react-native";
import { Text, View } from "react-native";

const styles = StyleSheet.create({
    h1:{
        fontSize:24,
        fontWeight:'bold',
    },
    h2:{
        fontSize:20,
        fontWeight:'bold',
    },
    h3:{
        fontSize:16,
        fontWeight:'bold',
    },
    h4:{
        fontSize:14,
        lineHeight:16,
        fontWeight:'bold',
    },
    normal:{
        fontSize:16,
        lineHeight:16,
    },
    discret:{
        fontSize:13,
        lineHeight:16,
    }
});

type Props = TextProps &  {
    variant?: keyof typeof styles,
    color?:keyof typeof Colors['light'] 
}

export function ThemedText({color, variant , style, ...rest}:Props) {
    
    const  colors = useThemeColor();

    return <Text {...rest} style={[styles[variant?? 'normal'],{color:colors[variant == 'discret'? 'discret' :(color??'color')]},style]}/>
}