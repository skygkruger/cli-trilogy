#!/usr/bin/env node

// yeet — Zero dependencies. Pure Node.js built-ins only.

import { rm, stat, readdir, access } from 'node:fs/promises';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

// ── Constants ────────────────────────────────────────────────────────

const VERSION = '1.0.0';

const EVERYTHING_TARGETS = [
  'node_modules', '.next', 'dist', 'build',
  '.cache', 'coverage', '.turbo', '.parcel-cache',
];

const YEET_PHRASES = [
  'into the void',
  'into oblivion',
  'into nothingness',
  'into the abyss',
  'into the shadow realm',
  'beyond the event horizon',
  'into another dimension',
  'off the face of the earth',
  'into the great unknown',
  'past the point of no return',
  'into digital dust',
  'straight to /dev/null',
];

const DONE_PHRASES = [
  'gone. reduced to atoms.',
  'it never existed.',
  'the void is pleased.',
  'disk space reclaimed from the abyss.',
  'nothing remains.',
  'scattered to the digital winds.',
  'returned to the ether.',
];

// ── ANSI ─────────────────────────────────────────────────────────────
// Void indigo accent: #6C5CE7 → rgb(108, 92, 231)

const vi = (s) => `\x1b[38;2;108;92;231m${s}\x1b[0m`;
const viDim = (s) => `\x1b[2m\x1b[38;2;108;92;231m${s}\x1b[0m`;
const viBold = (s) => `\x1b[1m\x1b[38;2;108;92;231m${s}\x1b[0m`;

const c = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  white: '\x1b[37m', green: '\x1b[32m', yellow: '\x1b[33m',
};

// ── Box Drawing ──────────────────────────────────────────────────────

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

function box(lines, width = 61) {
  const h = '\u2500', v = '\u2502';
  const top = vi(`\u250C${h.repeat(width)}\u2510`);
  const bot = vi(`\u2514${h.repeat(width)}\u2518`);
  const pad = lines.map(l => {
    const visible = stripAnsi(l).length;
    const needed = Math.max(0, width - 2 - visible);
    return `${vi(v)}  ${l}${' '.repeat(needed)}${vi(v)}`;
  });
  return [top, ...pad, bot].join('\n');
}

