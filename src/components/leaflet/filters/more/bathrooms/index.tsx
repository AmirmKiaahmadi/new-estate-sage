import classNames from 'classnames'
import { IFilters } from 'components/leaflet'
import React from 'react'
interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}
const examples = ['All', '1', '2', '3', '4', '+5']
export default function Bathrooms({ setFilters, filters }: Props) {
    return (
        <div className=" flex flex-wrap">
            {examples.map((item) => (
                <p
                    className={classNames(
                        ' rounded-md py-2 px-4 mx-1 my-1 cursor-pointer',
                        filters.more.bathrooms === item
                            ? 'bg-[#649B92] text-white'
                            : 'border border-[#649B92] text-[#649B92]'
                    )}
                    onClick={() =>
                        setFilters({
                            ...filters,
                            more: { ...filters.more, bathrooms: item },
                        })
                    }
                >
                    {item}
                </p>
            ))}
        </div>
    )
}
