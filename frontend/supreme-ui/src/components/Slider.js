import React from 'react';
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
 
export class Slider extends React.Component {
  timestamp(date) {
    return new Date(date).getTime();
  }
  render() {
    const min = this.timestamp(this.props.minDate);
    const max = this.timestamp(this.props.maxDate);
    const start = this.timestamp(this.props.start);
    const end = this.timestamp(this.props.end);
    return (
        <Nouislider 
          range={{ min: min, max: max }} 
          start={[start, end]} 
          connect 
          clickablePips 
          pips={{ mode: "count", values: 10 }}
          onUpdate = {(data)=>this.onUpdate(data)}
          // onChange = {()=> this.props.onChange()}

        />
    )
  }

  onUpdate = (date) => {
    this.props.onChange(date);
  }
}