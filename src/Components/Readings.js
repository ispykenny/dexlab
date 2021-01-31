import React, {useState, useEffect} from 'react';
import moment from 'moment'
import Chart from 'react-apexcharts'

const dateCleanUp = (orignalDate) => {
  return moment(orignalDate).format('MMMM Do YYYY, h:mm:ss a')
}

const Readings = ({readings, days, dataHasLoaded}) => {


  const TotalResults = () => {
    return (
      <div>
        <h1>{readings.data.dexcom.egvs.length} Results for the past {days} days:</h1>
      </div>
    )
  }

  const DisplayReadings = () => {
    const readingsType = readings.data.dexcom.unit
    const allReadings = readings.data.dexcom.egvs;
    
    return (
      <div>
        { allReadings.map((reading, index) => (
          <div key={index}>
            <strong>{reading.value}</strong> {readingsType} at {dateCleanUp(reading.displayTime)}
          </div>
        ))}
      </div>
    )
  }

  const Loading = () => {
    return (
      <div>
       
      </div>
    )
  }

  const Charter = () => {
    if(dataHasLoaded) {
      let dataa = [];
      let time = [];
      readings.data.dexcom.egvs.forEach((item) =>{
        dataa.push(item.value)
        time.push(moment(item.displayTime).format('MMM Do h:mm:ss a'))
      })
      let optionsAll = {
        options: {
          chart: {
            id: 'DexLab Graph'
          },
          xaxis: {
            labels: {
              // show: false
            },
            categories: time.reverse()
          }
        },
        series: [{
          name: 'Glucose Reading',
          data: dataa.reverse()
        }] 
      }
      return (
        <Chart options={optionsAll.options} type="area" series={optionsAll.series}  width={'100%'} height={320} />
      )
    } else {
      return <div>Generating graph....</div>
    }

  }

  const ShowChart = () => {
    if(dataHasLoaded) {
      return <TotalResults/>
    } else {
      return <Loading/>
    }
  }


  return (
    <>
      <ShowChart/>
      <Charter/>
    </>
  )
}

export default Readings;