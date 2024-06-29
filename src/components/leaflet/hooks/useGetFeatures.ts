import React, { useState } from 'react'
import { UseMutateFunction, useMutation, useQuery } from 'react-query'
import { aiServiceFeatures } from 'services/ai'

export default function useGetFeatures(
    mutateDetail: UseMutateFunction<any, unknown, any, unknown>,
    setAIData: any
) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return aiServiceFeatures(payload)
        },
        onSuccess: (data) => {
            console.log('print', data)
            if (data && data.data && data.data.output_from_query_ids) {
                setAIData(data.data.output_from_query_ids)
                const firstData = JSON.parse(data.data.output_from_query_ids)
                console.log('firstData', firstData)
                firstData.map((item: any) => mutateDetail(item))
            }
        },
        onError: () => {},
    })

    return { mutateFeatures: mutate }
}
