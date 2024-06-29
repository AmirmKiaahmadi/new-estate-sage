import { IFilters } from 'components/leaflet'
import React from 'react'
interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}
const examples = ['All', '1', '2', '3', '4', '+5']
export default function Bedrooms({ setFilters, filters }: Props) {
    return (
        <div className=" flex flex-wrap">
            {examples.map((item) => (
                <p>{item}</p>
            ))}
        </div>
    )
}
