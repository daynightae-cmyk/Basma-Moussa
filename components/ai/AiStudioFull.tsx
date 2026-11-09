"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n/config";
import type { ChatMessage, ChatStreamEvent } from "@/lib/ai/contracts";

type UiMessage = ChatMessage & { id: number; status?: "streaming" | "done" | "error" };
type RecognitionResult = { isFinal: boolean; 0: { transcript: string } };
type RecognitionEvent = { resultIndex: number; results: ArrayLike<RecognitionResult> };
type RecognitionError = { error: string };
interface Recognition {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: RecognitionError) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
type RecognitionFactory = new () => Recognition;
type SpeechWindow = Window & {
  SpeechRecognition?: RecognitionFactory;
  webkitSpeechRecognition?: RecognitionFactory;
};

const COPY = {
  ar: {
    eyebrow: "عالم الإعلام · استوديو الذكاء الاصطناعي",
    title: "اسأل... والحكاية تفتح بابًا جديدًا.",
    introduction: "مرشد ودود لعوالم بسمة موسى، مبني على محتوى المنصة المعتمد فقط — لا أخبار مختلقة ولا حلقات وهمية.",
    welcome: "أهلًا بيك في الاستوديو الذكي! ✨ تحب نحكي عن رؤية بسمة، العوالم الإعلامية، أو فكرة تعاون؟",
    label: "المحادثة",
    new: "محادثة جديدة",
    placeholder: "اكتب سؤالك هنا...",
    send: "إرسال",
    sending: "جارٍ نسج الإجابة...",
    helper: "Enter للإرسال · Shift+Enter لسطر جديد",
    voice: "تحدث للإملاء الصوتي",
    listening: "جارٍ الاستماع... راجع النص قبل الإرسال",
    stopVoice: "إيقاف الإملاء",
    speechUnsupported: "الإملاء الصوتي غير مدعوم في المتصفح الحالي. استخدم الكتابة.",
    speechError: "تعذّر التعرف على الصوت. يمكنك كتابة الرسالة.",
    transcript: "النص المتعرف عليه — يمكنك تعديله قبل الإرسال",
    ready: "جاهز للحوار",
    noService: "المساعد غير متاح الآن. يلزم تكوين مزوّد AI وحماية معدل الطلبات على الخادم.",
    requestError: "تعذّر إكمال الرد. جرّب مرة أخرى.",
    privacy: "الرسائل تُرسل إلى مزوّد AI المعتمد عند الإرسال. لا تدخل بيانات شخصية أو وثائق حساسة.",
    guard: "معلومات المنصة فقط · دون استشارات قانونية شخصية",
    suggestions: [
      "احكيلي عن عالم بسمة موسى",
      "إيه هي العوالم الإعلامية الأربعة؟",
      "إزاي أبدأ تعاون إعلامي؟",
      "هل فيه حلقات صوتية منشورة؟",
    ],
    status: "تصور إعلامي · قيد التطوير",
    back: "عالم الإعلام",
  },
  en: {
    eyebrow: "Media Universe · AI Studio",
    title: "Ask a question. Open a new story.",
    introduction: "A warm guide to Basma Moussa's media universe, grounded only in the platform's approved content — no invented news or episodes.",
    welcome: "Welcome to the AI Studio! ✨ Want to explore Basma's vision, the four media worlds, or a collaboration idea?",
    label: "Conversation",
    new: "New conversation",
    placeholder: "Ask about the Media Universe...",
    send: "Send",
    sending: "Weaving an answer...",
    helper: "Enter to send · Shift+Enter for a new line",
    voice: "Start voice dictation",
    listening: "Listening... review the text before sending",
    stopVoice: "Stop voice dictation",
    speechUnsupported: "Your browser does not support voice dictation. Please type instead.",
    speechError: "Speech recognition could not complete. You can type your message.",
    transcript: "Transcribed text — editable before sending",
    ready: "Ready to explore",
    noService: "AI is not available yet. The server needs an approved provider and rate limiting configuration.",
    requestError: "The reply was interrupted. Please try again.",
    privacy: "Messages are sent to the approved AI provider when submitted. Do not share sensitive personal information or documents.",
    guard: "Approved platform content only · not personal legal advice",
    suggestions: [
      "Tell me about Basma's media vision",
      "What are the four media worlds?",
      "How can I collaborate?",
      "Are any audio episodes published?",
    ],
    status: "Media concept · in development",
    back: "Media Universe",
  },
} as const;

function MessageIcon({ user }: { user: boolean }) {
  return user ? <span className="ai-avatar__user" aria-hidden="true">●</span> :
    <Image src="/brand/basma-icon-circle.png" width={30} height={30} alt="" />;
}

function VoiceIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2.5" width="6" height="12.5" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v4m-4 0h8" />
    </svg>
  );
}

function GoldThreadLoading() {
  return (
    <span className="ai-gold-loading" aria-hidden="true">
      <svg viewBox="0 0 100 32" width="82" height="28" fill="none">
        <path d="M2 17C15 2 23 30 36 17S58 2 70 17 89 30 98 12"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" pathLength="1" />
      </svg>
    </span>
  );
}

