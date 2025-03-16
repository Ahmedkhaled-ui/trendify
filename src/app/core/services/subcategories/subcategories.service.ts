import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllSupCategory(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}subcategories`);
  }
  getSupCategory(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}subcategories/${id}`);
  }
}
