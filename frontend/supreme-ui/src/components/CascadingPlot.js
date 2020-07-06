import React, {Component} from 'react';
import * as d3 from "d3";
import d3Tip from "d3-tip";
import '../styles/styles.css';

class CascadingPlot extends Component {
    constructor(props) {
        super(props);
        // Graph width and height - accounting for margins
        this.drawWidth = this.props.width - this.props.margin.left - this.props.margin.right;
        this.drawHeight = this.props.height - this.props.margin.top - this.props.margin.bottom;

    }
    // When the component mounts, call the `update()` method
    componentDidMount() {
        this.update();
    }
    
    // Whenever the component updates, call the `update()` method
    componentDidUpdate() {
        this.update();
    }

    updateScales() {
        // Calculate limits
        let yMin = d3.min(this.props.data, (d) => +d.y * .9);
        let yMax = d3.max(this.props.data, (d) => +d.y * 1.1);

        // Define scales
        this.xScale = d3.scaleTime()
            .domain(d3.extent(this.props.data, d => d.x))
            .range([0, this.drawWidth])
        this.yScale = d3.scaleLinear().domain([yMax, yMin]).range([0, this.drawHeight])
    }
    
    fetchTooltip(target, d, tip) {
        fetch(`http://localhost:3500/cases/${d.label}`).then(res => res.json()).then(x => {
            const dNew = new Object(d);
            dNew['justices'] = x.justices;
            dNew['dateDecision'] = x.dateDecision;
            dNew['dateArgument'] = x.dateArgument;
            dNew['dateRearg'] = x.dateRearg;
            tip.show(dNew, target);
        });
    }

    updatePoints() {
        // Define hovers 
        // Add tip
        let tip = d3Tip().attr('class', 'd3-tip').html((d) => {
            const id = d.label;
            let justices = '<ul style="padding-left: 15px; margin-top: 0">';
            d.justices.forEach(e => {
                justices+=`<li>${e}</li>`;
            });
            justices+="</ul>";
            return `<div class="tip-body" style="font-size: 10px; background-color: black; color: white; padding: 10px; border-radius: 10px">
                    <p>Case ID - <span>${id}</span></p>
                    <p style="margin: 0; margin-bottom: 5px">Justices</p>
                    ${justices}
                    <p style="margin: 0">Decision Date - <span>${d.dateDecision}</span></p>
                    <p style="margin: 0">Argument Date - <span>${d.dateArgument}</span></p>
                    <p style="margin: 0">ReArgument Date - <span>${d.dateRearg}</span></p>
                 </div>`;
        });

        const redCircles = d3.select(this.chartArea).selectAll('circle').data(this.props.data);
        const greenCircles = d3.select(this.chartArea).selectAll('circle').data(this.props.data);
        const lines = d3.select(this.chartArea).selectAll('line').data(this.props.data);
        // Define the circle variables
        const radius = 2;
        // Add the first circle
        redCircles.enter()
            .append('circle')
            .merge(redCircles)
            .attr('cx', (d) => {
                return this.xScale(d.x)
            })
            .attr('cy', (d) => this.yScale(d.y))
            .attr('r', radius)
            .style('fill', 'red')
            .on('mouseover', (d) => {
                var target = d3.event.target;
                this.fetchTooltip(target, d, tip);
            })
            .on('mouseout', tip.hide);
        
        lines
            .enter()
            .append('line')
            .merge(lines)
            .attr('x1',d => this.xScale(d.x))
            .attr('x2',d => this.xScale(d.e))
            .attr('y1',d => this.yScale(d.y))
            .attr('y2',d => this.yScale(d.y))
            .attr('stroke', 'black')
            .attr('fill', 'black')
            .on('mouseover', (d) => {
                var target = d3.event.target;
                this.fetchTooltip(target, d, tip);
            })
            .on('mouseout', tip.hide);

        // Add the second circle
        greenCircles.enter()
            .append('circle')
            .merge(greenCircles)
            .attr('cx', (d) => {
                return this.xScale(d.e)
            })
            .attr('cy', (d)=> this.yScale(d.y))
            .attr('r', radius)
            .style('fill', 'green')
            .on('mouseover', (d) => {
                var target = d3.event.target;
                this.fetchTooltip(target, d, tip);
            })
            .on('mouseout', tip.hide);
        
        greenCircles.exit().transition()
            .attr("r", 0).remove();
        redCircles.exit().transition()
            .attr("r", 0).remove();
        lines.exit().transition()
            .attr("r", 0).remove();

        d3.select(this.chartArea).call(tip);

    }

    updateAxes() {
        let xAxisFunction = d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat("%b-%Y"))
            .ticks(10)
            .tickPadding(2);

        let yAxisFunction = d3.axisLeft()
            .scale(this.yScale)
            .ticks(5, 's');

        d3.select(this.xAxis)
            .call(xAxisFunction)

        d3.select(this.yAxis)
            .call(yAxisFunction);
    }


    update() {
        this.updateScales();
        this.updateAxes();
        this.updatePoints();
        this.updateLabels();
        // slider_snap(100, 200, this.sliderArea);
    }

    updateLabels() {
        const dots = d3.select(this.labelArea).selectAll('circle').data(this.props.allOptions);
        const labels = d3.select(this.labelArea).selectAll('text').data(this.props.allOptions);
        const size = 20;

        dots
            .enter()
            .append("circle")
            .merge(dots)
            .attr("cx", 0)
            .attr("cy", function(d,i){ return i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", (d) => d.color)

        labels
            .enter()
            .append("text")
            .merge(labels)
            .attr("x", size*1.2)
            .attr("y", function(d,i){ return i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", (d) => d.color)
            .text(d => d.label)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
        

        dots.exit().remove();
        labels.exit().remove();

    }
          
    render() {
        return (
            <div className="chart-wrapper">
                <svg className="chart" width={this.props.width} height={this.props.height}>
                    <text transform={`translate(${this.props.margin.left},15)`}>{this.props.title}</text>
                    <g ref={(node) => { this.chartArea = node; }}
                        transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`} />

                    {/* Axes */}
                    <g ref={(node) => { this.xAxis = node; }}
                        transform={`translate(${this.props.margin.left}, ${this.props.height - this.props.margin.bottom})`}></g>
                    <g ref={(node) => { this.yAxis = node; }}
                        transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}></g>

                    {/* Axis labels */}
                    <text className="axis-label" transform={`translate(${this.props.margin.left + this.drawWidth / 2}, 
                        ${this.props.height - this.props.margin.bottom + 30})`}>{this.props.xTitle}</text>

                    <text className="axis-label" transform={`translate(${this.props.margin.left - 30}, 
                        ${this.drawHeight / 2 + this.props.margin.top}) rotate(-90)`}>{this.props.yTitle}</text>
                </svg>
                <svg className="labels" width={this.props.labelsWidth} height={this.props.height}>
                    <text transform={`translate(${this.props.margin.left},15)`}>{this.props.title}</text>
                    <g ref={(node) => { this.labelArea = node; }}
                        transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`} />
                </svg>
            </div>

        )
    }
}
CascadingPlot.defaultProps = {
    data: [{ x: 10, y: 20 }, { x: 15, y: 35 }],
    width: 850,
    height: 600,
    radius: 5,
    color: "blue",
    margin: {
        left: 50,
        right: 10,
        top: 20,
        bottom: 50
    },
    xTitle: "X Title",
    yTitle: "Y Title",
    labelsWidth: 200,
    options: []
};
      
export default CascadingPlot;