import React, { useState, ChangeEvent } from "react";
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
} from "@chakra-ui/react";
import { GetPresignedPutURL } from "../services/s3service";
import { CreateProduct as CreateProductFunction } from "../services/productService";

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

      // Turn this into await async and move into s3 service
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
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("submit");
        CreateProductFunction({ Name: name, Price: price, Description: description, ImageURL: imgUrl });
      }}
    >
      <Container maxW={"1200px"}>
        <Flex>
          <Box w="50%">
            <FormControl h="100%">
              <FormLabel h="100%">
                <Flex direction="column" justifyContent="space-between" h="100%">
                  {imgUrl ? (
                    <Center>
                      <Box>
                        <Image src={imgUrl} alt="Chosen product thumbnail" maxH="64" cursor={"pointer"} />
                      </Box>
                    </Center>
                  ) : (
                    <Flex
                      flexGrow={1}
                      backgroundColor="gray.50"
                      textAlign="center"
                      cursor={"pointer"}
                      borderRadius={6}
                      direction="column"
                      justifyContent="center"
                    ></Flex>
                  )}
                  <FormHelperText textAlign="center">Click to upload new image</FormHelperText>
                </Flex>
              </FormLabel>
              <Input type="file" display="none" onChange={handleImageUpload}></Input>
            </FormControl>
          </Box>
          <Box w="50%">
            <Stack>
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
              <Button type="submit" colorScheme="pink">
                Submit
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Container>
    </form>
  );
}
