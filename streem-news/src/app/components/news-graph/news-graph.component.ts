import { AfterViewInit, Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { INews } from 'src/app/app.component';
import { Chart } from 'chart.js/auto';
import {NewsHelper} from 'src/app/helpers/news.helper'

@Component({
  selector: 'app-news-graph',
  templateUrl: './news-graph.component.html',
  styleUrls: ['./news-graph.component.css']
})

export class NewsGraphComponent implements OnChanges, AfterViewInit {
  @Input() public news: INews[] = [];
  @ViewChild('stackedBarChart') chartCanvas!: ElementRef;

  public chartInitialized: boolean = false;

  ngAfterViewInit(): void {
    this._initializeStackedBarChart();
    this.chartInitialized=true;
  }
  
  ngOnChanges() {
    if(this.chartInitialized){
      const existingChart = Chart.getChart( this.chartCanvas.nativeElement)
      existingChart?.destroy()
      this._initializeStackedBarChart();
    }
  }

  private _initializeStackedBarChart() {
        const chartData = NewsHelper.getChartConfig(this.news)
        new Chart(
          this.chartCanvas.nativeElement,
          {
            type: 'bar',
            data: chartData,
            options: {
              plugins: {
                title: {
                  display: true,
                  text: 'Count of news items by date and by medium'
                },
              },
              responsive: true,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true
                }
              }
            }
          }
        );
    }
  }
  
  

