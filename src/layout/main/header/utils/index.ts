import { MenuProps } from 'antd'

export const items: MenuProps['items'] = [
    {
        label: 'For Sale',
        key: 'For Sale',
    },
    {
        label: 'For Lease',
        key: 'For Lease',
    },
]

export const defaultCheckedList: Array<{ label: string; checked: boolean }> = [
    { label: 'Detached', checked: false },
    { label: 'Semi-Detached', checked: false },
    { label: 'Freehold-Townhouse', checked: false },
    { label: 'Condo Townhouse', checked: false },
    { label: 'Condo Apt', checked: false },
    { label: 'Link', checked: false },
    { label: 'Multiplex', checked: false },
    { label: 'Vacant Land', checked: false },
    { label: 'Other', checked: false },
]

export const defaultActiveList: { label: string; value: number }[] = [
    {
        label: 'Last 1 Days',
        value: 1,
    },
    {
        label: 'Last 3 Days',
        value: 3,
    },
    {
        label: 'Last 7 Days',
        value: 7,
    },
    {
        label: 'Last 30 Days',
        value: 30,
    },
    {
        label: 'Last 90 Days',
        value: 90,
    },
    {
        label: 'More than 15 days',
        value: 150,
    },
    {
        label: 'More than 30 days',
        value: 300,
    },
    {
        label: 'More than 60 days',
        value: 600,
    },
    {
        label: 'More than 90 days',
        value: 900,
    },
]

export const defaultSoldList: { label: string; value: number }[] = [
    {
        label: 'Last 1 Days',
        value: 1,
    },
    {
        label: 'Last 3 Days',
        value: 3,
    },
    {
        label: 'Last 7 Days',
        value: 7,
    },
    {
        label: 'Last 30 Days',
        value: 30,
    },
    {
        label: 'Last 90 Days',
        value: 90,
    },
    {
        label: 'Last 180 Days',
        value: 180,
    },
    {
        label: 'Last 360 Days',
        value: 360,
    },
    {
        label: 'Year 2024',
        value: 2024,
    },
    {
        label: 'Year 2023',
        value: 2023,
    },
    {
        label: 'Year 2022',
        value: 2022,
    },
    {
        label: 'Year 2021',
        value: 2021,
    },
    {
        label: 'Year 2020',
        value: 2020,
    },
    {
        label: 'Year 2019',
        value: 2019,
    },
    {
        label: 'Year 2018',
        value: 2018,
    },
]
