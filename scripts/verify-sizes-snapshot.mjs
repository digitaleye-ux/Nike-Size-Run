#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const snapshotPath = path.join(repoRoot, 'Pegasus Size and Stock Snapshot, 8 December 2026.json');
const targets = [
  {
    name: 'products/pegasus-43-nextjs/public/sizes.json',
    path: path.join(repoRoot, 'products/pegasus-43-nextjs/public/sizes.json'),
  },
  {
    name: 'Pegasus 43 size and stock list.json',
    path: path.join(repoRoot, 'Pegasus 43 size and stock list.json'),
  },
];

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
if (!Array.isArray(snapshot)) {
  console.error('Expected 8 December snapshot to be a JSON array.');
  process.exit(1);
}

const mismatches = [];
const fields = ['sku', 'size_label', 'in_stock', 'stock_quantity', 'stock_status'];

for (const target of targets) {
  const actualList = JSON.parse(fs.readFileSync(target.path, 'utf8'));
  if (!Array.isArray(actualList)) {
    mismatches.push(`${target.name}: expected JSON array`);
    continue;
  }
  if (snapshot.length !== actualList.length) {
    mismatches.push(`${target.name}: length mismatch (expected=${snapshot.length}, actual=${actualList.length})`);
    continue;
  }
  for (let i = 0; i < snapshot.length; i++) {
    const expected = snapshot[i];
    const actual = actualList[i];
    for (const field of fields) {
      if (expected[field] !== actual?.[field]) {
        mismatches.push(
          `${target.name} [${i}] (${expected.sku}): ${field} expected=${JSON.stringify(expected[field])} actual=${JSON.stringify(actual?.[field])}`
        );
      }
    }
  }
}

if (mismatches.length > 0) {
  console.error('Snapshot parity check failed:\n' + mismatches.join('\n'));
  process.exit(1);
}

const counts = snapshot.reduce((acc, item) => {
  acc[item.stock_status] = (acc[item.stock_status] || 0) + 1;
  return acc;
}, {});

console.log(
  `Snapshot parity OK across ${targets.length} files: ${snapshot.length} sizes matched ` +
    `(sold_out=${counts.sold_out || 0}, low_stock=${counts.low_stock || 0}, in_stock=${counts.in_stock || 0}).`
);
