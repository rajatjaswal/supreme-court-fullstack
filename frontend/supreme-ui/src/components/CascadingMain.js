import React from 'react';
import CascadingPlot from './CascadingPlot';

export class CascadingMain extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            xVar: 'startDate',
            yVar: 'case',
            startDate: '8/2/1791',
            endDate: '8/2/1800'
        };
    }

    componentDidMount() {
        // Load data when the component mounts
        fetch(`http://localhost:3500/cases/date?startDate=${this.state.startDate}&endDate=${this.state.endDate}`).then(res => res.json()).then((res) => {
            this.setState({data: res})
        })
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
            </div>
        )
    }
}