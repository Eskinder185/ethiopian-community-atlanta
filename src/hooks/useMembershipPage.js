import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { getMembershipPageContent } from "../data/membershipPageContent";
import { fetchMembershipPageContentRow } from "../utils/pageContent";

export function useMembershipPage() {
  const { language } = useLanguage();
  const [pageContentRow, setPageContentRow] = useState(null);

  useEffect(() => {
    let active = true;
    fetchMembershipPageContentRow().then((row) => {
      if (!active) return;
      setPageContentRow(row);
    });
    return () => {
      active = false;
    };
  }, []);

  const content = useMemo(
    () => getMembershipPageContent(language, pageContentRow),
    [language, pageContentRow]
  );

  return { content, language };
}
