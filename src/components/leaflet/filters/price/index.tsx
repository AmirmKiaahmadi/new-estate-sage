import { InputNumber, Slider, Switch } from 'antd'
import type { SliderSingleProps } from 'antd'
import { IFilters } from 'components/leaflet'

interface Props {
    setFilters: React.Dispatch<React.SetStateAction<IFilters>>
    filters: IFilters
    setIsOpenPriceFilter: React.Dispatch<React.SetStateAction<boolean>>
}

const formatter: NonNullable<SliderSingleProps['tooltip']>['formatter'] = (
    value
) =>
    Number(value) / 1000 >= 1 && Number(value) / 1000 < 1000
        ? `${Number(value) / 1000}K`
        : 1 <= Number(value) / 1000000
          ? `${Number(value) / 1000000}M`
          : `${value}`
export default function PriceFilter({
    setFilters,
    filters,
    setIsOpenPriceFilter,
}: Props) {
    return (
        <div className=" h-full flex flex-col">
            <div className=" grow">
                <p>choose price range</p>
                <Slider
                    range
                    defaultValue={filters.price}
                    tooltip={{ formatter }}
                    min={0}
                    max={4000000}
                    onChange={(e) => setFilters({ ...filters, price: e })}
                />
                <div className="flex justify-between text-xs">
                    <p>1$</p>
                    <p>Max</p>
                </div>
                <p className=" my-4">Min Price ($):</p>
                <InputNumber
                    addonAfter="$"
                    value={filters.price[0]}
                    className=" w-full"
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            price: [Number(e), filters.price[1]],
                        })
                    }
                />
                <p className=" my-4">Max Price ($):</p>
                <InputNumber
                    addonAfter="$"
                    value={filters.price[1]}
                    className=" w-full"
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            price: [filters.price[0], Number(e)],
                        })
                    }
                />
            </div>
            <div className=" grow-0 flex justify-between">
                <button
                    className=" w-full mx-2 bg-primary text-white py-2 rounded-lg"
                    onClick={() => {
                        setIsOpenPriceFilter(false)
                    }}
                >
                    Apply
                </button>
                <button
                    className=" w-full border mx-2 border-primary text-primary py-2 rounded-lg"
                    onClick={() => {
                        setIsOpenPriceFilter(false)
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
