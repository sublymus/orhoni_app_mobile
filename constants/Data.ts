import { AddressInterface, ContactInterface, DeviceInterface } from "@/interfaces/app";


export const addressesData: AddressInterface[] = [{
    id: '001',
    user_id: 'user_001',
    address: 'Abidjan yopougon, cite verte',
    created_at: '',
    icon: 'home',
    latitude: '40',
    description: 'Rue Sainte Famille, Cité Sodefor Lauriers 11 & 12, Yopougon, Abidjan, Côte d’Ivoire',
    longitude: '0',
    name: 'home',
    real_position: true,
    updated_at: ''
}, {
    id: '002',
    user_id: 'user_001',
    address: '5, проспект Космонавтов, СЖМ, Ворошиловский район, Rostov-sur-le-Don, Rostov-on-Don, Oblast de Rostov, District fédéral du Sud, 344092, Russie',
    created_at: '',
    icon: 'home-outline',
    latitude: '40',
    longitude: '0',
    name: 'home',
    real_position: true,
    updated_at: ''
}, {
    id: '003',
    user_id: 'user_001',
    address: 'ДГТУ, 1, площадь Гагарина, Кировский район, Rostov-sur-le-Don, Rostov-on-Don, Oblast de Rostov, District fédéral du Sud, 344010, Russie',
    created_at: '',
    icon: 'home',
    description: 'Rue Sainte Famille, Cité Sodefor Lauriers 11 & 12, Yopougon, Abidjan, Côte d’Ivoire',
    latitude: '40',
    longitude: '0',
    name: 'home',
    real_position: true,
    updated_at: ''
}, {
    id: '004',
    user_id: 'user_001',
    address: 'Rue Sainte Famille, Cité Sodefor Lauriers 11 & 12, Yopougon, Abidjan, Côte d’Ivoire',
    created_at: '',
    icon: 'marker',
    latitude: '40',
    longitude: '0',
    name: 'home',
    real_position: true,
    updated_at: ''
}, {
    id: '005',
    user_id: 'user_001',
    address: 'Saint Mathieu, Rue Saint Mathieu, Cité Bracodi, Niangon, Yopougon, Abidjan, Côte d’Ivoire',
    created_at: '',
    description: 'Rue Sainte Famille, Cité Sodefor Lauriers 11 & 12, Yopougon, Abidjan, Côte d’Ivoire',
    icon: 'user-outline',
    latitude: '40',
    longitude: '0',
    name: 'home',
    real_position: true,
    updated_at: ''
},]


export const contactData: ContactInterface[] = [{
    id: '1',
    phone: "+7 (999) 862-74-41",
    type: 'phone',
    use: '["t","w"]',
    user_id: '1',
    updated_at: '',
    created_at: '',
}, {
    id: '2',
    phone: "+225 07-59-92-95-15",
    type: 'phone',
    use: '["w"]',
    user_id: '1',
    updated_at: '',
    created_at: '',
}, {
    id: '3',
    phone: "+33 090-873-99",
    type: 'phone',
    use: '["t"]',
    user_id: '1',
    updated_at: '',
    created_at: '',
}, {
    id: '4',
    phone: "@Sublymus",
    type: 'telegram',
    use: '["t"]',
    user_id: '1',
    updated_at: '',
    created_at: '',
}, {
    id: '5',
    phone: "+7 (999) 862-74-41",
    type: 'phone',
    use: '[]',
    user_id: '1',
    updated_at: '',
    created_at: '',
}]


export const devicesData: DeviceInterface[] = [
    {
        "created_at": "2024-01-15T10:30:00",
        "updated_at": "2024-02-20T14:00:00",
        "enable": true,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.140 Safari/537.36",
        "ip": "192.168.1.1"
    },
    {
        "created_at": "2024-03-05T09:15:00",
        "updated_at": "2024-06-30T13:00:00",
        "enable": false,
        "user_agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15A372 Safari/604.1",
        "ip": "10.0.0.5"
    },
    {
        "created_at": "2024-04-10T18:45:00",
        "updated_at": "2024-05-25T07:30:00",
        "enable": true,
        "user_agent": "Mozilla/5.0 (Linux; Android 12; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.5481.77 Mobile Safari/537.36",
        "ip": "172.16.0.12"
    },
    {
        "created_at": "2024-07-14T21:15:00",
        "updated_at": "2024-08-01T11:00:00",
        "enable": false,
        "user_agent": "Mozilla/5.0 (iPad; CPU OS 15_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Mobile/15E148 Safari/604.1",
        "ip": "203.0.113.45"
    },
    {
        "created_at": "2024-09-21T16:45:00",
        "updated_at": "2024-10-09T08:30:00",
        "enable": true,
        "user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.140 Safari/537.36",
        "ip": "198.51.100.25"
    },
    {
        "created_at": "2024-10-01T09:00:00",
        "updated_at": "2024-10-02T10:00:00",
        "enable": true,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Gecko/20100101 Firefox/120.0",
        "ip": "192.0.2.1"
    },
    {
        "created_at": "2024-10-03T15:30:00",
        "updated_at": "2024-10-04T16:00:00",
        "enable": false,
        "user_agent": "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36",
        "ip": "198.51.100.2"
    },
    {
        "created_at": "2024-10-05T08:45:00",
        "updated_at": "2024-10-06T09:15:00",
        "enable": true,
        "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.4 Safari/605.1.15",
        "ip": "203.0.113.22"
    },
    {
        "created_at": "2024-10-07T12:00:00",
        "updated_at": "2024-10-08T13:30:00",
        "enable": false,
        "user_agent": "Mozilla/5.0 (Linux; Android 10; SM-G950F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Mobile Safari/537.36",
        "ip": "172.16.0.1"
    },
    {
        "created_at": "2024-10-09T14:00:00",
        "updated_at": "2024-10-10T15:15:00",
        "enable": true,
        "user_agent": "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; AS; rv:11.0) like Gecko",
        "ip": "192.168.0.10"
    },
    {
        "created_at": "2024-10-11T11:30:00",
        "updated_at": "2024-10-12T12:45:00",
        "enable": true,
        "user_agent": "Opera/9.80 (Android; Opera Mini/57.0.2254/94.138; U; fr) Presto/2.12.423 Version/12.16",
        "ip": "198.51.100.100"
    }
]