import React from 'react'
import type { CollapseProps } from 'antd'
import { Collapse } from 'antd'
import KeyWords from './keywords'
import { IFilters } from 'components/leaflet'
import Fee from './fee'
import Bedrooms from './bedrooms'
import Bathrooms from './bathrooms'
import Kitchen from './kitchen'
import Garage from './garage'
import ParkingType from './parkingType'
import Basement from './basement'
import OpenHouse from './openHouse'
import ListingType from './listingType'
import SquareFootage from './squareFootage'
import { initialFilters } from 'utilities/helper/const'
import { UseMutateFunction } from 'react-query'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
    setIsOpenActiveFilter: any
    mutatePropertyType: UseMutateFunction<any, unknown, IFilters, unknown>
}

export default function MoreFilters({
    setFilters,
    filters,
    setIsOpenActiveFilter,
    mutatePropertyType
}: Props) {
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'keywords',
            children: <KeyWords setFilters={setFilters} filters={filters} />,
        },
        {
            key: '2',
            label: 'Max Maintenance Fee',
            children: <Fee setFilters={setFilters} filters={filters} />,
        },
        {
            key: '3',
            label: 'Bedrooms',
            children: <Bedrooms setFilters={setFilters} filters={filters} />,
        },
        {
            key: '4',
            label: 'Bathrooms',
            children: <Bathrooms setFilters={setFilters} filters={filters} />,
        },
        {
            key: '5',
            label: 'Kitchen',
            children: <Kitchen setFilters={setFilters} filters={filters} />,
        },
        {
            key: '6',
            label: 'Garage/Covered Parking',
            children: <Garage setFilters={setFilters} filters={filters} />,
        },
        {
            key: '7',
            label: 'Parking Type',
            children: <ParkingType setFilters={setFilters} filters={filters} />,
        },
        {
            key: '8',
            label: 'Basement',
            children: <Basement setFilters={setFilters} filters={filters} />,
        },
        {
            key: '9',
            label: 'Open House',
            children: <OpenHouse setFilters={setFilters} filters={filters} />,
        },
        {
            key: '10',
            label: 'Listing Type',
            children: <ListingType setFilters={setFilters} filters={filters} />,
        },
        {
            key: '11',
            label: 'Square Footage',
            children: (
                <SquareFootage setFilters={setFilters} filters={filters} />
            ),
        },
        // {
        //     key: '12',
        //     label: 'Lot Front',
        //     children: <p>{text}</p>,
        // },
    ]
    return (
        <div className=" h-full flex flex-col">
            <div className=" grow">
                <Collapse accordion items={items} />
            </div>
            <div className="grow-0">
                <div className=" flex justify-between">
                    <button
                        className=" w-full text-white rounded-md bg-[#9EBB27] py-2 mx-1"
                        onClick={() => {
                            setIsOpenActiveFilter(false)
                            mutatePropertyType(filters)
                        }}
                    >
                        Apply
                    </button>
                    <button
                        className=" w-full text-[#9EBB27] rounded-md border border-[#9EBB27] py-2 mx-1"
                        onClick={() => {
                            setFilters(initialFilters)
                            setIsOpenActiveFilter(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}
