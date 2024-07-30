import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { placesService } from 'services/ai'

export default function useGetPlaces() {
    const [places , setPlaces] = useState<any[]>([])
  const {data} = useQuery(['get-places'] , placesService)
  return {places}
}
