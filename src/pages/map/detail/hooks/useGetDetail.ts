import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { DetailService } from 'services/ai'

export default function useGetDetail() {
    const { mlsNumber, latitude, longitude } = useParams()
    const { data } = useQuery(
        ['get-detail-in-detail-page', mlsNumber, latitude, longitude],
        DetailService
    )
    console.log("data"  , data)
    return { data }
}
