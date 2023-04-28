import { Directus } from "@directus/sdk";
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API);
export const document = directus.items("sys_documents");

const getDocuments = () =>
  document
    .readByQuery({
      fields: ["id", "title", "extension", "file", "status"],
      limit: 20,
    })
    .then(({data}) => data.map((item) => ({
        ...item,
        file: `${process.env.NEXT_PUBLIC_URL_API}/assets/${item.file}`,
    })));

export default {
  getDocuments,
};
