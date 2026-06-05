'use client';

import { useEffect, useState } from 'react';

const REPO = 'alazso/strata';

/**
 * Small badge that fetches the latest GitHub release tag at runtime.
 * Renders nothing if there is no release yet or the API is unavailable.
 */
export function LatestVersion({ className }: { className?: string }) {
  const [tag, setTag] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { tag_name?: string } | null) => {
        if (active && data?.tag_name) setTag(data.tag_name);
      })
      .catch(() => {
        /* no releases yet or rate-limited: render nothing */
      });
    return () => {
      active = false;
    };
  }, []);

  if (!tag) return null;

  return (
    <a
      href={`https://github.com/${REPO}/releases/latest`}
      target="_blank"
      rel="noreferrer"
      className={
        className ??
        'inline-flex items-center gap-1.5 rounded-full border border-fd-border px-3 py-1 text-xs font-medium text-fd-muted-foreground no-underline transition-colors hover:border-fd-primary/40'
      }
    >
      <span aria-hidden className="size-1.5 rounded-full bg-fd-primary" />
      Latest release {tag}
    </a>
  );
}
