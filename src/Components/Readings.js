import React from 'react';
import Chart from 'react-apexcharts'

/*
  @param {array} readings - 
  data provided by Dexcom API
  egvs[
    {
      displayTime,
      realtimeValue,
      smoothedValue,
      status,
      systemTime,
      trend,
      trendRate,
      value
    }
  ]
*/

const Readings = ({readings}) => {
  
  if(readings) {
    
    const glucose_readings = [];
    readings.egvs.forEach(reading => glucose_readings.push(reading.value))

    const options = {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    }
    const series =  [{
      name: 'series-1',
      data: glucose_readings
    }]

    const theme = {
      monochrome: {
        enabled: true,
        color: 'red',
        shadeTo: 'light',
        shadeIntensity: 0.65
      }
    }
  
    return (
      <Chart 
        options={options} 
        series={series} 
        type="area" 
        width={900} 
        height={320} 
        design={theme} 
      />
    )
  } else {
    return <div>Loading...</div>;
  }
}

export default Readings;