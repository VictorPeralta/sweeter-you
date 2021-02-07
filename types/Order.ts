export type Order = {
  Id: string;
  CustomerName?: string;
  CustomerPhone?: string;
  Date: string;
  Time?: string;
  Location?: string;
  Status?: "Pending" | "Ready" | "Closed";
  IsOpen?: string;
  OrderItems?: [
    {
      Product: string;
      Quantity: number;
    }
  ];
};
