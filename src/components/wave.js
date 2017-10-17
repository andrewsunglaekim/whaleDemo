import React, {Component} from 'react';

class Wave extends Component {
  constructor(props){
    super(props)
    console.log(props);
    let top = props.top
    let left = props.offSet
    let location = {top, left}
    console.log(location);
    let styles = {
      top: `${location.top}px`,
      left: `${location.left}%`
    }
    let baseSpeed = Math.floor(Math.random() * 8)
    let speed = baseSpeed +  Math.floor(Math.random() * 3)
    this.state = {
      location,
      styles,
      speed,
      baseSpeed
    }
    this.start()
  }

  start(){
    this.intervalId = setInterval(() => {
      if(!this.props.isBottom){
        console.log('wave should be moving');
        this.move()
      }
    }, 20)
  }

  move(){
    let location = {
      top: this.state.location.top,
      left: this.state.location.left - 0.5 * this.state.speed
    }

    if(location.left < (-1 * (window.innerWidth / 6 - this.props.offSet))){
      location.left = this.props.offSet
    }

    let styles = {
      top: `${location.top}px`,
      left: `${location.left}px`
    }
    let speed = this.state.baseSpeed +  Math.floor(Math.random() * 3)
    this.setState({location, styles, speed})
  }

  render(){
    let numWaves = 6
    let gradientStyle = {
      width: `${window.innerWidth}px`
    }
    let waves = [1,2,3,4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => {
      let style={
        left: `${num * window.innerWidth / numWaves - window.innerWidth /numWaves}px`,
        width: `${window.innerWidth / numWaves + 20}px`
      }
      return (
        <div className='wavelet' style={style}></div>
      )
    })
    return(
      <div className='wave' style={this.state.styles}>
        {waves}
      </div>
    )
  }
}

export default Wave;
