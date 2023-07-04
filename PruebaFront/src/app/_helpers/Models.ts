export interface Wishlist {
  id: number;
  userId: number;
  productId: any;
  status: string;
}
export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  cantidad: number;
}
