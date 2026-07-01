import ProgramCard from '../cards/ProgramCard'
import EmptyState from '../ui/EmptyState'
import { filterPublished } from '../../utils/data'

export default function ProgramCategorySection({ category, muted = false }) {
  const programs = filterPublished(category.programs ?? [])

  return (
    <section
      id={category.id}
      className={muted ? 'surface-muted' : 'surface-white'}
    >
      <div className="page-container section-spacing-sm">
        <div className="max-w-3xl">
          <p className="text-eyebrow">Program area</p>
          <h2 className="heading-section mt-3">{category.title}</h2>
          <p className="text-body mt-4">
            {category.description}
          </p>
        </div>

        <div className="mt-10">
          <ProgramCard program={category} variant="detail" />
        </div>

        {programs.length > 0 ? (
          <div className="mt-10 grid-cards">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} variant="detail" />
            ))}
          </div>
        ) : (
          <EmptyState
            className="mt-10"
            title="Programs coming soon"
            description={`TODO: Add verified ${category.title} programs to programs.json.`}
          />
        )}
      </div>
    </section>
  )
}
