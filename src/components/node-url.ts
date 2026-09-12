/**
 * The open Node detail sheet lives in the URL as `?node=<id>`. Each sheet the
 * site pushes records its depth in the history state, so closing can pop every
 * entry it pushed (a Prerequisite swap pushes one more) instead of stacking a
 * new one. A deep link lands at depth 0 and is closed by replacing its URL.
 */

export const NODE_PARAM = "node";

type SheetHistoryState = { sheetDepth?: number } | null;

function currentDepth(): number {
  return (window.history.state as SheetHistoryState)?.sheetDepth ?? 0;
}

function urlWithNode(id: string | null): string {
  const url = new URL(window.location.href);
  if (id === null) {
    url.searchParams.delete(NODE_PARAM);
  } else {
    url.searchParams.set(NODE_PARAM, id);
  }
  return `${url.pathname}${url.search}${url.hash}`;
}

export function openNodeInUrl(id: string): void {
  window.history.pushState({ sheetDepth: currentDepth() + 1 }, "", urlWithNode(id));
}

export function closeNodeInUrl(): void {
  const depth = currentDepth();
  if (depth === 0) {
    window.history.replaceState(null, "", urlWithNode(null));
    return;
  }
  window.addEventListener(
    "popstate",
    () => {
      // Back at the entry the site started from: a deep link still carries the param.
      if (new URL(window.location.href).searchParams.has(NODE_PARAM)) {
        window.history.replaceState(null, "", urlWithNode(null));
      }
    },
    { once: true },
  );
  window.history.go(-depth);
}
