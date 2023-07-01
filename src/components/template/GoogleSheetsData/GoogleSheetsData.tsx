import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from "moment";
import PieChart from "../../molecules/PieChart/PieChart";
import BarChart from "../../molecules/BarChart/BarChart";
import CardPrincipal from "../../molecules/CardPrincipal/CardPrincipal";
import "./GoogleSheetsData.scss";

const GoogleSheetsData = () => {
    const [data, setData] = useState<string[][]>([]);
    const [totalCounts, setTotalCounts] = useState<{ [zone: string]: number }>({});
    const [maxHourData, setMaxHourData] = useState<{ [zone: string]: { hour: string, count: number } }>({});
    const [date,setDate] = useState<string>();

    useEffect(() => {
        const getGoogleSheetsData = async () => {
            try {
                const response = await axios.get(
                    `https://sheets.googleapis.com/v4/spreadsheets/1eiBtNVdIoyC2zzyiSOHA1yk3ILUw1OhZjbJuQ2oYi-A/values/Hoja%201?majorDimension=ROWS&valueRenderOption=FORMATTED_VALUE&dateTimeRenderOption=FORMATTED_STRING&key=AIzaSyDv2U11PWIN_KYewjwW5v8qwLlbiTFd_-M`
                );

                const sheetData = response.data.values as string[][];
                setData(sheetData);
            } catch (error) {
                console.error('Error al obtener los datos de Google Sheets:', error);
            }
        };

        getGoogleSheetsData();
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            const currentDate = moment().format('DD/MM/YYYY');

            const maxDate = data.reduce((max, row) => {
                const rowDate = moment(row[0], 'DD/MM/YYYY');

                if (rowDate.isBefore(moment(currentDate, 'DD/MM/YYYY'), 'day')) {
                    if (max === '') {
                        return row[0];
                    } else {
                        const maxRowDate = moment(max, 'DD/MM/YYYY');
                        if (rowDate.isAfter(maxRowDate, 'day')) {
                            return row[0];
                        }
                    }
                }

                return max;
            }, '');

            console.log('Max Date:', maxDate);
            setDate(maxDate);

            const filteredData = data.filter((row) => row[0] === maxDate);

            const totalCounts: { [zone: string]: number } = {};
            const maxHourData: { [zone: string]: { hour: string; count: number } } = {};

            if (filteredData.length > 0) {
                const [, , ...zoneData] = filteredData;

                zoneData.forEach((row) => {
                    const [, time, ...zones] = row;

                    zones.forEach((zone, index) => {
                        if (!totalCounts.hasOwnProperty(index.toString())) {
                            totalCounts[index.toString()] = 0;
                            maxHourData[index.toString()] = { hour: '', count: 0 };
                        }

                        if (zone !== '/' && zone.trim() !== '') {
                            const dataCounts = zone.split('//').filter((data) => data !== '');
                            totalCounts[index.toString()] += dataCounts.length;
                            if (dataCounts.length > maxHourData[index.toString()].count) {
                                maxHourData[index.toString()] = { hour: time, count: dataCounts.length };
                            }
                        }
                    });
                });
            }

            setTotalCounts(totalCounts);
            setMaxHourData(maxHourData);
        }
    }, [data]);

    const pieChartData = [
        ['Zonas', 'Datos'],
        ['Zona 1', totalCounts[0]],
        ['Zona 2', totalCounts[1]],
        ['Zona 3', totalCounts[2]],
        ['Zona 4', totalCounts[3]],
    ];

    const allData = Object.values(totalCounts).reduce((sum, count) => sum + count, 0);
    const countKeys = Object.keys(totalCounts);

    const maxCountKey = countKeys.reduce((a, b) => totalCounts[a] < totalCounts[b] ? b : a, countKeys[0] || '');
    const mostDemandedZone = maxCountKey ? (parseInt(maxCountKey) + 1) : 1;

    const minCountKey = countKeys.reduce((a, b) => totalCounts[a] > totalCounts[b] ? b : a, countKeys[0] || '');
    const leastDemandedZone = minCountKey ? (parseInt(minCountKey) + 1) : 1;

    return (
        <div className="google-sheets-data">
            <div className="google-sheets-data--title">
                <h1>Métricas del día {date}</h1>
            </div>
            <div className="google-sheets-data--header">
                <CardPrincipal
                    allData={allData}
                    mostDemandedZone={mostDemandedZone}
                    lessDemandedZone={leastDemandedZone}
                    zone1={maxHourData[0]?.hour || ""}
                    zone2={maxHourData[1]?.hour || ""}
                    zone3={maxHourData[2]?.hour || ""}
                    zone4={maxHourData[3]?.hour || ""}
                />
            </div>
            <div className="google-sheets-data--charts">
                <BarChart
                    data={pieChartData}
                    options={{
                        title: 'Datos totales por zona',
                    }}
                />
                <PieChart
                    data={pieChartData}
                    options={{
                        title: 'Datos totales por zona',
                        chartArea: {
                            left: 50,
                            top: 50,
                            right: 50,
                            bottom: 50,
                            width: '100%',
                            height: '100%',
                        },
                        padding: '10',
                    }}
                />
            </div>
        </div>
    );
};

export default GoogleSheetsData;
