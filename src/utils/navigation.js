export function getNavHref(item) {
  return item?.href || item?.path || ''
}

export function isExternalNavLink(item) {
  const href = getNavHref(item)
  if (item?.external === true) return true
  return (
    typeof href === 'string' &&
    (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:'))
  )
}

export function getNavPathname(href) {
  return href.split('#')[0] || href
}
