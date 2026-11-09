"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import {
  ATELIER_DRAFT_KEY,
  ATMOSPHERES,
  MAX_STORY_CARDS,
  MOODS,
  STORY_THEMES,
  addCard,
  buildStoryboard,
  createDraft,
  moveCard,
  parseDraft,
  removeCard,
  themeById,
  type AtmosphereId,
  type MoodId,
  type ThemeId,
} from "@/lib/experience/atelier";

/**
 * The Story Atelier: choose a theme, atmosphere and mood, then arrange scene
 * cards. The golden thread links the sequence and the composition plays back as
 * a concept storyboard. Drafts are local to this device; nothing is published.
 */
export function StoryAtelier({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [themeId, setThemeId] = useState<ThemeId>("human");
  const [atmosphereId, setAtmosphereId] = useState<AtmosphereId>("intimate");
  const [moodId, setMoodId] = useState<MoodId>("gold");
  const [cards, setCards] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "saved" | "restored" | "cleared" | "hint"; text: string }>(
    { kind: "idle", text: "" },
  );
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [thread, setThread] = useState<{ d: string; w: number; h: number }>({ d: "", w: 0, h: 0 });

  const listRef = useRef<HTMLOListElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const theme = themeById(themeId) ?? STORY_THEMES[0];
  const storyboard = useMemo(
    () => buildStoryboard({ themeId, atmosphereId, moodId, cards, note }),
    [atmosphereId, cards, moodId, note, themeId],
  );

  // Restore a draft once on mount (never during render; storage is browser-only).
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = parseDraft(localStorage.getItem(ATELIER_DRAFT_KEY));
      if (!saved) return;
      setThemeId(saved.themeId);
      setAtmosphereId(saved.atmosphereId);
      setMoodId(saved.moodId);
      setCards(saved.cards);
      setNote(saved.note);
      setStatus({ kind: "restored", text: dict.atelier.draftRestored });
    } catch {
      // Storage unavailable: start clean.
    }
  }, [dict.atelier.draftRestored]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // The thread follows the cards: recomputed whenever the sequence or layout changes.
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const measure = () => {
      const listRect = list.getBoundingClientRect();
      const nodes = Array.from(list.querySelectorAll<HTMLElement>("[data-atelier-card]"));
      if (nodes.length < 2) {
        setThread({ d: "", w: listRect.width, h: listRect.height });
        return;
      }
      const rtl = locale === "ar";
      const points = nodes.map((node, index) => {
        const rect = node.getBoundingClientRect();
        const inset = 14 + (index % 2 === 0 ? 0 : 9);
        return {
          x: rtl ? listRect.width - inset : inset,
          y: rect.top - listRect.top + rect.height / 2,
        };
      });
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let index = 1; index < points.length; index += 1) {
        const previous = points[index - 1];
        const point = points[index];
        const midY = (previous.y + point.y) / 2;
        path += ` C ${previous.x} ${midY}, ${point.x} ${midY}, ${point.x} ${point.y}`;
      }
      setThread({ d: path, w: listRect.width, h: listRect.height });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [cards, locale]);

  const saveDraft = useCallback(() => {
    try {
      const draft = createDraft({ themeId, atmosphereId, moodId, cards, note });
      localStorage.setItem(ATELIER_DRAFT_KEY, JSON.stringify(draft));
      const time = new Intl.DateTimeFormat(locale === "ar" ? "ar-AE" : "en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
      setStatus({
        kind: "saved",
        text: dict.atelier.savedAt.replace("{time}", time),
      });
    } catch {
      setStatus({ kind: "hint", text: dict.atelier.localNote });
    }
  }, [atmosphereId, cards, dict.atelier.localNote, dict.atelier.savedAt, locale, moodId, note, themeId]);

  const clearDraft = useCallback(() => {
    try {
      localStorage.removeItem(ATELIER_DRAFT_KEY);
    } catch {
      // ignore
    }
    setStatus({ kind: "cleared", text: dict.atelier.cleared });
  }, [dict.atelier.cleared]);

  const openPreview = useCallback(() => {
    if (storyboard.length < 2) {
      setStatus({ kind: "hint", text: dict.atelier.needScenes });
      return;
    }
    setPreviewIndex(0);
    setPreviewOpen(true);
  }, [dict.atelier.needScenes, storyboard.length]);

  useEffect(() => {
    if (!previewOpen) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewOpen(false);
      } else if (event.key === "ArrowRight") {
        setPreviewIndex((index) => Math.min(storyboard.length - 1, index + 1));
      } else if (event.key === "ArrowLeft") {
        setPreviewIndex((index) => Math.max(0, index - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewOpen, storyboard.length]);

  const closePreview = useCallback(() => {
    setPreviewOpen(false);
    previewTriggerRef.current?.focus({ preventScroll: true });
  }, []);

  const frame = storyboard[previewIndex];
  const mood = MOODS.find((entry) => entry.id === moodId) ?? MOODS[0];

  return (
    <section className="atelier" id="atelier" aria-labelledby="atelier-title">
      <div className="shell">
        <header className="atelier__head">
          <p className="eyebrow eyebrow-gold">{dict.atelier.eyebrow}</p>
          <h1 id="atelier-title" className="display display-l">
            {dict.atelier.title}
          </h1>
          <p className="lead">{dict.atelier.lead}</p>
        </header>

        <div className="atelier__grid">
          <div className="atelier__bench">
            <section className="atelier-step" aria-labelledby="atelier-theme">
              <h2 id="atelier-theme" className="atelier-step__title">
                <span aria-hidden="true">01</span>
                {dict.atelier.stepTheme}
              </h2>
              <div className="atelier-chips">
                {STORY_THEMES.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="atelier-chip"
                    aria-pressed={themeId === entry.id}
                    onClick={() => {
                      setThemeId(entry.id);
                      setCards([]);
                    }}
                    title={entry.blurb[locale]}
                  >
                    {entry.label[locale]}
                  </button>
                ))}
              </div>
              <p className="atelier-step__note">{theme.blurb[locale]}</p>
            </section>

            <section className="atelier-step" aria-labelledby="atelier-atmosphere">
              <h2 id="atelier-atmosphere" className="atelier-step__title">
                <span aria-hidden="true">02</span>
                {dict.atelier.stepAtmosphere}
              </h2>
              <div className="atelier-chips">
                {ATMOSPHERES.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="atelier-chip"
                    aria-pressed={atmosphereId === entry.id}
                    onClick={() => setAtmosphereId(entry.id)}
                    title={entry.note[locale]}
                  >
                    {entry.label[locale]}
                  </button>
                ))}
              </div>
              <p className="atelier-step__note">
                {ATMOSPHERES.find((entry) => entry.id === atmosphereId)?.note[locale]}
              </p>
            </section>

            <section className="atelier-step" aria-labelledby="atelier-mood">
              <h2 id="atelier-mood" className="atelier-step__title">
                <span aria-hidden="true">03</span>
                {dict.atelier.stepMood}
              </h2>
              <div className="atelier-chips">
                {MOODS.map((entry) => (
                  <button
                    key={entry.id}
                    type="button"
                    className="atelier-chip atelier-chip--mood"
                    aria-pressed={moodId === entry.id}
                    onClick={() => setMoodId(entry.id)}
                    style={{
                      backgroundImage: `linear-gradient(120deg, ${entry.from}, ${entry.to})`,
                      color: entry.ink,
                    }}
                  >
                    {entry.label[locale]}
                  </button>
                ))}
              </div>
              <p className="atelier-step__note">{mood.note[locale]}</p>
            </section>

            <section className="atelier-step" aria-labelledby="atelier-scenes">
              <h2 id="atelier-scenes" className="atelier-step__title">
                <span aria-hidden="true">04</span>
                {dict.atelier.stepScenes}
              </h2>
              <ul className="beat-list">
                {theme.beats.map((beat) => {
                  const added = cards.includes(beat.id);
                  const full = cards.length >= MAX_STORY_CARDS;
                  return (
                    <li key={beat.id} className="beat-card" data-added={added}>
                      <div className="beat-card__text">
                        <p className="beat-card__title">{beat.title[locale]}</p>
                        <p className="beat-card__beat">{beat.beat[locale]}</p>
                      </div>
                      <button
                        type="button"
                        className="beat-card__add"
                        onClick={() => setCards((previous) => addCard(previous, beat.id, theme))}
                        disabled={added || full}
                      >
                        {added ? dict.atelier.added : dict.atelier.addScene}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          </div>

          <div className="atelier__desk">
            <section className="atelier-sequence" aria-labelledby="atelier-sequence-title">
              <header className="atelier-sequence__head">
                <h2 id="atelier-sequence-title">{dict.atelier.sequence}</h2>
                <span className="atelier-sequence__count">
                  {storyboard.length} / {MAX_STORY_CARDS}
                </span>
              </header>

              <div className="atelier-sequence__body">
                {thread.d && thread.w > 0 && (
                  <svg
                    className="atelier-thread"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                    viewBox={`0 0 ${thread.w} ${thread.h}`}
                  >
                    <defs>
                      <linearGradient id="atelier-thread-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f7ecd6" />
                        <stop offset="55%" stopColor="#d7ab62" />
                        <stop offset="100%" stopColor="#b38642" />
                      </linearGradient>
                    </defs>
                    <path d={thread.d} pathLength={1} />
                  </svg>
                )}
                <ol className="atelier-sequence__list" ref={listRef} aria-label={dict.atelier.sequence}>
                  {cards.map((cardId, index) => {
                    const beat = theme.beats.find((entry) => entry.id === cardId);
                    if (!beat) return null;
                    return (
                      <li key={cardId} className="sequence-card" data-atelier-card>
                        <span className="sequence-card__index" aria-hidden="true">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="sequence-card__text">
                          <p className="sequence-card__title">{beat.title[locale]}</p>
                          <p className="sequence-card__beat">{beat.beat[locale]}</p>
                        </div>
                        <div className="sequence-card__actions">
                          <button
                            type="button"
                            onClick={() => setCards((previous) => moveCard(previous, index, index - 1))}
                            disabled={index === 0}
                            aria-label={`${dict.atelier.moveUp}: ${beat.title[locale]}`}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            onClick={() => setCards((previous) => moveCard(previous, index, index + 1))}
                            disabled={index === cards.length - 1}
                            aria-label={`${dict.atelier.moveDown}: ${beat.title[locale]}`}
                          >
                            ↓
                          </button>
                          <button
                            type="button"
                            onClick={() => setCards((previous) => removeCard(previous, cardId))}
                            aria-label={`${dict.atelier.remove}: ${beat.title[locale]}`}
                          >
                            ×
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>
                {cards.length === 0 && (
                  <p className="atelier-sequence__empty">{dict.atelier.emptyHint}</p>
                )}
              </div>

              <button
                ref={previewTriggerRef}
                type="button"
                className="btn btn-gold atelier-preview-btn"
                onClick={openPreview}
                aria-haspopup="dialog"
              >
                {dict.atelier.preview}
              </button>
            </section>

            <section className="atelier-notes" aria-labelledby="atelier-notes-title">
              <h2 id="atelier-notes-title" className="atelier-step__title">
                <span aria-hidden="true">05</span>
                {dict.atelier.notesLabel}
              </h2>
              <label className="field">
                <span className="field__label">{dict.atelier.notesLabel}</span>
                <textarea
                  className="field__input"
                  rows={4}
                  value={note}
                  placeholder={dict.atelier.notesPlaceholder}
                  onChange={(event) => setNote(event.target.value.slice(0, 600))}
                />
              </label>
              <div className="atelier-notes__actions">
                <button type="button" className="btn btn-ghost" onClick={saveDraft}>
                  {dict.atelier.saveDraft}
                </button>
                <button type="button" className="console-link" onClick={clearDraft}>
                  {dict.atelier.clearDraft}
                </button>
              </div>
              <p className="atelier-notes__local">{dict.atelier.localNote}</p>
              {status.text && (
                <p className="atelier-notes__status" data-kind={status.kind} role="status">
                  {status.text}
                </p>
              )}
            </section>
          </div>
        </div>
      </div>

      {previewOpen && frame && (
        <div
          className="atelier-theatre"
          role="dialog"
          aria-modal="true"
          aria-label={dict.atelier.previewTitle}
          onClick={(event) => {
            if (event.target === event.currentTarget) closePreview();
          }}
        >
          <div className="atelier-theatre__frame">
            <div
              className="atelier-theatre__stage"
              style={{ backgroundImage: `linear-gradient(160deg, ${frame.mood.from}, ${frame.mood.to})` }}
            >
              <span className="atelier-theatre__scene" aria-hidden="true">
                {String(previewIndex + 1).padStart(2, "0")}
              </span>
              <p className="atelier-theatre__eyebrow">
                {frame.atmosphere.label[locale]} · {frame.mood.label[locale]}
              </p>
              <h2 className="atelier-theatre__title" style={{ color: frame.mood.ink }}>
                {frame.title[locale]}
              </h2>
              <p className="atelier-theatre__beat" style={{ color: frame.mood.ink }}>
                {frame.beat[locale]}
              </p>
              {note.trim() && (
                <p className="atelier-theatre__note" style={{ color: frame.mood.ink }}>
                  {note}
                </p>
              )}
            </div>
            <div className="atelier-theatre__bar">
              <button type="button" className="btn btn-ghost" onClick={() => setPreviewIndex((index) => Math.max(0, index - 1))} disabled={previewIndex === 0}>
                {dict.atelier.prev}
              </button>
              <span className="atelier-theatre__count">
                {dict.atelier.frameOf
                  .replace("{index}", String(previewIndex + 1))
                  .replace("{total}", String(storyboard.length))}
              </span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => setPreviewIndex((index) => Math.min(storyboard.length - 1, index + 1))}
                disabled={previewIndex >= storyboard.length - 1}
              >
                {dict.atelier.next}
              </button>
              <button ref={closeRef} type="button" className="btn btn-gold" onClick={closePreview}>
                {dict.atelier.previewClose}
              </button>
            </div>
            <div className="atelier-theatre__dots" aria-hidden="true">
              {storyboard.map((entry, index) => (
                <span key={entry.id} data-active={index === previewIndex} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
