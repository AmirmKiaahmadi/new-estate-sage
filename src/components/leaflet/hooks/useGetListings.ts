import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { listingsService } from 'services/ai'

export default function useGetListings(setListingMarkers: React.Dispatch<React.SetStateAction<any[]>> , setListings: React.Dispatch<any>) {
    
  const {data , isLoading} = useQuery(['get-repliers-listings'] , listingsService)

useEffect(() => {
    if(data){
      setListings(data)
        const myArray : any[] = []
        data.listings.map((item : any )=> myArray.push([Number(item?.map?.latitude) , Number(item.map.longitude) , "571"]) )
        setListingMarkers(myArray)
    }
} , [data])

  return { isLoadingListings : isLoading ,}
}
