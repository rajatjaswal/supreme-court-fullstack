import React, {Component} from 'react';
import * as d3 from "d3";
import d3Tip from "d3-tip";

class ScatterPlot extends Component {
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
      
    updatePoints() {
        // Define hovers 
        // Add tip
        let tip = d3Tip().attr('class', 'd3-tip').html(function (d) {
            return `<div class="tip-body" style="font-size: 10px; background-color: black; color: white; padding: 10px; border-radius: 10px">
                <p style="margin: 0; margin-bottom: 5px">${d.label}</p>
                <p style="margin: 0">Cases - ${d.y}</p>
            </div>`;
        });

        // Select all circles and bind data
        const color = d3.scaleOrdinal()
        .domain(this.props.allOptions)
        .range(d3.schemeDark2);

        let circles = d3.select(this.chartArea).selectAll('circle').data(this.props.data);

        // Use the .enter() method to get your entering elements, and assign their positions
        circles.enter().append('circle')
            .merge(circles)
            .attr('r', (d) => this.props.radius)
            .attr('fill', (d) => color(d.z))
            .attr('label', (d) => d.label)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .style('fill-opacity', 0.6)
            .transition().duration(700)
            .attr('cx', (d) => this.xScale(d.x))
            .attr('cy', (d) => this.yScale(d.y))
            .style('stroke', "black")
            .style('stroke-width', (d) => d.selected === true ? "3px" : "0px")


        // Use the .exit() and .remove() methods to remove elements that are no longer in the data
        circles.exit().transition()
        .attr("r", 0).remove();      
        d3.select(this.chartArea).call(tip);
    }

    updateAxes() {
        let xAxisFunction = d3.axisBottom(this.xScale)
            .tickFormat(d3.timeFormat("%b-%Y"))
            .ticks(4)
            .tickPadding(2);

        let yAxisFunction = d3.axisLeft()
            .scale(this.yScale)
            .ticks(5, 's');

        d3.select(this.xAxis)
            .call(xAxisFunction);

        d3.select(this.yAxis)
            .call(yAxisFunction);
    }

    updateLabels() {
        const dots = d3.select(this.labelArea).selectAll('circle').data(this.props.allOptions);
        const labels = d3.select(this.labelArea).selectAll('text').data(this.props.allOptions);

        const color = d3.scaleOrdinal()
        .domain(this.props.allOptions)
        .range(d3.schemeDark2);
        const size = 10;

        dots
            .enter()
            .append("circle")
            .merge(dots)
            .attr("cx", 0)
            .attr("cy", function(d,i){ return i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .attr("r", 5)
            .style("fill", (d) => color(d))

        labels
            .enter()
            .append("text")
            .merge(labels)
            .attr("x", size*1.2)
            .attr("y", function(d,i){ return i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", (d) => color(d))
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle")
        
        dots.exit().remove();
        labels.exit().remove();

    }

    update() {
        this.updateScales();
        this.updateAxes();
        this.updatePoints();
        this.updateLabels();
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
ScatterPlot.defaultProps = {
    data: [{ x: 10, y: 20 }, { x: 15, y: 35 }],
    width: 800,
    height: 500,
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
    zTitle: "Z Title",
    labelsWidth: 300,
    options: []
};
      
export default ScatterPlot;