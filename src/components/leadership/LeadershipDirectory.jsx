import { useMemo, useState } from "react";
import Container from "../ui/Container";
import AnimateIn from "../ui/AnimateIn";
import LeadershipMemberCard from "./LeadershipMemberCard";
import LeadershipPreviewModal from "./LeadershipPreviewModal";
import { LEADERSHIP_COMMITTEES } from "../../data/leadership";

export default function LeadershipDirectory({ members = [], directory, contactLabels }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);

  const filters = useMemo(
    () => [
      { id: "all", label: directory.filters.all },
      ...LEADERSHIP_COMMITTEES.map((committee) => ({
        id: committee.id,
        label: directory.filters[committee.id] || committee.title,
      })),
    ],
    [directory.filters]
  );

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return members.filter((member) => {
      const matchesFilter =
        activeFilter === "all" ||
        LEADERSHIP_COMMITTEES.some(
          (committee) =>
            committee.id === activeFilter &&
            (member.committee === committee.title ||
              member.committee?.toLowerCase() === committee.title.toLowerCase())
        );

      if (!matchesFilter) return false;
      if (!query) return true;

      const haystack = [member.name, member.role, member.committee]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [members, activeFilter, searchQuery]);

  return (
    <section id="leadership-directory" className="surface-white">
      <Container className="section-spacing-sm">
        <AnimateIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-section text-2xl sm:text-3xl">{directory.title}</h2>
            {directory.description && (
              <p className="mt-4 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
                {directory.description}
              </p>
            )}
          </div>

          <div className="mt-8">
            <label htmlFor="leadership-search" className="sr-only">
              {directory.searchLabel}
            </label>
            <input
              id="leadership-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={directory.searchPlaceholder}
              className="w-full rounded-ecaa-lg border border-ecaa-border/80 bg-ecaa-cream/40 px-4 py-3 text-base text-ecaa-ink placeholder:text-ecaa-ink-faint focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-ecaa-gold-500"
            />
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "border-ecaa-green-700 bg-ecaa-green-900 text-ecaa-white shadow-ecaa-sm"
                    : "border-ecaa-border/80 bg-ecaa-cream/50 text-ecaa-green-900 hover:border-ecaa-green-200 hover:bg-ecaa-green-50"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {filteredMembers.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredMembers.map((member, index) => (
                <LeadershipMemberCard
                  key={member.id}
                  member={member}
                  viewProfileLabel={directory.viewProfileLabel}
                  onViewProfile={setSelectedMember}
                  style={{ animationDelay: `${index * 60}ms` }}
                />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-ecaa-ink-muted">{directory.noResults}</p>
          )}
        </AnimateIn>
      </Container>

      <LeadershipPreviewModal
        member={selectedMember}
        committee={selectedMember?.committee}
        onClose={() => setSelectedMember(null)}
        closeLabel={directory.modalCloseLabel}
        contactLabels={contactLabels}
      />
    </section>
  );
}
