import Container from "../ui/Container";
import SectionHeader from "../ui/SectionHeader";
import LeadershipCard from "../cards/LeadershipCard";
import { getAllTeamMembers } from "../cards/TeamMemberCard";
import EmptyState from "../ui/EmptyState";
import CTAButton from "../ui/CTAButton";
import AnimateIn from "../ui/AnimateIn";
import teamData from "../../content/teamMembers.json";
import homeData from "../../content/homepage.json";

export default function LeadershipPreview({ limit = 3 }) {
  const members = getAllTeamMembers(teamData).slice(0, limit);
  const { leadershipPreview } = homeData;

  return (
    <section className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <SectionHeader
            eyebrow={leadershipPreview.eyebrow}
            title={leadershipPreview.title}
            description={leadershipPreview.description}
            action={{
              label: leadershipPreview.ctaLabel,
              to: leadershipPreview.ctaPath,
              variant: "secondary",
            }}
          />

          {members.length > 0 ? (
            <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <LeadershipCard key={member.id} member={member} committee={member.committee} />
              ))}
            </div>
          ) : (
            <EmptyState
              className="mt-14"
              title="Leadership profiles coming soon"
              description="Leadership profiles will appear here once verified details are published."
              action={
                <CTAButton to="/leadership" variant="primary">
                  Leadership page
                </CTAButton>
              }
            />
          )}
        </AnimateIn>
      </Container>
    </section>
  );
}
