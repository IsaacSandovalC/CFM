
import { Directus } from '@directus/sdk'
const directus = new Directus(process.env.NEXT_PUBLIC_URL_API)
const company = directus.items('sys_company')
const heaerTopPanel = directus.items('home_header_top_panel')
const heaerTopNavBar = directus.items('home_header_navbar')
const transport = directus.transport

const getInitialContent = () =>
transport.get(`/initial-content`).then((data) => data.raw)

const getCompany = () =>
  company.readOne(1, {
    fields: ['*', 'features.name', 'features.id'],
  }).then(data => {

    let textFormatted = '';
    const blocks = data.description.split('\n')
    blocks.forEach((block) => {
      textFormatted += '<p>&nbsp; &nbsp; &nbsp' + block + '</p>'
    })

    let textFormatted2 = '';
    const blocks2 = data.wch_description.split('\n')
    blocks2.forEach((block) => {
      textFormatted2 += '<p>&nbsp; &nbsp; &nbsp' + block + '</p>'
    })

    return ({
      ...data,
      description: textFormatted,
      wch_description: textFormatted2,
      image: `${process.env.NEXT_PUBLIC_URL_API}/assets/${data.image_we_are}`,
      icon_box: `${process.env.NEXT_PUBLIC_URL_API}/assets/${data.icon_box}`
    })
  })

/*
Función encargada de solicitar a la API, los datos referentes al la barra de navegación,
dado que la colección es singleton, se llama haciendo referencia al ID número 1.
*/
const getHeaderNavbar = () =>
  heaerTopNavBar.readOne(1, {
    fields: ['icon_company', 'icon_company_dark', 'internal_message', 'internal_icon'],
  }).then(data => {
    return ({
      ...data,
      icon_company: `${process.env.NEXT_PUBLIC_URL_API}/assets/${data.icon_company}`,
      icon_company_dark: `${process.env.NEXT_PUBLIC_URL_API}/assets/${data.icon_company_dark}`,
      internal_icon: `${process.env.NEXT_PUBLIC_URL_API}/assets/${data.internal_icon}`,
    })
  })

/*
Función encargada de solicitar a la API, los datos referentes al la barra superior de la barra de navegación,
dado que la colección es singleton, se llama haciendo referencia al ID número 1.
*/
const getHeaderTop = () =>
  heaerTopPanel.readOne(1, {
    fields: ['contact_number', 'mail_contact', 'social_media.id', 'social_media.url', 'social_media.social_medias'],
  }).then(data => data)

export default ({
  getInitialContent,
  getHeaderNavbar,
  getHeaderTop,
  getCompany
})