import PageHeroWithStats from "../layout/PageHeroWithStats";
import { mapHomeHeroData, isSectionVisible } from "../../utils/homepage";
import { defaultImages } from "../../utils/publicAsset";

export default function HomeHero({ data }) {
  if (!isSectionVisible(data)) return null;
  const heroProps = mapHomeHeroData(data);
  if (!heroProps) return null;
  return <PageHeroWithStats {...heroProps} priority fallbackImage={defaultImages.homeHero} />;
}
