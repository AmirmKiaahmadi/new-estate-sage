import React from 'react'
import type { CollapseProps } from 'antd'
import { Collapse } from 'antd'
import KeyWords from './keywords'
import { IFilters } from 'components/leaflet'
import Fee from './fee'
import Bedrooms from './bedrooms'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}

export default function MoreFilters({ setFilters, filters }: Props) {
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
            children: <p>{text}</p>,
        },
        {
            key: '5',
            label: 'Kitchen',
            children: <p>{text}</p>,
        },
        {
            key: '6',
            label: 'Garage/Covered Parking',
            children: <p>{text}</p>,
        },
        {
            key: '7',
            label: 'Basement',
            children: <p>{text}</p>,
        },
        {
            key: '8',
            label: 'Open House',
            children: <p>{text}</p>,
        },
        {
            key: '9',
            label: 'Listing Type',
            children: <p>{text}</p>,
        },
        {
            key: '10',
            label: 'Square Footage',
            children: <p>{text}</p>,
        },
        {
            key: '11',
            label: 'Lot Front',
            children: <p>{text}</p>,
        },
    ]
    return (
        <>
            <Collapse accordion items={items} />
        </>
    )
}
