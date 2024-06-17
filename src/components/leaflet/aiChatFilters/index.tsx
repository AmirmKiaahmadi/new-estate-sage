import React from 'react'
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

export default function AiChatFilters() {
    return (
        <>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div className=" p-1 rounded-lg border border-[#CCCBC8] cursor-pointer">
                    <img src={HouseExample} alt="example" />
                    <div className="flex justify-between text-sm items-center my-2">
                        <div className=" flex items-center">
                            <p className=" bg-[#E5F0A6] rounded-xl py-1 px-2 mr-1 text-[#7C951B]">
                                multiplex
                            </p>
                            <p className=" mx-1 text-[#7F7C77]">2023.01.23</p>
                        </div>
                        <div className=" flex text-[#595653]">
                            <ShareNetwork size={20} className=" mx-1" />
                            <BookmarkSimple size={20} className=" mx-1" />
                        </div>
                    </div>
                    <div className=" my-1 flex text-xs">
                        <MapPin size={18} className=" text-[#595653]" />
                        <span className=" text-[#273A38]">
                            2 jones Avenue, Norfolk, Simcoe...
                        </span>
                    </div>
                    <div className=" flex justify-between text-sm items-center">
                        <div className="flex items-center">
                            <p className=" text-red-1">$1.799.000</p>
                            <p className="text-[#BBBAB6] text-xs mx-2 line-through">
                                1.799.000
                            </p>
                        </div>
                        <div className=" flex justify-between">
                            <div className="flex text-xs">
                                <Bathtub
                                    size={18}
                                    className=" text-[#595653]"
                                />
                                <span className=" mx-1 text-[#595653]">2</span>
                            </div>
                            <div className="flex text-xs">
                                <Bed size={18} className=" text-[#595653]" />
                                <span className=" mx-1 text-[#595653]">2</span>
                            </div>
                            <div className="flex text-xs">
                                <Car size={18} className=" text-[#595653]" />
                                <span className=" mx-1 text-[#595653]">2</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
