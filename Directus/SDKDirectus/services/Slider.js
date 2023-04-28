


import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
export const sysSlider = directus.items('sys_slider')

const getSlider = () =>
  sysSlider.readByQuery({
    fields: ['id', 'image', 'title_top', 'title_middle', 'description'],
    filter: { status: { _eq: 'A' } },
    limit: -1,
  }).then(({ data }) => data.map((slider) => ({...slider , image:`${process.env.NEXT_PUBLIC_URL_API}/assets/${slider.image}`})))

export default ({
  getSlider
})