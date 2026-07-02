import LeadershipCard, { getImageSrc } from '../cards/LeadershipCard'
import { hasUsableText } from '../../utils/data'

export default function TeamMemberCard({ member, committee }) {
  return <LeadershipCard member={member} committee={committee} />
}

export function getAllTeamMembers(teamData) {
  return (teamData.groups || []).flatMap((group) =>
    (group.members || []).map((member) => ({
      ...member,
      committee: group.title,
    })),
  ).filter((member) => hasUsableText(member.name) && hasUsableText(getImageSrc(member)))
}
