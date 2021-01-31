import React from 'react';

const AddedInfo = ({dataHasLoaded, additionalInfo}) => {

  const ShowResults = () => {

    if(dataHasLoaded) {
      console.log({additionalInfo})
      return (
        <div>
          <h1>Average Reading {additionalInfo.data.mean}</h1>
          <h1>Lowest Reading {additionalInfo.data.min}</h1>
          <h1>Highest Reading {additionalInfo.data.max}</h1>
          <h1>Percentage in range {additionalInfo.data.percentWithinRange}%</h1>
          <h1>Percentage below range {additionalInfo.data.percentBelowRange}%</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Average Reading Loading...</h1>
          <h1>Lowest Reading Loading...</h1>
          <h1>Highest Reading Loading...</h1>
          <h1>Percentage in range Loading...</h1>
          <h1>Percentage below range Loading...</h1>
        </div>
      )
    }
  }
  return (
    <div>
      <ShowResults/>
    </div>
  )
}

export default AddedInfo