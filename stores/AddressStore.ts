import { AddressInterface, ListType } from "@/interfaces/app";
import { create } from "zustand";
import { useUserStore } from "./UserStore";
import { HOST } from "@/config";


interface AddressState {
    addresses: ListType<AddressInterface> | undefined
    fetchAddresses(filter?: {
        page?: number,
        limit?: number,
        order_by?: string,
        no_save?: boolean,
        address_id?: string
        use_cache?: boolean
    }): Promise<ListType<AddressInterface> | undefined>
    // setAddressById(json?: Record<string, any>): Promise<void>
    // setAddress(address:AddressInterface | undefined):void
    updateAddress(address: Partial<AddressInterface>): Promise<AddressInterface | undefined>,
    createAddress(address: Partial<AddressInterface>): Promise<AddressInterface | undefined>,
    removeAddress(address_id: string): Promise<{ isDeleted: boolean } | undefined>
}

export const useAddressStore = create<AddressState>((set, get) => ({
    addresses: undefined,
    async createAddress(address) {
        const h = await useUserStore.getState().getHeaders();
        if (!h) return

        const formData = new FormData();

        for (const k in address) {
            if ((address as any)[k]) {
                ((address as any)[k] !== undefined) && formData.append(k, (address as any)[k])
            }
        }

        const response = await fetch(`${HOST}/create_address`, {
            method: 'POST',
            body: formData,
            headers: h.headers,
        });

        let _address = await response.json();

        if (!_address?.data) return _address.message
        _address = _address.data
        set(({ addresses }) => ({
            address: _address,
            addresses: addresses && { ...addresses, data: [_address, ...addresses.data] }
        }));
        return _address;
    },
    async fetchAddresses(filter) {
        const h = await useUserStore.getState().getHeaders()
        if (!h) return;

        let addresses: ListType<AddressInterface> | undefined

        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = filter[key as keyof typeof filter];
            (value != undefined) && searchParams.set(key, value as any);
        }
        const response = await fetch(`${HOST}/get_addresses/?${searchParams.toString()}`, {
            headers: h.headers
        });
        addresses = (await response.json()).data as ListType<AddressInterface>
        if (!addresses?.data) return


        if (!filter?.no_save) {
            set(() => ({ addresses }))
        }
        // console.log(addresses);

        return addresses
    },
    async removeAddress(address_id) {
        const h = await useUserStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${HOST}/delete_address/${address_id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        const json = await response.json();
        if (json?.isDeleted) {
            set(({ addresses }) => ({ addresses: addresses && { ...addresses, data: addresses.data.filter(p => p.id != address_id) } }))
        }
        return json?.isDeleted;
    },
    async updateAddress(address) {
        const h = await useUserStore.getState().getHeaders();

        if (!h) return
        console.log(address);
        
        if (!address.id) return
        (address as any).address_id = address.id

        const formData = new FormData();



        for (const k in address) {
            if ((address as any)[k]) {
                (address as any)[k] && formData.append(k, (address as any)[k])
            }
        }

        const response = await fetch(`${HOST}/update_address`, {
            method: 'PUT',
            body: formData,
            headers: h.headers,
        });

        let _address = await response.json();

        if (!_address?.data) return _address.message
        _address = _address.data;

        set(({ addresses }) => ({
            contact: _address,
            addresses: addresses && { ...addresses, data: addresses.data.map(a => a.id == address.id ? _address : a) }
        }));
        return _address;
    },
}))