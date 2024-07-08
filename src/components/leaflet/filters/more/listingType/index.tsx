import { IFilters } from 'components/leaflet'
import React from 'react'
interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}
const examples: string[] = ['All', 'Resale', 'Exclusive Assignment']
export default function ListingType({ setFilters, filters }: Props) {
    return (
        <div className="">
            {examples.map((item) => {
                const find = filters.more.listingType.find((p) => p === item)
                if (find) {
                    return (
                        <p
                            className="  w-full text-center text-white px-2 py-2 bg-[#649B92] border  rounded-md mx-1 my-1 text-xs cursor-pointer"
                            onClick={() => {
                                const filter = filters.more.listingType.filter(
                                    (p) => p !== item
                                )
                                setFilters({
                                    ...filters,
                                    more: {
                                        ...filters.more,
                                        listingType: filter,
                                    },
                                })
                            }}
                        >
                            {item}
                        </p>
                    )
                } else {
                    return (
                        <p
                            className=" w-full text-center text-[#649B92] px-2 py-2 bg-[#F4F9F8]  rounded-md mx-1 my-1 text-xs cursor-pointer"
                            onClick={() => {
                                setFilters({
                                    ...filters,
                                    more: {
                                        ...filters.more,
                                        listingType: [
                                            ...filters.more.listingType,
                                            item,
                                        ],
                                    },
                                })
                            }}
                        >
                            {item}
                        </p>
                    )
                }
            })}
        </div>
    )
}
