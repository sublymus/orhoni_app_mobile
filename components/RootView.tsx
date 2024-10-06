import { useThemeColor } from "@/hooks/useThemeColors";
import { useEffect } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import Animated, { Easing, ReduceMotion, interpolate, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps & {
    backgroundColor?: string,
}

export function RootView({ style, backgroundColor, ...rest }: Props) {

    const colors = useThemeColor();

    // const progress = useSharedValue(0);
    // const animatedStyle = useAnimatedStyle(() => {
    //     return {
    //         backgroundColor: interpolateColor(
    //             progress.value,
    //             [0, 1], [colors.tinit,
    //             backgroundColor ?? colors.tinit
    //         ])
    //     }
    // }, [backgroundColor])

    // useEffect(() => {
    //     if (backgroundColor) {
    //         progress.value = 0;
    //         progress.value = withTiming(1, {
    //             duration: 700,
    //             easing: Easing.out(Easing.quad),
    //             reduceMotion: ReduceMotion.System
    //         })
    //     }
    // }, [backgroundColor])

    // if (!backgroundColor) {
        return <SafeAreaView
            style={[styles.root, { backgroundColor: colors.background }, style]}
            {...rest}
        />
    // }

    // return <Animated.View style={[{ flex: 1 }, animatedStyle, style]}>
    //     <SafeAreaView
    //         style={[styles.root]}{...rest} />
    // </Animated.View>

}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    }
})