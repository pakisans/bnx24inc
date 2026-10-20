"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export interface SelectOption {
  value: string;
  label: string;
  /** Small leading marker, such as a service number. */
  meta?: string;
  /** Secondary line under the label. */
  description?: string;
  /** Draws a divider above this option. */
  separated?: boolean;
}

interface SelectProps {
  id: string;
  name: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
  invalid?: boolean;
  describedBy?: string;
  /** Visual size of the menu. "rich" leaves room for descriptions. */
  variant?: "plain" | "rich";
}

/**
 * Select-only combobox following the WAI-ARIA APG pattern
 * (https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/).
 * A real <button> is the combobox, so a <label for> names it, and a hidden
 * input carries the value in the form.
 */
export function Select({
  id,
  name,
  options,
  value,
  onChange,
  placeholder,
  required,
  invalid,
  describedBy,
  variant = "plain",
}: SelectProps) {
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const typeahead = useRef({ text: "", timer: 0 });

  const selectedIndex = options.findIndex((o) => o.value === value);
  const selected = options[selectedIndex];

  // Close when focus or a click lands outside.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  // Keep the active option visible while navigating.
  useEffect(() => {
    if (!open) return;
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function openAt(index: number) {
    setActive(Math.max(0, Math.min(options.length - 1, index)));
    setOpen(true);
  }

  function choose(index: number) {
    const option = options[index];
    if (option) onChange(option.value);
    setOpen(false);
    buttonRef.current?.focus();
  }

  function findByText(char: string) {
    const t = typeahead.current;
    window.clearTimeout(t.timer);
    t.text += char.toLowerCase();
    t.timer = window.setTimeout(() => (t.text = ""), 600);
    const start = open ? active : Math.max(selectedIndex, 0);
    const ordered = [...options.slice(start + 1), ...options.slice(0, start + 1)];
    const match =
      ordered.find((o) => o.label.toLowerCase().startsWith(t.text)) ??
      (t.text.length === 1 ? undefined : ordered.find((o) => o.label.toLowerCase().startsWith(char.toLowerCase())));
    return match ? options.indexOf(match) : -1;
  }

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    const current = selectedIndex < 0 ? 0 : selectedIndex;

    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openAt(e.key === "ArrowUp" && selectedIndex < 0 ? last : current);
      } else if (e.key === "Home" || e.key === "End") {
        e.preventDefault();
        openAt(e.key === "Home" ? 0 : last);
      } else if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const i = findByText(e.key);
        if (i >= 0) openAt(i);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (e.altKey) return choose(active);
        return setActive((a) => Math.min(last, a + 1));
      case "ArrowUp":
        e.preventDefault();
        if (e.altKey) return choose(active);
        return setActive((a) => Math.max(0, a - 1));
      case "Home":
        e.preventDefault();
        return setActive(0);
      case "End":
        e.preventDefault();
        return setActive(last);
      case "PageDown":
        e.preventDefault();
        return setActive((a) => Math.min(last, a + 5));
      case "PageUp":
        e.preventDefault();
        return setActive((a) => Math.max(0, a - 5));
      case "Enter":
      case " ":
        e.preventDefault();
        return choose(active);
      case "Escape":
        e.preventDefault();
        return setOpen(false);
      case "Tab":
        // APG: Tab commits the active option and moves on.
        onChange(options[active]?.value ?? value);
        return setOpen(false);
      default:
        if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
          const i = findByText(e.key);
          if (i >= 0) setActive(i);
        }
    }
  }

  const optionId = (i: number) => `${listId}-option-${i}`;

  return (
    <div ref={rootRef} className="relative mt-2">
      <input type="hidden" name={name} value={value} />
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open ? optionId(active) : undefined}
        aria-required={required || undefined}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        data-open={open}
        onClick={() => (open ? setOpen(false) : openAt(selectedIndex < 0 ? 0 : selectedIndex))}
        onKeyDown={onKeyDown}
        className="field-control flex items-center gap-3 pr-12 text-left"
      >
        {selected ? (
          <span className="flex min-w-0 items-baseline gap-3">
            {selected.meta ? (
              <span aria-hidden="true" className="index-num flex-none">
                {selected.meta}
              </span>
            ) : null}
            <span className="truncate text-ink">{selected.label}</span>
          </span>
        ) : (
          <span className="truncate text-slate/80">{placeholder}</span>
        )}
        <svg
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
          className={`pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-navy-900 transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
        >
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>

      <ul
        ref={listRef}
        id={listId}
        role="listbox"
        aria-labelledby={`${id}-label`}
        tabIndex={-1}
        hidden={!open}
        className={`select-menu absolute inset-x-0 top-[calc(100%+6px)] z-30 overflow-y-auto overscroll-contain rounded-[3px] border border-navy-900/15 bg-white p-1.5 shadow-[0_24px_48px_-24px_rgb(11_31_51/0.45)] ${
          variant === "rich" ? "max-h-[min(26rem,60vh)]" : "max-h-72"
        }`}
      >
        {options.map((o, i) => {
          const isSelected = o.value === value;
          return (
            <li
              key={o.value}
              id={optionId(i)}
              data-index={i}
              role="option"
              aria-selected={isSelected}
              data-active={i === active}
              onPointerMove={() => i !== active && setActive(i)}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(i)}
              className={`group flex cursor-pointer items-start gap-3 rounded-[2px] px-3 py-2.5 transition-colors duration-100 data-[active=true]:bg-mist ${
                o.separated ? "mt-1.5 border-t border-navy-900/10 pt-3.5" : ""
              }`}
            >
              {o.meta ? (
                <span aria-hidden="true" className="index-num w-6 flex-none pt-[0.2em]">
                  {o.meta}
                </span>
              ) : null}
              <span className="min-w-0 flex-1">
                <span
                  className={`block text-[0.9875rem] leading-snug ${isSelected ? "font-semibold text-teal" : "font-medium text-navy-900"}`}
                >
                  {o.label}
                </span>
                {o.description && variant === "rich" ? (
                  <span className="mt-0.5 block text-[0.8125rem] leading-snug text-slate">{o.description}</span>
                ) : null}
              </span>
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                focusable="false"
                className={`mt-1 h-4 w-4 flex-none text-teal ${isSelected ? "" : "invisible"}`}
              >
                <path d="M2.5 8.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
