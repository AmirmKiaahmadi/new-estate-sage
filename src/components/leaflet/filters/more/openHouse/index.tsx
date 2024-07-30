import { Radio } from 'antd'
import React, { useState } from 'react'
import { DatePicker } from 'antd'
import { IFilters } from 'components/leaflet'
import moment from 'moment'
import classNames from 'classnames'

const { RangePicker } = DatePicker
interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}
const radios: string[] = ['Today', 'Tomorrow', 'All Open Houses']
export default function OpenHouse({ setFilters, filters }: Props) {
    const handleDateChange = (value: any) => {
        const from = moment(new Date(value[0].$d)).format('YYYY-MM-DD')
        const to = moment(new Date(value[1].$d)).format('YYYY-MM-DD')
        // setFilters({
        //     ...filters,
        //     more: { ...filters.more, openHouse: from + ' to ' + to },
        // })
    }
    return (
        <div className=" flex flex-col">
            {/* <div className="flex flex-wrap">
                {radios.map((item) => (
                    <p
                        className={classNames(
                            ' py-2 px-2 text-center rounded-md my-1 mx-1 w-full',
                            filters.more.openHouse === item
                                ? ' bg-[#649B92] text-white'
                                : ' border border-[#649B92] text-[#649B92]'
                        )}
                        onClick={() =>
                            setFilters({
                                ...filters,
                                more: { ...filters.more, openHouse: item },
                            })
                        }
                    >
                        {item}
                    </p>
                ))}
            </div> */}
            <div className=" my-2">
                <p className=" my-2">Select Date Range</p>
                <RangePicker onChange={(e) => handleDateChange(e)} />
            </div>
        </div>
    )
}
