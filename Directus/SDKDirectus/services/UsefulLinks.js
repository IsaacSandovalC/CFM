
import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
export const usefulLinks = directus.items('useful_links')

const getContentPage = async (id) => {
    const data = await usefulLinks.readOne(id, {
        fields: ['id', 'url', 'page', 'name'],
        filter: { status: { _eq: 'A' } },
        limit: -1,
    })
    console.log(data)
    return { data }
}

export default {
    getContentPage
}
