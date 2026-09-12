"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import type { SheetModel, SheetNode, SheetNodeRef } from "@/content/sheet";
import { NODE_PARAM, closeNodeInUrl, openNodeInUrl } from "./node-url";
import styles from "./node-sheet.module.css";
import { STATUS_LABEL, StatusGlyph } from "./status-glyph";

/** Emerge: the sheet grows out of the Node that opened it, closing reverses faster. */
const OPEN_MS = 260;
const CLOSE_MS = 160;
const HIDDEN_SHEET: Keyframe = { opacity: 0, transform: "scale(0.88)" };
const SHOWN_SHEET: Keyframe = { opacity: 1, transform: "none" };

const TITLE_ID = "node-sheet-title";

function pad(order: number): string {
  return String(order).padStart(2, "0");
}

function cardOf(id: string): HTMLElement | null {
  return document.querySelector<HTMLElement>(`[data-node-id="${CSS.escape(id)}"]`);
}

function urlHasNode(): boolean {
  return new URL(window.location.href).searchParams.has(NODE_PARAM);
}

/** Places the transform origin at the centre of the Node card, measured on the unscaled sheet. */
function originAtCard(sheet: HTMLElement, id: string): string {
  const card = cardOf(id)?.getBoundingClientRect();
  if (!card) {
    return "50% 0";
  }
  const box = sheet.getBoundingClientRect();
  return `${card.left + card.width / 2 - box.left}px ${card.top + card.height / 2 - box.top}px`;
}

export function NodeSheet({ nodes }: { nodes: SheetModel }) {
  const requested = useSearchParams().get(NODE_PARAM);
  // An unknown id is ignored: the sheet simply stays closed.
  const node = requested !== null && Object.hasOwn(nodes, requested) ? nodes[requested] : null;

  // Keeps the last Node rendered while the close motion plays.
  const [shown, setShown] = useState<SheetNode | null>(node);
  if (node !== null && node !== shown) {
    setShown(node);
  }

  const dialogRef = useRef<HTMLDialogElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  /** The Node whose card gets focus back when the sheet closes. */
  const returnIdRef = useRef<string | null>(null);
  const closingRef = useRef(false);
  const nodeId = node?.id ?? null;

  useEffect(() => {
    const dialog = dialogRef.current;
    const sheet = sheetRef.current;
    if (!dialog || !sheet) {
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    closingRef.current = false;
    for (const animation of [...dialog.getAnimations(), ...sheet.getAnimations()]) {
      animation.cancel();
    }

    if (nodeId !== null) {
      const opening = !dialog.open;
      if (opening) {
        returnIdRef.current = nodeId;
        dialog.showModal();
      }
      dialog.scrollTop = 0;
      closeButtonRef.current?.focus({ preventScroll: true });
      if (reduced) {
        return;
      }
      sheet.style.transformOrigin = originAtCard(sheet, nodeId);
      if (opening) {
        dialog.animate([{ opacity: 0 }, { opacity: 1 }], { duration: OPEN_MS, easing: "ease-out" });
      }
      sheet.animate([HIDDEN_SHEET, SHOWN_SHEET], { duration: OPEN_MS, easing: "ease-out" });
      return;
    }

    if (!dialog.open) {
      return;
    }
    const finish = () => {
      dialog.close();
      const returnId = returnIdRef.current;
      returnIdRef.current = null;
      if (returnId !== null) {
        cardOf(returnId)?.focus();
      }
    };
    if (reduced) {
      finish();
      return;
    }
    const timing: KeyframeAnimationOptions = { duration: CLOSE_MS, easing: "ease-in", fill: "forwards" };
    dialog.animate([{ opacity: 1 }, { opacity: 0 }], timing);
    sheet
      .animate([SHOWN_SHEET, HIDDEN_SHEET], timing)
      // Rejected when the sheet reopens mid-close and cancels the motion.
      .finished.then(finish, () => {});
  }, [nodeId]);

  const requestClose = () => {
    if (nodeId === null || closingRef.current) {
      return;
    }
    closingRef.current = true;
    closeNodeInUrl();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.overlay}
      aria-labelledby={TITLE_ID}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClose={() => {
        // The browser can force-close on a repeated Escape; keep the URL in step.
        if (urlHasNode()) {
          requestClose();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          requestClose();
        }
      }}
    >
      <div ref={sheetRef} className={styles.sheet}>
        {shown ? <SheetBody node={shown} closeButtonRef={closeButtonRef} onClose={requestClose} /> : null}
      </div>
    </dialog>
  );
}

