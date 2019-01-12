<template>
  <div class="card-body px-1" id="bar-chart-container">
    <div class="row ml-auto mr-auto p-0">
      <div class="col-md-12 px-1">
        <div class="card mh-100 h-100">
          <svg id="bar-chart" width="100%" height="100%"></svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3';
import EventBus from '../services/EventBus';
import JQuery from 'jquery';

let $ = JQuery;

export default {
  name: 'BarChart',
  data() {
    return {
      barChart: undefined,
      width: 1200,
      height: 600,
      d: []
    };
  },
  methods: {
    createBarChart() {
      // setting variables for chat
      let width;
      let height;
      const xScale = d3.scaleBand();
      const yScale = d3.scaleLinear();
      let x;
      let y;
      const margin = {top: 15, bottom: 20, left: 100, right: 20};
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      // the chart object
      function my(selection) {
        if (!x) throw new Error('Bar Chart x column must be defined.');
        if (!y) throw new Error('Bar Chart y column must be defined.');
        if (!width) throw new Error('Bar Chart width must be defined.');
        if (!height) throw new Error('Bar Chart height must be defined.');

        selection.each(function (data) {
          // setup container
          const svg = d3.select(this)
            .attr('width', width)
            .attr('height', height);

          let g = svg.selectAll('g')

            .data([1]);
          g = g.enter().append('g')
            .merge(g)
            .attr('ref', 'canvas')
            .attr('transform',
              `translate(${margin.left},${margin.top})`);

          const innerWidth = width - margin.left - margin.right;
          const innerHeight = height - margin.top - margin.bottom;

          // setup scale
          xScale
            .domain(data.map(d => d[x]))
            .range([0, innerWidth]);

          yScale
            .domain([0, d3.max(data, d => d[y])])
            .range([innerHeight, 0]);

          // setup axis
          const xAxisG = g.selectAll('.x-axis').data([1]);
          xAxisG.enter().append('g')
            .attr('class', 'x-axis')
            .merge(xAxisG)
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis);

          const yAxisG = g.selectAll('.y-axis').data([1]);
          yAxisG.enter().append('g')
            .attr('class', 'y-axis')
            .merge(yAxisG)
            .call(yAxis);

          // draw rects
          const rects = g.selectAll('rect')
            .data(data);
          rects.exit().remove();
          rects.enter().append('rect')
            .merge(rects)
            .attr('x', d => xScale(d[x]))
            .attr('y', d => yScale(d[y]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d[y]))
            .append('title')
            .text(d => {
              return JSON.stringify(d) // add data as title for mouseover event
            })

          const texts = g.selectAll('.label-rect')
            .data(data);
          texts.exit().remove();
          texts.enter().append('text')
            .attr('class', 'label-rect')
            .merge(texts)
            .attr("class", "label-rect")
            .attr('x', d => xScale(d[x]) + xScale.bandwidth() / 2)
            .attr('y', d => 0)
            .attr("dy", -1)
            .attr('text-anchor', 'middle')
            .text(function (d) {
              let out = JSON.stringify(d.value)
              if (out.length > 5) {
                out = out.slice(0, 5) + '...';
              }
              return out;
            });
        });


      }

      // extra setup functions

      my.x = function (_) {
        const o = arguments.length ? (x = _, my) : x;
        return o;
      };

      my.y = function (_) {
        const o = arguments.length ? (y = _, my) : y;
        return o;
      };

      my.width = function (_) {
        const o = arguments.length ? (width = _, my) : width;
        return o;
      };

      my.height = function (_) {
        const o = arguments.length ? (height = _, my) : height;
        return o;
      };

      my.padding = function (_) {
        const o = arguments.length ? (xScale.padding(_), my) : xScale.padding();
        return o;
      };
      return my;
    },
    updateChart() {
      // this will update data and redraw the chart
      d3.select("#bar-chart")
        .datum(this.d)
        .call(this.barChart);
    },
    initChart() {
      let self = this;
      // wait until bootstrap changes dom
      $(document).ready(function () {
        self.width = self.$el.querySelector('#bar-chart').getBoundingClientRect().width;
        // create barChart
        self.barChart = self.createBarChart()
          .width(self.width)
          .height(self.height)
          .x('index') // use sequence index as a x-axis
          .y('value')
          .padding(0.1);

        // bind data then call barchart
        d3.select("#bar-chart")
          .datum(self.d)
          .call(self.barChart);
      });
    },
  },
  mounted() {
    let self = this;
    // call init func
    this.initChart();

    const clone = x => JSON.parse(JSON.stringify(x));

    // add event handlers
    // listen getGeneratorNext event to update data
    EventBus.$on('getGeneratorNext', function (data) {
      self.d = clone(data).map((d, i) => {
        d.index = i;
        // for isEven data format
        if (d.value.status !== undefined) {
          d.number = d.value.number;
          // instead of true and false use 2 and 1 for the better chart representation.
          d.value = d.value.status ? 2 : 1;
        } else {
          d.value = +d.value;
        }
        return d;
      });
      self.updateChart();
    });

    // listen postGenerator to reset data
    EventBus.$on('postGenerator', function (data) {
      self.d = data;
      self.updateChart();
    });

  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  #bar-chart rect {
    fill: #2c3e50 !important;
  }
</style>
