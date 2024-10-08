import { CheckBox } from "@/components/CheckBox";
import { LoadingIcon } from "@/components/LoadingIcon";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { StackModal } from "@/components/StackModal";
import { ThemedText } from "@/components/ThemedText";
import { addressesData, contactData } from "@/constants/Data";
import { limit } from "@/constants/Functions";
import { addressIcons } from "@/constants/LocalIcons";
import { useThemeColor } from "@/hooks/useThemeColors";
import { ContactInterface } from "@/interfaces/app";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme } from "react-native";

export default function Page() {

    const colors = useThemeColor();
    const [collected, setCollected] = useState<Partial<ContactInterface> | null>(null);
    const theme = useColorScheme()

    return (
        <RootView>
            <ScrollView >
                <View style={styles.conatiner}>
                    <Row style={styles.top}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Image source={require('@/assets/icons/back.png')} style={styles.topIcon} tintColor={colors.color} />
                        </TouchableOpacity>
                        <ThemedText variant="h1">Contact</ThemedText>
                        <Image source={require('@/assets/icons/menu-dots.png')} style={[styles.topIcon, { transform: [{ rotate: '90deg' }, { scale: 0.8 }] }]} tintColor={colors.color} />
                    </Row>
                    <TouchableOpacity onPress={() => {
                        setCollected({})
                    }}>
                        <Row style={[styles.addBtn, { backgroundColor: theme == 'light' ? colors.bleu + '33' : '#ffffff' + '11' }]}>
                            <Image source={require('@/assets/icons/phone-plus.png')} style={{ width: 20, height: 20 }} tintColor={theme == 'light' ? colors.bleu : '#fff'} />
                            <Text style={{ color: theme == 'light' ? colors.bleu : '#fff', fontWeight: 600 }}>Add New Contact</Text>
                        </Row>
                    </TouchableOpacity>
                    {
                        contactData.map(a => (
                            <ContactItem key={a.id} contact={a} onChangeSelect={() => setCollected(a)} onPress={() => setCollected(a)} />
                        ))
                    }
                </View>
            </ScrollView>
            {
                collected && <StackModal
                    canClose
                    background={'#0009'}
                    title={"Add new Contact"}
                    subtitle="make sure it's a public contact, everyone will be able to see it"
                    width={Dimensions.get('window').width - 48}
                    onClose={() => {
                        setCollected(null)
                    }}
                >
                    <ManageContact
                        contact={collected}
                        mode={collected.id ? 'edit' : 'new'}
                        submit={async (data) => {
                            await new Promise(rev => {
                                setTimeout(() => {
                                    rev(null);
                                }, 3000);
                            })
                            setCollected(null)
                            return true
                        }}
                    />
                </StackModal>
            }
        </RootView>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 24,
        paddingTop: 12,
        gap: 16,
        paddingBottom: 100
    },
    top: {
        justifyContent: 'space-between'
    },
    topIcon: {
        width: 24,
        height: 24
    },
    addBtn: {
        padding: 12,
        gap: 12,
        borderRadius: 10,
    }
})

type _Props = {
    contact: Partial<ContactInterface> | null,
    mode: 'edit' | 'new',
    submit: (data: ContactInterface) => Promise<boolean>,
}

