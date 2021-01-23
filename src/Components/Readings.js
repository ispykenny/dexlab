import React, {useState, useEffect} from 'react';
import moment from 'moment'

const dateCleanUp = (orignalDate) => {
  return moment(orignalDate).format('MMMM Do YYYY, h:mm:ss a')
}

const Readings = ({readings, days}) => {
  // console.log(readings.data.dexcom)
  const [thesetofreadings, setthesetofreadings] = useState([]);

  useEffect(() => {
    readings.data.dexcom.egvs.forEach((item) => {
      setthesetofreadings(t => [...thesetofreadings, item.value])
    })
    console.log(thesetofreadings)
  },[])

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

  const TimelineResults = () => {
    let lowest = Math.min(...thesetofreadings);
    let highest = Math.max(...thesetofreadings);

    return (
      <div>
        Your lowest reading was {lowest} and your highest reading was {highest}
      </div>
    )

    
  }

  return (
    <>
      <h3>Recent Readings</h3>
      <TotalResults/>
      <TimelineResults/>
      <DisplayReadings/>
    </>
  )
}

export default Readings;