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

  // Tailwind colors as JavaScript variables
  const colors = {
    primary: '#BC002D',        // Deep red
    secondary: '#D4AF37',      // Goldish yellow
    background: '#F5F5DC',     // Beige
    cardBg: '#FFFFFF',         // White
    primaryText: '#2C1B18',    // Dark brown
    secondaryText: '#704214',  // Medium brown
    border: '#D9C3A3',         // Light brown
    hoverPrimary: '#A3001E',   // Darker red
    muted: '#A89988',          // Muted brown
    accent: '#FFDB58',         // Light gold
  };

  const options = {
    chart: {
      type: 'heatmap',
      toolbar: {
        show: false
      },
      responsive: [
        {
          breakpoint: 768, // For smaller screens
          options: {
            chart: {
              height: 300 // Adjust height for mobile
            }
          }
        }
      ]
    },
    colors: [colors.primary], // Use your primary color
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      labels: {
        style: {
          colors: colors.secondaryText, // Adjust label color
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val}`;
        }
      }
    },
    plotOptions: {
      heatmap: {
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 20,
              name: 'Low',
              color: colors.accent // Light color for low range
            },
            {
              from: 21,
              to: 40,
              name: 'Medium',
              color: colors.secondary // Goldish yellow for medium range
            },
            {
              from: 41,
              to: 70,
              name: 'High',
              color: colors.primary // Deep red for high range
            }
          ]
        }
      }
    },
    grid: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10
      }
    }
  };

  return (
    <div className="container mx-auto my-8 px-4 py-4 bg-cardBg border border-border rounded-lg shadow-md">
      <Chart options={options} series={seriesData} type="heatmap" height="100%" />
    </div>
  );
}

export default Heatmap;
