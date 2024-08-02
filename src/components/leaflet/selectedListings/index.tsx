import { Bathtub, Bed, BookmarkSimple, Car, MapPin, ShareNetwork } from '@phosphor-icons/react'
import moment from 'moment'
import React from 'react'
interface IProps{
    data : any[]
    setIsOpenSummeryModal : React.Dispatch<React.SetStateAction<boolean>>
    setSelectedMarker: React.Dispatch<any>
}
export default function SelectedListings({data , setIsOpenSummeryModal , setSelectedMarker} :IProps) {
    
  return (
    <>
      {data.map(item => (
        <div className=" p-1 rounded-lg border border-[#CCCBC8] cursor-pointer my-2"  onClick={() => {
            setSelectedMarker(item)
            setIsOpenSummeryModal(true)
        }}>
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
                                <ShareNetwork size={20} className=" mx-1" />
                                <BookmarkSimple size={20} className=" mx-1" />
                            </div>
                        </div>
                        <div className=" my-1 flex text-xs">
                            <MapPin size={18} className=" text-[#595653]" />
                            <span className=" text-[#273A38]">
                            {item.address.country} ,{item.address.area}, {item.address.city} , {item.address.district} , {item.address.streetName} , {item.address.streetNumber}
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
                               
                            </div>
                            <div className=" flex justify-between">
                                <div className="flex text-xs">
                                    <Bathtub
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                       {item.details.numBathrooms  ? item.details.numBathrooms : 0 }
                                    </span>
                                </div>
                                <div className="flex text-xs">
                                    <Bed
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                      {item.details.numBedrooms ? item.details.numBedrooms : 0}
                                    </span>
                                </div>
                                <div className="flex text-xs">
                                    <Car
                                        size={18}
                                        className=" text-[#595653]"
                                    />
                                    <span className=" mx-1 text-[#595653]">
                                       {item.details.numGarageSpaces ? item.details.numGarageSpaces : 0}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
      ))}
    </>
  )
}
