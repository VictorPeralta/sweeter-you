import React, { useState, ChangeEvent } from "react";
import { FormLabel, Input, FormControl, Container } from "@chakra-ui/react";
import { GetPresignedPutURL } from "../services/s3service";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  async function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileSections = file.name.split(".");
      const fileType = fileSections[fileSections.length - 1];
      const presignedUrl = await GetPresignedPutURL(fileType);

      //Turn this into await async
      fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": fileType, "x-amz-acl": "public-read" },
      })
        .then((res) => {
          console.log(res);
          if (res.status !== 200) {
            console.error("Statuscode error");
            throw new Error("Something went wrong presign");
          }
          console.log(presignedUrl);
          setImgUrl(presignedUrl.split("?")[0]);
        })
        .catch((err) => console.error(err));
    }
  }

  return (
    <Container>
      <FormControl>
        <FormLabel>Product Name</FormLabel>
        <Input value={name} onChange={(e) => setName(e.target.value)}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Price</FormLabel>
        <Input value={price.toString()} type="number" onChange={(e) => setPrice(+e.target.value)}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input value={description} onChange={(e) => setDescription(e.target.value)}></Input>
      </FormControl>
      <FormControl>
        <FormLabel>Image</FormLabel>
        <Input type="file" onChange={handleImageUpload}></Input>
      </FormControl>
      <img src={imgUrl} alt="Chosen product thumbnail" />
    </Container>
  );
}
