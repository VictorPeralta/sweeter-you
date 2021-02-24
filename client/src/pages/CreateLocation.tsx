import React, { useState } from "react";
import { Heading, Alert, AlertTitle, AlertDescription, CloseButton } from "@chakra-ui/react";
import LocationForm from "../components/locations/LocationForm";
import { Createlocation as CreateLocationFunction } from "../services/locationService";
import { useHistory } from "react-router-dom";

export default function CreateLocation() {
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [timeFrom, setTimeFrom] = useState("");
  const [timeTo, setTimeTo] = useState("");
  const [weekdays, setWeekdays] = useState<string[]>([]);
  const history = useHistory();

  return (
    <>
      <Heading mb={8}>New Delivery Location</Heading>
      {error ? (
        <Alert status="error" mb="2">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <CloseButton position="absolute" right="4" onClick={() => setError("")} />
        </Alert>
      ) : null}
      <LocationForm
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("submit");
          await CreateLocationFunction({ Location: location, TimeFrom: timeFrom, TimeTo: timeTo, Days: weekdays });
          history.push("/admin/locations");
        }}
        location={location}
        timeFrom={timeFrom}
        timeTo={timeTo}
        WeekDays={weekdays}
        locationChange={(e) => setLocation(e.target.value)}
        timeFromChange={(e) => setTimeFrom(e.target.value)}
        timeToChange={(e) => setTimeTo(e.target.value)}
        WeekDaysChange={setWeekdays}
      />
    </>
  );
}
