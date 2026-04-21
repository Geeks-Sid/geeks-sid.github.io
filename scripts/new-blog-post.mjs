import fs from 'node:fs';
import path from 'node:path';

const rawTitle = process.argv.slice(2).join(' ').trim();

if (!rawTitle) {
  console.error('Usage: npm run new:post -- "Your Post Title"');
  process.exit(1);
}

const slug = rawTitle
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!slug) {
  console.error('Unable to generate a valid slug from that title.');
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const outputPath = path.join(process.cwd(), 'src', 'content', 'blog', `${slug}.md`);

if (fs.existsSync(outputPath)) {
  console.error(`Post already exists: ${outputPath}`);
  process.exit(1);
}

const content = `---
title: "${rawTitle}"
date: "${today}"
summary: "Add a short summary here."
tags: ["AI", "engineering"]
---

# ${rawTitle}

Write your post here.
`;

fs.writeFileSync(outputPath, content, 'utf8');
console.log(`Created ${path.relative(process.cwd(), outputPath)}`);
