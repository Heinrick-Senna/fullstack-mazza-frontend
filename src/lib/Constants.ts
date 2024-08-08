export const Backend_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export interface IOrder {
  id: string
  clientName: string
  initialPoint: string
  endPoint: string
  date: string
}

export interface IListOrderResponse {
  totalOrders: number
  currentPage: number
  orders: IOrder[]
  totalPages: number
}


export interface OrderInputs {
  clientName: string;
  initialPoint: string;
  endPoint: string;
  date: string;
}