// ── Helpers ──────────────────────────────────────────────────────────

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i > 0 ? 1 : 0)} ${units[i]}`;
}

function formatCount(n) {
  return n.toLocaleString();
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function dirExists(p) {
  try { await access(p); return true; } catch { return false; }
}

async function getDirSize(dirPath) {
  let size = 0, count = 0;
  async function walk(dir) {
    const entries = await readdir(dir, { withFileTypes: true }).catch(() => []);
    for (const entry of entries) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else {
        const s = await stat(full).catch(() => null);
        if (s) { size += s.size; count++; }
      }
    }
  }
  await walk(dirPath);
  return { size, count };
}

function confirm(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(res => {
    rl.question(question, answer => {
      rl.close();
      res(answer.toLowerCase().startsWith('y'));
    });
  });
}

// ── Animated Deletion ────────────────────────────────────────────────

async function animatedDelete(targets, totalCount) {
  const MIN_MS = 3000; // Always animate for at least 3 seconds
  const BAR_W = 24;
  const spinFrames = ['\u25E0', '\u25E1'];
  const dotFrames = ['\u2219', '\u2218', '\u00B7', '\u2218'];
  let frame = 0;
  let phraseIdx = Math.floor(Math.random() * YEET_PHRASES.length);
  let deleteComplete = false;
  const startTime = Date.now();

  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(1, elapsed / MIN_MS);

    // Spinner + dots
    const spin = spinFrames[frame % spinFrames.length];
    const numDots = (frame % 4) + 1;
    const dots = dotFrames.slice(0, numDots).join(' ');

    // Progress bar fills over time
    const filled = Math.floor(BAR_W * progress);
    const empty = BAR_W - filled;
    const bar = `${vi('\u2501'.repeat(filled))}${viDim('\u2501'.repeat(empty))}`;

    // File count ticks proportionally
    const simCount = deleteComplete
      ? totalCount
      : Math.floor(totalCount * progress * 0.9);

    // Rotate phrase every ~12 frames (~1s)
    if (frame > 0 && frame % 12 === 0) {
      phraseIdx = (phraseIdx + 1) % YEET_PHRASES.length;
    }
    const phrase = YEET_PHRASES[phraseIdx];

    const countStr = vi(formatCount(simCount));
    const line = `  ${vi(spin)} ${bar} ${countStr} files ${viDim(phrase)} ${viDim(dots)}`;
    process.stdout.write(`\x1b[2K\r${line}`);
    frame++;
  }, 80);

  // Delete in parallel with animation
  for (const t of targets) {
    await rm(t.path, { recursive: true, force: true });
  }
  deleteComplete = true;

  // Wait until minimum animation time
  const remaining = MIN_MS - (Date.now() - startTime);
  if (remaining > 0) await sleep(remaining);

  clearInterval(interval);

  // Final completed line
  const finalPhrase = pick(YEET_PHRASES);
  const fullBar = vi('\u2501'.repeat(BAR_W));
  process.stdout.write(`\x1b[2K\r  ${vi('\u25CF')} ${fullBar} ${vi(formatCount(totalCount))} files yeeted ${viDim(finalPhrase)}\n`);
}

// ── Void Art ─────────────────────────────────────────────────────────

function voidArt() {
  // Symmetric portal: every row is 31 visible chars, mirrored L/R and T/B
  // Grid: 11 columns, 2-space gaps, uniform spacing throughout
  const I = '      '; // 6-space indent

  // Row builders — each element separated by exactly 2 spaces
  const dotRow =  `${I}${viDim('·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·')}`;
  const liteRow = `${I}${viDim('·')}  ${vi('░  ░  ░  ░  ░  ░  ░  ░  ░')}  ${viDim('·')}`;
  const fillRow = `${I}${viDim('·')}  ${vi('░')}  ${vi('▒  ▒  ▒  ▒  ▒  ▒  ▒')}  ${vi('░')}  ${viDim('·')}`;
  const openRow = `${I}${viDim('·')}  ${vi('░')}  ${vi('▒')}                 ${vi('▒')}  ${vi('░')}  ${viDim('·')}`;
  const textRow = `${I}${viDim('·')}  ${vi('░')}  ${vi('▒')}   ${viBold('y e e t e d')}   ${vi('▒')}  ${vi('░')}  ${viDim('·')}`;

  return [
    '', dotRow, liteRow, fillRow, openRow,
    textRow,
    openRow, fillRow, liteRow, dotRow, '',
  ].join('\n');
}

// ── CLI ──────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--version') || args.includes('-v')) {
    console.log(`yeet v${VERSION}`);
    return;
  }

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
  ${viBold('yeet')} v${VERSION} ${c.dim}— Theatrically delete heavy directories${c.reset}

  ${vi('Usage:')}
    yeet                     Yeet node_modules
    yeet --target .next      Yeet a specific directory
    yeet --everything        Yeet all build artifacts
    yeet --force             Skip confirmation
    yeet --dry               Preview without deleting
    yeet --help              Show this help
`);
    return;
  }

  const flags = {
    force: args.includes('--force'),
    everything: args.includes('--everything'),
    dry: args.includes('--dry'),
    target: null,
  };

  const targetIdx = args.indexOf('--target');
  if (targetIdx !== -1 && args[targetIdx + 1]) {
    flags.target = args[targetIdx + 1];
  }

  // Determine targets
  let targetNames;
  if (flags.everything) targetNames = EVERYTHING_TARGETS;
  else if (flags.target) targetNames = [flags.target];
  else targetNames = ['node_modules'];

  // Scan for existing targets
  const targets = [];
  for (const name of targetNames) {
    const fullPath = join(process.cwd(), name);
    if (await dirExists(fullPath)) {
      const info = await getDirSize(fullPath);
      targets.push({ name, path: fullPath, ...info });
    }
  }

  if (targets.length === 0) {
    console.log(`\n  ${c.yellow}Nothing to yeet.${c.reset} No targets found.\n`);
    return;
  }

  // Header
  const modeParts = [flags.everything && 'EVERYTHING', flags.dry && 'DRY'].filter(Boolean);
  const mode = modeParts.join(' + ');
  const left = `${viBold('YEET')} ${c.dim}v${VERSION}${c.reset}`;
  const right = mode ? `${c.dim}mode:${c.reset} ${vi(mode)}` : '';
  const leftLen = `YEET v${VERSION}`.length;
  const rightLen = mode ? `mode: ${mode}`.length : 0;
  const gap = 59 - leftLen - rightLen;
  const headerLine = right ? `${left}${' '.repeat(Math.max(1, gap))}${right}` : left;
  console.log('\n' + box([headerLine]));

  // Show targets
  const totalSize = targets.reduce((s, t) => s + t.size, 0);
  const totalCount = targets.reduce((s, t) => s + t.count, 0);

  if (targets.length === 1) {
    const t = targets[0];
    console.log(`
  ${c.dim}Target acquired:${c.reset} ${c.bold}${t.name}/${c.reset}
  ${c.dim}Size:${c.reset}  ${vi(formatBytes(t.size))}
  ${c.dim}Files:${c.reset} ${vi(formatCount(t.count))}
  ${c.dim}Prognosis:${c.reset} ${viDim('annihilation')}
`);
  } else {
    console.log(`\n  ${c.dim}Targets acquired:${c.reset}`);
    targets.forEach((t, i) => {
      const prefix = i === targets.length - 1 ? '\u2514\u2500\u2500' : '\u251C\u2500\u2500';
      const sizeStr = formatBytes(t.size).padEnd(10);
      console.log(`  ${vi(prefix)} ${c.bold}${t.name}/${c.reset}  ${vi(sizeStr)} ${c.dim}(${formatCount(t.count)} files)${c.reset}`);
    });
    console.log(`\n  ${c.dim}Total:${c.reset} ${vi(formatBytes(totalSize))} ${c.dim}across${c.reset} ${vi(formatCount(totalCount))} ${c.dim}files${c.reset}`);
    console.log();
  }

  // Dry run
  if (flags.dry) {
    console.log(`  ${c.dim}But you said --dry, so everything lives another day.${c.reset}`);
    console.log(`  ${c.dim}Run without --dry to actually yeet.${c.reset}\n`);
    return;
  }

  // Confirmation
  if (!flags.force) {
    const q = targets.length > 1
      ? `  ${vi('?')} This is irreversible. Confirm? ${c.dim}[y/n]${c.reset} `
      : `  ${vi('?')} Yeet this into oblivion? ${c.dim}[y/n]${c.reset} `;
    const ok = await confirm(q);
    if (!ok) {
      console.log(`\n  ${c.dim}Yeeting aborted. Everything lives to fight another day.${c.reset}\n`);
      return;
    }
  }

  console.log();

  // Animated deletion
  const start = Date.now();
  await animatedDelete(targets, totalCount);
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);

  // Void art
  console.log();
  console.log(voidArt());

  // Summary
  const what = targets.length === 1 ? targets[0].name : `${targets.length} directories`;
  const verb = targets.length === 1 ? 'has' : 'have';
  const donePhrase = pick(DONE_PHRASES);
  const tip = targets.some(t => t.name === 'node_modules')
    ? `Run 'npm install' when you need it back.`
    : `Gone forever. No regrets.`;

  console.log('\n' + box([
    '',
    `  ${what} ${verb} been yeeted.`,
    `  ${viDim(donePhrase)}`,
    '',
    `  ${c.dim}Freed:${c.reset}  ${vi(formatBytes(totalSize))}`,
    `  ${c.dim}Files:${c.reset}  ${vi(formatCount(totalCount))}`,
    `  ${c.dim}Time:${c.reset}   ${vi(elapsed + 's')}`,
    '',
    `  ${c.dim}${tip}${c.reset}`,
    `  ${vi('Ready for the next victim.')}`,
    '',
  ]));
}

main().catch(err => {
  console.error(`\n  ${vi('\u2718')} ${err.message}\n`);
  process.exit(1);
});
