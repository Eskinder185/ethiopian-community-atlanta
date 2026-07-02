import imagesData from '../content/images.json'
import { hasUsableText } from './data'

export function getImageById(id) {
  if (!id) return null
  return imagesData.images.find((image) => image.id === id) ?? null
}

export function hasImageAsset(image) {
  return Boolean(image?.src && hasUsableText(image.src) && !image.src.startsWith('TODO'))
}

export function getPatternImage() {
  return getImageById('global-ethiopian-pattern-divider')
}
