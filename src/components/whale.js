import React, { Component } from 'react';

class Whale extends Component {
  constructor(props){
    super(props)
    console.log(props);
    this.state = {
      whale: props.whale,
    }
  }

  setStyle(){
   return {top: `${this.state.whale.posY}px`}

  }

  render(){
    return(
      <div style={this.setStyle()} className='whale'>WhaleComponent</div>
    )
  }
}

export default Whale;
