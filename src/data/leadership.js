import teamData from '../content/teamMembers.json'

export const LEADERSHIP_COMMITTEES = [
  {
    id: 'executive-committee',
    title: 'Executive Committee',
    anchor: 'executive-committee',
    description:
      'ECAA executive leadership responsible for day-to-day organizational direction, program coordination, and community service.',
  },
  {
    id: 'board-of-directors',
    title: 'Board of Directors',
    anchor: 'board-of-directors',
    description:
      "Governing board members who provide oversight and guidance for ECAA's mission and community work.",
  },
  {
    id: 'audit-committee',
    title: 'Audit Committee',
    anchor: 'audit-committee',
    description: 'Committee members responsible for audit oversight and financial accountability.',
  },
  {
    id: 'advisory-board',
    title: 'Advisory Board',
    anchor: 'advisory-board',
    description:
      'Advisory members who support ECAA with guidance, expertise, and community perspective.',
  },
  {
    id: 'edir-committee',
    title: 'Edir Committee',
    anchor: 'edir-committee',
    description:
      'Leadership connected to EDIR-related community support and governance within ECAA.',
  },
]

export const LEADERSHIP_COMMITTEE_OPTIONS = [
  ...LEADERSHIP_COMMITTEES.map((committee) => committee.title),
  'Other',
]

export function getFallbackLeadershipIntro() {
  return (
    teamData.intro ||
    'ECAA leadership includes executive leadership, board members, audit committee members, advisory board members, and EDIR committee leaders who support organizational direction, accountability, and community service.'
  )
}

export function getRawFallbackLeadershipRecords() {
  const records = []

  for (const group of teamData.groups || []) {
    const committee = group?.title || group?.committee || 'Other'
    for (const member of group.members || []) {
      records.push({
        ...member,
        committee,
        role: member.title || member.role,
        image_url: member.image || member.image_url,
        image_alt: member.imageAlt || member.image_alt,
        display_order: member.order ?? member.display_order,
        visible: member.published !== false && member.active !== false,
        active: member.active !== false,
      })
    }
  }

  return records
}
