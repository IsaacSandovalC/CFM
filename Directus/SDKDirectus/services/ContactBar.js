
import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
export const contactBar = directus.items('sys_contact_bar')

const getContacBar = async () => {
  const data = await contactBar.readOne(1, {
    fields: ['*']
  })
  return data
}
export default ({
  getContacBar
})