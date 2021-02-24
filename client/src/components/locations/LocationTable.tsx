import React from "react";
import { Table, Thead, Tr, Th, Tbody, Td, Text, Image } from "@chakra-ui/react";
import { LocationTime } from "../../../../types/LocationTime";
import { Link } from "react-router-dom";

const LocationTable = ({ locations }: { locations: LocationTime[] }) => {
  return (
    <div>
      {locations && locations.length ? (
        <Table>
          <Thead>
            <Tr>
              <Th>Location</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Days</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {locations
              .sort((a, b) => (a.Location > b.Location ? 1 : -1))
              .map((location) => {
                return (
                  <Tr key={location.Id}>
                    <Td>{location.Location}</Td>
                    <Td>{location.TimeFrom}</Td>
                    <Td>{location.TimeTo}</Td>
                    <Td>{location.Days.join(", ")}</Td>

                    <Td textAlign="right">
                      <Link to={`/admin/locations/edit/${location.Id}`}>
                        <Text textColor="pink.400" _hover={{ textColor: "pink.500" }}>
                          Details
                        </Text>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      ) : (
        <Text>No locations to show</Text>
      )}
    </div>
  );
};

export default LocationTable;
