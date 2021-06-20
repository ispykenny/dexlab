import React from 'react';
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


const Readings = ({readings, reset, device_settings, user_id, days_of_readings}) => {
  
  const AverageSugar = ({readings}) => {
    const {unit} = readings;
    const a1c = unit === 'mg/dL' ? (46.7 + device_settings.mean) / 28.7 : (2.59 + device_settings.mean) / 1.59
    const header = device_settings.percentWithinRange >= 60 ? `${user_id.displayName.split(' ')[0]}, your glucose is in range ${device_settings.percentWithinRange.toFixed(2)}% of the time 🎉 🥳` : `You're in range ${device_settings.percentWithinRange.toFixed(2)}% of the time, let's work on it!`
    const hypo_risk = device_settings.hypoglycemiaRisk ? (<h4>Your hypoglycemia Risk is {device_settings.hypoglycemiaRisk}</h4>) : ''

    return (
      <div className={`loaded`}>
        <h1 style={{marginTop: '0'}}>{header}</h1>
        <h3>Results based on the past {days_of_readings} days</h3>
        <div className="card-family">
          <div className="card">
            <div className="result">{a1c.toFixed(2)}</div>
            <div className="result_type">Estimated A1C</div>
          </div>

          <div className="card">
            <div className="result">{Math.round(device_settings.mean)} <small>{unit}</small></div>
            <div className="result_type">Average Glucose reading</div>
          </div>
          
          <div className="card">
            <div className="result">{device_settings.min} <small>{unit}</small></div>
            <div className="result_type">Lowest Reading</div>
          </div>
        
          <div className="card">
            <div className="result">{device_settings.max} <small>{unit}</small></div>
            <div className="result_type">Highest Reading</div>
          </div>
        </div>
      </div>
    )
  }

  
  if(readings && reset && device_settings) {
    return (
      <div className="user-data">
        {user_id ? <AverageSugar readings={readings}/>: null }
      </div>
    )
  } else {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    )
  }
}

export default Readings;