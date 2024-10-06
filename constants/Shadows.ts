import { ViewStyle } from "react-native";


export const Shadows = {
    dp2 : {
        shadowColor:"#000",
        shadowOpacity:0.2, // IOS
        shadowOffset:{width:0,height:1}, // IOS
        shadowRadius:3, // IOS
        elevation:2 // Android
    } 
} satisfies Record<string, ViewStyle>