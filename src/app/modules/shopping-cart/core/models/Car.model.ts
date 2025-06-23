export class CarModel {
  id?: string;
  items: CartItem[] = [];
  totalPrice!: number;
  totalItems!: number;
  currency!: string;
  userId?: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class CartItem {
  saleType: string; // perfiles combos o cuenta completa
  name!: string; // NOmbre con el que va a aparecer en la lista
  quantity: number = 0; // numero de items o perfiles o combo etc agregdos
  total: number = 0; // total de lo que suma el valor de los items internos
  category!: string;
  items: SaleItem[] = [];
  constructor(saleType: string, name: string) {
    this.saleType = saleType;
    this.name = name;
    this.quantity = 0;
    this.category = saleType;
  }
}

export class SaleItem {
  productId?: number;
  productName?: string;
  quantity: number = 0;
  price!: number;
  data: { name: string; pin: string }[] = [];
  imageUrl?: string;
  totalPrice: number = 0;
  constructor(productId: number, price: number, imageUrl: string, productName: string){
    this.productId = productId;
    this.price = price;
    this.imageUrl = imageUrl;
    this.productName = productName;
  }
}
