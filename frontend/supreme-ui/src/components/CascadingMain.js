import React from 'react';
import CascadingPlot from './CascadingPlot';
import { Slider } from './Slider';

export class CascadingMain extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            xVar: 'startDate',
            yVar: 'case',
            startDate: new Date('8/2/1791').getTime(),
            endDate: new Date('8/2/1830').getTime()
        };
    }

    componentWillUpdate(prevProps, prevState) {
        if(this.state.startDate !== prevState.startDate || this.state.endDate !== prevState.endDate ){
            const startDate = new Date(parseInt(this.state.startDate)).toISOString();
            const endDate = new Date(parseInt(this.state.endDate)).toISOString();
            // Load data when the component mounts
            fetch(`http://localhost:3500/cases/date?startDate=${startDate}&endDate=${endDate}`).then(res => res.json()).then((res) => {
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

                {/* Render scatter plot */}
                <CascadingPlot
                    xTitle={this.state.xVar}
                    yTitle={this.state.yVar}
                    data={allData}
                    allOptions = {allOptions}
                    />
                <Slider 
                    minDate="01/01/1971" 
                    maxDate="12/01/2010" 
                    start={this.state.startDate} 
                    end={this.state.endDate} 
                    onChange={(date)=> this.setState({startDate: date[0], endDate: date[1]})}
                />
            </div>
        )
    }
}