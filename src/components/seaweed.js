import React, {Component} from 'react';
import seaweedPng from './seaweed1.png';

class Seaweed extends Component{
  constructor(props){
    super(props)
    console.log(props);
    let top = parseInt(Math.random() * 300 +200)
    let left = parseInt(Math.random() * 100)
    let location = {
      top,
      left
    }
    let styles = {
      top: `${location.top}px`,
      left: `${location.left}%`
    }
    this.state = {
      isBottom: props.isBottom,
      location,
      styles
    }
    this.start()
  }

  start(){
    this.intervalId = setInterval(() => {
      console.log("running...")
      if(this.props.isBottom){
        console.log("at bottom ...");
      } else {
        this.moveWeed()
      }
    }, 20)
  }

  moveWeed(){
    let location = {
      top: this.state.location.top,
      left: this.state.location.left + 0.3
    }
    if(location.left > 105){
      location.top = parseInt(Math.random() * 300 + 200)
      location.left = Math.random() * 10 - 15
    }
    let styles = {
      top: `${location.top}px`,
      left: `${location.left}%`
    }
    this.setState({location, styles})
  }

  render(){

    return (
      <img className='seaweed' src={seaweedPng} style={this.state.styles} />
    )
  }
}

export default Seaweed
