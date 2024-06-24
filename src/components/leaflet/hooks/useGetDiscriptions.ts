import React, { useState } from 'react'
import { useMutation } from 'react-query'
import { aiServiceDetail } from 'services/ai'

export default function useGetDiscriptions() {
    const [realData, setRealData] = useState<any[]>([])
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return aiServiceDetail(payload)
        },
        onSuccess: (data) => {
            if (data && data.data) {
                const fuck = JSON.parse(data.data)
                setRealData((prev) => [...prev, fuck[0]])
            }
        },
        onError: () => {},
    })

    return { mutateDetail: mutate, realData }
}
