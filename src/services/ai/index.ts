import { QueryFunction, QueryFunctionContext } from 'react-query'
import request from '../axios'
import { IFilters } from 'components/leaflet'
// http://ec2-15-157-68-30.ca-central-1.compute.amazonaws.com:8000/app/search/
export const aiService = async (payload: any) => {
    const { data }: { data: any } = await request.post(
        `http://ec2-3-96-165-111.ca-central-1.compute.amazonaws.com:8000/app/search/`,
        {
            q: payload,
            'access-token': '942793b6-5384-4f61-b5ab-339a08756ecc',
        }
    )
    return data
}
export const aiServiceDetail = async (payload1: any) => {
    const payload = JSON.stringify([payload1])
    const { data }: { data: any } = await request.post(
        `http://ec2-3-96-165-111.ca-central-1.compute.amazonaws.com:8000/app/id_search/`,
        {
            data: payload,
        }
    )
    return data
}

export const aiServiceFeatures = async (payload1: any) => {
    const payload = JSON.stringify([payload1])
    const { data }: { data: any } = await request.post(
        `http://ec2-3-96-165-111.ca-central-1.compute.amazonaws.com:8000/app/feature_search/`,
        {
            feature: payload,
        }
    )
    return data
}
// https://cdn.repliers.io/IMG-C8391984_1.jpg?class=small

export const DetailService = async (ctx: QueryFunctionContext) => {
    const payload = JSON.stringify([
        {
            mlsNumber: ctx.queryKey[1],
            latitude: ctx.queryKey[2],
            longitude: ctx.queryKey[3],
        },
    ])
    const { data }: { data: any } = await request.post(
        `http://ec2-3-96-165-111.ca-central-1.compute.amazonaws.com:8000/app/id_search/`,
        {
            data: payload,
        }
    )
    return data.data[0]
}

export const listingsService = async () => {
    const { data }: { data: any } = await request.get(
        `https://api.repliers.io/listings`)
    return data
}

export const placesService = async () => {
    const { data }: { data: any } = await request.get(
        `https://api.repliers.io/places?lat=43.65107&long=-79.347015`)
    return data
}


export const filterListingPropertyTypeService = async (payload:IFilters) => {
    console.log("payload" , payload)
        let params = ''
        if(payload.leaseAndSale){
            
            if(params.indexOf("?") < 0){
                params = `?type=${payload.leaseAndSale}`
            }else{
               
                params = params + `&type=${payload.leaseAndSale}`
            }
        }
       
        if(payload.properties.length < 0){
            payload.properties.map((item , index) => {
                if(index === 0 && params.indexOf("?") < 0){
                    params = `?propertyType=${item}`
                }else{
                    params = params + `&propertyTyp=${item}`
                }
            })
        }
        
        if(payload.price[0] !== 0 || payload.price[1] !== 4000000){
            if(params.indexOf("?") < 0){
                params = `?minPrice=${payload.price[0]}&maxPrice=${payload.price[1]}`
            }else{
               
                params = params + `&minPrice=${payload.price[0]}&maxPrice=${payload.price[1]}`
            }
        }
        
        if(payload.more.fee.length > 0){
            if(params.indexOf("?") < 0){
                params = `?maxMaintenanceFee=${payload.more.fee[1]}&minMaintenanceFee=${payload.more.fee[0]}`
            }else{
                
                params = params + `&maxMaintenanceFee=${payload.more.fee[1]}&minMaintenanceFee=${payload.more.fee[0]}`
            }
        }
       
        if(payload.more.bedrooms){
            console.log("fuck bed" , params.indexOf("?"))
            if(params.indexOf("?") < 0){
                params = `?minBeds=${payload.more.bedrooms}`
            }else{
                
                params = params + `&minBeds=${payload.more.bedrooms}`
            }
        }

        if(payload.more.bathrooms){
           
            if(params.indexOf("?") < 0){
                params = `?maxBaths=${payload.more.bathrooms}`
            }else{
              
                params = params + `&maxBaths=${payload.more.bathrooms}`
            }
        }
       
        if(payload.more.kitchen){
            if(params.indexOf("?") < 0){
                params = `?maxKitchens=${payload.more.kitchen}`
            }else{
                
                params = params + `&maxKitchens=${payload.more.kitchen}`
            }
        }
       
        if(payload.more.garage){
            if(params.indexOf("?") < 0){
                params = `?minGarageSpaces=${payload.more.garage}`
            }else{
                
                params = params + `&minGarageSpaces=${payload.more.garage}`
            }
        }
        
        if(payload.more.parkingType.length > 0){
            payload.more.parkingType.map((item , index) => {
                if(index === 0 && params.indexOf("?") < 0){
                    params = `?garage=${item}`
                }else{
                    params = params + `&garage=${item}`
                }
            })
        }
        
        if(payload.more.basement.length > 0){
            payload.more.basement.map((item , index) => {
                if(index === 0 && params.indexOf("?") < 0){
                    params = `?basement=${item}`
                }else{
                    params = params + `&basement=${item}`
                }
            })
        }
        if(payload.more.squareFootage[0] !== 0 || payload.more.squareFootage[1] !== 400000){
            if(params.indexOf("?") < 0){
                params = `?minSqft=${payload.more.squareFootage[0]}&maxSqft=${payload.more.squareFootage[0]}`
            }else{
                
                params = params + `&minSqft=${payload.more.squareFootage[0]}&maxSqft=${payload.more.squareFootage[0]}`
            }
        }
        


       
        
    const { data }: { data: any } = await request.post(
        `https://api.repliers.io/listings${params}`
        
    )
    return data
}

