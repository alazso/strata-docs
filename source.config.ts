import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import type { Node, Parent, Literal } from 'unist';

// Single source of truth for the published version shown in install snippets.
// CI can override this via the STRATA_VERSION env var (e.g. from the latest
// GitHub release); otherwise it falls back to this baseline.
const STRATA_VERSION = process.env.STRATA_VERSION || '0.1.0';
const STRATA_SNAPSHOT_VERSION =
  process.env.STRATA_SNAPSHOT_VERSION || '0.1.0-SNAPSHOT';
// Note: this fallback is cosmetic. In CI the real value is stamped from
// Strata's gradle.properties, so the published docs always track the current
// snapshot regardless of this string.

// Replaces version tokens in text/code nodes at build time, before syntax
// highlighting runs, so dependency snippets stay highlighted and copy-pasteable
// with the real versions. The snapshot token is replaced first so it cannot be
// partially clobbered by the stable token.
function remarkStrataVersion() {
  return (tree: Node) => {
    const walk = (node: Node) => {
      const literal = node as Literal;
      if (typeof literal.value === 'string') {
        literal.value = literal.value
          .split('STRATA_SNAPSHOT_VERSION')
          .join(STRATA_SNAPSHOT_VERSION)
          .split('STRATA_VERSION')
          .join(STRATA_VERSION);
      }
      const parent = node as Parent;
      if (Array.isArray(parent.children)) parent.children.forEach(walk);
    };
    walk(tree);
  };
}

// You can customize Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkStrataVersion],
    // Catppuccin syntax themes pair well with the teal brand palette.
    rehypeCodeOptions: {
      themes: {
        light: 'catppuccin-latte',
        dark: 'catppuccin-mocha',
      },
    },
  },
});
