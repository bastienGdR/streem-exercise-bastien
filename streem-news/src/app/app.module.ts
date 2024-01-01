import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LiteralArrayComponent } from './components/literal-array/literal-array.component';
import { NewsGraphComponent } from './components/news-graph/news-graph.component';
import { SearchingAreaComponent } from './components/searching-area/searching-area.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LiteralArrayComponent,
    NewsGraphComponent,
    SearchingAreaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpClientModule, FormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
