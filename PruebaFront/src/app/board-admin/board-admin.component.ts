import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Product } from '../_helpers/Models';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from '../_services/product.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','quantity'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private productService:ProductService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.llamarProductos()
  }
  llamarProductos(){
    this.productService.getAll().subscribe({
      next:data=>{
        let productos:Product[]=data
        this.dataSource.data=(productos);
        
      }
    })
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openDialog(status:any): void {
    const dialogRef = this.dialog.open(ProductDialog, {
      data: {name: status},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.llamarProductos()
    });
  }
}
@Component({
  selector: 'product-dialog',
  templateUrl: 'product-dialog.html',
  styleUrls:['./board-admin.component.css']
})
export class ProductDialog implements OnInit{
  form:FormGroup=new FormGroup({
    id:new FormControl(''),
    nombre:new FormControl('',Validators.required),
    descripcion:new FormControl('',Validators.required),
    precio:new FormControl(0,Validators.required),
    cantidad:new FormControl(0,Validators.required),
  })
  status: any;
  productos!: Product[];
  constructor(
    public dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService:ProductService,
  ) {
    this.status = data.name
  }
  ngOnInit(): void {
    if(this.status=='edit'){
      this.form.controls["id"].addValidators([Validators.required])
      this.form.updateValueAndValidity()
      this.productService.getAll().subscribe({
        next:data=>{
          let productos:Product[]=data
          this.productos=(productos);
          
        }
      })
    }
  }
  showProduct(id:any){
    console.log(id)
    let info:any = this.productos.find(ele=>ele.id == id.value)
    console.log(this.productos)
    this.form.controls["nombre"].setValue(info?.nombre)
    this.form.controls["descripcion"].setValue(info?.descripcion)
    this.form.controls["precio"].setValue(info?.precio)
    this.form.controls["cantidad"].setValue(info?.cantidad)
  }
  crear(){
    console.log(this.form)
    if(this.form.valid){
      let info = this.form.value
      
    if(this.status=='edit'){
      this.productService.update(info).subscribe({
        next:data=>{
          this.dialogRef.close(data)
        }
      })
    }else{
      this.productService.create(info).subscribe({
        next:data=>{
          this.dialogRef.close(data)
        }
      })
    }
    }else{
      this.form.markAllAsTouched()
    }
  }
}