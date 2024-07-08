import { InputNumber, Slider, Switch } from 'antd'
import type { SliderSingleProps } from 'antd'
import { IFilters } from 'components/leaflet'

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
export default function SquareFootage({ setFilters, filters }: Props) {
    return (
        <div className=" h-full flex flex-col">
            <div className=" grow">
                <Slider
                    range
                    defaultValue={filters.more.squareFootage}
                    tooltip={{ formatter }}
                    min={0}
                    max={40000}
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            more: { ...filters.more, squareFootage: e },
                        })
                    }
                />
                <div className="flex justify-between text-xs">
                    <p>0</p>
                    <p>Max</p>
                </div>
                <p className=" my-4">Min:</p>
                <InputNumber
                    addonAfter="$"
                    value={filters.more.squareFootage[0]}
                    className=" w-full"
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            more: {
                                ...filters.more,
                                squareFootage: [
                                    Number(e),
                                    filters.more.squareFootage[1],
                                ],
                            },
                        })
                    }
                />
                <p className=" my-4">Max:</p>
                <InputNumber
                    addonAfter="$"
                    value={filters.more.squareFootage[1]}
                    className=" w-full"
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            more: {
                                ...filters.more,
                                squareFootage: [
                                    filters.more.squareFootage[0],
                                    Number(e),
                                ],
                            },
                        })
                    }
                />
            </div>
        </div>
    )
}
