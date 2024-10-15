import { Image, Pressable, StyleSheet, TextInput, TextInputProps, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native"
import { ThemedText } from "./ThemedText"
import { useEffect, useRef, useState } from "react"
import { Row } from "./Row"
import { useThemeColor } from "@/hooks/useThemeColors"

type Props = {
    onChange: (text: string) => any,
    initialValue: string,
    placeholder: string,
    required?: boolean,
    maxLenght?: number,
    minLenght?: number,
    blurChange?: boolean,
    showLenght?: boolean,
    autoFocus?: boolean,
    style?: ViewStyle
    secureTextEntry?:TextInputProps['secureTextEntry']
}

const TY = 16

export function CardInput({
    onChange,
    placeholder,
    showLenght,
    initialValue,
    maxLenght = 50,
    minLenght,
    blurChange,
    required,
    autoFocus,
    style,
    secureTextEntry,
    ...rest
}: Props) {

    const [value, setValue] = useState(initialValue);
    const [error, setError] = useState('');
    const [isFocused, changeFocus] = useState(false);
    const [canShowLenght, setCanShowLenght] = useState(false);
    const [showLenghtId, setShowLenghtId] = useState<any>(undefined);
    const [labelTop, setLabelTop] = useState(TY);
    const inputRef = useRef<TextInput>(null);

    const colors = useThemeColor();

    const [s] = useState({
        value: initialValue,
        labelTop,
        handle: () => {
            if (inputRef.current?.isFocused()) {
                setLabelTop(0);
            } else if (!s.value) {
                setLabelTop(TY);
            } else if (s.value) {
                setLabelTop(0);
            }
        }
    })
    s.value = value;
    s.labelTop = labelTop
    useEffect(() => {
        s.handle();
    }, [])

    useEffect(() => {
        if (autoFocus) {
            inputRef.current?.focus();
        }
    }, [inputRef, autoFocus])


    return <View style={[styles.cardInput, style]} {...rest}>
        <Pressable style={[styles.card, error ? { borderColor: colors.red } : isFocused ? { borderColor: colors.color } : { borderColor: colors.discret2 }]} onPress={() => inputRef.current?.focus()}>
            <Row style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <ThemedText style={{
                        color: colors.discret,
                        transform: [{ translateY: labelTop }]
                    }}>{placeholder}</ThemedText>
                    <TextInput ref={inputRef} secureTextEntry={secureTextEntry} style={[styles.input,{color:colors.color}]} value={value} onChangeText={(text) => {
                        clearTimeout(showLenghtId);
                        setCanShowLenght(true)
                        const id = setTimeout(() => {
                            setShowLenghtId(id)
                            clearTimeout(id);
                            setCanShowLenght(false)
                        }, 3000);
                        if (minLenght && text.length < minLenght) {
                            setValue(text);
                            return setError(`minimum ${minLenght} characters required`)
                        }
                        if (maxLenght && text.length > maxLenght) {
                            return setError(`maximum ${maxLenght} characters required`)
                        }
                        if (required && text.length == 0) {
                            return setError(`Required field`)
                        }
                        setError('')
                        setValue(text);
                        !blurChange && onChange(text);
                    }} onBlur={() => {
                        s.handle();
                        blurChange && onChange(value);
                        changeFocus(false)
                    }} onFocus={() => {
                        s.handle();
                        changeFocus(true)
                    }} />
                </View>
                {
                    value && !isFocused && <TouchableOpacity onPress={(e) => {
                        changeFocus(false)
                        setValue('');
                        setTimeout(() => {
                        s.handle();   
                        });
                    }} style={{ backgroundColor: colors.discret + '', opacity: 0.7, width: 20, height: 20, borderRadius: 20 }}>
                        <Image source={require('@/assets/icons/x.png')} style={{ width: 20, height: 20 }} tintColor={'#fff'} />
                    </TouchableOpacity>
                }
            </Row>
        </Pressable>
        <Row style={styles.bottom}>
            <Row>
                {error && <>
                    <Image source={require('@/assets/icons/triangle-warning.png')} style={{ width: 20, height: 20 }} tintColor={colors.red} />
                    <ThemedText color="red">{error}</ThemedText>
                </>
                }
            </Row>
            {
                showLenght && canShowLenght && <ThemedText>{value.length} / {maxLenght}</ThemedText>
            }
        </Row>

    </View>
}

const styles = StyleSheet.create({
    cardInput: {
        height: 90,
        justifyContent: 'space-between'
    },
    card: {
        borderRadius: 20,
        borderWidth: 2,
        height: 64,
        paddingHorizontal: 24,
        paddingRight: 8,
        justifyContent: 'center'
    },
    bottom: {
        justifyContent: 'space-between'
    },
    input: {
        fontSize: 16,
        // fontWeight:500 //error in textinput
    }
});

