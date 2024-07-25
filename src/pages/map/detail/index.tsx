import { ConfigProvider, Tabs, TabsProps } from 'antd'
import DetailsTab from './tabs/details'
import AccessTab from './tabs/access'
import PriceTab from './tabs/price'
import useGetDetail from './hooks/useGetDetail'

export default function Detail() {
    const { data } = useGetDetail()
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Details',
            children: <DetailsTab data={data} />,
        },
        {
            key: '2',
            label: 'Access',
            children: <AccessTab data={data} />,
        },
        {
            key: '3',
            label: 'Price history',
            children: <PriceTab data={data} />,
        },
    ]

    return (
        <div className=" h-full w-full overflow-x-hidden">
            <div className=" mx-20">
                <ConfigProvider
                    theme={{
                        token: {
                            // Seed Token
                            colorPrimary: '#9EBB27',
                            borderRadius: 2,

                            // Alias Token
                            // colorBgContainer: '#9EBB27',
                        },
                    }}
                >
                    {data && (
                        <Tabs
                            className="overflow-x-hidden"
                            defaultActiveKey="1"
                            items={items}
                            // tabBarStyle={{ backgroundColor: 'red' }}
                        />
                    )}
                </ConfigProvider>
            </div>
        </div>
    )
}
