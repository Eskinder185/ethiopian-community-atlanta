import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FormSelect from "../../components/admin/FormSelect";
import FormTextarea from "../../components/admin/FormTextarea";
import SaveButton from "../../components/admin/SaveButton";
import StatusBadge from "../../components/admin/StatusBadge";
import { useAdminLanguage } from "../../context/AdminLanguageContext";
import {
  RESPONSE_STATUS,
  deleteFormResponse,
  downloadCsv,
  exportResponsesToCsv,
  fetchFormWithFieldsForAdmin,
  fetchResponsesForAdmin,
  updateFormResponse,
} from "../../utils/forms";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

function previewResponse(response) {
  const data = response.responseData || {};
  const firstValue = Object.values(data).find((val) => {
    if (Array.isArray(val)) return val.length > 0;
    return typeof val === "string" && val.trim();
  });
  if (Array.isArray(firstValue)) return firstValue.join(", ");
  return typeof firstValue === "string" ? firstValue.slice(0, 80) : "";
}

export default function AdminFormResponses() {
  const { id } = useParams();
  const { adminT } = useAdminLanguage();
  const [form, setForm] = useState(null);
  const [fields, setFields] = useState([]);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  async function loadData() {
    setLoading(true);
    try {
      const formResult = await fetchFormWithFieldsForAdmin(id);
      if (!formResult) {
        setError(adminT("formsBuilder.notFound"));
        return;
      }
      setForm(formResult.form);
      setFields(formResult.fields);
      const items = await fetchResponsesForAdmin(id);
      setResponses(items);
      if (items[0]) {
        setSelectedId(items[0].id);
        setDraft({ ...items[0] });
      }
    } catch (loadError) {
      console.error(loadError);
      setError(adminT("formsBuilder.loadError"));
    } finally {
      setLoading(false);
    }
  }

  const filteredResponses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return responses.filter((response) => {
      const matchesStatus = statusFilter === "all" || response.status === statusFilter;
      if (!matchesStatus) return false;
      if (!query) return true;
      const haystack = [
        response.submitterName,
        response.submitterEmail,
        JSON.stringify(response.responseData),
        response.adminNotes,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [responses, search, statusFilter]);

  useEffect(() => {
    const selected = responses.find((item) => item.id === selectedId);
    setDraft(selected ? { ...selected } : null);
  }, [selectedId, responses]);

  async function handleSave() {
    if (!draft) return;
    setSaving(true);
    setError("");
    try {
      const updated = await updateFormResponse(draft.id, {
        status: draft.status,
        adminNotes: draft.adminNotes,
      });
      setResponses((current) => current.map((item) => (item.id === updated.id ? updated : item)));
      setDraft({ ...updated });
      setMessage(adminT("formsBuilder.responseSaved"));
    } catch (saveError) {
      console.error(saveError);
      setError(adminT("formsBuilder.responseSaveError"));
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(responseId) {
    if (!window.confirm(adminT("formsBuilder.deleteResponseConfirm"))) return;
    try {
      await deleteFormResponse(responseId);
      setResponses((current) => current.filter((item) => item.id !== responseId));
      setMessage(adminT("formsBuilder.responseDeleted"));
      if (selectedId === responseId) {
        setSelectedId(null);
        setDraft(null);
      }
    } catch (deleteError) {
      console.error(deleteError);
      setError(adminT("formsBuilder.responseDeleteError"));
    }
  }

  function handleExport() {
    const csv = exportResponsesToCsv({ form, fields, responses: filteredResponses });
    downloadCsv(csv, `ecaa-form-responses-${form.slug}.csv`);
    setMessage(adminT("formsBuilder.csvExported"));
  }

  if (loading) {
    return <p className="text-ecaa-ink-muted">{adminT("common.loading")}</p>;
  }

  if (!form) {
    return <p className="text-ecaa-red-700">{error || adminT("formsBuilder.notFound")}</p>;
  }

  const statusOptions = RESPONSE_STATUS.map((status) => ({
    value: status,
    label: adminT(`formsBuilder.responseStatus.${status}`) || status,
  }));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link to={`/admin/forms/${form.id}`} className="text-sm font-medium text-ecaa-green-800 hover:underline">
            ← {adminT("formsBuilder.backToForm")}
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-ecaa-ink">{form.title}</h1>
          <p className="mt-1 text-sm text-ecaa-ink-muted">{adminT("formsBuilder.responsesTitle")}</p>
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="inline-flex min-h-[44px] items-center rounded-lg bg-ecaa-green-800 px-5 py-2.5 text-sm font-semibold text-ecaa-white hover:bg-ecaa-green-900"
        >
          {adminT("formsBuilder.exportCsv")}
        </button>
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

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={adminT("formsBuilder.searchResponses")}
          className="min-h-[44px] rounded-lg border border-ecaa-border/80 px-4 text-base"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="min-h-[44px] rounded-lg border border-ecaa-border/80 px-4 text-base"
        >
          <option value="all">{adminT("formsBuilder.allStatuses")}</option>
          {RESPONSE_STATUS.map((status) => (
            <option key={status} value={status}>
              {adminT(`formsBuilder.responseStatus.${status}`) || status}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="space-y-3 lg:col-span-2">
          {filteredResponses.length === 0 ? (
            <p className="rounded-lg border border-ecaa-border/80 bg-ecaa-white p-6 text-sm text-ecaa-ink-muted">
              {adminT("formsBuilder.noResponses")}
            </p>
          ) : (
            filteredResponses.map((response) => (
              <button
                key={response.id}
                type="button"
                onClick={() => setSelectedId(response.id)}
                className={[
                  "w-full rounded-ecaa-xl border p-4 text-left shadow-ecaa-sm transition-colors",
                  selectedId === response.id
                    ? "border-ecaa-green-400 bg-ecaa-green-50"
                    : "border-ecaa-border/80 bg-ecaa-white hover:border-ecaa-green-200",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-ecaa-green-950">
                      {response.submitterName || adminT("formsBuilder.anonymous")}
                    </p>
                    <p className="text-sm text-ecaa-ink-muted">{response.submitterEmail || "—"}</p>
                  </div>
                  <StatusBadge
                    label={adminT(`formsBuilder.responseStatus.${response.status}`) || response.status}
                    variant={response.status === "new" ? "live" : "draft"}
                  />
                </div>
                <p className="mt-2 text-xs text-ecaa-ink-subtle">{formatDate(response.createdAt)}</p>
                <p className="mt-2 line-clamp-2 text-sm text-ecaa-ink-muted">{previewResponse(response)}</p>
              </button>
            ))
          )}
        </div>

        <div className="lg:col-span-3">
          {draft ? (
            <div className="rounded-ecaa-xl border border-ecaa-border/80 bg-ecaa-white p-5 shadow-ecaa-sm sm:p-6">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-semibold text-ecaa-green-950">
                  {draft.submitterName || adminT("formsBuilder.anonymous")}
                </h2>
                <button
                  type="button"
                  onClick={() => handleDelete(draft.id)}
                  className="text-sm font-medium text-ecaa-red-700 hover:underline"
                >
                  {adminT("common.delete")}
                </button>
              </div>
              <p className="text-sm text-ecaa-ink-muted">
                {draft.submitterEmail || "—"} · {formatDate(draft.createdAt)} · {draft.language}
              </p>

              <dl className="mt-6 space-y-4">
                {fields.map((field) => {
                  const value = draft.responseData?.[field.fieldKey];
                  const display =
                    Array.isArray(value) ? value.join(", ") : value === true ? "Yes" : value ?? "—";
                  return (
                    <div key={field.id || field.fieldKey}>
                      <dt className="text-sm font-semibold text-ecaa-green-950">{field.label}</dt>
                      <dd className="mt-1 text-base text-ecaa-ink-muted">{String(display)}</dd>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-6 grid gap-4">
                <FormSelect
                  label={adminT("common.status")}
                  value={draft.status}
                  onChange={(e) => setDraft((current) => ({ ...current, status: e.target.value }))}
                  options={statusOptions}
                />
                <FormTextarea
                  label={adminT("formsBuilder.adminNotes")}
                  value={draft.adminNotes || ""}
                  onChange={(e) => setDraft((current) => ({ ...current, adminNotes: e.target.value }))}
                  rows={4}
                />
                <SaveButton onClick={handleSave} saving={saving} />
              </div>
            </div>
          ) : (
            <p className="rounded-lg border border-ecaa-border/80 bg-ecaa-white p-6 text-sm text-ecaa-ink-muted">
              {adminT("formsBuilder.selectResponse")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
