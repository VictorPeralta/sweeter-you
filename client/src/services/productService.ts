import config from "./../config";
import { Product } from "./../../../types/Product";

export async function GetProducts(): Promise<Product[]> {
  const res = await fetch(`${config.baseUrl}/products`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function CreateProduct(newProduct: Product): Promise<Product> {
  const res = await fetch(`${config.baseUrl}/products`, {
    method: "POST",
    body: JSON.stringify(newProduct),
  });
  const data = await res.json();
  console.log(data);

  return data;
}
