import { useThemeColor } from "@/hooks/useThemeColors";
import { View, ViewProps } from "react-native";

type Props = ViewProps

export function Separator({style, ...rest}:Props) {

    const colors = useThemeColor();

    return <View style={[{
        flex:1,
        alignSelf:'stretch',
        height:1,
        backgroundColor: colors.discret2
    }, style]} {...rest}></View>
}