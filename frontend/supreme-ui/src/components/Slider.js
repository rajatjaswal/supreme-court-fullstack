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

        />
    )
  }

  onUpdate = (date) => {
    const newDate = [...date];
    newDate[0] = new Date(parseInt(newDate[0])).toLocaleDateString();
    newDate[1] = new Date(parseInt(newDate[1])).toLocaleDateString();
    this.props.onChange(newDate);
  }
}