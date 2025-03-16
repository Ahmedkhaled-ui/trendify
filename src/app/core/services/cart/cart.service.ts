import { HttpClient } from '@angular/common/http';
import {
  afterNextRender,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numberOfItem: WritableSignal<number> = signal(0);
  constructor(private httpClient: HttpClient) {}
  addCart(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}cart`, { productId });
  }
  updateCart(id: string, count: string): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}cart/${id}`, {
      count,
    });
  }
  getCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}cart`, {
      headers: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YWRkMTI4NGE5MDQwMTY2YTkwOTIzOSIsIm5hbWUiOiJBaG1hZCBLaGFsZWQiLCJyb2xlIjoidXNlciIsImlhdCI6MTc0MDY1ODMzMSwiZXhwIjoxNzQ4NDM0MzMxfQ.eGLZSxrLfnNtoVSWUQ7sd2su2sfOhNbp-5-2olHNwYU',
      },
    });
  }
  deletCartItem(itemid: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart/${itemid}`, {});
  }
  clearCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}cart`);
  }
}
