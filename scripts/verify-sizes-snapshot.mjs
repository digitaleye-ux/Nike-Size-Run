#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

const snapshotPath = path.join(repoRoot, 'Pegasus Size and Stock Snapshot, 8 December 2026.json');
const publicSizesPath = path.join(repoRoot, 'products/pegasus-43-nextjs/public/sizes.json');

const snapshot = JSON.parse(fs.readFileSync(snapshotPath, 'utf8'));
const publicSizes = JSON.parse(fs.readFileSync(publicSizesPath, 'utf8'));

if (!Array.isArray(snapshot) || !Array.isArray(publicSizes)) {
  console.error('Expected both files to be JSON arrays.');
  process.exit(1);
}

if (snapshot.length !== publicSizes.length) {
  console.error(`Length mismatch: snapshot=${snapshot.length}, public/sizes.json=${publicSizes.length}`);
  process.exit(1);
}

const mismatches = [];
for (let i = 0; i < snapshot.length; i++) {
  const expected = snapshot[i];
  const actual = publicSizes[i];
  const fields = ['sku', 'size_label', 'in_stock', 'stock_quantity', 'stock_status'];
  for (const field of fields) {
    if (expected[field] !== actual?.[field]) {
      mismatches.push(
        `Index ${i} (${expected.sku}): ${field} expected=${JSON.stringify(expected[field])} actual=${JSON.stringify(actual?.[field])}`
      );
    }
  }
}

if (mismatches.length > 0) {
  console.error('Snapshot parity check failed:\n' + mismatches.join('\n'));
  process.exit(1);
}

const counts = publicSizes.reduce(
  (acc, item) => {
    acc[item.stock_status] = (acc[item.stock_status] || 0) + 1;
    return acc;
  },
  {}
);

console.log(
  `Snapshot parity OK: ${publicSizes.length} sizes matched ` +
    `(sold_out=${counts.sold_out || 0}, low_stock=${counts.low_stock || 0}, in_stock=${counts.in_stock || 0}).`
);
