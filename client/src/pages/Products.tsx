import React, { useState, useEffect } from "react";
import { GetProducts } from "../services/productService";
import { Product } from "../../../types/Product";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts]: [Product[], any] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchProducts = await GetProducts();
      setProducts(fetchProducts);
    }
    fetchData();
  }, []);

  return (
    <>
      <Link to="/admin/products/create">New Product</Link>
      <ul>
        {products.map((p) => (
          <li>{p.Name}</li>
        ))}
      </ul>
    </>
  );
}
