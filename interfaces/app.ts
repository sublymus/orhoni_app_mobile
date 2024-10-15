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
    phone:string
    use?:string
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

export interface UserInterface{
    id: string
    name: string | null
    package_id: string
    photos: string[] 
    phone: string| null
    password: string| null
    created_at: string
    updated_at: string
}

export interface ListType<T>{
    "meta": {
        "total": number,
        "perPage": number,
        "currentPage": number,
        "lastPage": number,
        "firstPage": number,
        "firstPageUrl": string,
        "lastPageUrl": string,
        "nextPageUrl": string,
        "previousPageUrl": string
    },
    "data": T[]
}

export interface FromApiLocation{
    ip: string,
    hostname: string,
    city: string,
    region: string,
    country: string,
    loc: string,
    org: string,
    postal: string,
    timezone: string,
    readme: string
}

export interface RegionInterface{
    latitudeDelta: number,
    longitudeDelta: number,
    address: string,
    latitude: number,
    longitude: number
}

export interface AddressResultInterface {

    place_id: number,
    licence: string,
    osm_type: string,
    osm_id: number,
    lat: string,
    lon: string,
    class: string,
    type: string,
    place_rank: number,
    importance: number,
    addresstype: string,
    name: string,
    display_name: string,
    address: {
        house_number: string,
        road: string,
        hamlet: string,
        town: string,
        city: string,
        "ISO31662-lvl8": string,
        state_district: string,
        state: string,
        "ISO31662-lvl4": string,
        postcode: string,
        country: string,
        country_code: string,
    },
    boundingbox: string[] // json.stringify(number[])
}


