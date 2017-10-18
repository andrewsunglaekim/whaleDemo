import React, {Component} from 'react';

class Input extends Component {
  constructor(props){
    super()
    console.log(props);
    this.state = {
      value: props.value
    }
  }
  handleChange(evt){
    this.setState({
      value: evt.target.value
    }, () => {
      this.props.onChange(this.props.property, this.state.value)
    })
    // console.log(evt.target.value);
  }

  render(){
    return (
      <input onChange={this.handleChange.bind(this)} value={this.state.value || ''}/>
    )
  }
}

export default Input;