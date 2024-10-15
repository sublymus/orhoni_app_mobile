import { useAppStore } from "@/stores/Appstore";
import { PageButton } from "./PageButton";
import { View } from "react-native";
import { Separator } from "./Separator";
import { themeIcons } from "@/constants/LocalIcons";

type  Props = {
    setModalChildren:(modalData:{ title: string, subtitle: string, children: React.ReactNode } | null)=>any,
}

export function ThemModal({setModalChildren}:Props) {

    const {
        setTheme,
        theme,
        isSystem,
        useSystem,
    } = useAppStore();


    return  <PageButton title={"Theme : " + (isSystem ? 'System / ' : '') + (theme == 'dark' ? 'Dark' : 'Light')} iconSource={themeIcons[theme]} rightIconSource={null} onPress={() => {
        setModalChildren({
            title: 'Themes',
            subtitle: '',
            children: <View style={{ padding: 24, paddingTop: 0 }}>
                <PageButton title="Light" iconSource={themeIcons.light} rightIconSource={null} onPress={() => setTheme('light')} />
                <Separator style={{ marginLeft: 70 }} />
                <PageButton title="Dark" iconSource={themeIcons.dark} rightIconSource={null} onPress={() => setTheme('dark')} />
                <Separator style={{ marginLeft: 70 }} />
                <PageButton title="System" iconSource={themeIcons.system} rightIconSource={null} onPress={() => useSystem()} />
            </View>
        })
    }} />
}