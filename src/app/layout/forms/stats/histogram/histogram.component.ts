import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.sass']
})
export class HistogramComponent implements OnInit {

  @Input()
  data:any;
  @Input()
  xName:string;
  @Input()
  yName:string;

  private margin = {top:20, right:20, bottom:30, left:40}
  private width: number;
  private height: number;
  private radius: number;

  private x:any;
  private y:any;
  private bins:any;
  private svg:any;
  private g:any;

  constructor() { }

  ngOnInit() {
    this._initSvg();
    this._initAxis();
    this._drawAxis();
    this._drawBars();
  }

  _initSvg() {
    this.svg = d3.select('svg');

    this.width = +this.svg.attr('width') - this.margin.right - this.margin.left;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;

    this.g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  _initAxis() {
    this.x = d3Scale.scaleLinear()
        .domain(d3.extend(this.data)).nice()
        .range([this.margin.left, this.width - this.margin.right]);

    this.bins = d3Shape.histogram()
        .domain(this.x.domain())
        .thresholds(this.x.ticks(40))
      (data);

    this.y = d3Scale.scaleLinear()
        .domain([0, d3.max(this.bins, (d:any) => d.length)])
        .range([this.height - this.margin.bottom, this.margin.top])
  }

  _drawAxis() {
    this.g.append('g')
        .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
        .call(d3Axis.axisBottom(this.x).tickSizeOuter(0))
        .append('g')
        .append('text')
        .attr({
          'x': this.width - this.margin.right,
          'y': -4,
          'fill': '#000',
          'font-weight': 'bold',
          'text-anchor': 'end',
        })
        .text(this.xName);
    this.g.append('g')
        .attr('transform', `translate(${this.margin.left}, 0)`)
        .call(d3Axis.axisLeft(this.y))
        .append('g')
        .attr({
          'x': 4,
          'text-anchor': 'start',
          'font-weight': 'bold'
        })
        .text(this.yName);
  }

  _drawBars() {
    this.g.selectAll('.bar')
        .data(this.bins)
        .join('rect')
        .attr({
          'x': d => this.x(d.x0) + 1,
          'y': d => this.y(d.length),
          'width': d => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1),
          'height': d => this.y(0) - this.y(d.length)
        });
  }
}
