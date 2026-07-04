import Badge from "../ui/Badge";
import CTAButton from "../ui/CTAButton";
import {
  formatDocumentDate,
  getDocumentUrl,
  getFileTypeLabel,
  getStatusLabel,
  getStatusVariant,
  hasUsableDocumentUrl,
} from "../../utils/documents";
import { hasUsableText } from "../../utils/data";

export default function DocumentCard({ document, categoryLabel, compact = false }) {
  const documentUrl = getDocumentUrl(document);
  const dateLabel = formatDocumentDate(document.date);
  const statusLabel = getStatusLabel(document.status);
  const fileTypeLabel = getFileTypeLabel(document.fileType);
  const isHistorical = document.status === "historical";
  const isArchived = document.status === "archived";

  return (
    <article
      className={`flex h-full flex-col rounded-ecaa-xl border bg-ecaa-white p-6 shadow-ecaa-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-ecaa-md sm:p-7 ${
        isHistorical
          ? "border-ecaa-border/80 bg-ecaa-cream/30"
          : isArchived
            ? "border-ecaa-gold-200/60"
            : "border-ecaa-border/80 hover:border-ecaa-green-200/70"
      }`}
    >
      <div className="flex flex-wrap items-center gap-2">
        {categoryLabel && <Badge variant="neutral">{categoryLabel}</Badge>}
        {statusLabel && <Badge variant={getStatusVariant(document.status)}>{statusLabel}</Badge>}
        {hasUsableText(document.language) && <Badge variant="gold">{document.language}</Badge>}
        {fileTypeLabel && <Badge variant="neutral">{fileTypeLabel}</Badge>}
      </div>

      <h3
        className={`font-semibold tracking-tight text-ecaa-ink ${compact ? "mt-3 text-lg" : "mt-4 text-xl"}`}
      >
        {document.title}
      </h3>

      {hasUsableText(document.description) && (
        <p className="mt-3 flex-1 text-base leading-relaxed text-ecaa-ink-muted">
          {document.description}
        </p>
      )}

      {dateLabel && (
        <p className="mt-4 text-sm font-medium text-ecaa-ink-subtle">
          <time dateTime={document.date}>{dateLabel}</time>
        </p>
      )}

      {documentUrl ? (
        <CTAButton
          href={documentUrl}
          variant="secondary"
          size="sm"
          className="mt-6 self-start"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View document: ${document.title} (opens in a new tab)`}
        >
          View document
        </CTAButton>
      ) : (
        <p className="mt-6 text-sm text-ecaa-ink-subtle">Document link coming soon</p>
      )}
    </article>
  );
}
