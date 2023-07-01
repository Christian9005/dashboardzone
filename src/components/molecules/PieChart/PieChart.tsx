import React, { FC } from 'react';
import { Chart } from 'react-google-charts';

interface PieChartProps {
    data: any[];
    options: {
        title: string;
        chartArea?: {
            left?: number | string;
            top?: number | string;
            right?: number | string;
            bottom?: number | string;
            width?: string;
            height?: string;
        };
        padding?: number | string;
    };
}

const PieChart: FC<PieChartProps> = ({ data, options }) => {
    const { title, ...customOptions } = options;

    const defaultOptions = {
        chartType: 'PieChart' as const,
        data,
        options: {
            title: '',
            chartArea: {
                left: 50,
                top: 50,
                right: 50,
                bottom: 50,
                width: '100%',
                height: '100%',
            },
            padding: '10',
            ...customOptions,
        },
        width: '100%',
        height: '400px',
    };

    return <Chart {...defaultOptions} />;
};

export default PieChart;
