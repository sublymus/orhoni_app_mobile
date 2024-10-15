import { create } from "zustand";
import { HOST } from "../config";
import { ContactInterface, ListType } from "@/interfaces/app";
import { useUserStore } from "./UserStore";

interface ContactState {
    contacts: ListType<ContactInterface> | undefined,
    // contact: ContactInterface | undefined
    fetchContacts(filter?: {
        page?: number,
        limit?: number,
        order_by?: string,
        no_save?: boolean,
        contact_id?: string
        use_cache?: boolean
    }): Promise<ListType<ContactInterface> | undefined>
    // setContactById(json?: Record<string, any>): Promise<void>
    // setContact(contact:ContactInterface | undefined):void
    updateContact(contact: Partial<ContactInterface>): Promise<ContactInterface | undefined>,
    createContact(contact: Partial<ContactInterface>): Promise<ContactInterface | undefined>,
    removeContact(contact_id: string): Promise<{ isDeleted: boolean } | undefined>
}

export const useContactStore = create<ContactState>((set, get) => ({
    contact: undefined,
    contacts: undefined,
    // setContact(contact){
    //     set(()=>({contact}))
    // },
    async createContact(contact) {
        const h = await useUserStore.getState().getHeaders();
        if (!h) return

        const formData = new FormData();

        for (const k in contact) {
            if ((contact as any)[k]) {
                ((contact as any)[k] !== undefined) && formData.append(k, (contact as any)[k])
            }
        }

        const response = await fetch(`${HOST}/create_contact`, {
            method: 'POST',
            body: formData,
            headers: h.headers,
        });

        let _contact = await response.json();

        if (!_contact?.data) return _contact.message
        _contact = _contact.data
        set(({ contacts }) => ({
            contact: _contact,
            contacts: contacts && { ...contacts, data: [_contact, ...contacts.data] }
        }));
        return _contact;
    },

    async removeContact(contact_id) {
        const h = await useUserStore.getState().getHeaders();
        if (!h) return
        const response = await fetch(`${HOST}/delete_contact/${contact_id}`, {
            method: 'DELETE',
            headers: h.headers
        });
        const json = await response.json();
        if (json?.isDeleted) {
            set(({ contacts }) => ({ contacts: contacts && { ...contacts, data: contacts.data.filter(p => p.id != contact_id) } }))
        }
        return json?.isDeleted;
    },

    async updateContact(contact) {
        const h = await useUserStore.getState().getHeaders();

        if (!h) return
        if (!contact.id) return
        (contact as any).contact_id = contact.id

        const formData = new FormData();



        for (const k in contact) {
            if ((contact as any)[k]) {
                (contact as any)[k] && formData.append(k, (contact as any)[k])
            }
        }

        const response = await fetch(`${HOST}/update_contact`, {
            method: 'PUT',
            body: formData,
            headers: h.headers,
        });

        let _contact = await response.json();
        
        if (!_contact?.data) return _contact.message
        _contact = _contact.data;
        
        set(({ contacts }) => ({
            contact: _contact,
            contacts: contacts && { ...contacts, data: contacts.data.map(a => a.id == contact.id ? _contact : a) }
        }));
        return _contact;
    },
    // async setContactById(json) {

    //     if (!json?.contact_id) return;

    //     let contact = get().contacts?.data.find(a => a.id == json.contact_id);
    //     if (contact) {
    //         set(() => ({ contact: contact && { ...contact } }));
    //     } else {
    //         contact = (await get().fetchContacts({
    //             no_save: true,
    //             contact_id: json.contact_id
    //         }))?.data[0];
    //         set(() => ({ contact }));
    //     }
    // },
    async fetchContacts(filter) {
        const h = await useUserStore.getState().getHeaders()
        if (!h) return;

        let contacts: ListType<ContactInterface> | undefined

        const searchParams = new URLSearchParams({});
        for (const key in filter) {
            const value = filter[key as keyof typeof filter];
            (value != undefined) && searchParams.set(key, value as any);
        }
        const response = await fetch(`${HOST}/get_contacts/?${searchParams.toString()}`, {
            headers: h.headers
        });
        contacts = (await response.json()).data as ListType<ContactInterface>
        if (!contacts?.data) return


        if (!filter?.no_save) {
            set(() => ({ contacts }))
        }
        // console.log(contacts);

        return contacts
    },
}))