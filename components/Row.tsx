import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & { 
    gap?:number
}

export function Row({ style, gap ,...rest}:Props) {
    
    return <View {...rest} style={[rowStyle,style,gap?{gap}:null]} />
}

const rowStyle = {
    alignItems:'center',
    flexDirection:'row',
    flex:0
} satisfies ViewStyle;