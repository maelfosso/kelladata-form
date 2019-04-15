import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  save(data:any) {
    return this.http.post(`${environment.apiUrl}/data`, data);
  }

  update(data:any) {
    return this.http.put(`${environment.apiUrl}/data`, data);
  }

  fetchAll() {
    return this.http.get(`${environment.apiUrl}/data`);
  }

  fetch(id:any) {
    return this.http.get(`${environment.apiUrl}/data/${id}`);
  }

  stats(survey:string = 'default') {
    return this.http.get(`${environment.apiUrl}/data/${survey}/stats`);
  }
}
