import { IFilters } from 'components/leaflet'
import React from 'react'
interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}
const examples: string[] = [
    'Underground Private',
    'Street Parking',
    'Underground Public',
    'Private Parking',
    ' Private driveway',
    'Public Driveway',
]
export default function ParkingType({ setFilters, filters }: Props) {
    return (
        <div className=" flex flex-wrap">
            {examples.map((item) => {
                const find = filters.more.parkingType.find((p) => p === item)
                if (find) {
                    return (
                        <p
                            className=" text-[#649B92] px-2 py-0.5 bg-white] border border-[#649B92] rounded-md mx-1 my-1 text-xs cursor-pointer"
                            onClick={() => {
                                const filter = filters.more.parkingType.filter(
                                    (p) => p !== item
                                )
                                setFilters({
                                    ...filters,
                                    more: {
                                        ...filters.more,
                                        parkingType: filter,
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
                            className=" text-[#6B6863] px-2 py-0.5 bg-[#EBEAE9] border border-[#9F9C98] rounded-md mx-1 my-1 text-xs cursor-pointer"
                            onClick={() => {
                                setFilters({
                                    ...filters,
                                    more: {
                                        ...filters.more,
                                        parkingType: [
                                            ...filters.more.parkingType,
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
