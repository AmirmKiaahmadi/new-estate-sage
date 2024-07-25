import { ChatTeardropDots, MapPin } from '@phosphor-icons/react'
import { Anchor, Col, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import LineChart from 'components/charts/line'
import LocationMap from 'components/locationMap'
import React from 'react'

interface IProps {
    data: any
}

export default function PriceTab({ data }: IProps) {
    return (
        <div className=" overflow-x-hidden">
            <Row className=" mt-8">
                <Col span={18} className="z-10">
                    <div id="Overview" className=" mt-6">
                        <p className=" text-xl text-[#4B8179]">
                            Price History:
                        </p>
                        <LineChart />
                    </div>
                    <div id="About-Building" className=" mt-6">
                        <p className=" text-xl text-[#4B8179]">Tax History:</p>

                        <div className=" mt-6 border border-[#DCEBE7] mx-8 my-6">
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    Year
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    Property Tax
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    Land + Additions
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    = Assessed Value
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    2024
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $2,888 (+2.3%)
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    $2,812 + $11,187
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $13,999
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    2023
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $2,888 (+2.3%)
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    $2,812 + $11,187
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $13,999
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    2022
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $2,888 (-2.3%)
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    $2,812 + $11,187
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $13,999
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    2021
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $2,888 (+2.3%)
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    $2,812 + $11,187
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $13,999
                                </div>
                            </div>
                            <div className=" flex justify-between border-b border-[#DCEBE7] ">
                                <div className=" w-full text-center bg-[#FAFCE9] py-3">
                                    2020
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $2,888 (+2.3%)
                                </div>
                                <div className=" w-full text-center py-3 bg-[#FAFCE9]">
                                    $2,812 + $11,187
                                </div>
                                <div className=" border-r border-l border-[#DCEBE7] w-full text-center  py-3">
                                    $13,999
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
                                    title: 'Price history',
                                },
                                {
                                    key: 'About-Building',
                                    href: '#About-Building',
                                    title: 'Tax history',
                                },
                            ]}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}
