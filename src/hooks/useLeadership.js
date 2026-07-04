import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
  fetchLeadership,
  getFeaturedLeadershipMembers,
  groupLeadershipByCommittee,
} from "../utils/leadership";
import { fetchLeadershipPageContentRow, resolveLeadershipPageContent } from "../utils/pageContent";
import { applyLeadershipMembersLocale, localizeLeadershipGroups } from "../utils/leadershipLocale";

export function useLeadership() {
  const { language } = useLanguage();
  const [members, setMembers] = useState([]);
  const [pageContentRow, setPageContentRow] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    Promise.all([fetchLeadership(), fetchLeadershipPageContentRow()]).then(
      ([items, contentRow]) => {
        if (!active) return;
        setMembers(items);
        setPageContentRow(contentRow);
        setLoading(false);
      }
    );

    return () => {
      active = false;
    };
  }, []);

  const pageContent = useMemo(
    () => resolveLeadershipPageContent(language, pageContentRow),
    [language, pageContentRow]
  );

  const localizedMembers = useMemo(
    () => applyLeadershipMembersLocale(members, language),
    [members, language]
  );

  const groups = useMemo(() => {
    const grouped = groupLeadershipByCommittee(members);
    const withLocalizedMembers = grouped.map((group) => ({
      ...group,
      members: applyLeadershipMembersLocale(group.members, language),
    }));
    return localizeLeadershipGroups(withLocalizedMembers, pageContent);
  }, [members, language, pageContent]);

  const featuredMembers = useMemo(() => {
    const featured = getFeaturedLeadershipMembers(members);
    return applyLeadershipMembersLocale(featured, language);
  }, [members, language]);

  return {
    members: localizedMembers,
    groups,
    featuredMembers,
    pageContent,
    loading,
  };
}
