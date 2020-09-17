import React, { Component } from 'react';
import { render } from 'react-dom';
import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';
import Line from './line/line';
import XYAxis from './axis/xy_axis';

export class Graph extends Component {
  constructor(props) {
    super(props);

    /* const graphData =  [
        { time: 'Jan', status: 30 },
        { time: 'Feb', status: 10 },
        { time: 'Mar', status: 50 },
        { time: 'Apr', status: 20 },
        { time: 'May', status: 80 },
        { time: 'Jun', status: 30 },
        { time: 'July', status: 0 },
        { time: 'Aug', status: 20 },
        { time: 'Sep', status: 100 },
        { time: 'Oct', status: 55 },
        { time: 'Nov', status: 60 },
        { time: 'Dec', status: 80 },
      ]     */
  }

  // randomData = (e) => {
  //   e.preventDefault();
  //   this.setState((prevState) => {
  //     const data = prevState.data.map(d => ({
  //       name: d.name,
  //       value: Math.floor((Math.random() * 100) + 1)
  //     }))
  //     return {
  //       data
  //     }
  //   })
  // }
  
  render() {
    const { graphData } = this.props;
    /*const graphData = [
      { time: "Jan", status: 30 },
      { time: "Feb", status: 10 },
      { time: "Mar", status: 50 },
      { time: "Apr", status: 20 },
      { time: "May", status: 80 },
      { time: "Jun", status: 30 },
      { time: "July", status: 0 },
      { time: "Aug", status: 20 },
      { time: "Sep", status: 100 },
      { time: "Oct", status: 55 },
      { time: "Nov", status: 60 },
      { time: "Dec", status: 80 },
    ];*/
    const parentWidth = 500;

    const margins = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 200 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(graphData.map((d) => d.time))
      .rangeRound([0, width]).padding(0.1);

    const yScale = scaleLinear()
      .domain(extent(graphData, (d) => d.status))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x((d) => xScale(d.time))
      .y((d) => yScale(d.status))
      .curve(curveMonotoneX);

    return (
      <div className="graph">
        {/* <button onClick={this.randomData}>Randomize data</button> */}
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line
              graphData={graphData}
              xScale={xScale}
              yScale={yScale}
              lineGenerator={lineGenerator}
              width={width}
              height={height}
            />
          </g>
        </svg>
      </div>
    );
  }
}

// export default Graph;