function SheetBody({
  node,
  closeButtonRef,
  onClose,
}: {
  node: SheetNode;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
}) {
  return (
    <>
      <button ref={closeButtonRef} type="button" className={styles.close} onClick={onClose}>
        close
      </button>
      <p className={styles.crumb}>
        roadmap / {node.lane.title.toLowerCase()} / {pad(node.order)}
      </p>
      <h2 id={TITLE_ID} className={styles.title}>
        {node.title}
      </h2>
      <p className={styles.kind}>
        {node.type}
        {node.language ? `, ${node.language}` : ""}. {node.lane.title} Lane.
      </p>

      <dl className={styles.facts}>
        <dt>status</dt>
        <dd className={styles.status}>
          <StatusGlyph status={node.status} />
          <span className={styles.mono}>{STATUS_LABEL[node.status]}</span>
          {node.isNext ? <span className={styles.next}>next</span> : null}
        </dd>
        <dt>estimate</dt>
        <dd className={styles.mono}>{node.hours} h</dd>
        {node.started ? (
          <>
            <dt>started</dt>
            <dd className={styles.mono}>{node.started}</dd>
          </>
        ) : null}
        {node.finished ? (
          <>
            <dt>finished</dt>
            <dd className={styles.mono}>{node.finished}</dd>
          </>
        ) : null}
        {node.ort ? (
          <>
            <dt>ORT Overlap</dt>
            <dd>{node.ort}</dd>
          </>
        ) : null}
        {node.repo ? (
          <>
            <dt>repo</dt>
            <dd>
              <ExternalLink href={node.repo}>{node.repo.replace(/^https?:\/\//, "")}</ExternalLink>
            </dd>
          </>
        ) : null}
        {node.demo ? (
          <>
            <dt>demo</dt>
            <dd>
              <ExternalLink href={node.demo}>{node.demo.replace(/^https?:\/\//, "")}</ExternalLink>
            </dd>
          </>
        ) : null}
      </dl>

      {node.links.length > 0 ? (
        <Section title="links">
          <ul className={styles.list}>
            {node.links.map((link) => (
              <li key={link.url}>
                <ExternalLink href={link.url}>{link.label}</ExternalLink>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {node.descriptionHtml ? (
        // Rendered at build time from the owner's own content files, never from user input.
        <div className={styles.description} dangerouslySetInnerHTML={{ __html: node.descriptionHtml }} />
      ) : null}

      {node.phases.length > 0 ? (
        <Section title="phases">
          <ol className={styles.list}>
            {node.phases.map((phase, index) => (
              <li key={phase}>
                <span className={styles.mono}>{pad(index + 1)}</span>
                {phase}
              </li>
            ))}
          </ol>
        </Section>
      ) : null}

      <Section title="prerequisites">
        <NodeRefList refs={node.prerequisites} empty="None. This Node can start any time." />
      </Section>

      {node.attached.length > 0 ? (
        <Section title="attached reading">
          <ul className={styles.list}>
            {node.attached.map((reading) => (
              <li key={reading.url}>
                <ExternalLink href={reading.url}>{reading.title}</ExternalLink>
                <span className={`${styles.mono} ${styles.trailing}`}>{reading.hours} h</span>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section title="unlocks">
        <NodeRefList refs={node.unlocks} empty="Nothing depends on this Node." />
      </Section>

      {node.log.length > 0 ? (
        <Section title="log">
          <ol className={styles.list}>
            {node.log.map((entry, index) => (
              <li key={`${entry.date}-${index}`}>
                <time className={styles.mono} dateTime={entry.date}>
                  {entry.date}
                </time>
                {entry.text}
              </li>
            ))}
          </ol>
        </Section>
      ) : null}
    </>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className={styles.sectionTitle}>{title}</h3>
      {children}
    </section>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

/** Prerequisites and unlocks: clicking one swaps the sheet and pushes a history entry. */
function NodeRefList({ refs, empty }: { refs: SheetNodeRef[]; empty: string }) {
  if (refs.length === 0) {
    return <p className={styles.empty}>{empty}</p>;
  }
  return (
    <ul className={styles.list}>
      {refs.map((ref) => (
        <li key={ref.id}>
          <StatusGlyph status={ref.status} />
          <button type="button" className={styles.nodeRef} onClick={() => openNodeInUrl(ref.id)}>
            <span className={styles.mono}>{pad(ref.order)}</span> {ref.title}
            <span className="sr-only">, {STATUS_LABEL[ref.status]}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}
