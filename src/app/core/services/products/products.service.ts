import { HttpClient } from '@angular/common/http';
import { Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getAllProduct(categoryId?: string): Observable<any> {
    let url = categoryId
      ? `${environment.baseUrl}products?category[in]=${categoryId}`
      : `${environment.baseUrl}products`;
    return this.httpClient.get(url);
  }
  getSpecProduct(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}products/${id}`);
  }
}
