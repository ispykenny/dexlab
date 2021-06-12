import React from 'react';


const Select = ({set_days_of_readings}) => {
  const days = []
  for(let i = 0; i <= 90; i++) {
    days.push(i)
  }

  const changeDate = value => {
    set_days_of_readings(value);
  }

  return (
    <select onChange={(event) => changeDate(event.target.value)}>
      {days.map((day, index) => (
        <option value={day} key={index}>{day}</option>
      ))}
    </select>
  )
}

export default Select;