import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve('src/content/docs');
const pages = [];
function visit(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (/\.mdx?$/.test(entry.name)) pages.push(file);
  }
}
visit(root);

const normalize = value => value.replace(/^\/+|\/+$/g, '').replace(/\/index$/, '');
const slugOf = filename => normalize(path.relative(root, filename).replace(/\.mdx?$/, ''));
const slugs = new Set(pages.map(slugOf));
const errors = [];
let checkedLinks = 0;

for (const filename of pages) {
  const name = path.relative(root, filename);
  const content = readFileSync(filename, 'utf8');
  const frontmatter = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!frontmatter) {
    errors.push(name + ': missing YAML frontmatter');
    continue;
  }
  if (!/^title:\s*\S/m.test(frontmatter[1])) errors.push(name + ': missing title');
  if (!/^description:\s*\S/m.test(frontmatter[1]) && slugOf(filename) !== '404') {
    errors.push(name + ': missing description');
  }
  for (const match of frontmatter[1].matchAll(/^(title|description):[ \t]+(.+)$/gm)) {
    const value = match[2];
    if (!/^["']/.test(value) && /:\s/.test(value)) {
      errors.push(name + ': quote a title/description containing a colon');
    }
  }
  if (/^#{1,6}\s*$/m.test(content)) errors.push(name + ': empty heading');
  if (/^\s*"protocols"\s*:/m.test(content)) errors.push(name + ': obsolete outbound protocols field');
  if ((content.match(/^\x60{3}/gm) || []).length % 2 !== 0) errors.push(name + ': unmatched code fence');

  for (const match of content.matchAll(/\]\(\/documents\/([^\s)#?]*)(?:[?#][^)]*)?\)/g)) {
    checkedLinks++;
    const dest = normalize(match[1]);
    if (dest && !slugs.has(dest)) errors.push(name + ': missing /documents/' + match[1]);
  }
  if (name.startsWith('features/') && content.length < 300) {
    errors.push(name + ': too little content for a feature guide');
  }
}

const configPath = path.resolve('astro.config.mjs');
if (!existsSync(configPath)) {
  errors.push('Missing site config');
} else {
  const config = readFileSync(configPath, 'utf8');
  for (const [, slug] of config.matchAll(/\bslug:\s*'([^']+)'/g)) {
    if (!slugs.has(slug)) errors.push('Sidebar link does not exist: ' + slug);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exitCode = 1;
} else {
  console.log('Checked ' + pages.length + ' documentation pages, ' + checkedLinks + ' internal links, and sidebar navigation.');
}
