import React, { useState } from 'react'
import { UseMutateFunction, useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { aiService } from 'services/ai'

export default function useGetAiService(
    mutateDetail: UseMutateFunction<any, unknown, any, unknown>,
    setAIData: any,
    setChat: React.Dispatch<any>,
    chat: any,
    search: string
) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return aiService(payload)
        },
        onSuccess: (data) => {
            const newChat = [...chat]
            newChat.push({
                position: 'right',
                type: 'text',
                title: 'Amir',
                text: search,
            })
            newChat.push({
                position: 'left',
                type: 'text',
                title: 'EstateSage AI',
                text: data.resp,
            })
            console.log('newChat', newChat)
            setChat(newChat)
            if (data && data.output_from_query_ids) {
                setAIData(data.output_from_query_ids)
                const firstData = data.output_from_query_ids
                firstData.map((item: any) => mutateDetail(item))
            }
        },
        onError: () => {
            setAIData([])
        },
    })

    return { mutate, isLoading }
}
