import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { INews } from 'src/app/app.component';
import { Chart } from 'chart.js/auto';



@Component({
  selector: 'app-literal-array',
  templateUrl: './literal-array.component.html',
  styleUrls: ['./literal-array.component.css']
})
export class LiteralArrayComponent implements AfterViewInit {
  @Input() public news: INews[] = [];
  @ViewChild('stackedBarChart') chartCanvas!: ElementRef;
  
  ngAfterViewInit() {
    // Initialize and render the chart after the view is initialized
    this._initializeStackedBarChart(1);
  }

  private _initializeStackedBarChart(nb: number) {
    if(nb===1){
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];
      
      new Chart(
        this.chartCanvas.nativeElement,
        {
          type: 'bar',
          data: {
            labels: data.map(row => row.year),
            datasets: [
              {
                label: 'Acquisitions by year',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    }
  }
  
  
}
