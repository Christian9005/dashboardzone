import React, { FC } from 'react';
import { Chart } from 'react-google-charts';

interface BarChartProps {
    data: any[];
    options: {
        title: string;
    };
}

const BarChart: FC<BarChartProps> = ({ data, options }) => {
    return (
        <Chart
            chartType="Bar"
            data={data}
            options={options}
            width={'90%'}
            height={'400px'}
        />
    );
};

export default BarChart;

