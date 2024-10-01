import React from 'react';
import Chart from 'react-apexcharts';

const TopicProgressChart = ({ userPassedMilestones, totalMilestones, chartColor }) => {
    // Calculate the progress percentage, ensuring it's a finite number
    const progressPercentage = totalMilestones > 0 
        ? ((userPassedMilestones / totalMilestones) * 100).toFixed(1)
        : 0;

    // If the calculated percentage is somehow Infinity or NaN, default to 0
    const validSeries = isFinite(progressPercentage) ? parseFloat(progressPercentage) : 0;

    const chartOptions = {
        chart: {
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '50%',
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: true,
                        fontSize: '1rem',
                        color: '#2C1B18', // Primary text color
                        offsetY: 5,
                    },
                },
            },
        },
        colors: [chartColor], // Use the dynamic color passed from the Sidebar
        labels: ['Progress'],
    };

    const series = [validSeries];

    return (
        <div className="progress-chart">
            <Chart options={chartOptions} series={series} type="radialBar" height={250} />
        </div>
    );
};

export default TopicProgressChart;
