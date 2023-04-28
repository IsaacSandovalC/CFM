
import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
export const sidebar = directus.items('sys_sidebar')

const getSidebar = () =>
  sidebar.readOne(1, {
    fields: ['id', 'button_text', 'image','title']
  }).then(side => {
    return ({
      ...side,
      background: `${process.env.NEXT_PUBLIC_URL_API}/assets/${side.image}`,
    })
  })

export default ({
  getSidebar
})