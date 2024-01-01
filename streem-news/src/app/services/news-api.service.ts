import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";
import { IQueryParam } from "../app.component";

@Injectable({
    providedIn:'root'
  })
export class NewsApiService {
    private _baseUrl = 'http://localhost:3000/news/search_news';

    constructor(private http: HttpClient) {}

    private _buildUrl(baseUrl: string, params: IQueryParam) {
        const queryString = Object.entries(params)
          .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
          .join('&');
      
        return `${baseUrl}?${queryString}`;
      }

    public getResults(params: IQueryParam): Observable<any> {
        const url = this._buildUrl(this._baseUrl, params);
        return this.http.get(url);
    }
}