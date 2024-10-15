//UserStore
import { create } from "zustand";
import { HOST } from "@/config";
import { RegionInterface, UserInterface } from "../interfaces/app";
import { AsyncStorage } from "@/Functions/AsyncStorage";
// import { transmit } from "../../Tools/Transmit";

interface UserState {
    user: UserInterface | undefined;
    openAuth: boolean;
    userRegion: RegionInterface | undefined
    disconnection(): Promise<void>;
    deleteUserAccount(): Promise<void>;
    phone_connexion(data: {
        phone: string,
        password: string,
    }): Promise<UserInterface | undefined>
    setUserRegion: (region: Partial<RegionInterface> | undefined) => void
    updateUser(data: Partial<UserInterface>): Promise<void>;
    currentUser: () => Promise<UserInterface | undefined>,
    getHeaders(): Promise<{ user: UserInterface, headers: Headers } | undefined>
}
export const useUserStore = create<UserState>((set, get) => ({
    user: undefined,
    userRegion: undefined,
    openAuth: false,
    setUserRegion(region) {
        (async () => {
            const r = await AsyncStorage.getItem('user.region');

            const a: RegionInterface = {
                latitude: region?.latitude || r?.latitude || 0,
                longitude: region?.longitude || r?.longitude || 0,
                address: region?.address || r.address || '',
                latitudeDelta: 0,
                longitudeDelta: 0
            }
            set(() => ({ userRegion: a }));
        })()
    },
    async phone_connexion({ phone, password }) {
        const h = await get().getHeaders();
        if (!h) return
        const formData = new FormData();

        formData.append('phone', phone);
        formData.append('password', password);

        const response = await fetch(`${HOST}/phone_connexion`, {
            method: 'POST',
            body: formData,
            headers: h.headers,
        });


        let user = await response.json();

        if (!user?.data) return user?.message
        user = user.data

        console.log(user);

        set(() => ({
            user,
        }));
        AsyncStorage.setItem('user', user);
        AsyncStorage.setItem('token', user.token || '');
        return user;
    },
    async currentUser() {


        return undefined
    },
    async updateUser(data) {

        const h = await get().getHeaders();
        if (!h) return
        const formData = new FormData();


        if (data.photos) {
            let l = [];

            const imgs = (data as UserInterface & { photos: (string | File)[] }).photos;

            for (let i = 0; i < imgs.length; i++) {
                if ((imgs[i] as any).uri) {
                    l.push(`photos_${i}`)
                    formData.append('photos_' + i, imgs[i]);
                } else {
                    l.push(imgs[i]);
                }
            }

            formData.append('photos', JSON.stringify(l));
            delete data.photos
        }
        if (data.name) {
            formData.append('name', data.name);
        }
        try {

            const response = await fetch(`${HOST}/edit_me`, {
                method: 'PUT',
                body: formData,
                headers: h.headers,
            });

            let user = await response.json();
            if (!user?.data) return user.message
            user = user.data;
            set(() => ({
                user,
            }));
            AsyncStorage.setItem('user', { ...h.user, ...user });
        } catch (error) {
            console.log('error : ==>', error);

        }
    },
    async disconnection() {
        const h = await get().getHeaders();
        if (!h) return

        const requestOptions = {
            method: "GET",
            headers: h.headers,
        };
        await fetch(`${HOST}/disconnection`, requestOptions)

        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        set(() => ({ user: undefined, openAuth: true }));
    },
    async deleteUserAccount() {
        const h = await get().getHeaders();
        if (!h) return

        const requestOptions = {
            method: "GET",
            headers: h.headers,
        };
        await fetch(`${HOST}/delete_user_account`, requestOptions)

        AsyncStorage.removeItem('user');
        AsyncStorage.removeItem('token');
        set(() => ({ user: undefined, openAuth: true }));
    },
    async getHeaders() {
        let user = get().user as UserInterface;
        const headers = new Headers();
        const token = await AsyncStorage.getItem('token');
        headers.append("Authorization", `Bearer ${token}`);
        return {
            headers,
            user
        }
    }
}));

