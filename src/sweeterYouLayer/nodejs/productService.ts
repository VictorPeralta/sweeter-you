import * as db from "./db";
import { Product } from "types/Product";
export { Product } from "types/Product";

const productTable = new db.Table(process.env.TABLE_NAME as string);

/**
 * Adds a newProduct and saves it to the database
 * @param newProduct Product to save to the database
 */

export const createProduct = async (newProduct: Product): Promise<Product> => {
  await saveProductDetails(newProduct);
  return newProduct;
};

const saveProductDetails = async (product: Product) => {
  const { Name: SK_GSI_PK, ...item } = product;

  const ProductToSave: db.IPutItem = {
    PK: "Products",
    SK_GSI_PK,
    ...item,
  };

  await productTable.put(ProductToSave);
};

export const getProducts = async (): Promise<Product[]> => {
  const items = await productTable.query("PK", "Products");
  console.log("Items", items);

  const products: Product[] = [];
  if (items) {
    items.forEach((element) => {
      const { SK_GSI_PK: productName } = element;
      const { Price: price, Description: description, ImageURL: imageURL } = element;
      products.push({
        Name: productName as string,
        Price: price as number,
        Description: description as string,
        ImageURL: imageURL as string,
      });
    });
  }
  return products;
};
