
import { AsyncStorage } from '@/Functions/AsyncStorage';
import { FromApiLocation } from '@/interfaces/app';
import { useAppStore } from '@/stores/Appstore';
import { useUserStore } from '@/stores/UserStore';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const [loaded] = useFonts({
  //   SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  // });

  // useEffect(() => {
  //   if (loaded) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded]);

  // if (!loaded) {
  //   return null;
  // }

  useEffect(() => {
    (async () => {
      try {
        const lang = await AsyncStorage.getItem('user.lang');
        const theme = await AsyncStorage.getItem('user.theme');
        const notif = await AsyncStorage.getItem('user.notif');
        const system = await AsyncStorage.getItem('user.theme_system');
        useAppStore.setState({
          ...useAppStore.getState(),
          ...{
            lang: lang,
            theme: theme || 'light',
            notif: !!notif,
            isSystem: !!system,
          },
        });
      } catch (error) { }
      try {

        const userRegion = await AsyncStorage.getItem('user.region');
        const user = await AsyncStorage.getItem('user');
        if (!user) router.replace('/login');
        useUserStore.setState({
          ...useUserStore.getState(),
          user,
          userRegion: userRegion
        })
      } catch (error) { }
    })()
  }, []);

  const { user, setUserRegion, userRegion } = useUserStore()
  useEffect(() => {
      (async () => {
          const userRegion = await AsyncStorage.getItem('user.region');
          if (user && !userRegion) {
              const response = await fetch(`https://ipinfo.io/json`);
              try {
                  const a = await response.json() as FromApiLocation;
                  if (a && a.loc) {
                      const region = {
                          latitudeDelta: 0.0922,
                          longitudeDelta: 0.0421,
                          address: a.region,
                          latitude: parseInt(a.loc.split(',')[0] || '0'),
                          longitude: parseInt(a.loc.split(',')[1] || '0')
                      }
                      AsyncStorage.setItem('user.region', region);
                      setUserRegion(region)
                  }
              } catch (error) { }
          }
      })()
  }, [user]);

  return (
    <Stack screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="index" />

    </Stack>
  );
}
