import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_helpers/Models';

const API_URL = 'http://localhost:8080/api/products/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL+"all");
  }
  create(product:Product): Observable<any> {
    return this.http.post(API_URL+"create",product);
  }
  update(product:Product): Observable<any> {
    return this.http.post(API_URL+"update",product);
  }
}
