#!/usr/bin/env node
const { readFileSync, readdirSync, statSync } = require('fs');
const { join, extname } = require('path');

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');

const allowed = [
  '--color-primary', '--color-primary-hover', '--color-accent', '--color-bg', '--color-text', '--color-muted', '--color-surface', '--color-border',
  'transparent', 'currentColor', '#fff', '#ffffff', '#000', '#000000'
];

const disallowedPatterns = [
  /#[0-9a-fA-F]{3,8}/g,
  /rgb\s*\(/g,
  /hsl\s*\(/g,
  /\b(bg|text|from|via|to)-(red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-/g,
];

function isAllowedMatch(s) {
  return allowed.some(a => s.includes(a));
}

function walk(dir) {
  const entries = readdirSync(dir);
  for (const e of entries) {
    const p = join(dir, e);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (['.ts', '.tsx', '.css'].includes(extname(p))) scan(p);
  }
}

let violations = 0;
function scan(file) {
  const text = readFileSync(file, 'utf8');
  disallowedPatterns.forEach((re) => {
    let m;
    while ((m = re.exec(text)) !== null) {
      const snippet = text.substring(Math.max(0, m.index - 40), Math.min(text.length, m.index + 80));
      if (!isAllowedMatch(snippet)) {
        violations++;
        console.log(`[colors:scan] ${file}:${m.index}: disallowed color usage -> ${m[0]}`);
      }
    }
  });
}

walk(SRC);
if (violations > 0) {
  console.error(`\n[colors:scan] Found ${violations} violation(s).`);
  process.exit(1);
}
console.log('[colors:scan] No violations found.');


