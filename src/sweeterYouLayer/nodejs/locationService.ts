import * as db from "./db";
import { LocationTime } from "types/LocationTime";
import { nanoid } from "nanoid";
export { LocationTime } from "types/LocationTime";

const locationTable = new db.Table(process.env.TABLE_NAME as string);

/**
 * Adds a newProduct and saves it to the database
 * @param newProduct Product to save to the database
 */

export const createLocationTime = async (newLocationTime: LocationTime): Promise<LocationTime> => {
  if (!newLocationTime.Id) {
    newLocationTime.Id = nanoid();
  }
  await saveLocationTimeDetails(newLocationTime);

  return newLocationTime;
};

export const editLocationTime = async (locationTime: LocationTime): Promise<LocationTime> => {
  await saveLocationTimeDetails(locationTime);
  return locationTime;
};

const saveLocationTimeDetails = async (locationTime: LocationTime) => {
  const { Id: SK_GSI_PK, ...item } = locationTime;

  const LocationTimeToSave: db.IPutItem = {
    PK: "LocationTimes",
    SK_GSI_PK,
    ...item,
  };

  await locationTable.put(LocationTimeToSave);
};

export const getLocationTimes = async (): Promise<LocationTime[]> => {
  const items = await locationTable.query("PK", "LocationTimes");

  const LocationTimes: LocationTime[] = [];
  if (items) {
    items.forEach((element) => {
      const { SK_GSI_PK: LocationTimeId } = element;
      const { TimeFrom: TimeFrom, TimeTo: TimeTo, Days: Days, Location: LocationTimeLocation } = element;
      LocationTimes.push({
        Id: LocationTimeId as string,
        Location: LocationTimeLocation as string,
        TimeFrom: TimeFrom as string,
        TimeTo: TimeTo as string,
        Days: Days as string[],
      });
    });
  }
  return LocationTimes;
};

export const getSingleLocationTime = async (locationTimeId: string): Promise<LocationTime> => {
  const item = await locationTable.get({ PK: "LocationTimes" }, { SK_GSI_PK: locationTimeId });
  if (!item) throw new Error(`LocationTime ${locationTimeId} not found`);
  const LocationTime: LocationTime = {
    Id: locationTimeId,
    Location: item.Location as string,
    TimeFrom: item.TimeFrom as string,
    TimeTo: item.TimeTo as string,
    Days: item.Days as string[],
  };
  return LocationTime;
};

export const deleteLocationTime = async (LocationTimeId: string): Promise<boolean> => {
  return await locationTable.delete({ PK: "LocationTimes" }, { SK_GSI_PK: LocationTimeId }, "SK_GSI_PK");
};
