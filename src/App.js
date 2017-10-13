import React, { Component } from 'react';
import './App.css';
import WhaleModel from './models/whale';
import Whale from './components/whale';
import Seaweed from './components/seaweed';
import sand from './components/sand.png'

class App extends Component {
  constructor(props){
    super(props)
    let whale = new WhaleModel(100, 10)
    console.log(window);
    this.state = {
      whale
    }
    this.start()
  }

  thrust(evt){
    console.log("thursting");
    let whale = this.state.whale
    whale.initVelocity = 80
    whale.initPosY = whale.posY
    whale.time = 0
    whale.isBottom = false
    if(!this.intervalId){
      this.start()
    }
    this.setState({
      whale: whale
    })

  }

  start(){
    this.intervalId = setInterval(() => {
      let whale = this.state.whale
      whale.incrementTime(0.10, window.innerHeight)
      if(whale.isBottom){
        clearInterval(this.intervalId)
        this.intervalId = null
      }
      this.setState({whale})
    }, 20)
  }

  render() {
    let seaweed = [1,2,3,4,5].map((el) => {
      console.log("happening");
      return <Seaweed isBottom={this.state.whale.isBottom}/>
    })
    return (
      <div onClick={this.thrust.bind(this)} className="App">
        <div>Click for velocity</div>
        {seaweed}
        <Whale
          whale={this.state.whale} />
        <img src={sand}/>
      </div>
    );
  }
}

export default App;
