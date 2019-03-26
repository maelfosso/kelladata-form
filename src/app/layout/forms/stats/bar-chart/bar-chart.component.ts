import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.sass']
})
export class BarChartComponent implements OnInit {

  private margin = {top:20, right:20, bottom:20, left:40}
  private width: number;
  private height: number;
  private radius: number;

  private x:any;
  private y:any;
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
    this.x = d3Scale.scaleBand()
        .rangeRound([0, this.width])
        .padding(0.1);
    this.y = d3Scale.scaleLinear()
        .rangeRound([this.height, 0]);
    this.x.domain(this.data.map((d:any) => d.label));
    this.y.domain(this.data.map((d:any) => d.value));
  }

  _drawAxis() {
    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', `translate(0, ${this.height})`)
        .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequence')
  }

  _drawBars() {
    this.g.selectAll('.bar')
        .data(this.data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d:any) => this.x(d.label))
        .attr('y', (d:any) => this.y(d.value))
        .attr('width', this.x.bandwidth())
        .attr('height', (d:any) => this.height - this.y(d.value));
  }
}
