import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { ProductService } from '../_services/product.service';
import { WishlistService } from '../_services/wishlist.service';
import { Product, Wishlist } from '../_helpers/Models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content!: Wishlist[];
  productos!: Product[];

  constructor(private productService:ProductService,public wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.llamarProductos()
    this.wishes()
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
  exist(id:number){
    return this.content.find(ele=>ele.productId == id)!=null?true:false
  }
  clicked(id:number){
    let exist = this.content.find(ele=>ele.productId == id)
    console.log(exist)
    let data=JSON.parse(sessionStorage.getItem("auth-user")!).id
    let wish:Wishlist = {
      id:exist?exist?.id!:0,
      productId:  id,
      userId:data,
      status:''
    } 
    if(!exist){
      this.wishlistService.add(data,wish).subscribe({
        next:data=>{
          this.wishes()
        }
      })
    }else{
      this.wishlistService.remove(data,wish).subscribe({
        next:data=>{
          this.wishes()
        }
      })
    }
  }
}
