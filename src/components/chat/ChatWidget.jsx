import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";
import { getChatHelpContent } from "../../data/chatHelpContent";
import { getChatbotReply } from "../../utils/chatbotEngine";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import ChatLauncher from "./ChatLauncher";
import ChatMessage from "./ChatMessage";
import QuickActionButton from "./QuickActionButton";

function createMessageId() {
  return globalThis.crypto?.randomUUID?.() ?? `msg-${Date.now()}-${Math.random()}`;
}

function createBotMessage(text) {
  return {
    id: createMessageId(),
    sender: "bot",
    text,
    actions: [],
  };
}

export default function ChatWidget() {
  const location = useLocation();
  const { language } = useLanguage();
  const content = getChatHelpContent(language);
  const panelId = useId();
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const launcherRef = useRef(null);
  const messagesEndRef = useRef(null);
  const liveRegionRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  useFocusTrap(panelRef, isOpen, {
    initialFocusRef: inputRef,
    returnFocusRef: launcherRef,
    onEscape: closeChat,
  });

  const resetChat = useCallback(() => {
    setInput("");
    setMessages([createBotMessage(content.intro)]);
    window.setTimeout(() => inputRef.current?.focus(), 100);
  }, [content.intro]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setMessages((current) => (current.length === 0 ? [createBotMessage(content.intro)] : current));
  }, [content.intro]);

  const toggleChat = useCallback(() => {
    if (isOpen) closeChat();
    else openChat();
  }, [isOpen, closeChat, openChat]);

  const addMessage = useCallback((message) => {
    setMessages((current) => [...current, message]);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = input.trim();
    if (!text) return;

    const reply = getChatbotReply(text, language);

    if (import.meta.env.DEV) {
      console.log("Chatbot submitted:", text);
      console.log("Chatbot reply:", reply);
    }

    addMessage({
      id: createMessageId(),
      sender: "user",
      text,
    });

    addMessage({
      id: createMessageId(),
      sender: "bot",
      text: reply.text,
      actions: reply.actions || [],
    });

    setInput("");
  };

  const handleNavigate = () => {
    closeChat();
  };

  useEffect(() => {
    closeChat();
  }, [location.pathname, closeChat]);

  useEffect(() => {
    if (!isOpen) return;
    setMessages((current) => {
      if (current.length === 1 && current[0].sender === "bot" && !current[0].actions?.length) {
        return [createBotMessage(content.intro)];
      }
      return current;
    });
  }, [language, content.intro, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    messagesEndRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.sender === "bot" && liveRegionRef.current) {
      liveRegionRef.current.textContent = lastMessage.text;
    }
  }, [messages, isOpen]);

  if (isAdminRoute) return null;

  return (
    <>
      <ChatLauncher ref={launcherRef} isOpen={isOpen} onClick={toggleChat} />

      {isOpen && (
        <div
          ref={panelRef}
          id="ecaa-chat-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${panelId}-title`}
          className="chat-panel fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom,0px))] left-3 right-3 z-30 flex max-h-[min(75vh,32rem)] w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-2xl border border-ecaa-gold-200/50 bg-ecaa-white shadow-ecaa-lg sm:bottom-24 sm:left-auto sm:right-4 sm:z-40 sm:w-96 sm:max-w-sm md:max-h-[75vh]"
        >
          <header className="chat-panel-header flex shrink-0 items-start justify-between gap-3 border-b border-ecaa-green-800/30 px-4 py-3.5 text-ecaa-white">
            <div className="min-w-0">
              <h2
                id={`${panelId}-title`}
                className="text-base font-semibold normal-case leading-snug"
              >
                {content.title}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-ecaa-green-100/90">
                {content.subtitle}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                className="min-h-[44px] rounded-lg px-2 py-1 text-xs font-medium normal-case text-ecaa-green-100 transition-colors hover:bg-ecaa-green-800/80 hover:text-ecaa-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                onClick={resetChat}
              >
                {content.startOver}
              </button>
              <button
                type="button"
                className="min-h-[44px] rounded-lg px-2 py-1 text-sm font-medium normal-case text-ecaa-green-100 transition-colors hover:bg-ecaa-green-800/80 hover:text-ecaa-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
                aria-label={content.closeAria}
                onClick={closeChat}
              >
                {content.close}
              </button>
            </div>
          </header>

          <div
            className="flex-1 space-y-3 overflow-y-auto scroll-smooth bg-gradient-to-b from-ecaa-cream/70 to-ecaa-cream/30 px-4 py-4"
            aria-live="polite"
            aria-relevant="additions text"
            aria-atomic="false"
          >
            <div ref={liveRegionRef} className="sr-only" aria-live="polite" />
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onNavigate={handleNavigate} />
            ))}
            <div ref={messagesEndRef} aria-hidden="true" className="h-px shrink-0" />
          </div>

          <div className="shrink-0 border-t border-ecaa-border/60 bg-ecaa-white px-4 py-3">
            <p className="mb-2.5 text-xs font-medium normal-case text-ecaa-ink-subtle">
              {content.quickLinksLabel}
            </p>
            <div className="mb-3 flex flex-wrap gap-2">
              {content.quickActions.map((action) => (
                <QuickActionButton
                  key={action.href}
                  label={action.label}
                  href={action.href}
                  onNavigate={handleNavigate}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <label htmlFor={`${panelId}-search`} className="sr-only">
                {content.searchLabel}
              </label>
              <input
                ref={inputRef}
                id={`${panelId}-search`}
                type="text"
                autoComplete="off"
                value={input}
                placeholder={content.placeholder}
                className="min-h-[44px] min-w-0 flex-1 rounded-lg border border-ecaa-border/80 bg-ecaa-cream/30 px-3 py-2.5 text-base normal-case text-ecaa-ink placeholder:text-ecaa-ink-faint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ecaa-green-700"
                onChange={(event) => setInput(event.target.value)}
              />
              <button
                type="submit"
                className="min-h-[44px] shrink-0 rounded-lg bg-ecaa-gold-500 px-4 py-2.5 text-sm font-semibold normal-case text-ecaa-green-950 transition-colors hover:bg-ecaa-gold-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ecaa-green-700"
              >
                {content.submit}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
