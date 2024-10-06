import { AddressInterface, ContactInterface } from "@/interfaces/app";


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


export const contactData : ContactInterface[] = [{
    id:'1',
    phone:"+7 (999) 862-74-41",
    type:'phone',
    use:'["t","w"]',
    user_id:'1',
    updated_at:'',
    created_at:'',
},{
    id:'2',
    phone:"+225 07-59-92-95-15",
    type:'phone',
    use:'["w"]',
    user_id:'1',
    updated_at:'',
    created_at:'',
},{
    id:'3',
    phone:"+33 090-873-99",
    type:'phone',
    use:'["t"]',
    user_id:'1',
    updated_at:'',
    created_at:'',
},{
    id:'4',
    phone:"@Sublymus",
    type:'telegram',
    use:'["t"]',
    user_id:'1',
    updated_at:'',
    created_at:'',
},{
    id:'5',
    phone:"+7 (999) 862-74-41",
    type:'phone',
    use:'[]',
    user_id:'1',
    updated_at:'',
    created_at:'',
}]


