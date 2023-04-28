import { Directus } from "@directus/sdk";
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API);
export const contact = directus.items("sys_contact_us");

const createContactUs = async (body) => {
  await contact.createOne(body);
};
export default {
  createContactUs,
};
