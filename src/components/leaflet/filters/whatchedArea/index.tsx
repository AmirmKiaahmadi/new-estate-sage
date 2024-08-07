import { Bathtub, Bed, BookmarkSimple, Car, MapPin, ShareNetwork } from '@phosphor-icons/react'
import moment from 'moment'
import React from 'react'
import { toast } from 'react-toastify'
interface IProps {
    setIsOpenSummeryModal : React.Dispatch<React.SetStateAction<boolean>>
    setSelectedMarker: React.Dispatch<any>
}
export default function WatchedArea({setIsOpenSummeryModal , setSelectedMarker } : IProps) {
    const data = JSON.parse(localStorage.getItem('items')!)
  return (
    <div>
     {data ? data.map((item : any) => (
        <div className=" p-1 rounded-lg border border-[#CCCBC8] cursor-pointer my-2"
        onClick={() => {
            setSelectedMarker(item)
            setIsOpenSummeryModal(true)
        }}
        >
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
                {moment(new Date(item.listDate)).format('YYYY-MM-DD')}
                </p>
            </div>
            <div className=" flex text-[#595653]">
                <p className='text-[#7F7C77]'>{item.mlsNumber}</p>
            </div>
        </div>
        <div className=" my-1 flex text-xs">
            <MapPin size={18} className=" text-[#595653]" />
            <span className=" text-[#273A38]">
            {item
                                                                        .address
                                                                        .streetNumber +
                                                                        ' ' +
                                                                        item
                                                                            .address
                                                                            .streetName +
                                                                        ' ' +
                                                                        item
                                                                            .address
                                                                            .streetSuffix + ", " + item.address.city}
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
                                                                <div className="flex text-xs mx-2">
                                                                        <Bed
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                            {
                                                                                item.details.numBedrooms
                                                                            }
                                                                            {
                                                                                item.details.numbBedroomsPlus && ` + ${item.details.numbBedroomsPlus}`
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    <div className="flex text-xs mx-2">
                                                                        <Bathtub
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                        {
                                                                                item.details.numBathrooms
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                    
                                                                    <div className="flex text-xs mx-2">
                                                                        <Car
                                                                            size={
                                                                                18
                                                                            }
                                                                            className=" text-[#595653]"
                                                                        />
                                                                        <span className=" mx-1 text-[#595653]">
                                                                            {Number(item.details.numGarageSpaces)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                        </div>
    </div>
     )) : toast.error("fuck you ")}
    </div>
  )
}
