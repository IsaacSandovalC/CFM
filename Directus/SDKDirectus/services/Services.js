
import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
export const serviceHeader = directus.items('home_services_header')
export const services = directus.items('services')

const getServiceById = (id) =>
  services.readOne(id, {
    fields: ['id', 'description', 'title', 'image_title', 'features.id', 'features.name', 'features.status']
  }).then(service => {
    return ({
      ...service,
      features: service.features.filter((item) => item.status === "A"),
      image: `${process.env.NEXT_PUBLIC_URL_API}/assets/${service.image_title}`,
    })
  })

const getAllServices = (page) =>
  services.readByQuery({
    fields: ['id', 'description', 'title', 'image_title', 'imagen_slider', 'features.id', 'features.name', 'features.status', 'meta.total_count'],
    limit: 10,
    page: page,
    meta: "*"
  }).then((data) => ({
   data: data.data.map((service) => ({
      ...service,
      features: service.features.filter((item) => item.status === "A"),
      imagen_slider: `${process.env.NEXT_PUBLIC_URL_API}/assets/${service.imagen_slider}`,
    })),
    count: data.meta
  })
  )

export default ({
  getAllServices,
  getServiceById
})