import React from 'react';
import Chart from 'react-apexcharts'
import {
  CircularProgress
} from '@material-ui/core';
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
        id: 'apexchart-example',
        animations: {
          speed: 800
        },
      },
      theme: {
        monochrome: {
          enabled: true,
          color: '#255aee',
          shadeTo: 'dark',
          shadeIntensity: 0.65
        }
      },
      xaxis:{
        categories: ["Jan", "Feb", "Mar", "Dec"]
      }
    }

    
    const series =  [{
      name: 'Reading',
      data: glucose_readings
    }]

  
    return (
      <div className="chart element">
        <Chart 
          options={options} 
          series={series} 
          type="area" 
          width={'100%'} 
          height={400}
        />
      </div>
    )
  } else {
    return (
      <div>
        <CircularProgress />
      </div>
    )
  }
}

export default Readings;