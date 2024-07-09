import { Radio } from 'antd'
import React, { useState } from 'react'
import { DatePicker } from 'antd'
import { IFilters } from 'components/leaflet'
import moment from 'moment'

const { RangePicker } = DatePicker
interface Props {
    setIsOpenActiveFilter: React.Dispatch<React.SetStateAction<boolean>>
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}

const radios: string[] = [
    'All date listing',
    'Last 1 days',
    'Last 3 days',
    'Last 7 days',
    'Last 30 days',
    'Last 90 days',
    'More than 15 days',
    'More than 30 days',
    'More than 60 days',
    'More than 90 days',
]

export default function ActiveFilters({
    setIsOpenActiveFilter,
    setFilters,
    filters,
}: Props) {
    const [date, setDate] = useState<string>('')
    const handleDateChange = (value: any) => {
        const from = moment(new Date(value[0].$d)).format('YYYY-MM-DD')
        const to = moment(new Date(value[1].$d)).format('YYYY-MM-DD')
        setDate(from + ' to ' + to)
    }
    return (
        <div className=" h-full flex flex-col">
            <div className=" grow flex flex-col">
                <Radio.Group className="flex flex-col">
                    {radios.map((item) => (
                        <Radio
                            key={item}
                            value={item}
                            className=" my-2"
                            //@ts-ignore
                            onClick={(e) => setDate(e.target.defaultValue)}
                            checked={filters.active === item}
                        >
                            {item}
                        </Radio>
                    ))}
                </Radio.Group>
                <div className=" my-2">
                    <p className=" my-2">Select Date Range</p>
                    <RangePicker onChange={(e) => handleDateChange(e)} />
                </div>
            </div>
            <div className=" grow-0 flex justify-between">
                <button
                    className=" w-full mx-2 bg-primary text-white py-2 rounded-lg"
                    onClick={() => {
                        setFilters({ ...filters, active: date })
                        setIsOpenActiveFilter(false)
                    }}
                >
                    Apply
                </button>
                <button
                    className=" w-full border mx-2 border-primary text-primary py-2 rounded-lg"
                    onClick={() => {
                        setIsOpenActiveFilter(false)
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
