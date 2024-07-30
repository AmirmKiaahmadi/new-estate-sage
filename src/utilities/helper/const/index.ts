import { IFilters } from 'components/leaflet'

export const initialFilters: IFilters = {
    properties: [], //done
    price: [0, 4000000], //done
    active: 'All date listing', //check
    conditions: '', //check
    leaseAndSale: '', //done
    more: {
        keywords: [], //check
        fee: [], //one
        bedrooms: '', // done
        bathrooms: '', // done
        kitchen: '', // done
        garage: '', // done
        parkingType: [], // done
        basement: [], //done
        openHouse: [], // fix
        listingType: [], // fix
        squareFootage: [0, 400000], //done
    },
}
