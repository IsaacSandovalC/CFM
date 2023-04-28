import { Directus } from "@directus/sdk";
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API);
export const offices = directus.items("sys_office_locations");


const getOfficeLocations = () =>
  offices
    .readByQuery({
      fields: [
        "id",
        "phone",
        "name",
        "address",
        "status",
        "email",
        "geo_location",
      ],
      limit: -1,
    })
    .then(({ data }) => data);

export default {
  getOfficeLocations,
};
