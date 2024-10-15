import { ViewStyle } from "react-native";
import { CARD_BIG } from "./Functions";


export const Shadows = {
    dp2 : {
        shadowColor:"#0005",
        shadowOpacity:0.2, // IOS
        shadowOffset:{width:0,height:1}, // IOS
        shadowRadius:10, // IOS
        elevation:10 // Android
    } 
} satisfies Record<string, ViewStyle>

CARD_BIG