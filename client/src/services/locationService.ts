import config from "./../config";
import { LocationTime } from "./../../../types/LocationTime";

export async function Getlocations(): Promise<LocationTime[]> {
  const res = await fetch(`${config.baseUrl}/locations`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function Getlocation(locationId: string): Promise<LocationTime> {
  const res = await fetch(`${config.baseUrl}/locations/${locationId}`);
  const data = await res.json();
  console.log(data);
  return data;
}

export async function Createlocation(newlocation: LocationTime): Promise<LocationTime> {
  const res = await fetch(`${config.baseUrl}/locations`, {
    method: "POST",
    body: JSON.stringify(newlocation),
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export async function Editlocation(location: LocationTime) {
  const res = await fetch(`${config.baseUrl}/locations/${location.Id}`, {
    method: "PUT",
    body: JSON.stringify(location),
  });
  if (res.status !== 200) throw new Error("Something went wrong");

  const data = await res.json();
  return data;
}

export async function Deletelocation(locationId: string) {
  const res = await fetch(`${config.baseUrl}/locations/${locationId}`, {
    method: "DELETE",
  });
  if (res.status !== 200) throw new Error("Something went wrong");
  return true;
}
