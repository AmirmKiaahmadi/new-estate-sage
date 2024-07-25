import React from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { CategoryScale } from 'chart.js'
Chart.register(CategoryScale)
const labels = ['January', 'February', 'March', 'April', 'May', 'June']
const data = {
    labels: labels,
    datasets: [
        {
            label: 'price history',
            backgroundColor: '#4B8179',
            borderColor: '#4B8179',
            data: [0, 10, 5, 2, 20, 30, 45],
        },
    ],
}
const LineChart = () => {
    return (
        <div>
            <Line data={data} height={100} />
        </div>
    )
}
export default LineChart
