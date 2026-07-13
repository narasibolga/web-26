---
title: "Hello World"
date: "2025-07-12"
summary: "A first program to verify the markdown-to-static-HTML pipeline."
author: "NaraSibolga Team"
image: "/images/sibolga-panorama-1928.jpg"
draft: false
tags: ["soshum"]
---

# Hello World

This is the **first program** in the kkn project, rendered from a markdown file
at build time into a static HTML page.

## Why markdown?

- It lives in version control alongside the code.
- No CMS, no database, no runtime infrastructure.
- Edits are a pull request away.

### A blockquote

> Simplicity is the ultimate sophistication.

### A table

| Tool       | Role                  |
| ---------- | --------------------- |
| gray-matter | Parse frontmatter     |
| remark      | Markdown → HTML       |
| remark-gfm  | Tables, task lists    |

### Inline code and a code block

Use `generateStaticParams` to pre-render routes.

```ts
export function generateStaticParams() {
  return [{ slug: "hello-world" }];
}
```

That's it. Edit this file at `content/programs/hello-world.md`.
