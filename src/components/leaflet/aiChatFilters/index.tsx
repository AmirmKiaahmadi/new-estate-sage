import React, { useEffect, useState } from 'react'
import {
    Bathtub,
    Bed,
    BookmarkSimple,
    Car,
    MapPin,
    ShareNetwork,
    Stack,
    StackSimple,
} from '@phosphor-icons/react'
import HouseExample from 'assets/images/map/house.png'
import { Spin } from 'antd'

interface IAiFiltersProps {
    AIData: any[]
    firstData: any[]
    setIsOpenPropertyFilter: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AiChatFilters({
    AIData,
    firstData,
    setIsOpenPropertyFilter,
}: IAiFiltersProps) {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        if (firstData.length === 0) {
            setData([])
        }
    }, [firstData])
    useEffect(() => {
        if (AIData.length === 0) {
            setData([])
        }
        if (AIData && AIData.length > 0) {
            const newData: any[] = []
            AIData.map((item) => {
                newData.push({
                    mlsNumber: item.mlsNumber,
                    originalPrice: item.originalPrice,
                    address:
                        item.address.city +
                        ',' +
                        item.address.district +
                        ',' +
                        item.address.majorIntersection,
                    // bathrooms: JSON.parse(item.bathrooms),
                    latitude: item.latitude,
                    longitude: item.longitude,
                    date: item.listDate,
                    type: item.type,
                    numRooms: item.numRooms,
                })
            })
            setData(newData)
        }
    }, [AIData])

    return (
        <>
            {data.length > 0 ? (
                data.map((item) => (
                    <div className=" p-1 rounded-lg border border-[#CCCBC8] cursor-pointer">
                        <img
                            src={`https://cdn.repliers.io/IMG-${item.mlsNumber}_1.jpg?class=small`}
                            alt="example"
                            className=" w-full h-[150px]"
                        />
                        <div className="flex justify-between text-sm items-center my-2">
                            <div className=" flex items-center">
                                <p className=" bg-[#E5F0A6] rounded-xl py-1 px-2 mr-1 text-[#7C951B]">
                                    {item.type}
                                </p>
                                <p className=" mx-1 text-[#7F7C77]">
                                    2023.01.23
                                </p>
                            </div>
                            <div className=" flex text-[#595653]">
                                <ShareNetwork size={20} className=" mx-1" />
                                <BookmarkSimple size={20} className=" mx-1" />
                            </div>
                        </div>
                        <div className=" my-1 flex text-xs">
                            <MapPin size={18} className=" text-[#595653]" />
                            <span className=" text-[#273A38]">
                                {item.address}
                            </span>
                        </div>
                        <div className=" flex justify-between text-sm items-center">
                            <div className="flex items-center">
                                <p className=" text-red-1">
                                    $
                                    {Number(
                                        item.originalPrice
                                    ).toLocaleString()}
                                </p>
                                {/* <p className="text-[#BBBAB6] text-xs mx-2 line-through">
                                  {item.originalPrice}
                                </p> */}
                            </div>
                            <div className=" flex justify-between">
                                <div className="flex text-xs">
                                    <Bathtub
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                        2
                                    </span>
                                </div>
                                <div className="flex text-xs">
                                    <Bed
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                        {item.numRooms}
                                    </span>
                                </div>
                                <div className="flex text-xs">
                                    <Car
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                        2
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : data.length === 0 ? (
                <p className=" text-sm">I cant find anything...</p>
            ) : (
                <Spin className=" text-center items-center" />
            )}
        </>
    )
}
