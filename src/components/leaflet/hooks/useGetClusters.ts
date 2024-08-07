import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { clustersService } from 'services/ai'

export default function useGetClusters(setListingMarkers: React.Dispatch<React.SetStateAction<any[]>> , currentViewPolygon : any , setListings: React.Dispatch<any>) {
  const {data , refetch} = useQuery(['get-clusters-in-map' , currentViewPolygon] , clustersService)
  useEffect(() => {
    if(data){  
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
    }
  } , [data])
  return {clusters : data , refetchCluster : refetch}
}
