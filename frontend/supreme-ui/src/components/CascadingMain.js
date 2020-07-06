import React from 'react';
import CascadingPlot from './CascadingPlot';
// import { Slider } from './Slider';
import "react-datepicker/dist/react-datepicker.css";
import { DateSection } from './DateSection';

export class CascadingMain extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            xVar: 'startDate',
            yVar: 'case',
            startDate: '8/2/1791',
            endDate: '8/2/1810',
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3500/cases/date?startDate=${this.state.startDate}&endDate=${this.state.endDate}`).then(res => res.json()).then((res) => {
            this.setState({data: res})
        })
    }

    componentWillUpdate(nextProps, nextState) {
        if(this.state.startDate !== nextState.startDate || this.state.endDate !== nextState.endDate ){
            // Load data when the component mounts
            fetch(`http://localhost:3500/cases/date?startDate=${nextState.startDate}&endDate=${nextState.endDate}`).then(res => res.json()).then((res) => {
                this.setState({data: res})
            })
        } 
    }

    render() {
        const allData = this.state.data
            .map((d, idx) => {
            return {
                x: new Date(d[this.state.xVar]),
                e: new Date(d['endDate']),
                y: idx,
                label: d.id
            };
        });

        const allOptions = [{color: 'red', label: 'Case Start Date'}, {color: 'green', label : 'Case End Date'}];

        return (
            <div className="container">
                
                <DateSection startDate={this.state.startDate} endDate={this.state.endDate} onClick = {(data) => this.setState({startDate: data.startDate, endDate: data.endDate})}/>
                {/* Render scatter plot */}
                <CascadingPlot
                    xTitle={this.state.xVar}
                    yTitle={this.state.yVar}
                    data={allData}
                    allOptions = {allOptions}
                    />
            </div>
        )
    }
}