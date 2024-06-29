import React, { useState } from 'react'
import { UseMutateFunction, useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { aiService } from 'services/ai'

export default function useGetAiService(
    mutateDetail: UseMutateFunction<any, unknown, any, unknown>,
    setAIData: any
) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return aiService(payload)
        },
        onSuccess: (data) => {
            if (data && data.output_from_query_ids) {
                setAIData(JSON.parse(data.output_from_query_ids))
                const firstData = JSON.parse(data.output_from_query_ids)
                firstData.map((item: any) => mutateDetail(item))
            }
        },
        onError: () => {
            setAIData([])
        },
    })

    return { mutate, isLoading }
}
