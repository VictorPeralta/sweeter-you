import React, { useState, ChangeEvent, useEffect } from "react";
import {
  FormLabel,
  Input,
  FormControl,
  Container,
  Button,
  Stack,
  Box,
  Flex,
  Image,
  FormHelperText,
  Center,
  Alert,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Heading,
} from "@chakra-ui/react";
import { UploadPublicFileToS3 } from "../services/s3service";
import { EditProduct as EditProductFunction, GetProduct, DeleteProduct } from "../services/productService";
import { Product } from "../../../types/Product";
import { useRouteMatch, useHistory } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";
import DeleteProductButton from "../components/products/DeleteProductButton";

export default function EditProduct() {
  let match = useRouteMatch<{ productId: string }>();
  let productId = match.params.productId;

  const history = useHistory();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct(productId: string) {
      const product: Product = await GetProduct(productId);
      setPrice(product.Price);
      setDescription(product.Description);
      setName(product.Name);
      setImgUrl(product.ImageURL);
    }
    fetchProduct(productId);
  }, [productId]);

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      try {
        const file = e.target.files[0];
        const fileUrl = await UploadPublicFileToS3(file);
        setImgUrl(fileUrl);
      } catch (error) {
        setError(error.message);
      }
    }
  }

  async function handleDeleteProduct() {
    await DeleteProduct(productId);
    history.push("/admin/products");
  }

  return (
    <>
      <Heading mb={8}>Edit Product</Heading>
      <Flex justifyContent="flex-end">
        <DeleteProductButton name={name} confirmedFunction={handleDeleteProduct}>
          Delete Product
        </DeleteProductButton>
      </Flex>
      {error ? (
        <Alert status="error" mb="2">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton position="absolute" right="4" onClick={() => setError("")} />
        </Alert>
      ) : null}
      <ProductForm
        onSubmit={async (e) => {
          e.preventDefault();
          await EditProductFunction({ Id: productId, Name: name, Price: price, Description: description, ImageURL: imgUrl });
          history.push("/admin/products");
        }}
        description={description}
        name={name}
        price={price}
        imgUrl={imgUrl}
        nameChange={(e) => setName(e.target.value)}
        descriptionChange={(e) => setDescription(e.target.value)}
        priceChange={(e) => setPrice(+e.target.value)}
        imageChange={handleImageUpload}
      />
    </>
  );
}
