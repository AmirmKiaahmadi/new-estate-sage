import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { aiServiceDetail } from 'services/ai'

export default function useGetDiscriptions(setRealData: any) {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return aiServiceDetail(payload)
        },
        onSuccess: (data) => {
            if (data && data.data) {
                const data1 = data.data
                // [...prev, data1[0]]
                setRealData((prev: any) => {
                    const find = prev.find(
                        (item: any) => item.mlsNumber === data1[0].mlsNumber
                    )
                    if (!find) {
                        return [...prev, data1[0]]
                    } else {
                        return [...prev]
                    }
                })
            }
        },
        onError: () => {},
    })

    return { mutateDetail: mutate }
}
