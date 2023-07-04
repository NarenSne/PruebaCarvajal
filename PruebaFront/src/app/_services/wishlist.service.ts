import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Wishlist } from '../_helpers/Models';

const API_URL = 'http://localhost:8080/api/wishlist';
@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http: HttpClient) { }
  getWishList(id:number): Observable<any> {
    return this.http.get(API_URL+"?user="+id,{responseType:"json"});
  }
  add(id:number,wishlist:Wishlist): Observable<any> {
    return this.http.post(API_URL+"/add?user="+id,wishlist);
  }
  remove(id:number,wishlist:Wishlist): Observable<any> {
    return this.http.post(API_URL+"/remove?user="+id,wishlist);
  }
  deleted(id:number): Observable<any> {
    return this.http.get(API_URL+"/Deleted?user="+id);
  }
}
