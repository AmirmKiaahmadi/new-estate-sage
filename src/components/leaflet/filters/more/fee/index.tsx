import { InputNumber, Slider, SliderSingleProps } from 'antd'
import { IFilters } from 'components/leaflet'
import React from 'react'
interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
}

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (
    value
) =>
    Number(value) / 1000 >= 1 && Number(value) / 1000 < 1000
        ? `${Number(value) / 1000}K`
        : 1 <= Number(value) / 1000000
          ? `${Number(value) / 1000000}M`
          : `${value}`

export default function Fee({ setFilters, filters }: Props) {
    return (
        <div>
            <Slider
                range
                defaultValue={filters.price}
                tooltip={{ formatter }}
                min={0}
                max={4000000}
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        more: { ...filters.more, fee: e },
                    })
                }
            />
            <div className="flex justify-between text-xs">
                <p>1$</p>
                <p>Max</p>
            </div>
            <p className=" my-4">Min($):</p>
            <InputNumber
                addonAfter="$"
                value={filters.more.fee[0]}
                className=" w-full"
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        more: {
                            ...filters.more,
                            fee: [Number(e), filters.price[1]],
                        },
                    })
                }
            />
            <p className=" my-4">Max($):</p>
            <InputNumber
                addonAfter="$"
                value={filters.more.fee[1]}
                className=" w-full"
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        more: {
                            ...filters.more,
                            fee: [filters.price[0], Number(e)],
                        },
                    })
                }
            />
        </div>
    )
}
