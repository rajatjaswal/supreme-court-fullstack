import React from 'react';
import ScatterPlot from './ScatterPlot';

export class ScatterMain extends React.Component {
    constructor(props) {
        super(props);

        // Set initial state
        this.state = {
            data: [],
            xVar: "start_date",
            yVar: "cases",
            zVar: "law_school"
        };
    }
    componentDidMount() {
        // Load data when the component mounts

        fetch("http://localhost:3500/justice").then(res => res.json()).then((res) => {
            this.setState({data: res})
        })
    }
    render() {
        // Get list of x,y,z variables
        
        const options = ['duration','cases'];
        const infoOptions = ['law_school', 'military_service', 'nominating_party'];

        // Store all of the data to be plotted 
        const allJustices = Object.keys(this.state.data);
        const allData = allJustices
            .filter((d) => this.state.data[d].justice_info !== undefined)
            .map((d) => {
            return {
                x: new Date(this.state.data[d].justice_info[this.state.xVar]),
                y: this.state.data[d][this.state.yVar],
                z: this.state.data[d].justice_info[this.state.zVar],
                label: this.state.data[d].justice_info.name
            };
        });

        const allOptions = [...new Set(allData.map(d => d.z))];

        return (
            <div className="container">
                <div className="control-container">

                    {/* Y Variable Select Menu */}
                    <div className="control-wrapper">
                        <label htmlFor="yVar">Y Variable:</label>
                        <select id="yVar" value={this.state.yVar} className="custom-select" onChange={(d) => this.setState({ yVar: d.target.value })}>
                            {options.map((d) => {
                                return <option key={d}>{d}</option>
                            })}
                        </select>
                    </div>

                    {/* Y Variable Select Menu */}
                    <div className="control-wrapper">
                        <label htmlFor="zVar">More Information</label>
                        <select id="zVar" value={this.state.zVar} className="custom-select" onChange={(d) => this.setState({ zVar: d.target.value })}>
                            {infoOptions.map((d) => {
                                return <option key={d}>{d}</option>
                            })}
                        </select>
                    </div>                         
                </div>

                {/* Render scatter plot */}
                <ScatterPlot
                    xTitle={this.state.xVar}
                    yTitle={this.state.yVar}
                    zTitle={this.state.zVar}
                    data={allData}
                    allOptions = {allOptions}
                    />
            </div>
        )
    }
}