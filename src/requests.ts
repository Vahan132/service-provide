import {serviceTypes, serviceByCategory} from "./constants";

const partners: any = {
    [serviceTypes.RESTAURANTS]: [
        {
            name: "Yerevan Pandok",
            value: "yerevan_pandok"
        },
        {
            name: "Florence",
            value: "florence"
        },
        {
            name: "Kovkas Pandok",
            value: "kovkas_pandok"
        }
    ],
    [serviceTypes.HOTELS]: [
        {
            name: "Ani Plaza",
            value: "ani_plaza"
        },
        {
            name: "Grand Hotel",
            value: "grand_hotel"
        },
        {
            name: "Radisson Blu",
            value: "raddison_blu"
        }
    ]
};

const services: any = {
    [serviceTypes.RESTAURANTS]: {
        menu: [
            {
                name: "Pork Stake",
                perPrice: 3000
            },
            {
                name: "Sushi",
                perPrice: 2500
            },
            {
                name: "Pizza",
                perPrice: 1000
            }
        ]
    },
    [serviceTypes.HOTELS]: {
        menu: [
            {
                name: "Breakfast",
                perPrice: 1000
            },
            {
                name: "Dinner",
                perPrice: 1500
            },
            {
                name: "Supper",
                perPrice: 1800
            }
        ]
    }
};

export function getPartnersList(serviceType: string) {
    return partners[serviceType]
}

export function getServicesList(serviceType: string) {
    return services[serviceType]
}

export function getGroupId() {
    return Math.floor(Math.random() * 1000)
}