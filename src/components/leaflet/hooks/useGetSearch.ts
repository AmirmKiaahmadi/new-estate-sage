import React from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { listingsSearchService } from 'services/ai'

export default function useGetSearch(setListingMarkers: React.Dispatch<React.SetStateAction<any[]>>) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return listingsSearchService(payload)
        },
        onSuccess: (data) => {
            if(data.listings && data.listings.length > 0){
                setListingMarkers([[Number(data.listings[0].map.latitude) , Number(data.listings[0].map.longitude) , '571']])
            }else{
                setListingMarkers([])
                toast.error("Nothing found!")
            }
            
        },
        onError: () => {
          
        },
    })

    return { mutateSearch : mutate  }
}
