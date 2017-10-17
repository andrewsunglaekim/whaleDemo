import React, { Component } from 'react';

class Whale extends Component {
  constructor(props){
    super(props)
    console.log(props);
    this.state = {
      whale: props.whale,
      imageUrl: props.imageUrl
    }
  }

  setStyle(){

   return {top: `${this.state.whale.posY}px`}

  }

  render(){
    return(
      <img src={this.props.imageUrl} style={this.setStyle()} className='whale'/>
      // <div style={this.setStyle()} className='whale'>WhaleComponent</div>
    )
  }
}

export default Whale;
