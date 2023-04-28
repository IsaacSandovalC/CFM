
import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
export const brands = directus.items('home_header_brands')

const getBrands = () =>
  brands.readOne(1, {
    fields: ['id', 'title', 'brands.name', 'brands.url', 'brands.icon'],
  }).then(data => {
    return ({
      ...data,
      brands: data.brands && data.brands.map((item) => ({ ...item, icon: item.icon && `${process.env.NEXT_PUBLIC_URL_API}/assets/${item.icon}`, }))
    })
    })


export default ({
  getBrands
})