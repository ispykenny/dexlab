import React, {useState} from 'react';
import Chart from 'react-apexcharts'
import moment from 'moment'

const GetChart = ({readings}) => {
  const [mount, setMount] = useState(false);
  
  if(readings && !mount) {
    const glucose_readings = [];
    const dates = []
    readings.egvs.forEach((reading, index) => {
      glucose_readings.push(reading.value)
      dates.push(moment(reading.displayTime).format('LT'))
    })
    

    const options = {
      chart: {
        id: 'apexchart-example',
        animations: {
          speed: 800
        },
        stroke: {
          curve: 'smooth',
        }
      },
      theme: {
        monochrome: {
          // enabled: true,
          color: '#3498db',
          // shadeTo: 'dark',
          shadeIntensity: 2.95
        },
        fill: {
          colors: ['#F44336', '#E91E63', '#9C27B0']
        }
      },
      
      xaxis:{
        categories: dates.reverse(),
        labels: {
          show: false,
        }
      },
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
          height={'300'}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h4>Genereating your chart.</h4>
      </div>
    )
  }
}


export default GetChart;
