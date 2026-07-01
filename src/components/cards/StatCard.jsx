import { hasUsableText } from '../../utils/data'

export default function StatCard({ stat }) {
  return (
    <article className="ecaa-card text-center">
      {hasUsableText(stat.value) && (
        <p className="text-4xl font-bold tracking-tight text-ecaa-green-900 sm:text-5xl">
          {stat.value}
        </p>
      )}
      {hasUsableText(stat.label) && (
        <p className="mt-3 text-lg font-semibold text-ecaa-ink">{stat.label}</p>
      )}
      {hasUsableText(stat.description) && (
        <p className="text-body mt-2">{stat.description}</p>
      )}
    </article>
  )
}
