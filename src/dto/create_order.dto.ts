export class OrderDto {
    readonly quantity: number;
    readonly totalPrice: number;
    readonly customerId: string;
    readonly productsWithCount: { id: string; count: number }[]; 
}