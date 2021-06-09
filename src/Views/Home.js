import React from 'react';
import Login from '../Components/marketing/Login';
import background_image from '../images/new-bg.jpg'
const Home = ({setUserId}) => {
  return (
    <div className="hero-wrapper">
      <div className="left-bg" style={{backgroundImage: `url(${background_image})`}}></div>
      <div className="hero">
        <div className="hero__column">
          <div className="hero__inner">
          </div>
        </div>
        <div className="hero__column large">
          <div className="hero__inner lo">
            <div className="item-one"></div>
            <Login setUserId={setUserId}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;