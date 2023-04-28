import { Directus } from "@directus/sdk";
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API);
export const sendNews = directus.items("sys_send_news");

const saveMailForNews = async (body) => {
  await sendNews.createOne(body);
};
export default {
  saveMailForNews,
};
