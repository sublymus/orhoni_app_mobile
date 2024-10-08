import { create } from "zustand";

interface AppInterface {
    fingerprint: boolean|undefined,
    notification: boolean | undefined,
    theme: 'light' | 'dark' | 'system'
    lang: string,
    setTheme:(theme: 'light' | 'dark'| 'system')=>void,
    setNotification:(use:boolean)=>void
    setLang:(use:string)=>void
    setFingerprint:(use:boolean)=>void
}

export const useAppStore = create<AppInterface>((set, get) => ({
    fingerprint:undefined,
    lang:'english',
    notification:undefined,
    theme:'system',
    setFingerprint(use) {
        set(()=>({fingerprint:use}))
    },
    setLang(use) {
        set(()=>({lang:use}))
    },
    setNotification(use) {
        set(()=>({notification:use}))
    },
    setTheme(theme) {
        set(()=>({theme}))
    },
}))


