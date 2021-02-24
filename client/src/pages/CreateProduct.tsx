import React, { useState, ChangeEvent } from "react";
import { Alert, AlertTitle, AlertDescription, CloseButton, Heading } from "@chakra-ui/react";
import { UploadPublicFileToS3 } from "../services/s3service";
import { CreateProduct as CreateProductFunction } from "../services/productService";
import ProductForm from "../components/products/ProductForm";
import { useHistory } from "react-router-dom";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

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

  return (
    <>
      <Heading mb={8}>New Product</Heading>
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
          console.log("submit");
          await CreateProductFunction({ Name: name, Price: price, Description: description, ImageURL: imgUrl });
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
