import config from "./../config";
import { Product } from "./../../../types/Product";

export async function GetProducts(): Promise<Product[]> {
  const res = await fetch(`${config.baseUrl}/products`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function GetProduct(productId: string): Promise<Product> {
  const res = await fetch(`${config.baseUrl}/products/${productId}`);
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

export async function EditProduct(product: Product) {
  const res = await fetch(`${config.baseUrl}/products/${product.Id}`, {
    method: "PUT",
    body: JSON.stringify(product),
  });
  if (res.status !== 200) throw new Error("Something went wrong");

  const data = await res.json();
  return data;
}

export async function DeleteProduct(productId: string) {
  const res = await fetch(`${config.baseUrl}/products/${productId}`, {
    method: "DELETE",
  });
  if (res.status !== 200) throw new Error("Something went wrong");
  return true;
}
