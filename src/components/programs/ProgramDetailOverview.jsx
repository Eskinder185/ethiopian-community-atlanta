import { getProgramOverviewText } from "../../utils/programs";

export default function ProgramDetailOverview({ program, labels = {} }) {
  const overview = getProgramOverviewText(program, labels.overviewFallback);

  return (
    <section className="surface-white py-14 sm:py-16">
      <div className="container-ecaa">
        <div className="mx-auto max-w-3xl">
          <h2 className="heading-section text-2xl normal-case sm:text-3xl">
            {labels.programOverview || "Overview"}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ecaa-ink-muted sm:text-lg">
            {overview}
          </p>
        </div>
      </div>
    </section>
  );
}
