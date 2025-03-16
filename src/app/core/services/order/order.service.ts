import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}
  cashOrder(
    cartid: string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}orders/${cartid}`, {
      shippingAddress,
    });
  }
  getAllOrder(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}orders/`);
  }
  getUserOrder(userId: any): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}orders/user/${userId}`);
  }
  payment(
    cartid: string,
    shippingAddress: { details: string; phone: string; city: string }
  ): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}orders/checkout-session/${cartid}?url=http://localhost:4200`,
      { shippingAddress }
    );
  }
}
