import React from 'react'
import { useMutation } from 'react-query'
import { listingsServiceMutate } from 'services/ai'

export default function useGetSmallerListings(setSelectedListings : React.Dispatch<React.SetStateAction<any[]>>) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return listingsServiceMutate(payload)
        },
        onSuccess: (data) => {
         setSelectedListings(data.listings)
            
        },
        onError: () => {
          
        },
    })

    return { mutateSimilar : mutate , isLoadingSimilar  :isLoading }
}
