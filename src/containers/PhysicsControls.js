import React, {Component} from 'react';
import Input from '../components/input'

class PhysicsControls extends Component {
  constructor(props){
    super(props)
    console.log(props);
    let physicsProperties = {
      acceleration: props.physicsProperties.acceleration,
      velocity: props.physicsProperties.velocity,
      timeBetween: props.physicsProperties.timeBetween
    }
    this.state = physicsProperties
  }

  handleFieldChange(property, value){
    let physicsProperties = this.state
    physicsProperties[property] = parseFloat(value)
    this.setState(physicsProperties)
  }

  submit(){
    console.log('submitting');
    this.props.onSubmit(this.state)
  }

  render(){
    return (
      <div className="controller">
        <Input value={this.state.acceleration}
               onChange={this.handleFieldChange.bind(this)}
               property={"acceleration"} />
        <Input value={this.state.velocity}
               onChange={this.handleFieldChange.bind(this)}
               property={"velocity"} />
        <Input value={this.state.timeBetween}
               onChange={this.handleFieldChange.bind(this)}
               property={"timeBtwRequests"} />
        <div onClick={this.submit.bind(this)}>Set Values</div>
      </div>
    )
  }
}

export default PhysicsControls;
