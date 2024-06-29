import { Plus } from '@phosphor-icons/react'
import { Input } from 'antd'
import { IFilters } from 'components/leaflet'
import React, { useState } from 'react'

interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}

export default function KeyWords({ setFilters, filters }: Props) {
    const [keyword, setKeyword] = useState<string>('')

    return (
        <div className=" flex w-full flex-wrap 	 ">
            {filters.more.keywords.map((item) => (
                <p
                    className=" cursor-pointer border border-[#9F9C98] rounded-md text-sm py-1 px-2 text-center bg-[#EBEAE9] text-[#6B6863] mx-2 my-1"
                    onClick={() => {
                        const filtredKeyWords = filters.more.keywords.filter(
                            (k) => k !== item
                        )
                        setFilters({
                            ...filters,
                            more: {
                                ...filters.more,
                                keywords: filtredKeyWords,
                            },
                        })
                    }}
                >
                    {item}
                </p>
            ))}
            <p className=" text-[#6B6863]">
                You can enter the keywords you want.
            </p>
            <div className=" mt-4 grid grid-cols-5 gap-1 w-full">
                <Input
                    placeholder="Enter Keywords..."
                    className=" w-full col-span-4"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />

                <Plus
                    className=" text-white bg-[#649B92] rounded-md col-span-1 items-center text-center w-full cursor-pointer"
                    size={30}
                    onClick={() => {
                        const newKeyWords = [...filters.more.keywords]
                        newKeyWords.push(keyword)
                        setKeyword('')
                        setFilters({
                            ...filters,
                            more: { ...filters.more, keywords: newKeyWords },
                        })
                    }}
                />
            </div>
        </div>
    )
}
