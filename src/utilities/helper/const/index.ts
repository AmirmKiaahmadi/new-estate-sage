import { IFilters } from 'components/leaflet'

export const initialFilters: IFilters = {
    properties: [],
    price: [0, 4000000],
    active: 'All date listing',
    conditions: '',
    leaseAndSale: 'for lease',
    more: {
        keywords: [],
        fee: [],
        bedrooms: 'All',
        bathrooms: 'All',
        kitchen: 'All',
        garage: 'All',
        parkingType: [],
        basement: [],
        openHouse: '',
        listingType: [],
        squareFootage: [0, 400000],
    },
}
