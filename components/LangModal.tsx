import { Pressable, View } from "react-native";
import { PageButton } from "./PageButton";
import { langs } from "@/constants/Data";
import { ThemedText } from "./ThemedText";
import { Separator } from "./Separator";
import { useAppStore } from "@/stores/Appstore";
import { AsyncStorage } from "@/Functions/AsyncStorage";

type Props = {
    setModalChildren:(modalData:{ title: string, subtitle: string, children: React.ReactNode } | null)=>any,
}

export function LangModal({setModalChildren}:Props) {
    
    const {
        lang,
        setLang,
    } = useAppStore();

    return <PageButton title={"Language : " + lang} iconSource={require('@/assets/icons/globe.png')} iconRightStyle={{ transform: [{ rotate: '90deg' }] }} onPress={() => {
        setModalChildren({
            title: 'Languages',
            subtitle: '',
            children: <View style={{ padding: 24, paddingTop: 0 }}>
                {
                    langs.map(l => (
                        <View key={l}>
                            <Pressable key={l} onPress={async () => {
                                setLang(l);
                                setModalChildren(null);
                                AsyncStorage.setItem('user.lang',l);
                            }}>
                                <ThemedText variant="h3" style={{ textTransform: 'capitalize', paddingVertical: 16 }}>{l}</ThemedText>
                            </Pressable>
                            <Separator key={l + '_s'} />
                        </View>
                    ))
                }
            </View>
        })
    }} />
}