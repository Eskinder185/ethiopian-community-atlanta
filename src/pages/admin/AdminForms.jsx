import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import StatusBadge from "../../components/admin/StatusBadge";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import {
  FORM_STATUS,
  FORM_TYPES,
  archiveForm,
  fetchFormsForAdmin,
  fetchResponseCountsByFormIds,
  getFormPublicPath,
} from "../../utils/forms";

function statusVariant(status) {
  if (status === FORM_STATUS.PUBLISHED) return "live";
  if (status === FORM_STATUS.ARCHIVED) return "muted";
  return "draft";
}

export default function AdminForms() {
  const { adminT } = useAdminLanguage();
  const [forms, setForms] = useState([]);
  const [responseCounts, setResponseCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadForms();
  }, []);

  async function loadForms() {
    setLoading(true);
    try {
      const items = await fetchFormsForAdmin();
      setForms(items);
      const counts = await fetchResponseCountsByFormIds(items.map((item) => item.id));
      setResponseCounts(counts);
    } catch (loadError) {
      setError(adminT("formsBuilder.loadError"));
      console.error(loadError);
    } finally {
      setLoading(false);
    }
  }

  const filteredForms = useMemo(() => {
    const query = search.trim().toLowerCase();
    return forms.filter((form) => {
      const matchesSearch =
        !query ||
        form.title.toLowerCase().includes(query) ||
        form.slug.toLowerCase().includes(query);
      const matchesStatus = statusFilter === "all" || form.status === statusFilter;
      const matchesType = typeFilter === "all" || form.formType === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [forms, search, statusFilter, typeFilter]);

  async function handleArchive(formId) {
    if (!window.confirm(adminT("formsBuilder.archiveConfirm"))) return;

    try {
      await archiveForm(formId);
      setMessage(adminT("formsBuilder.archived"));
      setError("");
      await loadForms();
    } catch (archiveError) {
      setError(adminT("formsBuilder.archiveError"));
      console.error(archiveError);
    }
  }

  function copyPublicLink(slug) {
    const path = getFormPublicPath(slug);
    const fullUrl = `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, "")}${path}`;
    navigator.clipboard?.writeText(fullUrl);
    setMessage(adminT("formsBuilder.linkCopied"));
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ecaa-ink-muted">{adminT("formsBuilder.pageHeading")}</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-ecaa-ink sm:text-3xl">
            {adminT("formsBuilder.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-base text-ecaa-ink-muted">
            {adminT("formsBuilder.description")}
          </p>
        </div>
        <Link
          to="/admin/forms/new"
          className="inline-flex min-h-[44px] items-center rounded-lg bg-ecaa-green-800 px-5 py-2.5 text-sm font-semibold text-ecaa-white hover:bg-ecaa-green-900"
        >
          {adminT("formsBuilder.createNew")}
        </Link>
      </div>

      {message && (
        <p className="mb-4 rounded-lg border border-ecaa-green-200 bg-ecaa-green-50 px-4 py-3 text-sm text-ecaa-green-900">
          {message}
        </p>
      )}
      {error && (
        <p className="mb-4 rounded-lg border border-ecaa-red-200 bg-ecaa-red-50 px-4 py-3 text-sm text-ecaa-red-800">
          {error}
        </p>
      )}

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={adminT("formsBuilder.searchPlaceholder")}
          className="min-h-[44px] rounded-lg border border-ecaa-border/80 px-4 text-base"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="min-h-[44px] rounded-lg border border-ecaa-border/80 px-4 text-base"
        >
          <option value="all">{adminT("formsBuilder.allStatuses")}</option>
          <option value={FORM_STATUS.DRAFT}>{adminT("formsBuilder.statusDraft")}</option>
          <option value={FORM_STATUS.PUBLISHED}>{adminT("formsBuilder.statusPublished")}</option>
          <option value={FORM_STATUS.ARCHIVED}>{adminT("formsBuilder.statusArchived")}</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="min-h-[44px] rounded-lg border border-ecaa-border/80 px-4 text-base"
        >
          <option value="all">{adminT("formsBuilder.allTypes")}</option>
          {FORM_TYPES.map((type) => (
            <option key={type} value={type}>
              {adminT(`formsBuilder.types.${type}`) || type}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-ecaa-ink-muted">{adminT("common.loading")}</p>
      ) : filteredForms.length === 0 ? (
        <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-8 text-center shadow-ecaa-sm">
          <p className="text-ecaa-ink-muted">{adminT("formsBuilder.empty")}</p>
          <Link
            to="/admin/forms/new"
            className="mt-4 inline-flex min-h-[44px] items-center rounded-lg bg-ecaa-green-800 px-5 py-2.5 text-sm font-semibold text-ecaa-white"
          >
            {adminT("formsBuilder.createNew")}
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredForms.map((form) => (
            <article
              key={form.id}
              className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold text-ecaa-green-950">{form.title}</h2>
                    <StatusBadge
                      label={adminT(`formsBuilder.status.${form.status}`) || form.status}
                      variant={statusVariant(form.status)}
                    />
                    {form.visiblePublic && form.status === FORM_STATUS.PUBLISHED && (
                      <StatusBadge label={adminT("formsBuilder.public")} variant="live" />
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ecaa-ink-muted">
                    {form.slug} · {adminT(`formsBuilder.types.${form.formType}`) || form.formType}
                  </p>
                  <p className="mt-2 text-sm text-ecaa-ink-muted">
                    {(responseCounts[form.id] || 0) === 1
                      ? adminT("formsBuilder.responseCountOne")
                      : `${responseCounts[form.id] || 0} ${adminT("formsBuilder.responses").toLowerCase()}`}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {form.status === FORM_STATUS.PUBLISHED && form.visiblePublic && (
                    <button
                      type="button"
                      onClick={() => copyPublicLink(form.slug)}
                      className="min-h-[44px] rounded-lg border border-ecaa-border px-4 py-2 text-sm font-medium text-ecaa-green-900 hover:bg-ecaa-cream"
                    >
                      {adminT("formsBuilder.copyLink")}
                    </button>
                  )}
                  <Link
                    to={`/admin/forms/${form.id}/responses`}
                    className="inline-flex min-h-[44px] items-center rounded-lg border border-ecaa-border px-4 py-2 text-sm font-medium text-ecaa-green-900 hover:bg-ecaa-cream"
                  >
                    {adminT("formsBuilder.responses")}
                  </Link>
                  <Link
                    to={`/admin/forms/${form.id}`}
                    className="inline-flex min-h-[44px] items-center rounded-lg bg-ecaa-green-800 px-4 py-2 text-sm font-semibold text-ecaa-white hover:bg-ecaa-green-900"
                  >
                    {adminT("common.edit")}
                  </Link>
                  {form.status !== FORM_STATUS.ARCHIVED && (
                    <button
                      type="button"
                      onClick={() => handleArchive(form.id)}
                      className="min-h-[44px] rounded-lg border border-ecaa-border px-4 py-2 text-sm font-medium text-ecaa-ink-muted hover:bg-ecaa-cream"
                    >
                      {adminT("formsBuilder.archive")}
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
