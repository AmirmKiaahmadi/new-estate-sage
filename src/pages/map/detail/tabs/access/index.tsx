import {
    ArrowsHorizontal,
    Bathtub,
    Bed,
    Car,
    ChatTeardropDots,
    MapPin,
    Star,
    Subway,
    Van,
} from '@phosphor-icons/react'
import { Anchor, Col, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import LocationMap from 'components/locationMap'
import React, { useEffect, useState } from 'react'
import ImageMock from 'assets/images/house/2.jpg'

interface IKProps {
    data: any
}

export default function AccessTab({ data }: IKProps) {
    const [location, setLocation] = useState<any>()

    return (
        <div className=" overflow-x-hidden">
            <Row className=" mt-8">
                <Col span={18} className="z-10">
                    <div id="Overview" className="">
                        <div className=" my-3 flex w-full items-center">
                            <MapPin size={22} />
                            <p className=" text-xl mx-2">
                                {data.address.area} , {data.address.district} ,
                                {data.address.state} ,{' '}
                                {data.address.majorIntersection} ,{' '}
                                {data.address.neighborhood}
                            </p>
                        </div>

                        <div className=" mr-6">
                            <LocationMap
                                center={{
                                    lat: Number(data.map.latitude),
                                    lng: Number(data.map.longitude),
                                }}
                                selectLocation={setLocation}
                            />
                        </div>
                    </div>
                    <div id="About-Building" className=" mt-6">
                        <p className=" text-xl text-[#4B8179]">
                            Nearby schools:
                        </p>
                        {[1, 2, 3].map((item) => (
                            <div className=" my-2 grid grid-cols-6 gap-6 w-full p-2 bg-[#FAFCE9] rounded-md">
                                <img
                                    src={ImageMock}
                                    alt="example"
                                    className="col-span-1 h-[100px] w-full rounded-md"
                                />
                                <div className=" col-span-5 flex flex-col h-full w-full">
                                    <p className=" grow">Name of school</p>
                                    <div className="flex grow text-[#7F7C77] text-sm w-full items-center ">
                                        <ArrowsHorizontal size={20} />
                                        Distance:  0.4 mi
                                        <Star className=" ml-8" size={20} />
                                        Raiting:  7/10
                                    </div>
                                    <div className=" grow flex items-center text-sm text-[#7F7C77]">
                                        <MapPin size={20} />2 jones Avenue,
                                        Norfolk, Simcoe , Simcoe 2 and edame
                                        adres ,Simcoe 2 and edame adres
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div
                        id="Description"
                        className=" text-xl text-[#4B8179] mt-4"
                    >
                        <p className=" text-xl text-[#4B8179]">
                            Nearby hospital:
                        </p>
                        {[1, 2].map((item) => (
                            <div className=" my-2 grid grid-cols-6 gap-6 w-full p-2 bg-[#FAFCE9] rounded-md">
                                <img
                                    src={ImageMock}
                                    alt="example"
                                    className="col-span-1 h-[100px] w-full rounded-md"
                                />
                                <div className=" col-span-5 flex flex-col h-full w-full">
                                    <p className=" grow">Name of school</p>
                                    <div className="flex grow text-[#7F7C77] text-sm w-full items-center ">
                                        <ArrowsHorizontal size={20} />
                                        Distance:  0.4 mi
                                        <Star className=" ml-8" size={20} />
                                        Raiting:  7/10
                                    </div>
                                    <div className=" grow flex items-center text-sm text-[#7F7C77]">
                                        <MapPin size={20} />2 jones Avenue,
                                        Norfolk, Simcoe , Simcoe 2 and edame
                                        adres ,Simcoe 2 and edame adres
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div id="Features-and-facilities" className=" mb-4">
                        <p className=" text-xl text-[#4B8179]">Transit:</p>
                        <div className=" flex justify-between">
                            <div className=" w-full mx-1 ">
                                <div className=" flex mt-4 items-center">
                                    <Subway
                                        size={42}
                                        className=" bg-[#B8D7D0] p-2 rounded-full "
                                    />
                                    <p className="mx-1">Subway</p>
                                </div>
                                {[1, 2, 3].map((item) => (
                                    <div className=" w-full my-2 p-3 rounded-md bg-[#F4F9F8]">
                                        <p>Name of Station</p>
                                        <div className=" my-2 flex grow text-[#7F7C77] text-sm w-full items-center ">
                                            <ArrowsHorizontal size={20} />
                                            Distance:  0.4 mi
                                            <Star className=" ml-8" size={20} />
                                            Raiting:  7/10
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className=" w-full mx-1">
                                <div className=" flex mt-4 items-center">
                                    <Van
                                        size={42}
                                        className=" bg-[#E5F0A6] p-2 rounded-full "
                                    />
                                    <p className=" mx-1">Bus</p>
                                </div>
                                {[1, 2, 3].map((item) => (
                                    <div className=" w-full my-2 p-3 rounded-md bg-[#FAFCE9]">
                                        <p>Name of Station</p>
                                        <div className=" my-2 flex grow text-[#7F7C77] text-sm w-full items-center ">
                                            <ArrowsHorizontal size={20} />
                                            Distance:  0.4 mi
                                            <Star className=" ml-8" size={20} />
                                            Raiting:  7/10
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Col>
                <Col
                    span={6}
                    className="h-full relative"
                    style={{ height: '100vh' }}
                >
                    <div className="border border-[#DCEBE7] rounded-lg p-3">
                        <div className="flex justify-between">
                            <h2 className="text-primary text-xl">
                                {' '}
                                ${Number(data.listPrice).toLocaleString()}
                            </h2>
                            <span className="bg-[#F4F9F8] text-[#4B8179] px-2 py-1 rounded-xl border border-[#DCEBE7]">
                                for lease
                            </span>
                        </div>
                        <hr className="text-[#DCEBE7] my-2 w-full" />
                        <p className="text-[#6B6863]">
                            Contact Estatesage consultants
                        </p>
                        <TextArea rows={4} />
                        <button className="bg-primary rounded-lg py-2 mt-2 w-full text-white">
                            <div className="flex items-center justify-center">
                                <ChatTeardropDots size={20} />
                                Submit request
                            </div>
                        </button>
                    </div>
                    <div className="sticky  top-10 z-10">
                        <Anchor
                            className="mt-4"
                            items={[
                                {
                                    key: 'Overview',
                                    href: '#Overview',
                                    title: 'Map',
                                },
                                {
                                    key: 'About-Building',
                                    href: '#About-Building',
                                    title: 'Schools',
                                },
                                {
                                    key: 'Description',
                                    href: '#Description',
                                    title: 'Hospital',
                                },
                                {
                                    key: 'Features-and-facilities',
                                    href: '#Features-and-facilities',
                                    title: 'Transit',
                                },
                            ]}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
