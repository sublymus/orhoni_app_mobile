import { Image } from "react-native";



export function LoadingIcon({tintColor}:{tintColor?:string}) {
    return <Image source={require('@/assets/icons/loading.gif')} style={{ width: 24, height: 24 }} tintColor={tintColor} />
}