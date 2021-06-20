import React, {useState} from 'react';


const Select = ( { onChange } ) => {
  const days = [1,3,7,10, 14, 21, 30, 45, 60, 90];
  return (
    <div>
      
      <span>Select range of data  </span>
      <select onChange={onChange}>
        {days.map((day, index) => (
          <option value={day} key={index}>{day}</option>
        ))}
      </select>
    </div>
  )
}

export default Select;