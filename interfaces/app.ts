export interface AddressInterface {
    id: string
    user_id: string
    longitude: string
    latitude: string
    name: string
    address: string
    icon: string
    description?: string,
    real_position: boolean
    created_at: string
    updated_at: string
}

export interface ContactInterface{
    id:string
    user_id:string
    type:'phone'|'telegram'
    use:string
    phone:string
    created_at:string
    updated_at:string
}


export interface DeviceInterface {
    created_at: string,
    updated_at: string,
    enable: boolean,
    user_agent: string,
    ip:string
}