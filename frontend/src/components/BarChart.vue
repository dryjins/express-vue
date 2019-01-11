<template>
  <div class="col-md-10 px-1">
    <div class="card mh-100 h-100">
      <svg id="bar-chart" width="100%" height="100%"></svg>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';

export default {
  name: 'BarChart',
  data() {
    return {
      barChart: undefined,
    };
  },
  methods: {
    createBarChart() {
      let width;
      let height;
      const xScale = d3.scaleBand();
      const yScale = d3.scaleLinear();
      let x;
      let y;
      const margin = { top: 15, bottom: 20, left: 30, right: 20 };
      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      function my(selection) {
        if (!x) throw new Error('Bar Chart x column must be defined.');
        if (!y) throw new Error('Bar Chart y column must be defined.');
        if (!width) throw new Error('Bar Chart width must be defined.');
        if (!height) throw new Error('Bar Chart height must be defined.');

        selection.each(function (data) {
          const svg = d3.select(this)
            .attr('width', width)
            .attr('height', height);

          let g = svg.selectAll('g')
            .data([1]);
          g = g.enter().append('g')
            .merge(g)
            .attr('transform',
              `translate(${margin.left},${margin.top})`);

          const innerWidth = width - margin.left - margin.right;
          const innerHeight = height - margin.top - margin.bottom;

          xScale
            .domain(data.map(d => d[x]))
            .range([0, innerWidth]);

          yScale
            .domain([0, d3.max(data, d => d[y])])
            .range([innerHeight, 0]);

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

          const rects = g.selectAll('rect')
            .data(data);
          rects.exit().remove();
          rects.enter().append('rect')
            .merge(rects)
            .attr('x', d => xScale(d[x]))
            .attr('y', d => yScale(d[y]))
            .attr('width', xScale.bandwidth())
            .attr('height', d => innerHeight - yScale(d[y]));
        });
      }

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
    init() {
      this.barChart = this.createBarChart()
        .width(960)
        .height(500)
        .x('name')
        .y('value')
        .padding(0.1);
    },
  },
  mounted() {
    this.init();
  },
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  a {
    color: black;
  }
</style>
