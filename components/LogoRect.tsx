import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { Image, Pressable, View } from "react-native";


export function LogoRect() {
    
    const route = useRoute()
    return (
        <Pressable onPress={()=>route.name !=='index' && router.dismissAll()}>
            <Image source={require('@/assets/logos/logo_rect.png')} style={{
            width:100,
            height:26.5
        }}/>
        </Pressable>
        )
}