import { Component, OnInit, ViewChild } from '@angular/core';
import { Product, Wishlist } from '../_helpers/Models';
import { ProductService } from '../_services/product.service';
import { WishlistService } from '../_services/wishlist.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  content!: Wishlist[];
  productos!: Product[];
  historial: any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private productService:ProductService,public wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.llamarProductos()
    this.wishes()
    this.deleted()
  }
  deleted() {
    let data=JSON.parse(sessionStorage.getItem("auth-user")!).id
    this.wishlistService.deleted(data).subscribe({
      next: data => {
        this.dataSource.data = data;
        
      },
      error: err => {
      }
    });
  }
  wishes() {
    let data=JSON.parse(sessionStorage.getItem("auth-user")!).id
    this.wishlistService.getWishList(data).subscribe({
      next: data => {
        this.content = data;
        console.log(this.content)
      },
      error: err => {
        this.content = JSON.parse(err.error).message;
      }
    });
  }
  llamarProductos(){
    this.productService.getAll().subscribe({
      next:data=>{
        this.productos=data
        
      }
    })
  }
  obtenerNombre(id:number){
    return this.productos.find(ele=>ele.id==id)
  }
  eliminar(ele:any){
    let wish:any = {
      id:ele.id,
      productId:  ele.productId,
      userId:ele.userId,
      status:''
    } 
    this.wishlistService.remove(ele.userId,wish).subscribe({
      next:data=>{
        this.wishes()
        this.deleted()
      }
    })
  }
}
