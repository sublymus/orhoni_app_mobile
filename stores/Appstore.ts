import { AsyncStorage } from "@/Functions/AsyncStorage";
import { Appearance } from "react-native";
import { create } from "zustand";

interface AppInterface {
    fingerprint: boolean|undefined,
    notification: boolean | undefined,
    theme: 'light' | 'dark'
    lang: string,
    setTheme:(theme: 'light' | 'dark')=>void,
    isSystem:boolean,
    useSystem:()=>any
    setNotification:(use:boolean)=>void
    setLang:(use:string)=>void
    setFingerprint:(use:boolean)=>void
}

export const useAppStore = create<AppInterface>((set, get) => ({
    fingerprint:undefined,
    lang:'english',
    notification:undefined,
    theme:'light',
    isSystem:true,
    useSystem() {
        AsyncStorage.setItem('user.theme_system',true);
        set(()=>({ isSystem:true,theme: Appearance.getColorScheme()||'light'}))
    },
    setFingerprint(use) {
        AsyncStorage.setItem('user.fingerptint',true);

        set(()=>({fingerprint:use}))
    },
    setLang(use) {
        AsyncStorage.setItem('user.lang', use);
        set(()=>({lang:use}))
    },
    setNotification(use) {
        AsyncStorage.setItem('user.notif', use);
        set(()=>({notification:use}))
    },
    setTheme(theme) {
        AsyncStorage.setItem('user.theme', theme);
        AsyncStorage.setItem('user.theme_system',false);
        set(()=>({theme, isSystem:false}))
    },
}))


Appearance.addChangeListener((c)=>{
    useAppStore.setState({
        ...useAppStore.getState(),
        theme:c.colorScheme||'light',
    });
})