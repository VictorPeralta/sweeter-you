import * as db from "./db";
import { Product } from "types/Product";
import { nanoid } from "nanoid";
export { Product } from "types/Product";

const productTable = new db.Table(process.env.TABLE_NAME as string);

/**
 * Adds a newProduct and saves it to the database
 * @param newProduct Product to save to the database
 */

export const createProduct = async (newProduct: Product): Promise<Product> => {
  if (!newProduct.Id) {
    newProduct.Id = nanoid();
  }
  await saveProductDetails(newProduct);

  return newProduct;
};

export const editProduct = async (product: Product): Promise<Product> => {
  await saveProductDetails(product);
  return product;
};

const saveProductDetails = async (product: Product) => {
  const { Id: SK_GSI_PK, ...item } = product;

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
      const { SK_GSI_PK: productId } = element;
      const { Price: price, Description: description, ImageURL: imageURL, Name: productName } = element;
      products.push({
        Id: productId as string,
        Name: productName as string,
        Price: price as number,
        Description: description as string,
        ImageURL: imageURL as string,
      });
    });
  }
  return products;
};

export const getSingleProduct = async (productId: string): Promise<Product> => {
  const item = await productTable.get({ PK: "Products" }, { SK_GSI_PK: productId });
  if (!item) throw new Error(`Product ${productId} not found`);
  const product: Product = {
    Id: productId,
    Description: item.Description as string,
    Price: item.Price as number,
    ImageURL: item.ImageURL as string,
    Name: item.Name as string,
  };
  return product;
};
