import { Component } from '@angular/core';
import {NewsApiService} from 'src/app/services/news-api.service'
import {NewsHelper} from 'src/app/helpers/news.helper'


export interface INews {
  date: string,
  mediumBuckets: IMediumCount[],
}

export interface IMediumCount {
  docCount: number,
  key: MediumType,
}

export enum MediumType {
  SOCIAL = 'Social',
  PRINT = 'Print',
  ONLINE = 'Online',
  TV ='TV',
  RADIO = 'Radio',
}

export interface IQueryParam {
  query: string;
  before: number;
  after: number;
  interval: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  public newsResults: INews[] = [];
  public isLoading: boolean = false;
  public showChart: boolean = false;
  
  constructor(private _newApiService: NewsApiService ) {}

  public search(chartConfig: IQueryParam): void {
    this.isLoading = true;
    this.showChart = true;
    this._newApiService.getResults(chartConfig).subscribe((results)=>{
      this.newsResults = NewsHelper.transformESResponseToData(results);
      this.isLoading = false;
    })
  }
}