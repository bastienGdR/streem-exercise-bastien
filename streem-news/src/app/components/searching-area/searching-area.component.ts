import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IQueryParam } from 'src/app/app.component';



@Component({
  selector: 'app-searching-area',
  templateUrl: './searching-area.component.html',
  styleUrls: ['./searching-area.component.css']
})
export class SearchingAreaComponent implements OnInit {
  @Input() public isLoading: boolean = false;
  @Output() public chartConfig: EventEmitter<IQueryParam> = new EventEmitter();

  public form: UntypedFormGroup = new UntypedFormGroup({});
  private _tempParam = {
    query: 'scott morrison',
    after: '2019-08-01', 
    before: '2019-09-01',
    interval:1
  }

  ngOnInit(): void {
      this._initForm();
  }

  private _initForm(): void{
    this.form = new UntypedFormGroup(
      {
        query: new UntypedFormControl(),
        after: new UntypedFormControl(this._tempParam.after),
        before: new UntypedFormControl(this._tempParam.before),
        interval: new UntypedFormControl(this._tempParam.interval),
      }
    )
  }

  public generateChart(): void {
    console.log(this.form.value)
    const { query, after, before, interval } = this.form.value
    this.chartConfig.emit({
      query,
      after: this._convertDate(after),
      before: this._convertDate(before),
      interval: interval.toString() + 'd'
    })
  }

  private _convertDate(dateStr:string): number {
    const date = new Date(dateStr);
    return date.valueOf()
  }

}
