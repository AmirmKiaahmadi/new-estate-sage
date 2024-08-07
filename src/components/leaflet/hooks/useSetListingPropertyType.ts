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
            
            const markers : any[] = []
            data.aggregates.map.clusters.map((item: any) => {
              if(item.count === 1){
                markers.push([item.location.latitude ,item.location.longitude , '571'])
                setListings(item.listing)

              }else{
                markers.push([item.location.latitude ,item.location.longitude , item.count])
              }
            } )
            setListingMarkers(markers)  
        },
        onError: () => {},
    })

    return { mutatePropertyType: mutate }
}
