import PageHero from "../layout/PageHero";
import TodoNotice from "../ui/TodoNotice";
import PageSection from "./PageSection";
import pages from "../../data/pages.json";

export default function StandardPage({ pageKey, children, eyebrow, badge }) {
  const page = pages[pageKey];

  return (
    <>
      <PageHero eyebrow={eyebrow} title={page.title} description={page.description} badge={badge} />
      <PageSection>
        {children}
        {page.todos?.length > 0 && (
          <div className="mt-8">
            <TodoNotice items={page.todos} />
          </div>
        )}
      </PageSection>
    </>
  );
}
