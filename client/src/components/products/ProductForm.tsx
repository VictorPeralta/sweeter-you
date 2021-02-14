import React, { FormEvent, ChangeEvent } from "react";
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

interface IProductFormProps {
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  nameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  imageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  descriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  priceChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function ProductForm({
  name,
  price,
  description,
  imgUrl,
  onSubmit,
  nameChange,
  imageChange,
  descriptionChange,
  priceChange,
}: IProductFormProps) {
  return (
    <form onSubmit={onSubmit}>
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
              <Input type="file" display="none" onChange={imageChange}></Input>
            </FormControl>
          </Box>
          <Box w="50%">
            <Stack>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input value={name} onChange={nameChange}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input value={price.toString()} type="number" onChange={priceChange}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input value={description} onChange={descriptionChange}></Input>
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
