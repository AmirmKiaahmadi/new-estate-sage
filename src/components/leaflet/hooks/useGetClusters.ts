import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { clustersService } from 'services/ai'

export default function useGetClusters(setListingMarkers: React.Dispatch<React.SetStateAction<any[]>>) {
  const {data , refetch} = useQuery(['get-clusters-in-map'] , clustersService)
  useEffect(() => {
    if(data){
        if(data.numPages > 11){
            const markers : any[] = []
            data.aggregates.map.clusters.map((item: any) => markers.push([item.location.latitude , item.location.longitude , item.count]) )
            setListingMarkers(markers)
        }
       
    }
  } , [data])
  return {clusters : data , refetchCluster : refetch}
}
