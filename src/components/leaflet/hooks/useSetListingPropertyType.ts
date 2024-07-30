import React from 'react'
import { useMutation } from 'react-query'
import { filterListingPropertyTypeService } from 'services/ai'
import { IFilters } from '..'

export default function useSetListingPropertyType(setListingMarkers: React.Dispatch<React.SetStateAction<any[]>> , setListings: React.Dispatch<any>) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: IFilters) => {
            return filterListingPropertyTypeService(payload)
        },
        onSuccess: (data) => {
            setListings(data)
            const myArray : any[] = []
            data.listings.map((item : any )=> myArray.push([Number(item?.map?.latitude) , Number(item.map.longitude) , "571"]) )
            setListingMarkers(myArray)
        },
        onError: () => {},
    })

    return { mutatePropertyType: mutate }
}
