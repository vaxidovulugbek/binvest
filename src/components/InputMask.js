import React from 'react';
import InputMask from 'react-input-mask';
 
class Input extends React.Component {
  state = {
    value: ''
  }
 
  onChange = (event) => {
    this.setState({
      value: event.target.value
    });
  }
 
  beforeMaskedValueChange = (newState, oldState, userInput) => {
    var { value } = newState;
    var selection = newState.selection;
    var cursorPosition = selection ? selection.start : null;
 
    // keep minus if entered by user
    if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
      if (cursorPosition === value.length) {
        cursorPosition--;
        selection = { start: cursorPosition, end: cursorPosition };
      }
      value = value.slice(0, -1);
    }
 
    return {
      value,
      selection
    };
  }
 
  render() {
    return <InputMask mask="+998(__)___-____" maskChar={null} value={this.state.value} onChange={this.onChange} beforeMaskedValueChange={this.beforeMaskedValueChange} />;
  }
}

export default Input