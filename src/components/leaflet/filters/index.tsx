import {
    CoinVertical,
    DotsThreeOutline,
    HeadCircuit,
    HouseLine,
    MapPinArea,
} from '@phosphor-icons/react'
import { Cards } from '@phosphor-icons/react/dist/ssr'
import classNames from 'classnames'
import React, { useState } from 'react'
import AiChat from './ai'
import { UseMutateFunction } from 'react-query'
import { IFilters } from '..'
interface IFiltersProps {
    setOpenChatAi: React.Dispatch<React.SetStateAction<any[] | undefined>>
    mutate: UseMutateFunction<any, unknown, any, unknown>
    setAIData: React.Dispatch<React.SetStateAction<any[]>>
    setIsOpenPropertyFilter: React.Dispatch<React.SetStateAction<boolean>>
    isOpenPropertyFilter: boolean
    setIsOpenPriceFilter: React.Dispatch<React.SetStateAction<boolean>>
    isOpenPriceFilter: boolean
    setIsOpenActiveFilter: React.Dispatch<React.SetStateAction<boolean>>
    filters: IFilters
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    setIsOpenMoreFilters: React.Dispatch<React.SetStateAction<boolean>>
    setChat: React.Dispatch<any>
    chat: any
    setSearch: React.Dispatch<React.SetStateAction<string>>
    search: string
    
}
export default function Filters({
    setOpenChatAi,
    mutate,
    setAIData,
    setIsOpenPropertyFilter,
    isOpenPropertyFilter,
    setIsOpenPriceFilter,
    isOpenPriceFilter,
    setIsOpenActiveFilter,
    filters,
    setFilters,
    setIsOpenMoreFilters,
    setChat,
    chat,
    setSearch,
    search,
}: IFiltersProps) {
    const [isAIChat, setIsAiChat] = useState<boolean>(false)

    return (
        <>
            {!isAIChat ? (
                <div className=" h-[99%] flex flex-col">
                    <div className=" grow">
                        <div
                            className=" cursor-pointer bg-[#4B8179] rounded-lg py-3 w-full text-white text-sm flex text-center justify-items-center"
                            onClick={() => {
                                setIsAiChat(true)
                                setIsOpenPropertyFilter(false)
                                setIsOpenPriceFilter(false)
                                setIsOpenActiveFilter(false)
                                setIsOpenMoreFilters(false)
                            }}
                        >
                            <HeadCircuit size={20} className=" mx-1" />
                            <span>Ask AI to find lovely home</span>
                        </div>
                        <div className="flex justify-between w-full my-4">
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer',
                                    filters.leaseAndSale === 'for sale'
                                        ? 'bg-[#E5F0A6] text-[#7C951B]'
                                        : 'bg-[#FAFCE9] text-[#7C951B]'
                                )}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        leaseAndSale: 'for sale',
                                    })
                                }
                            >
                                For Sale
                            </div>
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer',
                                    filters.leaseAndSale === 'for lease'
                                        ? 'bg-[#E5F0A6] text-[#7C951B]'
                                        : 'bg-[#FAFCE9] text-[#7C951B]'
                                )}
                                onClick={() =>
                                    setFilters({
                                        ...filters,
                                        leaseAndSale: 'for lease',
                                    })
                                }
                            >
                                For Lease
                            </div>
                        </div>
                        <div
                            className=" flex text-[#595653] cursor-pointer my-4"
                            onClick={() => {
                                setIsOpenPriceFilter(false)
                                setIsOpenActiveFilter(false)
                                setIsOpenPropertyFilter(true)
                                setOpenChatAi(undefined)
                                setIsOpenMoreFilters(false)
                            }}
                        >
                            <HouseLine
                                size={20}
                                className={
                                    isOpenPropertyFilter ? 'text-primary' : ''
                                }
                            />
                            <span
                                className={classNames(
                                    ' text-sm mx-2',
                                    isOpenPropertyFilter &&
                                        ' text-primary underline '
                                )}
                            >
                                Property
                            </span>
                        </div>
                        <div
                            className=" flex text-[#595653] cursor-pointer my-4"
                            onClick={() => {
                                setIsOpenPropertyFilter(false)
                                setIsOpenActiveFilter(false)
                                setIsOpenPriceFilter(true)
                                setOpenChatAi(undefined)
                                setIsOpenMoreFilters(false)
                            }}
                        >
                            <CoinVertical
                                size={20}
                                className={
                                    isOpenPriceFilter ? 'text-primary' : ''
                                }
                            />
                            <span
                                className={classNames(
                                    ' text-sm mx-2',
                                    isOpenPriceFilter &&
                                        ' text-primary underline '
                                )}
                            >
                                Price Range
                            </span>
                        </div>
                        <hr className="w-full text-[#EBEAE9]" />
                        <div className=" flex text-[#595653]  my-4">
                            <Cards size={20} />
                            <span className=" text-sm mx-2">Condition:</span>
                        </div>
                        <div className=" text-[#595653]  my-4">
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer my-2 border border-[#7C951B]',
                                    filters.conditions === 'active'
                                        ? 'bg-[#E5F0A6] text-[#7C951B] '
                                        : 'bg-white text-[#7C951B]'
                                )}
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        conditions: 'active',
                                    })

                                    setIsOpenActiveFilter(true)
                                    setIsOpenPropertyFilter(false)
                                    setIsOpenPriceFilter(false)
                                    setOpenChatAi(undefined)
                                    setIsOpenMoreFilters(false)
                                }}
                            >
                                Active
                            </div>
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer my-2 border border-[#7C951B]',
                                    filters.conditions === 'sold'
                                        ? 'bg-[#E5F0A6] text-[#7C951B]'
                                        : 'bg-white text-[#7C951B]'
                                )}
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        conditions: 'sold',
                                    })
                                    setIsOpenActiveFilter(true)
                                    setIsOpenPropertyFilter(false)
                                    setIsOpenPriceFilter(false)
                                    setOpenChatAi(undefined)
                                    setIsOpenMoreFilters(false)
                                }}
                            >
                                Sold
                            </div>
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer my-2 border border-[#7C951B]',
                                    filters.conditions === 'de-listed'
                                        ? 'bg-[#E5F0A6] text-[#7C951B] '
                                        : 'bg-white text-[#7C951B]'
                                )}
                                onClick={() => {
                                    setFilters({
                                        ...filters,
                                        conditions: 'de-listed',
                                    })
                                    setIsOpenActiveFilter(true)
                                    setIsOpenPropertyFilter(false)
                                    setIsOpenPriceFilter(false)
                                    setOpenChatAi(undefined)
                                    setIsOpenMoreFilters(false)
                                }}
                            >
                                De-listed
                            </div>
                        </div>
                        <hr className="w-full text-[#EBEAE9]" />
                        <div
                            className=" flex text-[#595653] cursor-pointer my-4"
                            onClick={() => {
                                setIsOpenMoreFilters(true)
                                setIsOpenActiveFilter(false)
                                setIsOpenPropertyFilter(false)
                                setIsOpenPriceFilter(false)
                                setOpenChatAi(undefined)
                            }}
                        >
                            <DotsThreeOutline size={20} />
                            <span className=" text-sm mx-2">More Detail</span>
                        </div>
                        <div className=" flex text-[#595653] cursor-pointer my-4">
                            <MapPinArea size={20} />
                            <span className=" text-sm mx-2">Watched Area</span>
                        </div>
                    </div>
                    <div className=" border border-[#9EBB27] text-[#9EBB27] rounded-lg py-2 text-center cursor-pointer">
                        Clear All Filters
                    </div>
                </div>
            ) : (
                <AiChat
                    setIsAiChat={setIsAiChat}
                    setOpenChatAi={setOpenChatAi}
                    mutate={mutate}
                    setAIData={setAIData}
                    setIsOpenPropertyFilter={setIsOpenPropertyFilter}
                    setIsOpenPriceFilter={setIsOpenPriceFilter}
                    setChat={setChat}
                    chat={chat}
                    setSearch={setSearch}
                    search={search}
                />
            )}
        </>
    )
}
