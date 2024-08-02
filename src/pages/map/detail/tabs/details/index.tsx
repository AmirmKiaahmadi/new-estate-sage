import React, { useEffect, useState } from 'react'
import House from 'assets/images/house/pexels-expect-best-323780.jpg'
import House1 from 'assets/images/house/2.jpg'
import House2 from 'assets/images/house/3.jpg'
import House3 from 'assets/images/house/4.jpg'
import House4 from 'assets/images/house/5.jpg'
import { Anchor, Button, Col, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import {
    Bathtub,
    Bed,
    Car,
    ChatTeardropDots,
    MapPin,
    Oven,
} from '@phosphor-icons/react'
import moment from 'moment'
import { PhotoProvider, PhotoView } from 'react-photo-view'
import classNames from 'classnames'

interface IPropsP {
    data: any
}
export default function DetailsTab({ data }: IPropsP) {
    return (
        <div className=" overflow-x-hidden">
           <div className=" grid grid-cols-8 gap-2 h-[300px] w-full overflow-x-hidden ">
                <div className="col-span-4 h-[300px]">
                    <div className=" relative ">
                        <img
                            src={`https://cdn.repliers.io/${data.images[0]}?class=large`}
                            alt="house"
                            className=" rounded-lg w-full h-[300px] "
                        />
                        <span className=" bg-[#F4F9F8] absolute top-5 left-5 text-[#4B8179] px-2 py-1 rounded-xl border border-[#DCEBE7]">
                            For {data.type}
                        </span>
                    </div>
                </div>
                <div className=" col-span-2  h-[300px] flex flex-col overflow-x-hidden">
                    {data.images.slice(1, 3).map((item : any) => (
                        <img
                            src={`https://cdn.repliers.io/${item}?class=small`}
                            alt="house"
                            className=" rounded-lg   grow h-[120px] my-1   "
                        />
                    ))}
                </div>
                <div className=" col-span-2  h-[300px] flex flex-col overflow-x-hidden">
                    {data.images.slice(4, 5).map((item : any) => (
                        <img
                            src={`https://cdn.repliers.io/${item}?class=small`}
                            alt="house"
                            className=" rounded-lg   grow h-[120px] my-1   "
                        />
                    ))}
                     <PhotoProvider>
                   {data.images.map((item: any , index : number) => (              
                        <PhotoView key={index}  src={`https://cdn.repliers.io/${item}?class=large`}>
                         
                          <img
                                src={`https://cdn.repliers.io/${item}?class=small`}
                                alt="house"
                                className={classNames(index === 6 ? " rounded-lg   grow h-[120px] my-1 opacity-25 hover:opacity-100 cursor-pointer  " : " hidden")}
                            />
                            
                        </PhotoView>     
                   ))}
                    </PhotoProvider>
                </div>
            </div>  
            <Row className=" mt-8">
                <Col span={18} className="z-10">
                    <div id="Overview" className="">
                        <div className=" w-full flex items-center">
                            <div className=" bg-[#E5F0A6]  text-[#7C951B] px-2 py-1 rounded-xl">
                                multiplex
                            </div>
                            <div className=" mx-3">
                                {moment(new Date(data.soldDate)).format(
                                    'YYYY-MM-DD'
                                )}
                            </div>
                        </div>
                        <div className=" my-3 flex w-full items-center">
                            <MapPin size={22} />
                            <p className=" text-xl mx-2">
                                {data.address.area} , {data.address.district} ,
                                {data.address.state} ,{' '}
                                {data.address.majorIntersection} ,{' '}
                                {data.address.neighborhood}
                            </p>
                        </div>
                        <div className="my-3 flex w-full items-center">
                            <p className=" text-[#7F7C77] border-r border-[#DCEBE7] px-4">
                                Status change:{' '}
                                {moment(new Date(data.updatedOn)).fromNow()}
                            </p>
                            <p className=" text-[#7F7C77] px-4">
                                Updated on::{' '}
                                {moment(new Date(data.updatedOn)).format(
                                    'YYYY-MM-DD'
                                )}
                            </p>
                        </div>
                        {/* <div className="my-3 flex w-full items-center">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <span className=" bg-[#F4F9F8] mx-1  text-sm text-[#4B8179] px-2 py-1 rounded-xl border border-[#DCEBE7]">
                                    keyword {item}
                                </span>
                            ))}
                        </div> */}
                        <div className=" mt-6 border border-[#DCEBE7] mx-8">
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center py-3"></div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center bg-[#FAFCE9] py-3">
                                    Number
                                </div>
                                <div className=" w-full text-center py-3">
                                    Dimensions
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center py-3 items-center flex">
                                    {' '}
                                    <Bed className=" mx-2" size={20} />
                                    Bedrooms
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center bg-[#FAFCE9] py-3">
                                    {data.numBedrooms}
                                </div>
                                <div className=" w-full text-center py-3">
                                    
                                    {data.lot.depth} - {data.lot.width}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center py-3 items-center flex">
                                    {' '}
                                    <Car className=" mx-2" size={20} />
                                    Garage
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center bg-[#FAFCE9] py-3">
                                    {data.numGarageSpaces}
                                </div>
                                <div className=" w-full text-center py-3">
                                    {data.numGarageSpaces}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center py-3 items-center flex">
                                    {' '}
                                    <Bathtub className=" mx-2" size={20} />
                                    Bathrooms
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center bg-[#FAFCE9] py-3">
                                    {data.numBathrooms}
                                </div>
                                <div className=" w-full text-center py-3">
                                    {data.numBathrooms?.depth} -{' '}
                                    {data.numBathrooms?.width}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center py-3 items-center flex">
                                    {' '}
                                    <Oven className=" mx-2" size={20} />
                                    Kitchen
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center bg-[#FAFCE9] py-3">
                                    {data.numKitchens}
                                </div>
                                <div className=" w-full text-center py-3">
                                    -
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="About-Building" className=" mt-6">
                        <p className=" text-xl text-[#4B8179]">
                            About Building:
                        </p>
                        <p className=" my-2">
                            {data.address.majorIntersection} ,{' '}
                            {data.address.neighborhood}
                        </p>

                        <div className=" mt-6 border border-[#DCEBE7] mx-8">
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Tax
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $
                                    {data.taxes?.annualAmount}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Building Age
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data?.taxes.assessmentYear}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Property Type
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.propertyType}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Type of Dwelling
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    One Level
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Maintenance
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Amenities
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Year Built
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.yearBuilt}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Direction
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Size
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Foundation Type
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.foundationType}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Basement
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.basement1}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Exterior
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.exteriorConstruction1}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Floor Covering
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]"></div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3"></div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="Description"
                        className=" text-xl text-[#4B8179] mt-4"
                    >
                        {' '}
                        Description
                        <p className=" my-4 bg-[#FAFCE9] w-full rounded-md text-[#595653] text-sm p-4">
                            {data.description}
                        </p>
                    </div>
                    <div id="Features-and-facilities" className=" mb-4">
                        <p className=" text-xl text-[#4B8179] my-4">
                            Features-and-facilities
                        </p>
                        <p>Property listed for $249,000 on 2024-06-12</p>
                        <div className=" mt-6 border border-[#DCEBE7] mx-8">
                            <div className=" bg-[#E5F0A6] text-xl py-2 text-center w-full text-[#325350]">
                                Property
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Style
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.style}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Municipality
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Fronting on
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Community
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Parking
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]"></div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3"></div>
                            </div>
                            <div className=" bg-[#E5F0A6] text-xl py-2 text-center w-full text-[#325350]">
                                Inside
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Rooms
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.numRooms}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Bathrooms
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.numBathrooms}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Bedrooms Above Ground
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.numBedroomsPlus}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Partial Bathrooms
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.numBathroomsPlus}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Bedrooms Below Ground
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {/* {data.numBedroomsHalf} */}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Ensuite Bathrooms
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    0
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Appliances Included
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]"></div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3"></div>
                            </div>
                            <div className=" bg-[#E5F0A6] text-xl py-2 text-center w-full text-[#325350]">
                                Parking
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Garage
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.numGarageSpaces}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Total Parking
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.numGarageSpaces}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Features
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]"></div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3"></div>
                            </div>
                            <div className=" bg-[#E5F0A6] text-xl py-2 text-center w-full text-[#325350]">
                                Land
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Sewer
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.landSewer}
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Zoning
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.Zoning}
                                </div>
                            </div>
                            <div className=" bg-[#E5F0A6] text-xl py-2 text-center w-full text-[#325350]">
                                Utilities
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Cooling
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Heating Type
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.heating}
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Heating Fuel
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    -
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Water
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    {data.waterSource}
                                </div>
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
                                    title: 'Overview',
                                },
                                {
                                    key: 'About-Building',
                                    href: '#About-Building',
                                    title: 'About Building',
                                },
                                {
                                    key: 'Description',
                                    href: '#Description',
                                    title: 'Description',
                                },
                                {
                                    key: 'Features-and-facilities',
                                    href: '#Features-and-facilities',
                                    title: 'Features and facilities',
                                },
                            ]}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}