function successfulHistory(messages: UiMessage[]): ChatMessage[] {
  const complete: ChatMessage[] = [];
  for (let i = 0; i < messages.length - 1; i++) {
    if (messages[i].role === "user" && messages[i + 1].role === "assistant" &&
        messages[i + 1].status === "done" && messages[i + 1].content.trim()) {
      complete.push({ role: "user", content: messages[i].content });
      complete.push({ role: "assistant", content: messages[i + 1].content });
      i++;
    }
  }
  return complete.slice(-12);
}

export function AiStudioFull({
  locale, mediaSrc, mediaAlt,
}: {
  locale: Locale;
  mediaSrc: string;
  mediaAlt: string;
}) {
  const copy = COPY[locale];
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [transcription, setTranscription] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nextId = useRef(1);
  const operation = useRef(0);
  const requestAbort = useRef<AbortController | null>(null);
  const recognition = useRef<Recognition | null>(null);
  const voiceBase = useRef("");
  const endOfMessages = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const op = operation;
    const request = requestAbort;
    const speech = recognition;
    const frame = window.requestAnimationFrame(() => {
      const speechWindow = window as SpeechWindow;
      setSpeechSupported(Boolean(speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition));
    });
    return () => {
      window.cancelAnimationFrame(frame);
      op.current++;
      request.current?.abort();
      speech.current?.abort();
    };
  }, []);

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [messages]);

  const stopVoice = useCallback(() => {
    recognition.current?.stop();
    setListening(false);
  }, []);

  const reset = useCallback(() => {
    operation.current++;
    requestAbort.current?.abort();
    requestAbort.current = null;
    recognition.current?.abort();
    recognition.current = null;
    setListening(false);
    setMessages([]);
    setDraft("");
    setTranscription("");
    setError("");
    setLoading(false);
    inputRef.current?.focus();
  }, []);

  const startVoice = useCallback(() => {
    if (loading) return;
    if (listening) { stopVoice(); return; }
    const speechWindow = window as SpeechWindow;
    const Factory = speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;
    if (!Factory) { setError(copy.speechUnsupported); return; }
    try {
      const instance = new Factory();
      recognition.current = instance;
      voiceBase.current = draft.trim();
      instance.lang = locale === "ar" ? "ar-AE" : "en-US";
      instance.interimResults = true;
      instance.continuous = false;
      instance.onresult = (event) => {
        let spoken = "";
        for (let i = 0; i < event.results.length; i++) {
          spoken += event.results[i][0]?.transcript ?? "";
        }
        const candidate = [voiceBase.current, spoken.trim()].filter(Boolean).join(" ").slice(0, 2_400);
        setTranscription(spoken.trim());
        setDraft(candidate);
      };
      instance.onerror = () => { setError(copy.speechError); setListening(false); };
      instance.onend = () => { setListening(false); recognition.current = null; };
      setError("");
      setListening(true);
      instance.start();
    } catch {
      setListening(false);
      setError(copy.speechUnsupported);
    }
  }, [copy, draft, listening, loading, locale, stopVoice]);

  const send = useCallback(async (override?: string) => {
    const question = (override ?? draft).trim();
    if (loading || listening || !question || question.length > 2_400) return;
    const thread = successfulHistory(messages);
    const requestMessages: ChatMessage[] = [...thread, { role: "user", content: question }];
    const userId = nextId.current++;
    const assistantId = nextId.current++;
    const generation = ++operation.current;
    const controller = new AbortController();
    requestAbort.current = controller;

    setMessages((prev) => [...prev,
      { id: userId, role: "user", content: question },
      { id: assistantId, role: "assistant", content: "", status: "streaming" }]);
    setDraft("");
    setTranscription("");
    setError("");
    setLoading(true);

    let finished = false;
    let received = false;
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, messages: requestMessages }),
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok || !response.body) {
        const result: unknown = await response.json().catch(() => null);
        const code = result && typeof result === "object" && "error" in result
          ? String((result as { error: unknown }).error) : "";
        throw new Error(code === "AI_NOT_CONFIGURED" || code === "RATE_LIMIT_UNAVAILABLE"
          ? copy.noService : copy.requestError);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      const accept = (frame: string) => {
        const data = frame.split("\n").filter((line) => line.startsWith("data:"))
          .map((line) => line.slice(5).trimStart()).join("\n");
        if (!data) return;
        let event: ChatStreamEvent;
        try { event = JSON.parse(data) as ChatStreamEvent; }
        catch { throw new Error(copy.requestError); }
        if (event.type === "delta") {
          received = true;
          setMessages((current) => current.map((message) =>
            message.id === assistantId ? { ...message, content: message.content + event.text } : message));
        } else if (event.type === "error") {
          throw new Error(copy.requestError);
        } else if (event.type === "done") {
          finished = true;
        }
      };

      while (!finished) {
        const packet = await reader.read();
        if (packet.done) break;
        buffer += decoder.decode(packet.value, { stream: true }).replace(/\r\n/g, "\n");
        const frames = buffer.split("\n\n");
        buffer = frames.pop() ?? "";
        for (const frame of frames) accept(frame);
      }
      if (!finished || !received) throw new Error(copy.requestError);
      if (generation === operation.current) {
        setMessages((current) => current.map((message) =>
          message.id === assistantId ? { ...message, status: "done" } : message));
      }
      await reader.cancel().catch(() => undefined);
    } catch (caught) {
      if (generation === operation.current && !controller.signal.aborted) {
        setError(caught instanceof Error ? caught.message : copy.requestError);
        setMessages((current) => current.map((message) =>
          message.id === assistantId ? { ...message, status: "error" } : message));
        setDraft(question);
      }
    } finally {
      if (generation === operation.current) {
        setLoading(false);
        requestAbort.current = null;
      }
    }
  }, [copy, draft, listening, loading, locale, messages]);

  return (
    <section className="ai-studio" dir={locale === "ar" ? "rtl" : "ltr"} aria-label={copy.label}>
      <aside className="ai-studio__vision">
        <Image src={mediaSrc} alt={mediaAlt} fill sizes="(max-width: 960px) 100vw, 35vw"
          className="ai-studio__vision-image" priority />
        <div className="ai-studio__vision-shade" aria-hidden="true" />
        <div className="ai-studio__gold-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="ai-studio__vision-copy">
          <span className="ai-studio__eyebrow">{copy.eyebrow}</span>
          <h1 className="ai-studio__title">{copy.title}</h1>
          <p>{copy.introduction}</p>
          <div className="ai-studio__gold-line" aria-hidden="true" />
          <span className="ai-studio__vision-status">{copy.status}</span>
        </div>
      </aside>

      <div className="ai-studio__workspace">
        <header className="ai-studio__toolbar">
          <div className="ai-studio__title-line">
            <Image src="/brand/basma-icon-circle.png" alt="" width={42} height={42} />
            <div><strong>{copy.label}</strong><small>{copy.ready}</small></div>
          </div>
          <button className="ai-studio__new" onClick={reset} type="button">{copy.new}</button>
        </header>

        <div className="ai-studio__conversation" role="log" aria-label={copy.label}
          aria-live="polite" aria-relevant="additions text" data-testid="ai-message-log">
          <div className="ai-studio__message ai-studio__message--assistant">
            <span className="ai-studio__avatar"><MessageIcon user={false} /></span>
            <p>{copy.welcome}</p>
          </div>
          {messages.map((message) => (
            <div key={message.id} className={
              "ai-studio__message ai-studio__message--" + message.role
            } data-testid={"ai-message-" + message.role}>
              <span className="ai-studio__avatar"><MessageIcon user={message.role === "user"} /></span>
              <div className="ai-studio__bubble">
                <p dir="auto" className="ai-studio__bubble-text">{message.content}</p>
                {message.status === "streaming" && (
                  <span className="ai-studio__busy">
                    <GoldThreadLoading /> <span className="sr-only">{copy.sending}</span>
                  </span>
                )}
              </div>
            </div>
          ))}
          <div ref={endOfMessages} />
        </div>

        <div className="ai-studio__bottom">
          {error && <p role="alert" className="ai-studio__error">{error}</p>}
          {transcription && <p className="ai-studio__transcript" role="status">{copy.transcript}</p>}
          <div className="ai-studio__suggestions" aria-label={copy.label}>
            {copy.suggestions.map((suggestion) => (
              <button type="button" key={suggestion} disabled={loading || listening}
                onClick={() => { setDraft(suggestion); inputRef.current?.focus(); }}>
                {suggestion}
              </button>
            ))}
          </div>
          <form className="ai-studio__composer" onSubmit={(event) => {
            event.preventDefault(); void send();
          }}>
            <label className="sr-only" htmlFor="ai-studio-input">{copy.placeholder}</label>
            <textarea id="ai-studio-input" ref={inputRef} rows={2} maxLength={2_400}
              placeholder={copy.placeholder} value={draft} disabled={loading}
              onChange={(event) => { setDraft(event.target.value); setTranscription(""); }}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault(); void send();
                }
              }} />
            <div className="ai-studio__composer-actions">
              <button className={"ai-studio__mic" + (listening ? " is-listening" : "")}
                type="button" onClick={startVoice} disabled={loading}
                title={!speechSupported ? copy.speechUnsupported : listening ? copy.stopVoice : copy.voice}
                aria-label={!speechSupported ? copy.speechUnsupported : listening ? copy.stopVoice : copy.voice}
                aria-pressed={listening}>
                <VoiceIcon />
              </button>
              <button type="submit" className="ai-studio__send"
                disabled={loading || listening || !draft.trim() || draft.length > 2_400}>
                {copy.send}<span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
          {listening && <p role="status" className="ai-studio__listening">{copy.listening}</p>}
          <div className="ai-studio__disclosure">
            <small>{copy.privacy}</small>
            <small>{copy.guard}</small>
          </div>
          <Link href={"/" + locale + "/media"} className="ai-studio__back">{copy.back}</Link>
        </div>
      </div>
    </section>
  );
}
