import Link from 'next/link';
import { LatestVersion } from '@/components/latest-version';

const features = [
  {
    title: 'Folia-safe scheduling',
    body: 'One PlatformScheduler over the Region/Global/Async/Entity schedulers. Never call Bukkit.getScheduler() again.',
  },
  {
    title: 'Storage that shares',
    body: 'Pooled SQLite/MySQL with a migration runner, plus one connection pool for the whole server instead of one per plugin.',
  },
  {
    title: 'Integrations, abstracted',
    body: 'Permissions, economy, regions, items, and holograms behind one registry that resolves the best available provider and degrades gracefully when absent.',
  },
  {
    title: 'Java-friendly Kotlin',
    body: 'Async APIs return CompletableFuture, no coroutine machinery leaks, and you ship no kotlin-stdlib of your own.',
  },
  {
    title: 'Gameplay building blocks',
    body: 'Config-driven conditions, cooldowns, holder-based GUIs with anvil/chat input, and a fluent Brigadier command layer.',
  },
  {
    title: 'Install once',
    body: 'A single server plugin, like Vault or LuckPerms. Your plugins depend on it, and shared state lives in one place.',
  },
];

const snippet = `// Resolve the active economy and move money. Degrades safely if absent.
EconomyHook eco = StrataApi.hooks().get(EconomyHook.class);
if (eco != null && eco.has(player, price)) {
    eco.withdraw(player, price);
    StrataApi.scheduler(this).async(() ->
        storage.dataSource().getConnection()); // pooled, off the main thread
}`;

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Hero */}
      <section className="mx-auto flex max-w-4xl flex-col items-center px-4 py-20 text-center">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-fd-muted-foreground">
          <LatestVersion />
          <span className="rounded-full border border-fd-border px-3 py-1">Paper / Folia</span>
          <span className="rounded-full border border-fd-border px-3 py-1">Java 25 · Kotlin</span>
          <span className="rounded-full border border-fd-border px-3 py-1">Java-friendly API</span>
          <span className="rounded-full border border-fd-border px-3 py-1">Install once</span>
        </div>

        <h1 className="text-gradient text-5xl font-bold tracking-tight sm:text-6xl">
          Strata
        </h1>
        <p className="mt-4 text-lg font-medium text-fd-foreground sm:text-xl">
          The shared foundation for your Minecraft plugins.
        </p>
        <p className="mt-3 max-w-2xl text-fd-muted-foreground">
          Storage, scheduling, integrations, conditions, GUIs, commands, and metrics: built once,
          tested once, and shared across every plugin instead of re-implemented in each.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/docs/getting-started"
            className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-semibold text-fd-primary-foreground transition-opacity hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/docs"
            className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            Read the Docs
          </Link>
          <a
            href="https://github.com/alazso/strata"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-semibold text-fd-foreground transition-colors hover:bg-fd-accent"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Code snippet */}
      <section className="mx-auto w-full max-w-3xl px-4">
        <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card shadow-sm">
          <div className="flex items-center gap-1.5 border-b border-fd-border px-4 py-2.5">
            <span className="size-3 rounded-full bg-red-400/80" />
            <span className="size-3 rounded-full bg-yellow-400/80" />
            <span className="size-3 rounded-full bg-green-400/80" />
            <span className="ml-2 text-xs text-fd-muted-foreground">ShopPlugin.java</span>
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code className="text-fd-foreground">{snippet}</code>
          </pre>
        </div>
        <p className="mt-3 text-center text-sm text-fd-muted-foreground">
          One API surface, Folia-safe, with shared pooling, and it never throws when an integration
          isn&apos;t installed.
        </p>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-fd-border bg-fd-card p-5 transition-colors hover:border-fd-foreground/20"
            >
              <h3 className="font-semibold text-fd-foreground">{f.title}</h3>
              <p className="mt-2 text-sm text-fd-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-3xl px-4 pb-24 text-center">
        <h2 className="text-2xl font-bold text-fd-foreground">Build on Strata</h2>
        <p className="mx-auto mt-3 max-w-xl text-fd-muted-foreground">
          Add one dependency, declare it in your <code>paper-plugin.yml</code>, and reach the whole
          toolkit through <code>StrataApi</code>.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-medium">
          <Link href="/docs/storage" className="text-fd-foreground underline-offset-4 hover:underline">
            Storage
          </Link>
          <span className="text-fd-muted-foreground">·</span>
          <Link href="/docs/hooks" className="text-fd-foreground underline-offset-4 hover:underline">
            Hooks
          </Link>
          <span className="text-fd-muted-foreground">·</span>
          <Link href="/docs/conditions" className="text-fd-foreground underline-offset-4 hover:underline">
            Conditions
          </Link>
          <span className="text-fd-muted-foreground">·</span>
          <Link href="/docs/gui" className="text-fd-foreground underline-offset-4 hover:underline">
            GUI
          </Link>
          <span className="text-fd-muted-foreground">·</span>
          <Link href="/docs/commands" className="text-fd-foreground underline-offset-4 hover:underline">
            Commands
          </Link>
        </div>
      </section>
    </main>
  );
}
