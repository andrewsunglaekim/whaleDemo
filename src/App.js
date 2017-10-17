import React, { Component } from 'react';
import './App.css';
import WhaleModel from './models/whale';
import Whale from './components/whale';
import Wave from './components/wave';
import Seaweed from './components/seaweed';
import sand from './components/sand.png'
import dockerSadUp from './images/dockerSadUp.png';
import dockerSadDown from './images/dockerSadDown.png';
import dockerHappyUp from './images/dockerHappyUp.png';
import dockerHappyDown from './images/dockerHappyDown.png';

class App extends Component {
  constructor(props){
    super(props)
    let whale = new WhaleModel(100, 10)
    let imageUrl = dockerHappyUp
    console.log(window);
    this.state = {
      whale,
      imageUrl
    }
    this.start()
  }

  thrust(evt){
    console.log("thursting");
    this.setState({
      imageUrl: dockerHappyDown
    })
    setTimeout(() => {
      this.setState({
        imageUrl: dockerHappyUp
      })
    }, 500)
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
        this.setState({imageUrl: dockerSadUp})
      }
      this.setState({whale})
    }, 20)
  }

  render() {
    let seaweed = [1,2,3,4,5, 6, 7, 8].map((el) => {
      return <Seaweed isBottom={this.state.whale.isBottom}/>
    })
    let sandStyle = {width: `${window.innerWidth}px`}
    return (
      <div onClick={this.thrust.bind(this)} className="App">
        <Wave isBottom={this.state.whale.isBottom}
              top={105}
              offSet={-52}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={185}
              offSet={-14}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={50}
              offSet={-36}/>
        <div>Click for velocity</div>
        {seaweed}
        <Whale
          whale={this.state.whale}
          imageUrl={this.state.imageUrl} />
        <div className='sand-transition' style={sandStyle}></div>
        <div className='sand' style={sandStyle}></div>
      </div>
    );
  }
}

export default App;
