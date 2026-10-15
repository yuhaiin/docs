import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/content/docs');
const pages = [];
function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) visit(target);
    else if (/\.mdx?$/.test(entry.name)) pages.push(target);
  }
}
visit(root);

const normalize = value => value.replace(/^\/+|\/+$/g, '').replace(/\/index$/, '');
const slugFor = filename => normalize(path.relative(root, filename).replace(/\.mdx?$/, ''));
const slugs = new Set(pages.map(slugFor));
const errors = [];

for (const filename of pages) {
  const content = readFileSync(filename, 'utf8');
  const slug = slugFor(filename);
  const name = path.relative(root, filename);
  if (!/^---\n[\s\S]*?\n---\n/.test(content)) {
    errors.push(`${name}: missing frontmatter`);
  }
  if (!/^title:\s*\S/m.test(content)) {
    errors.push(`${name}: missing title`);
  }
  if (/^#{2,6}\s*$/m.test(content)) {
    errors.push(`${name}: empty heading`);
  }
  if (/^\s*"protocols"\s*:/m.test(content)) {
    errors.push(`${name}: outdated outbound protocols field`);
  }
  for (const match of content.matchAll(/\]\(\/documents\/([^\s)#?]*)(?:[?#][^)]*)?\)/g)) {
    const dest = normalize(match[1]);
    if (dest && !slugs.has(dest)) errors.push(`${name}: broken internal link /documents/${match[1]}`);
  }
  if (slug.includes('features/') && content.length < 300) {
    errors.push(`${name}: unusually short feature page`);
  }
}

if (!existsSync(path.resolve('astro.config.mjs'))) errors.push('Missing site config');
if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} documentation pages; no invalid local links found.`);
}
