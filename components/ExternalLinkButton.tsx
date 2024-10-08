// import { Href, Link } from 'expo-router';
// import { openBrowserAsync } from 'expo-web-browser';
// import { type ComponentProps } from 'react';
// import { Platform } from 'react-native';

// type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href<string | object> };

// export function ExternalLink({ href, ...rest }: Props) {
//   return (
//     <Link
//       target="_blank"
//       {...rest}
//       href={href}
//       onPress={async (event) => {
//         if (Platform.OS !== 'web') {
//           // Prevent the default behavior of linking to the default browser on native.
//           event.preventDefault();
//           // Open the link in an in-app browser.
//           await openBrowserAsync(href.toString());
//         }
//       }}
//     />
//   );
// }


import { Image, ImageSourcePropType, ImageStyle, Pressable, StyleSheet,  TouchableOpacity,  View, ViewStyle } from "react-native";
import { Row } from "./Row";
import { useThemeColor } from "@/hooks/useThemeColors";
import { ThemedText } from "./ThemedText";
import { Href } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";

type Props = {
    style?: ViewStyle,
    iconSource?: ImageSourcePropType,
    iconStyle?: ImageStyle
    title: string,
    description?: string,
    tintColor?: string,
    onPress?: (value?:boolean) => any,
    rightIconSource?: ImageSourcePropType | null,
    iconRightStyle?: ImageStyle,
    href: Href<string | object>
}

export function ExternalLinkButton({ iconSource, title, description, style, tintColor, onPress, rightIconSource, iconRightStyle, iconStyle, href  }: Props) {

    const colors = useThemeColor();

    return <TouchableOpacity style={[styles.page, style]} onPress={async()=>{
      await openBrowserAsync(href.toString());
    }}>
        <Row>
            <View style={[styles.iconCtn, { backgroundColor: colors.discret2 }]}>
                {iconSource && <Image source={iconSource} style={[{ width: 24, height: 24 }, iconStyle]} tintColor={tintColor || colors.color} />}
            </View>
            <Row style={styles.right}>
                <View style={{ flex: 1 }}>
                    <ThemedText variant="h3">{title}</ThemedText>
                    {description && <ThemedText style={{ marginTop: 5 }} color="discret">{description}</ThemedText>}
                </View>
                {
                 rightIconSource !== null && <Image source={rightIconSource || require('@/assets/icons/angle-small-right.png')} style={[{ width: 20, height: 20, marginLeft: 'auto' }, iconRightStyle]} tintColor={tintColor || colors.color} />
                }
            </Row>
        </Row>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    page: {
        paddingVertical: 12,
    },
    text: {
        marginLeft: 24,
        flex: 1
    },
    iconCtn: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    right: {
        flex: 1,
        marginLeft: 24
    },
})