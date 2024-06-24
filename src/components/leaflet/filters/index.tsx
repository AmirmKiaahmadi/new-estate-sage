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
interface IFiltersProps {
    setOpenChatAi: React.Dispatch<React.SetStateAction<any[] | undefined>>
    mutate: UseMutateFunction<any, unknown, any, unknown>
    setAIData: React.Dispatch<React.SetStateAction<any[]>>
}
export default function Filters({
    setOpenChatAi,
    mutate,
    setAIData,
}: IFiltersProps) {
    const [leaseAndSale, setLeaseAndSale] = useState<string>('for lease')
    const [conditions, setConditions] = useState<string>('active')
    const [isAIChat, setIsAiChat] = useState<boolean>(false)
    return (
        <>
            {!isAIChat ? (
                <div className=" h-[99%] flex flex-col">
                    <div className=" grow">
                        <div
                            className=" cursor-pointer bg-[#4B8179] rounded-lg py-3 w-full text-white text-sm flex text-center justify-items-center"
                            onClick={() => setIsAiChat(true)}
                        >
                            <HeadCircuit size={20} className=" mx-1" />
                            <span>Ask AI to find lovely home</span>
                        </div>
                        <div className="flex justify-between w-full my-4">
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer',
                                    leaseAndSale === 'for sale'
                                        ? 'bg-[#E5F0A6] text-[#7C951B]'
                                        : 'bg-[#FAFCE9] text-[#7C951B]'
                                )}
                                onClick={() => setLeaseAndSale('for sale')}
                            >
                                For Sale
                            </div>
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer',
                                    leaseAndSale === 'for lease'
                                        ? 'bg-[#E5F0A6] text-[#7C951B]'
                                        : 'bg-[#FAFCE9] text-[#7C951B]'
                                )}
                                onClick={() => setLeaseAndSale('for lease')}
                            >
                                For Lease
                            </div>
                        </div>
                        <div className=" flex text-[#595653] cursor-pointer my-4">
                            <HouseLine size={20} />
                            <span className=" text-sm mx-2">Property</span>
                        </div>
                        <div className=" flex text-[#595653] cursor-pointer my-4">
                            <CoinVertical size={20} />
                            <span className=" text-sm mx-2">Price Range</span>
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
                                    conditions === 'active'
                                        ? 'bg-[#E5F0A6] text-[#7C951B] '
                                        : 'bg-white text-[#7C951B]'
                                )}
                                onClick={() => setConditions('active')}
                            >
                                Active (all date listing)
                            </div>
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer my-2 border border-[#7C951B]',
                                    conditions === 'sold'
                                        ? 'bg-[#E5F0A6] text-[#7C951B]'
                                        : 'bg-white text-[#7C951B]'
                                )}
                                onClick={() => setConditions('sold')}
                            >
                                Sold
                            </div>
                            <div
                                className={classNames(
                                    ' py-2 w-full mx-1 rounded-lg text-center cursor-pointer my-2 border border-[#7C951B]',
                                    conditions === 'de-listed'
                                        ? 'bg-[#E5F0A6] text-[#7C951B] '
                                        : 'bg-white text-[#7C951B]'
                                )}
                                onClick={() => setConditions('de-listed')}
                            >
                                De-listed
                            </div>
                        </div>
                        <hr className="w-full text-[#EBEAE9]" />
                        <div className=" flex text-[#595653] cursor-pointer my-4">
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
                />
            )}
        </>
    )
}
