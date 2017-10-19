import React, {Component} from 'react';
import Input from '../components/input'

class PhysicsControls extends Component {
  constructor(props){
    super(props)
    console.log(props);
    let physicsProperties = {
      acceleration: props.physicsProperties.acceleration,
      velocity: props.physicsProperties.velocity,
      timeBtwRequests: props.physicsProperties.timeBtwRequests
    }
    this.state = physicsProperties
    console.log(this.state);
  }

  handleFieldChange(property, value){
    let physicsProperties = this.state
    physicsProperties[property] = parseFloat(value)
    this.setState(physicsProperties)
  }

  submit(){
    this.props.onSubmit(this.state)
  }

  render(){
    return (
      <div className="controller">
        <header>Physics Controls</header>
        <Input value={this.state.acceleration}
               onChange={this.handleFieldChange.bind(this)}
               property={"acceleration"}
               attribute={"Gravity:"} />
        <Input value={this.state.velocity}
               onChange={this.handleFieldChange.bind(this)}
               property={"velocity"}
               attribute={"Thrust:"} />
        <Input value={this.state.timeBtwRequests}
               onChange={this.handleFieldChange.bind(this)}
               property={"timeBtwRequests"}
               attribute={"Interval:"} />
        <div className='button' onClick={this.submit.bind(this)}>Set Values</div>
      </div>
    )
  }
}

export default PhysicsControls;
