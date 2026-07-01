import Accordion from '../../ui/Accordion'

export default function AboutHowItWorks({ section }) {
  return (
    <>
      {section.intro && (
        <p className="text-lead mb-8 max-w-3xl">{section.intro}</p>
      )}
      <Accordion
        items={section.items}
        className="mx-auto max-w-3xl"
      />
    </>
  )
}
