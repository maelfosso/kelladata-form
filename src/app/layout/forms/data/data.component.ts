import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { DataService } from '../../../_services/data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.sass']
})
export class DataComponent implements OnInit {

  data: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this._loadData();
  }

  _loadData() {
    this.dataService.fetchAll().pipe(first()).subscribe(
      (result:any) => {
        this.data = result.data;
        console.log(this.data);
      }
    )
  }

  modifyData(id) {
    console.log("Modify Data ... ", id);
    this.router.navigate(['/form/default/', id])
  }

}
