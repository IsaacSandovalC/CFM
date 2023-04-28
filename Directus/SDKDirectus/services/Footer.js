
import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
const footer = directus.items('home_footer')
const page = directus.items('useful_links')

const getFooter = () =>
  footer.readOne(1, {
    fields: ['id', 'description', 'rights_reserved',
      'offices_hours.title',
      'offices_hours.title_right',
      'useful_links.id',
      'useful_links.name',
      'useful_links.url',
      'useful_links.page'],
  }).then(data => {
  
    return ({
      ...data,
    })
  })

const getUsefulLinks = (url) =>
  page.readByQuery({
    fields: ['id', 'name', 'page', 'url'],
    filter: {
      url: { _eq: url },
    },
    limit: 1
  }).then(({ data }) => {
    return ({
      ...data[0],
    })
  })

const getAllUsefulLinks = async () =>
  page.readByQuery({
    fields: ['id', 'name', 'page', 'url'],
    limit: -1
  }).then(({ data }) => data)

export default ({
  getFooter,
  getUsefulLinks,
  getAllUsefulLinks
})