function ManageContact({ contact, mode, submit }: _Props) {
    const [switchLelft, setSwitchLeft] = useState(2);// 2 =>  84
    const [type, setType] = useState<ContactInterface['type']>(contact?.type || 'phone');
    const [phone, setPhone] = useState(contact?.phone || (type == 'phone' ? '+225' : '@'));
    const [useT, setUseT] = useState(contact?.type == 'telegram' ? true : contact?.use?.includes('t') || false);
    const [useW, setUseW] = useState(contact?.use?.includes('w') || false)
    const colors = useThemeColor();
    const theme = useColorScheme();

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setSwitchLeft(type == 'phone' ? 2 : 84)
    }, [type])
    return <View style={_style.manager}>
        <Pressable onPress={() => {
            const t = type == 'phone' ? 'telegram' : 'phone'
            setType(t);
            setPhone(t == 'phone' ? '+225' : '@')
        }}>
            <Row style={[_style.swith, { backgroundColor: theme == 'light' ? colors.discret2 : '#000a' }]}>
                <View style={[_style.move, { left: switchLelft, backgroundColor: colors.background }]}>
                </View>
                <View style={_style.switchText}>
                    <ThemedText variant="h3">{'Phone'}</ThemedText>
                </View>
                <View style={_style.switchText}>
                    <ThemedText variant="h3">{'Telegram'}</ThemedText>
                </View>
            </Row>
        </Pressable>
        <View style={{ backgroundColor: colors.discret2, borderRadius: 15 }}>
            <TextInput value={phone} placeholder={type == 'phone' ? 'Phone number' : 'Telegram Tag'} style={[_style.inputZone, { color: colors.color }]}
                onChangeText={(text) => {
                    const t = type == 'phone' ? '+225' : '@';
                    if (type == 'phone') {
                        const l = ['+', ...Array.from({ length: 10 }).map((_, i) => i + '')];
                        text = text.split('').filter(c => l.includes(c)).join('').trim();
                    }
                    if (!text.startsWith(t)) return console.log('--', text, '--');
                    ;
                    setPhone(text)
                }} />
        </View>
        <View style={{ gap: 12 }}>
            <ThemedText variant="discret">{'choose a social network'}</ThemedText>
            <Row style={_style.socials}>
                {
                    <Pressable style={[_style.social, { backgroundColor: useT ? colors.bleu + '33' : undefined, borderColor: colors.bleu + '33' }]}
                        onPress={() => setUseT(!useT)}>
                        <Image source={require('@/assets/icons/telegram.png')} style={{ width: 24, height: 24 }} tintColor={'#229ED9'} />
                    </Pressable>
                }
                {
                    <Pressable style={[_style.social, { backgroundColor: useW ? colors.bleu + '33' : undefined, borderColor: colors.bleu + '33' }]}
                        onPress={() => setUseW(!useW)}>
                        <Image source={require('@/assets/icons/whatsapp.png')} style={{ width: 24, height: 24 }} tintColor={'#25D366'} />
                    </Pressable>
                }
            </Row>
        </View>
        <TouchableOpacity style={[_style.submit, { backgroundColor: theme=='dark'?colors.discret:colors.discret2 }]} onPress={() => {
            if (loading) return;
            setLoading(true);
            submit({
                use: (useT ? 't' : '') + (useT ? 'w' : ''),
                created_at: '',
                id: '',
                phone,
                type,
                updated_at: '',
                user_id: ''
            }).then(res=>{
                setLoading(false);
            })
        }}>
            {
                loading?<LoadingIcon tintColor={colors.color}/>:
                <ThemedText>Save Contact</ThemedText>
            }
        </TouchableOpacity>
    </View>
}

const _style = StyleSheet.create({
    manager: {
        alignItems: 'center',
        gap: 24,
        padding: 24,
        paddingTop: 12,
    },
    move: {
        position: 'absolute',
        width: 80,
        height: 40,
        borderRadius: 50,
    },
    swith: {
        padding: 2,
        paddingVertical: 13,
        borderRadius: 50,
        gap: 2
    },
    switchText: {
        width: 80,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputZone: {
        padding: 8,
        width: 200,
        borderRadius: 8,
        fontSize: 16,
    },
    submit: {
        padding: 12,
        borderRadius: 50,
        width: 160,
        alignItems: 'center'
    },
    socials: {
        gap: 24
    },
    social: {
        borderRadius: 10,
        borderWidth: 2,
        padding: 8
    }
})


type Props = {
    onChangeSelect?: (seleted: boolean) => any,
    contact: ContactInterface,
    onPress?: () => any
}

export function ContactItem({ contact, onChangeSelect, onPress }: Props) {

    const colors = useThemeColor();

    return <Pressable android_ripple={{ color: colors.bleu }} onPress={() => onPress?.()} style={[_styles.container, { borderColor: colors.discret2 }]}>
        <Row style={{ gap: 12 }}>
            <ThemedText variant="h4" style={{ marginRight: 'auto' }}>{contact.phone}</ThemedText>
            {
                contact.use.includes('t') && <Image source={require('@/assets/icons/telegram.png')} style={{ width: 20, height: 20 }} tintColor={'#229ED9'} />
            }
            {
                contact.use.includes('w') && <Image source={require('@/assets/icons/whatsapp.png')} style={{ width: 20, height: 20 }} tintColor={'#25D366'} />
            }
            <CheckBox onChange={(select) => onChangeSelect?.(select)} value={false} />
        </Row>
    </Pressable>
}

const _styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 2,
        padding: 12,
        gap: 12
    }
})