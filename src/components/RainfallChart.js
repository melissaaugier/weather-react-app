import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import RaindropsIcon from '../icons/raindropsIcon';
import './RainfallChart.css'; // Ensure this file exists with any necessary styles

const RainfallChart = ({ rainfallData }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current && rainfallData) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: rainfallData.map(data => data.day),
                    datasets: [{
                        label: 'Rainfall (mm)',
                        data: rainfallData.map(data => data.rainfall),
                        borderColor: '#3F88C5',
                        tension: 0.4,
                        borderWidth: 2,
                        pointRadius: 2,
                        pointBackgroundColor: '#3F88C5',
                        pointBorderColor: '#3F88C5',
                    }]
                },
                options: {
                    animations: {
                        tension: {
                            duration: 2000,
                            easing: 'linear',
                            from: 0.8,
                            to: -0.1,
                            loop: true
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: false
                            },
                            grid: {
                                display: false
                            },
                            ticks: {
                                display: true,
                                callback: function(value, index, values) {
                                    if (index === 0) {
                                        return ''; // Empty string for the first tick
                                    } else {
                                        return value + 'mm';
                                    }
                                },
                                font: {
                                    size: 10,
                                    color: 'white'
                                }
                            },
                            borderColor: 'white',
                            borderWidth: 1,
                        },
                        x: {
                            title: {
                                display: false
                            },
                            grid: {
                                display: false,
                            },
                            ticks: {
                                display: true,
                                font: {
                                    size: 10,
                                    color: 'white' // Adjust font color here
                                }
                            },
                            borderColor: 'white',
                            borderWidth: 1,
                        }
                    },
                    plugins: {
                        legend: {
                            display: false,
                        }
                    },
                    elements: {
                        point: {
                            hoverRadius: 6 // Adjust hover radius for points
                        }
                    }
                }
            });
        }
    }, [rainfallData]);

    return (
        <div className='RainfallChart'>
            <RaindropsIcon/>
            <canvas ref={chartRef} style={{ height: '100%' }}></canvas>
        </div>
    );
};

export default RainfallChart;
