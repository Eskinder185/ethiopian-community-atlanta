import { Link } from "react-router-dom";

function ActionLink({ action, onNavigate }) {
  const isExternal = action.external || action.href.startsWith("http");
  const linkClass =
    "inline-flex min-h-[44px] items-center justify-center rounded-lg bg-ecaa-green-900 px-3 py-2 text-sm font-medium normal-case text-ecaa-white transition-colors duration-200 hover:bg-ecaa-green-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ecaa-green-700";

  if (isExternal) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onNavigate}
        aria-label={`${action.label} (opens in a new tab)`}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link to={action.href} className={linkClass} onClick={onNavigate}>
      {action.label}
    </Link>
  );
}

export default function ChatMessage({ message, onNavigate }) {
  const isUser = message.sender === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] break-words rounded-2xl rounded-br-md bg-ecaa-green-900 px-4 py-3 text-sm leading-relaxed text-ecaa-white shadow-ecaa-sm">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[95%] break-words rounded-2xl rounded-bl-md border border-ecaa-green-100 bg-ecaa-green-50/90 px-4 py-3 text-sm leading-relaxed text-ecaa-ink shadow-ecaa-sm">
        <p>{message.text}</p>
        {message.actions?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <ActionLink
                key={`${action.href}-${action.label}`}
                action={action}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
