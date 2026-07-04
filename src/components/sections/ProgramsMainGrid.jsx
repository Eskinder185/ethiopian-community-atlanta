import Container from "../ui/Container";
import MainProgramCard from "../cards/MainProgramCard";
import AnimateIn from "../ui/AnimateIn";
import { isProgramVisible } from "../../utils/programs";

export default function ProgramsMainGrid({ programs = [] }) {
  const items = programs.filter(isProgramVisible);
  if (items.length === 0) return null;

  return (
    <section id="community-programs" className="surface-white py-16 sm:py-20">
      <Container>
        <AnimateIn>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((program, index) => (
              <AnimateIn key={program.id} delay={index * 40}>
                <MainProgramCard program={program} />
              </AnimateIn>
            ))}
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
