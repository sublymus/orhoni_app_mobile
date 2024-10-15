import { useThemeColor } from "@/hooks/useThemeColors";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { Row } from "./Row";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedText";
import { Shadows } from "@/constants/Shadows";


export function NavBarBottom() {

    const colors = useThemeColor();
    const route = useRoute();
    const router = useRouter();

    return <Row style={[styles.container, { backgroundColor: colors.back_item }]}>
        <TouchableOpacity style={styles.icon_ctn} onPress={()=>router.dismissAll()} >
            <Image source={(route.name == '/' || route.name == 'index') ?
                require(`@/assets/icons/home.png`) :
                require(`@/assets/icons/home-outline.png`)
            } style={styles.icon} tintColor={colors.color} />
            <ThemedText>Home</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon_ctn} onPress={()=>route.name=='profile'?'':route.name=='index'?router.push('/profile'):router.replace('/profile')} >
            <Image source={(route.name == 'profile'||route.name == 'profile/index') ?
                require(`@/assets/icons/user.png`) :
                require(`@/assets/icons/user-outline.png`)
            } style={styles.icon} tintColor={colors.color} />
            <ThemedText>Profile</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon_ctn} onPress={()=>route.name=='package'?'':route.name=='index'?router.push('/package'):router.replace('/package')} >
            <Image source={(route.name == 'package'||route.name == 'package/index') ?
                require(`@/assets/icons/wallet.png`) :
                require(`@/assets/icons/wallet-outline.png`)
            } style={styles.icon} tintColor={colors.color} />
            <ThemedText>Package</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon_ctn} onPress={()=>route.name=='alert'?'':route.name=='index'?router.push('/alert'):router.replace('/alert')} >
            <Image source={(route.name == 'alert'||route.name == 'alert/index') ?
                require(`@/assets/icons/megaphone.png`) :
                require(`@/assets/icons/megaphone-outline.png`)
            } style={styles.icon} tintColor={colors.color} />
            <ThemedText>Alert</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon_ctn} onPress={()=>route.name=='setting'?'':route.name=='index'?router.push('/setting'):router.replace('/setting')} >
            <Image source={(route.name == 'setting'||route.name == 'setting/index') ?
                require(`@/assets/icons/settings-sliders.png`) :
                require(`@/assets/icons/settings-sliders-outline.png`)
            } style={styles.icon} tintColor={colors.color} />
            <ThemedText>Setting</ThemedText>
        </TouchableOpacity>
    </Row>
}


const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        height: 60,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        gap: 8,
        justifyContent: 'space-around',
        ...Shadows
    },
    icon_ctn: {
        gap: 6,
        alignItems: 'center'
    },
    icon: {
        width: 20,
        height: 20,
    }
})
