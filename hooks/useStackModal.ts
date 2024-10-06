import { useState } from "react"
import { ViewProps } from "react-native";

type Props = ViewProps & {
    title?: string,
    subtitle?: string,
    canClose?: boolean,
    background?: string,
    position?: 'top' | 'center' | 'bottom';
}

let properties :[Props | null, React.Dispatch<React.SetStateAction<Props | null>>]

export function useStackModal() {
    
    if(properties) return properties
     properties = useState<Props|null>(null)

    return properties
}