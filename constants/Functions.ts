import { HOST } from "@/config";
import { Dimensions } from "react-native";

let w = Dimensions.get('window').width;
w = w > 560 ? 560 : w;

export const IS_MIN_SCREEN = w < 520;
export const MIN_SCREEN_MAX_WIDTH = 520
export const MAX_IEW_WIDTH = 560;
const gap = w < 360 ? 12 : 16;
const size = (w-7*gap)/4;
export const CARD_BIG = size*2+gap-2
export const CARD_MIN = size;
export const CARD_GAP = gap;

export const limit = (text: string = '', max: number = 20) => {
    return text?.length > max ? text.substring(0, max) + '..' : (text || '')
}
export const getImg = (img?: string, addHost?: boolean, option?: {
    addMore?: string
}) => {
    if (!img) return ''
    return `${addHost === true ? HOST : addHost === false ? '' : (img.startsWith('/') ? HOST : '')}${img}`
}

export function PhoneFormater(phone: any) {
    const f = phone.format || '';
    const n = phone.phone || '';
    let cn = 0;
    let p = ''
    for (let i = 0; i < f.length; i++) {
        const c = f[i];
        p += c == '.' ? n[cn++] : c
    }
    phone && ((phone as any).p = p);
    return p
}