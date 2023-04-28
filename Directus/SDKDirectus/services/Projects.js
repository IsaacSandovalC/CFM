import { Directus } from "@directus/sdk";
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API);
export const project = directus.items("projects");

const getProjectById = (id) =>
  project
    .readOne(id, {
      fields: [
        "id",
        "description",
        "title",
        "icon_image",
        "status",
        "description",
        "body",
        "details.id",
        "details.title",
        "details.description",
        "details.status",
        "gallery.id",
        "gallery.image",
      ],
    })
    .then((project) => {
      const formattedProject = {
        ...project,
        image: `${process.env.NEXT_PUBLIC_URL_API}/assets/${project.icon_image}`,
        gallery: project.gallery.map((img) => ({
          src: `${process.env.NEXT_PUBLIC_URL_API}/assets/${img.image}`,
          width: 4,
          height: 3,
        })),
      };

      return formattedProject;
    });

export default {
  getProjectById,
};
