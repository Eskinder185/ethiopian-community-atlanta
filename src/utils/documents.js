import { filterVerifiedContent, hasUsableText, hasUsableUrl, isTodoValue } from './data'

export function getDocumentsByCategory(documents = [], categoryId) {
  return filterVerifiedContent(
    documents.filter((doc) => doc.categoryId === categoryId),
    ['title'],
  )
}

export function getFeaturedDocuments(documents = [], limit = 4) {
  const verified = filterVerifiedContent(documents, ['title'])
  const featured = verified.filter(
    (doc) => doc.featured === true && hasUsableDocumentUrl(doc),
  )

  if (featured.length > 0) {
    return featured.slice(0, limit)
  }

  const fallbackIds = ['bylaws-english-current', 'bylaws-amharic-current', 'candidate-profiles-2026']
  return fallbackIds
    .map((id) => verified.find((doc) => doc.id === id))
    .filter((doc) => doc && hasUsableDocumentUrl(doc))
    .slice(0, limit)
}

export function hasUsableDocumentUrl(document) {
  const url = document?.fileUrl || document?.url
  return hasUsableUrl(url) && !isTodoValue(url)
}

export function getDocumentUrl(document) {
  const url = document?.fileUrl || document?.url
  return hasUsableDocumentUrl(document) ? url : null
}

export function formatDocumentDate(date) {
  if (!hasUsableText(date)) return null

  const parsed = Date.parse(date)
  if (Number.isNaN(parsed)) return date

  return new Date(parsed).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getStatusLabel(status) {
  if (!hasUsableText(status)) return null
  const labels = {
    current: 'Current',
    archived: 'Archived',
    historical: 'Historical',
  }
  return labels[status] || status
}

export function getStatusVariant(status) {
  if (status === 'current') return 'green'
  if (status === 'archived') return 'gold'
  if (status === 'historical') return 'neutral'
  return 'neutral'
}

export function getFileTypeLabel(fileType) {
  if (!hasUsableText(fileType)) return null
  const labels = {
    pdf: 'PDF',
    form: 'Form',
    doc: 'Document',
    link: 'Link',
  }
  return labels[fileType.toLowerCase()] || fileType.toUpperCase()
}
