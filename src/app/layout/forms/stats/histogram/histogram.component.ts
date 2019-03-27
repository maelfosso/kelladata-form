import { Component, OnInit, Input, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import * as d3Selection from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Shape from 'd3-shape';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.sass']
})
export class HistogramComponent implements OnInit {

  @Input()
  data:number[];
  @Input()
  xName:string;
  @Input()
  yName:string;

  private margin = {top:20, right:20, bottom:20, left:20}
  private width: number;
  private height: number;
  private radius: number;

  private x:any;
  private y:any;
  private bins:any;
  private svg:any;
  private g:any;

  constructor(
    private el:ElementRef
  ) { }

  ngOnInit() {
    console.log(this.data);
    console.log(this.xName);
    console.log(this.yName);

    this._initSvg();
    this._initAxis();
    this._drawAxis();
    this._drawBars();
  }

  _initSvg() {
    this.svg = d3.select(this.el.nativeElement).select('svg')
        .attr('width', this.el.nativeElement.parentNode.offsetWidth);

    this.width = +this.svg.attr('width') - this.margin.right - this.margin.left;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;

    this.g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
  }

  _initAxis() {
    this.x = d3Scale.scaleLinear()
        .domain(d3Array.extent(this.data)).nice()
        // .domain([d3Array.min(this.data), d3Array.max(this.data)]).nice()
        .range([this.margin.left, this.width - this.margin.right]);

    this.bins = d3.histogram()
        .domain(this.x.domain())
        .thresholds(this.x.ticks(50))
      (this.data);

    this.y = d3Scale.scaleLinear()
        .domain([0, d3.max(this.bins, (d:any) => +d.length)])
        .range([this.height - this.margin.bottom, this.margin.top])
  }

  _drawAxis() {
    this.g.append('g')
        .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
        .call(d3Axis.axisBottom(this.x).tickSizeOuter(0))
        // .call(g => g.append("text")
        // // .append('g')
        // // .append('text')
        // .attr({
        //   'x': this.width - this.margin.right,
        //   'y': -4,
        //   'fill': '#000',
        //   'font-weight': 'bold',
        //   'text-anchor': 'end',
        // })
        // .text(this.xName));
    this.g.append('g')
        .attr('transform', `translate(${this.margin.left}, 0)`)
        .call(d3Axis.axisLeft(this.y))
        // .append('g')
        // .attr({
        //   'x': 4,
        //   'text-anchor': 'start',
        //   'font-weight': 'bold'
        // })
        // .text(this.yName);
  }

  _drawBars() {
    this.g
      .attr("fill", "steelblue").selectAll('.bar')
        .data(this.bins)
        .enter()
        .append('rect')
        .attr("x", (d:any) => this.x(d.x0) + 1)
        .attr("y", d => this.y(d.length))
        .attr("width", (d:any) => Math.max(0, this.x(d.x1) - this.x(d.x0) - 1))
        .attr("height", (d:any) => this.y(0) - this.y(d.length));
  }
}
