import React, { Component } from 'react';
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
      acceleration: -33,
      velocity: 80,
      timeBetween: 2,
    }
    this.state = {
      whale,
      imageUrl,
      physicsProperties
    }
    this.start()
  }

  thrust(evt){
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
      <div onClick={this.thrust.bind(this)} className="App">
        <PhysicsControls physicsProperties={this.state.physicsProperties}
                         onSubmit={this.setPhysicsProperties.bind(this)}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={30}
              offSet={-52}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={105}
              offSet={-14}/>
        <Wave isBottom={this.state.whale.isBottom}
              top={185}
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
