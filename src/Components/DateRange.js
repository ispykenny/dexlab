import React from 'react';


const DateRange = ({getSomeData, entryDate}) => {
  return (
    <div>
      <button onClick={() => getSomeData(1)}>1 days</button>
      <button onClick={() => getSomeData(2)}>2 days</button>
      <button onClick={() => getSomeData(3)}>3 days</button>
      <button onClick={() => getSomeData(4)}>4 days</button>
      <button onClick={() => getSomeData(5)}>5 days</button>
      <button onClick={() => getSomeData(6)}>6 days</button>
      <button onClick={() => getSomeData(7)}>7 days</button>
      <button onClick={() => getSomeData(entryDate)}>Refresh</button>
    </div>
  )
}

export default DateRange;