import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import PhysicsControls from './containers/PhysicsControls'
import WhaleModel from './models/whale';
import Whale from './components/whale';
import Wave from './components/wave';
import Seaweed from './components/seaweed';
// import Bubble from './components/bubble';
import dockerSadUp from './images/dockerSadUp.png';
import dockerHappyUp from './images/dockerHappyUp.png';
import dockerHappyDown from './images/dockerHappyDown.png';

class App extends Component {
  constructor(props){
    super(props)
    let whale = new WhaleModel(100, 10)
    let imageUrl = dockerHappyUp
    let physicsProperties = {
      acceleration: -60,
      velocity: 130,
      timeBtwRequests: 2,
    }
    this.state = {
      whale,
      imageUrl,
      physicsProperties
    }
    this.start()
    this.startRequests(this.state.physicsProperties.timeBtwRequests * 1000)
  }

  startRequests(interval){
    this.reqIntervalId = setTimeout(() => {
      // this.ping().then(() => {
        this.thrust()
        this.startRequests(this.state.physicsProperties.timeBtwRequests * 1000)
      // })
    }, interval)
  }

  ping(){
    return axios.get("http://localhost:4000/test")
  }

  thrust(){
    this.setState({
      imageUrl: dockerHappyDown
    })
    setTimeout(() => {
      this.setState({
        imageUrl: dockerHappyUp
      })
    }, 500)
    let whale = this.state.whale
    whale.initVelocity = this.state.physicsProperties.velocity
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

  setPhysicsProperties(physicsProps){
    let whale = this.state.whale
    whale.acceleration = physicsProps.acceleration
    let physicsProperties = this.state.physicsProperties
    physicsProperties.velocity = physicsProps.velocity
    physicsProperties.timeBtwRequests = physicsProps.timeBtwRequests
    this.setState({whale, physicsProperties})
    console.log("seting physics");
    console.log(physicsProps);
  }

  render() {
    let seaweed = [1,2,3,4,5, 6].map((el) => {
      return <Seaweed key={el} isBottom={this.state.whale.isBottom}/>
    })
    let sandTransitionStyle = {
      width: `${window.innerWidth}px`,
      top: `${window.innerHeight - window.innerHeight / 1.5}px`
    }
    let sandStyle = {
      width: `${window.innerWidth}px`,
      top: `${window.innerHeight + 200 - window.innerHeight / 1.5}px`
    }
    return (
      <div className="App">
        <PhysicsControls physicsProperties={this.state.physicsProperties}
                         onSubmit={this.setPhysicsProperties.bind(this)}
                         thrust={this.thrust.bind(this)}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={50}
              offSet={-52}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={115}
              offSet={-14}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={195}
              offSet={-36}/>
        {seaweed}
        <Whale
          whale={this.state.whale}
          imageUrl={this.state.imageUrl} />
        <div className='sand-transition' style={sandTransitionStyle}></div>
        <div className='sand' style={sandStyle}></div>

      </div>
    );
  }
}

export default App;
