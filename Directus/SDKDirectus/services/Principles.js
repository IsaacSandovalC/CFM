
import { Directus } from '@directus/sdk'
export const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
export const principles = directus.items('hom_principles')

const getAllPrinciples = () =>
  principles.readByQuery({
    fields: ['id', 'title', 'description'],
    filter: { status: { _eq: 'A' } },
    limit: -1,
  }).then(({ data }) => data.map((priciple) => {
    let textFormatted = '';
    const blocks = priciple.description.split('\n')
    blocks.forEach((block) => {
      textFormatted += '<p>&nbsp; &nbsp; &nbsp' + block + '</p>'
    })

    return ({
      ...priciple,
      summary:`${priciple.description.substring(0, 100)}${priciple.description.length > 100 ? '...' : ''}`,
      description: textFormatted
    })
  }))

export default ({
  getAllPrinciples
})