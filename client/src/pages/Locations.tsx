import React, { useState, useEffect } from "react";
import { Heading, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LocationTable from "../components/locations/LocationTable";
import { LocationTime } from "../../../types/LocationTime";
import { Getlocations } from "../services/locationService";

export default function Locations() {
  const [locations, setlocations]: [LocationTime[], any] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchLocations = await Getlocations();
      setlocations(fetchLocations);
    }
    fetchData();
  }, []);

  return (
    <>
      <Heading mb={8}>Delivery Locations</Heading>
      <Flex justifyContent="flex-end" w="100%">
        <Link to="/admin/locations/create">
          <Button>New Location</Button>
        </Link>
      </Flex>
      <LocationTable locations={locations} />
    </>
  );
}
