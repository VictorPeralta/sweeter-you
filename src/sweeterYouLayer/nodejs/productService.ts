import * as db from "./db";

const productTable = new db.Table(process.env.TABLE_NAME as string);

export type Product = {
  Name: string;
  Price: number;
  Description: string;
  ImageURL: string;
};

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
    item,
  };

  await productTable.put(ProductToSave);
};

// export const getOpenOrders = async (): Promise<Order[]> => {
//   const items = await orderTable.query("SK_GSI_PK", "OpenDate", undefined, undefined, "GenericGSI");
//   const openOrders: Order[] = [];
//   if (items) {
//     items.forEach((element) => {
//       openOrders.push({
//         Id: element["PK"] as string,
//         Date: element["GSI_SK"] as string,
//       });
//     });
//   }
//   return openOrders;
// };
