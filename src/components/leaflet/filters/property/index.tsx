import React, { useState } from 'react'
import { Checkbox, Divider } from 'antd'
import type { CheckboxProps } from 'antd'
import { IFilters } from 'components/leaflet'
import { UseMutateFunction } from 'react-query'

interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
    setIsOpenPropertyFilter: React.Dispatch<React.SetStateAction<boolean>>
   
}

const CheckboxGroup = Checkbox.Group

const plainOptions = [
    'Detached',
    'Semi-Detached',
    'Link',
    'Freehold Townhouse',
    'Condo Townhouse',
]
export default function PropertyAiFilters({
    setFilters,
    filters,
    setIsOpenPropertyFilter,
    
}: Props) {
    const [properties , setProperties] = useState<string[]>([])
    const checkAll = plainOptions.length === filters.properties.length
    const indeterminate =
        filters.properties.length > 0 &&
        filters.properties.length < plainOptions.length

    const onChange = (list: string[]) => {
        setProperties(list)
        setFilters({ ...filters, properties: list })
    }

    const onCheckAllChange: CheckboxProps['onChange'] = (e) => {
        if(e.target.checked){
            setProperties(plainOptions)
        }else{
            setProperties([])
        }
        setFilters({
            ...filters,
            properties: e.target.checked ? plainOptions : [],
        })
    }
    return (
        <div className=" h-full flex flex-col">
            <div className=" grow">
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onCheckAllChange}
                    checked={checkAll}
                >
                    All property type
                </Checkbox>

                <CheckboxGroup
                    options={plainOptions}
                    value={filters.properties}
                    onChange={onChange}
                    className=" d-flex flex-col"
                />
            </div>
            <div className=" grow-0 flex justify-between">
                <button
                    className=" w-full mx-2 bg-primary text-white py-2 rounded-lg"
                    onClick={() => {
                        setIsOpenPropertyFilter(false)
                        
                    }}
                >
                    Apply
                </button>
                <button
                    className=" w-full border mx-2 border-primary text-primary py-2 rounded-lg"
                    onClick={() => {
                        setIsOpenPropertyFilter(false)
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
