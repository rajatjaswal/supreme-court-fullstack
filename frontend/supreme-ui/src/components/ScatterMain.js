import React from 'react';
import ScatterPlot from './ScatterPlot';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

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
        
        const options = [['cases','# of cases judged'],['duration','Duration of term']];
        const infoOptions = [['law_school','Law School'], ['military_service','Military Experience'], ['nominating_party','Party Appointed By']];

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
                    <div className="select-yAxis">
                        <span>Y Axis: </span>
                        <ToggleButtonGroup
                            type='radio'
                            name='yVar'
                            value={this.state.yVar}
                            onChange={(d)=> this.setState({yVar: d})}
                            style={{marginLeft:"10px"}}
                        >
                            {options.map((d) => {
                                return <ToggleButton variant="info" value={d[0]}>{d[1]}</ToggleButton>
                            })}
                        </ToggleButtonGroup>
                    </div>
                    <div className="select-color">
                        <span>Color: </span>
                        <ToggleButtonGroup
                            type='radio'
                            name='color'
                            value={this.state.zVar}
                            onChange={(d)=> this.setState({zVar: d})}
                            style={{marginLeft:"10px"}}
                        >
                            {infoOptions.map((d) => {
                                return <ToggleButton variant="light" value={d[0]}>{d[1]}</ToggleButton>
                            })}
                        </ToggleButtonGroup>
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