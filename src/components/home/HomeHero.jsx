import PageHeroWithStats from "../layout/PageHeroWithStats";
import { mapHomeHeroData, isSectionVisible } from "../../utils/homepage";

export default function HomeHero({ data }) {
  if (!isSectionVisible(data)) return null;
  const heroProps = mapHomeHeroData(data);
  if (!heroProps) return null;
  return <PageHeroWithStats {...heroProps} priority />;
}
