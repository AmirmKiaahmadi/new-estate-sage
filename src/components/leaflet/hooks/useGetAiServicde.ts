import React, { useState } from 'react'
import { UseMutateFunction, useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { aiService } from 'services/ai'

export default function useGetAiService(
    mutateDetail: UseMutateFunction<any, unknown, any, unknown>,
    setAIData: any,
    setChat: React.Dispatch<any>,
    chat: any,
    search: string,
    setOpenChatAi: any,
    setRealData: any
) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return aiService(payload)
        },
        onSuccess: (data) => {
            setRealData([])
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

            setChat(newChat)
            if (
                data &&
                data.output_from_query_ids &&
                data.output_from_query_ids.length > 0
            ) {
                setOpenChatAi([true])
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
