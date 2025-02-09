import { useEffect, useRef } from 'react';

const TypeDistributionChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!window.Chart) {
      console.error('Chart.js not loaded');
      return;
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const typeDistribution = data.reduce((acc, transaction) => {
      acc[transaction.type] = (acc[transaction.type] || 0) + 1;
      return acc;
    }, {});

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new window.Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: Object.keys(typeDistribution),
        datasets: [{
          data: Object.values(typeDistribution),
          backgroundColor: [
            'rgba(255, 255, 255, 0.9)',
            'rgba(200, 200, 200, 0.9)',
            'rgba(150, 150, 150, 0.9)',
            'rgba(100, 100, 100, 0.9)',
            'rgba(50, 50, 50, 0.9)'
          ],
          borderColor: 'rgba(var(--rgbBackground), 0.1)',
          borderWidth: 2,
          hoverBackgroundColor: [
            'rgba(255, 255, 255, 1)',
            'rgba(200, 200, 200, 1)',
            'rgba(150, 150, 150, 1)',
            'rgba(100, 100, 100, 1)',
            'rgba(50, 50, 50, 1)'
          ],
          hoverBorderColor: 'rgb(var(--rgbPrimary))',
          hoverBorderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        layout: {
          padding: {
            top: 20,
            bottom: 20
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgb(var(--rgbBackground))',
            titleColor: 'rgb(var(--rgbText))',
            bodyColor: 'rgb(var(--rgbText))',
            borderColor: 'rgba(var(--rgbPrimary), 0.1)',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: (context) => {
                const value = context.raw;
                const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value} (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="dashboard__card">
      <h2 className="dashboard__heading">Transaction Distribution</h2>
      <div className="dashboard__chart-container">
        <canvas ref={chartRef} />
      </div>
      <div className="dashboard__chart-legend">
        {data && Object.entries(data.reduce((acc, transaction) => {
          acc[transaction.type] = (acc[transaction.type] || 0) + 1;
          return acc;
        }, {})).map(([type, count], index) => (
          <div key={type} className="dashboard__legend-item">
            <span 
              className="dashboard__legend-color" 
              style={{ 
                backgroundColor: [
                  'rgba(255, 255, 255, 0.9)',
                  'rgba(200, 200, 200, 0.9)',
                  'rgba(150, 150, 150, 0.9)',
                  'rgba(100, 100, 100, 0.9)',
                  'rgba(50, 50, 50, 0.9)'
                ][index] 
              }}
            />
            <span className="dashboard__legend-label">
              {type}: {count} ({((count / data.length) * 100).toFixed(1)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeDistributionChart; 