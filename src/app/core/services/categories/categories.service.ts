import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}categories`);
  }
  getSapCategory(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}categories/${id} `);
  }
}
