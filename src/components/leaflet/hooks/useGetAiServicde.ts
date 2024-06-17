import React from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { aiService } from 'services/ai'

export default function useGetAiService() {
    const { mutate, isLoading } = useMutation({
        mutationFn: (payload: any) => {
            return aiService(payload)
        },
        onSuccess: (data) => {
            toast.success(' با موفقیت ')

            console.log('data', JSON.parse(data.data))
        },
        onError: () => {
            toast.error('مشکلی پیش آمده!')
        },
    })

    return { mutate, isLoading }
}
