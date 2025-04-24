import React from 'react';
import Chart from 'react-apexcharts';

function Heatmap({ data = [] }) {
  // Ensure the data is in the expected format
  const seriesData = [
    {
      name: 'Points',
      data: data.map(item => ({ x: item.day, y: item.points }))
    }
  ];

  // Modern color palette that matches our design system
  const colors = {
    background: '#F9FAFB',   // Light gray background
    text: '#374151',         // Dark gray text
    muted: '#9CA3AF',        // Muted text
    primary: '#8B5CF6',      // Purple as primary
    primaryLight: '#C4B5FD',  // Light purple
    primaryDark: '#6D28D9',  // Dark purple
    success: '#10B981',      // Green for success
    warning: '#F59E0B',      // Amber for warning
  };

  const options = {
    chart: {
      type: 'heatmap',
      fontFamily: 'Inter, system-ui, sans-serif',
      toolbar: {
        show: false
      },
      background: 'transparent',
      animations: {
        enabled: true,
        easing: 'easeinout',
        dynamicAnimation: {
          speed: 800
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: [colors.primary],
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: {
          colors: colors.text,
          fontSize: '12px',
          fontWeight: 500
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, system-ui, sans-serif'
      },
      y: {
        formatter: function (val) {
          return `${val} points`;
        },
        title: {
          formatter: function () {
            return '';
          }
        }
      }
    },
    plotOptions: {
      heatmap: {
        radius: 4,
        enableShades: true,
        shadeIntensity: 0.5,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 0,
              name: 'No activity',
              color: '#F3F4F6' // Light gray for no activity
            },
            {
              from: 1,
              to: 20,
              name: 'Low',
              color: colors.primaryLight // Light purple for low activity
            },
            {
              from: 21,
              to: 50,
              name: 'Medium',
              color: colors.primary // Regular purple for medium activity
            },
            {
              from: 51,
              to: 1000,
              name: 'High',
              color: colors.primaryDark // Dark purple for high activity
            }
          ]
        }
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    grid: {
      padding: {
        left: 20,
        right: 20
      },
      borderColor: '#F3F4F6'
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.15,
        }
      }
    }
  };

  return (
    <div className="w-full h-64 md:h-80">
      <Chart options={options} series={seriesData} type="heatmap" height="100%" />
    </div>
  );
}

export default Heatmap;