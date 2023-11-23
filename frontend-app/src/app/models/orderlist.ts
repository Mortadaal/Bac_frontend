export interface Order {
    productName: string | undefined;
    quantity: number;
    totalPrice: number;
  }

  export interface OrderWithTableNumber{
    tableNumber: string | null;
    orderItems: Order[];
    totalPrice: number;
  };