// Sanity integration disabled
// import createImageUrlBuilder from '@sanity/image-url'
// import { dataset, projectId } from '../env'

// const builder = createImageUrlBuilder({ projectId, dataset })

// export const urlFor = (source) => {
//   return builder.image(source)
// }

// Placeholder to prevent import errors
export const urlFor = (source) => {
  return { url: () => '' }
}
