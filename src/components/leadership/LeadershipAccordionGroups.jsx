import { useState } from "react";
import Container from "../ui/Container";
import AnimateIn from "../ui/AnimateIn";
import EmptyState from "../ui/EmptyState";
import LeadershipMemberCard from "./LeadershipMemberCard";
import LeadershipPreviewModal from "./LeadershipPreviewModal";

export default function LeadershipAccordionGroups({
  groups = [],
  accordions,
  emptyState,
  contactLabels,
}) {
  const [openId, setOpenId] = useState(() => {
    if (typeof window === "undefined") return groups[0]?.id || null;
    return window.innerWidth >= 1024 ? groups[0]?.id || null : null;
  });
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="leadership-committees" className="surface-muted">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl sm:text-3xl">{accordions.title}</h2>
            {accordions.description && (
              <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {accordions.description}
              </p>
            )}
          </div>

          <div className="mt-10 space-y-3">
            {groups.map((group) => {
              const isOpen = openId === group.id;
              const members = group.members || [];

              return (
                <details
                  key={group.id}
                  id={group.anchor}
                  open={isOpen}
                  className="group overflow-hidden rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white shadow-ecaa-sm transition-all duration-300"
                  onToggle={(event) => {
                    if (event.currentTarget.open) setOpenId(group.id);
                    else if (openId === group.id) setOpenId(null);
                  }}
                >
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-ecaa-green-950">{group.title}</h3>
                        {group.description && (
                          <p className="mt-1 text-sm leading-relaxed text-ecaa-ink-muted">
                            {group.description}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-ecaa-green-800 transition-transform duration-300 group-open:rotate-180">
                        ▾
                      </span>
                    </div>
                  </summary>

                  <div className="border-t border-ecaa-border/60 px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
                    {members.length > 0 ? (
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {members.map((member, index) => (
                          <LeadershipMemberCard
                            key={`${group.id}-${member.id}`}
                            member={member}
                            viewProfileLabel={accordions.viewProfileLabel}
                            onViewProfile={setSelectedMember}
                            style={{ animationDelay: `${index * 40}ms` }}
                          />
                        ))}
                      </div>
                    ) : (
                      <EmptyState
                        className="mt-2"
                        title={emptyState?.title}
                        description={emptyState?.description}
                        compact
                      />
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </AnimateIn>
      </Container>

      <LeadershipPreviewModal
        member={selectedMember}
        committee={selectedMember?.committee}
        onClose={() => setSelectedMember(null)}
        closeLabel={accordions.modalCloseLabel}
        contactLabels={contactLabels}
      />
    </section>
  );
}
