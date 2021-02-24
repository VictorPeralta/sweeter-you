import React, { FormEvent, ChangeEvent, useState } from "react";
import {
  FormLabel,
  Input,
  FormControl,
  Container,
  Button,
  Stack,
  Box,
  Flex,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";

interface ILocationFormProps {
  location: string;
  timeFrom: string;
  timeTo: string;
  WeekDays: string[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  locationChange: (event: ChangeEvent<HTMLInputElement>) => void;
  timeFromChange: (event: ChangeEvent<HTMLInputElement>) => void;
  timeToChange: (event: ChangeEvent<HTMLInputElement>) => void;
  WeekDaysChange: (weekdays: string[]) => void;
}

export default function LocationForm({
  location,
  timeTo,
  timeFrom,
  WeekDays,
  onSubmit,
  locationChange,
  timeFromChange,
  timeToChange,
  WeekDaysChange,
}: ILocationFormProps) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const days = [...WeekDays];
    const weekday = event.target.value;
    const idx = days.indexOf(weekday);
    console.log(days, weekday, idx);

    if (idx !== -1) {
      days.splice(idx, 1);
      WeekDaysChange(days);
    } else {
      WeekDaysChange([...days, weekday]);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <Container maxW={"1200px"}>
        <Flex>
          <Box w="50%">
            <Stack>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input value={location} onChange={locationChange}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Time from</FormLabel>
                <Input value={timeFrom} type="number" onChange={timeFromChange}></Input>
              </FormControl>
              <FormControl>
                <FormLabel>Time to</FormLabel>
                <Input value={timeTo} onChange={timeToChange}></Input>
              </FormControl>
              <CheckboxGroup>
                <FormLabel>Delivery days</FormLabel>
                <HStack>
                  {days.map((d) => (
                    <Checkbox value={d} key={d} onChange={handleCheckBoxChange}>
                      {d}
                    </Checkbox>
                  ))}
                </HStack>
              </CheckboxGroup>
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
