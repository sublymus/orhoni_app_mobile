import { HOST } from "@/config";


export function getUri(url:string) {
    
    return {uri:`${HOST}${url}`};
}