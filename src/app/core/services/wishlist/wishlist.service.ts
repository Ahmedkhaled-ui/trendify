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
export class WishlistService {
  liked: WritableSignal<number> = signal(0);

  constructor(private httpClient: HttpClient) {}
  addWihlist(productId: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}wishlist`, {
      productId,
    });
  }
  removeWihlist(productId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}wishlist/${productId} `
    );
  }
  getWihlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}wishlist`);
  }
}
