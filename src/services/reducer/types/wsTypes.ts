export interface IOrder {
    ingredients: string[]; 
    _id: string;  
    status: string; 
    number: number; 
    name: string
    createdAt: string;
    updatedAt: string;
}

export interface IApiResponse {
    success: boolean; 
    orders: IOrder[] | undefined; 
    message: string
    total: number;   
    totalToday: number;    
}

