import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';
import * as _ from "lodash";

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { DataService } from '../../../_services/data.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass']
})
export class StatsComponent implements OnInit {

  survey:string;
  stats:any[] = [];
  groupedStats:any;

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartPlugins = [pluginDataLabels];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLegend = true;

  constructor(
    private route:ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.survey = this.route.snapshot.params['survey'] || 'default';
    this._loadStats();
  }

  _loadStats() {
    this.dataService.stats(this.survey).pipe(first()).subscribe(
      (result:any) => {
        console.log(result);

        var grouped = _.mapValues(_.groupBy(result, 'group'),
                          clist => clist.map(res => _.omit(res, 'group')));
        console.log(grouped)
        this.groupedStats = grouped;
        this.stats = result;
      }
    )
  }

}
