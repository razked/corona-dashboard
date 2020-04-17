import React, { Component } from 'react';
import './App.scss';
import Israel from './Components/Israel/Israel';
// import World from './Components/World/World';
import Welcome from './Components/Welcome/Welcome';
import Healing from './Components/Healing/Healing';
import Info from './Components/Info/Info';
import TopFive from './Components/TopFive/TopFive';
import Brand from './Components/Brand/Brand';

class App extends Component {
  state = {
  }

 

  render() {
    return (
      <div className="App">
        <Brand />
        <Welcome />
        <Israel />
        <TopFive />
        <Healing />
        <Info />
      </div>
    );
  }

}


export default App;
