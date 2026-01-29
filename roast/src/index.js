#!/usr/bin/env node

// roast — AI code roasting. Dynamic color based on severity.

import { program } from 'commander';
import chalk from 'chalk';
import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, relative, extname, basename } from 'node:path';
import { execSync } from 'node:child_process';

// ── Constants ────────────────────────────────────────────────────────

const VERSION = '1.0.0';

// ── Colors (PRoast severity palette) ────────────────────────────────

const COLORS = {
  gentle: '#7ec9a0',  // green
  honest: '#d4a76a',  // amber
  savage: '#f27a93',  // coral
};

const c = { dim: chalk.dim, bold: chalk.bold };

// ── Dynamic Theme (set after severity is known) ─────────────────────

let theme = {
  accent: (s) => chalk.hex(COLORS.savage)(s),
  accentBold: (s) => chalk.bold.hex(COLORS.savage)(s),
  accentDim: (s) => chalk.dim.hex(COLORS.savage)(s),
};

function setTheme(severity) {
  const hex = COLORS[severity] || COLORS.honest;
  theme = {
    accent: (s) => chalk.hex(hex)(s),
    accentBold: (s) => chalk.bold.hex(hex)(s),
    accentDim: (s) => chalk.dim.hex(hex)(s),
  };
}

// ── Severity ────────────────────────────────────────────────────────

const SEVERITY = {
  gentle: {
    label: 'GENTLE',
    prompt: `You are a kind, constructive code reviewer. Point out issues gently with encouragement. Be a helpful mentor. Still be specific about line numbers and real problems.`,
  },
  honest: {
    label: 'HONEST',
    prompt: `You are a direct, honest code reviewer with dry wit. Mix humor with real, actionable feedback. Be specific and technically accurate. Think sharp friend who tells it like it is.`,
  },
  savage: {
    label: 'SAVAGE',
    prompt: `You are an unhinged, brutally funny code reviewer. Roast the code MERCILESSLY but stay technically accurate. Every criticism should be hilarious AND true. No mercy. Pure comedic destruction with real technical insight.`,
  },
};

// ── Phrases ─────────────────────────────────────────────────────────

const THINKING_PHRASES = [
  'reading your code',
  'trying not to laugh',
  'composing thoughts',
  'finding where to begin',
  'oh no',
  'this is going to hurt',
  'preparing the roast',
  'calibrating savagery',
  'locating the fire extinguisher',
  'taking a deep breath',
  'questioning life choices',
  'warming up the grill',
];

const DONE_PHRASES = [
  'your code has been served.',
  'well done. medium rare.',
  'that was therapeutic.',
  'extra crispy.',
  'flame-grilled to perfection.',
  'the code will never be the same.',
  'consider this a growth opportunity.',
];

// ── ANSI Helpers ────────────────────────────────────────────────────

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

// ── Box Drawing ─────────────────────────────────────────────────────

function box(lines, width = 61) {
  const h = '\u2500', v = '\u2502';
  const top = theme.accent(`\u250C${h.repeat(width)}\u2510`);
  const bot = theme.accent(`\u2514${h.repeat(width)}\u2518`);
  const pad = lines.map(l => {
    const visible = stripAnsi(l).length;
    const needed = Math.max(0, width - 2 - visible);
    return `${theme.accent(v)}  ${l}${' '.repeat(needed)}${theme.accent(v)}`;
  });
  return [top, ...pad, bot].join('\n');
}

// ── Helpers ──────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function wordWrap(text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    if (current.length + word.length + 1 > maxWidth && current) {
      lines.push(current);
      current = ' ' + word;
    } else {
      current = current ? `${current} ${word}` : word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

// ── Input Sources ───────────────────────────────────────────────────

function readClipboard() {
  try {
    if (process.platform === 'win32') {
      return execSync('powershell -command "Get-Clipboard"', { encoding: 'utf-8' }).trim();
    } else if (process.platform === 'darwin') {
      return execSync('pbpaste', { encoding: 'utf-8' }).trim();
    } else {
      try {
        return execSync('xclip -selection clipboard -o', { encoding: 'utf-8' }).trim();
      } catch {
        return execSync('xsel --clipboard --output', { encoding: 'utf-8' }).trim();
      }
    }
  } catch {
    return null;
  }
}

async function readStdin() {
  if (process.stdin.isTTY) return null;
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString('utf-8');
}

const CODE_EXTS = new Set([
  '.js', '.ts', '.jsx', '.tsx', '.mjs', '.cjs',
  '.py', '.rb', '.go', '.rs', '.java', '.c', '.cpp', '.h', '.cs',
  '.php', '.swift', '.kt', '.vue', '.svelte',
  '.css', '.scss', '.html', '.sql', '.sh',
]);

const SKIP_DIRS = new Set([
  'node_modules', '.git', '.next', 'dist', 'build', '.cache',
  'coverage', '.turbo', '.parcel-cache', '__pycache__',
]);

function readDirectory(dirPath, maxFiles = 10) {
  const files = [];
  function walk(dir) {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (files.length >= maxFiles) return;
      const full = resolve(dir, entry.name);
      if (entry.isDirectory()) {
        if (!SKIP_DIRS.has(entry.name)) walk(full);
      } else if (CODE_EXTS.has(extname(entry.name))) {
        try {
          const content = readFileSync(full, 'utf-8');
          files.push({ path: relative(dirPath, full), content });
        } catch { /* skip unreadable */ }
      }
    }
  }
  walk(resolve(dirPath));
  return files;
}

// ── Spinner ─────────────────────────────────────────────────────────

async function withSpinner(promise) {
  // Flame heating animation - builds up intensity
  const heatFrames = ['░', '░', '▒', '▒', '▓', '▓', '█', '▓', '▓', '▒', '▒', '░'];
  let frame = 0;
  let phraseIdx = Math.floor(Math.random() * THINKING_PHRASES.length);

  const interval = setInterval(() => {
    const heat = heatFrames[frame % heatFrames.length];

    if (frame > 0 && frame % 15 === 0) {
      phraseIdx = (phraseIdx + 1) % THINKING_PHRASES.length;
    }
    const phrase = THINKING_PHRASES[phraseIdx];

    process.stdout.write(`\x1b[2K\r  ${theme.accent(heat)} ${theme.accentDim(phrase)}...`);
    frame++;
  }, 100);

  try {
    const result = await promise;
    clearInterval(interval);
    process.stdout.write('\x1b[2K\r');
    return result;
  } catch (err) {
    clearInterval(interval);
    process.stdout.write('\x1b[2K\r');
    throw err;
  }
}

// ── Flame Art (rising flames with embers) ───────────────────────────

function fireArt() {
  const a = theme.accent;
  const ab = theme.accentBold;
  const ad = theme.accentDim;

  // Embers floating above, flames rising below
  return [
    '',
    `                ${ad('·')}                   ${ad('·')}`,
    `        ${ad('·')}               ${ad('·')}`,
    `                    ${ad('·')}         ${ad('·')}`,
    `            ${ad('·')}     ${ad('°')}     ${ad('·')}`,
    `        ${ad('°')}       ${a('░')}       ${ad('°')}`,
    `              ${a('░')} ${a('▒')} ${a('░')}`,
    `            ${a('░')} ${a('▒')} ${a('▓')} ${a('▒')} ${a('░')}`,
    `          ${a('▒')} ${a('▓')} ${a('█')} ${a('▓')} ${a('█')} ${a('▓')} ${a('▒')}`,
    `            ${a('▓')} ${a('█')} ${a('▓')} ${a('█')} ${a('▓')}`,
    `              ${a('█')} ${a('▓')} ${a('█')}`,
    `                ${a('▓')}`,
    '',
    `           ${ab('r o a s t e d')}`,
    '',
  ].join('\n');
}

// ── Claude API ──────────────────────────────────────────────────────

function buildPrompt(code, severity, filename) {
  return `You are reviewing code from "${filename || 'unknown'}".

${SEVERITY[severity].prompt}

Respond with ONLY valid JSON in this exact format:
{
  "roasts": [
    {
      "line": "line number or range",
      "target": "brief description of what you're targeting",
      "roast": "your roast/review comment",
      "suggestion": "one concrete improvement suggestion"
    }
  ],
  "verdict": "one-line overall verdict"
}

Rules:
- Return 3-6 roasts depending on code length and issue density
- Point to specific, real line numbers from the code
- Be technically accurate — every criticism must be valid
- ${severity === 'savage' ? 'Be absolutely ruthless and hilarious' : severity === 'gentle' ? 'Be encouraging but honest' : 'Be direct and witty'}
- Suggestions must be genuinely helpful
- The verdict should be memorable

Here is the code:
\`\`\`
${code}
\`\`\``;
}

async function callClaude(code, severity, filename) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      'ANTHROPIC_API_KEY not set.\n' +
      '  Get one at: https://console.anthropic.com\n' +
      '  Then: export ANTHROPIC_API_KEY=your_key'
    );
  }

  const client = new Anthropic();

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2048,
    messages: [{ role: 'user', content: buildPrompt(code, severity, filename) }],
  });

  const text = response.content[0]?.text || '';

  // Extract JSON (handle markdown code blocks)
  const jsonMatch = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/) || [null, text];
  const jsonStr = jsonMatch[1] || text;

  try {
    return JSON.parse(jsonStr.trim());
  } catch {
    return {
      roasts: [{ line: '?', target: 'your code', roast: text.slice(0, 500), suggestion: 'Consider a code review.' }],
      verdict: 'The AI struggled to parse this. That might be a roast in itself.',
    };
  }
}

// ── Display ─────────────────────────────────────────────────────────

function displayResults(result, severity, filename, lineCount) {
  const sev = SEVERITY[severity];

  // Header box (accent: ROAST title, severity label)
  const left = `${theme.accentBold('ROAST')} ${c.dim(`v${VERSION}`)}`;
  const right = `${c.dim('severity:')} ${theme.accent(sev.label)}`;
  const leftLen = `ROAST v${VERSION}`.length;
  const rightLen = `severity: ${sev.label}`.length;
  const gap = 59 - leftLen - rightLen;
  const headerLine = `${left}${' '.repeat(Math.max(1, gap))}${right}`;
  console.log('\n' + box([headerLine]));

  if (filename) {
    console.log(`\n  ${c.dim('File:')} ${chalk.bold(filename)} ${c.dim(`(${lineCount} lines)`)}`);
  }

  // Roasts (accent: line numbers and >, white: roast text)
  console.log();
  for (const r of result.roasts) {
    console.log(`  ${theme.accent('Line ' + r.line + ':')} ${chalk.bold(r.target)}`);

    const roastLines = wordWrap(r.roast, 55);
    for (const line of roastLines) {
      console.log(`  ${theme.accent('>')} ${c.dim('"')}${line}${c.dim('"')}`);
    }

    if (r.suggestion) {
      console.log(`  ${c.dim('  \u21B3')} ${c.dim(r.suggestion)}`);
    }
    console.log();
  }

  // Fire art
  console.log(fireArt());

  // Summary box (accent: key elements only, white: most text)
  const roastCount = result.roasts.length;
  const donePhrase = pick(DONE_PHRASES);

  // Word-wrap verdict to fit in box (max ~48 chars per line for safety)
  const verdictLines = wordWrap(result.verdict, 48);
  const verdictFormatted = verdictLines.map((line, i) =>
    i === 0 ? `  ${c.dim('Verdict:')} ${line}` : `           ${line}`
  );

  // OSC 8 clickable hyperlink: \x1b]8;;URL\x07TEXT\x1b]8;;\x07
  const proastLink = `\x1b]8;;https://proast.io\x07${theme.accent('proast.io')}\x1b]8;;\x07`;

  console.log('\n' + box([
    '',
    `  ${theme.accent(roastCount.toString())} roast${roastCount !== 1 ? 's' : ''} served.`,
    `  ${c.dim(donePhrase)}`,
    '',
    ...verdictFormatted,
    '',
    `  ${c.dim('Want full reviews?')} ${proastLink} ${c.dim('\u2014 PRoast')}`,
    `  ${theme.accentDim('Ready for more.')}`,
    '',
  ]));
}

// ── CLI ─────────────────────────────────────────────────────────────

// Static colors for help text (before severity is known)
const green = (s) => chalk.hex('#7ec9a0')(s);
const amber = (s) => chalk.hex('#d4a76a')(s);
const coral = (s) => chalk.hex('#f27a93')(s);

program
  .name('roast')
  .version(VERSION)
  .description('Get your code roasted by an AI.')
  .argument('[file]', 'File or directory to roast')
  .option('--gentle', 'Constructive mentor mode')
  .option('--savage', 'Unhinged roast mode')
  .option('--clipboard', 'Read code from clipboard')
  .option('--yolo', 'Roast an entire directory')
  .addHelpText('after', `
Severity levels:
  ${green('GENTLE')}   Constructive mentor — kind but honest
  ${amber('HONEST')}   Direct friend — witty and fair ${c.dim('(default)')}
  ${coral('SAVAGE')}   Unhinged roast — merciless comedy

Examples:
  roast src/index.ts              Roast a file (honest mode)
  roast src/index.ts --savage     Maximum brutality
  roast src/ --yolo               Roast entire directory
  roast --clipboard               Roast code from clipboard
`)
  .action(async (file, options) => {
    const severity = options.savage ? 'savage' : options.gentle ? 'gentle' : 'honest';

    // Set theme based on severity FIRST
    setTheme(severity);

    let code = '';
    let filename = '';

    if (options.clipboard) {
      code = readClipboard();
      if (!code) {
        console.log(`\n  ${theme.accent('\u2718')} Clipboard is empty or not accessible.\n`);
        process.exit(1);
      }
      filename = 'clipboard';
    } else if (file) {
      const filePath = resolve(file);
      try {
        const stats = statSync(filePath);
        if (stats.isDirectory()) {
          if (!options.yolo) {
            console.log(`\n  ${theme.accent('\u2718')} That's a directory. Add ${theme.accent('--yolo')} if you're brave enough.\n`);
            process.exit(1);
          }
          const files = readDirectory(filePath);
          if (files.length === 0) {
            console.log(`\n  ${theme.accent('\u2718')} No code files found in that directory.\n`);
            process.exit(1);
          }
          code = files.map(f => `// === ${f.path} ===\n${f.content}`).join('\n\n');
          filename = `${basename(filePath)}/ (${files.length} files)`;
        } else {
          code = readFileSync(filePath, 'utf-8');
          filename = relative(process.cwd(), filePath) || basename(filePath);
        }
      } catch {
        console.log(`\n  ${theme.accent('\u2718')} Could not read: ${file}\n`);
        process.exit(1);
      }
    } else {
      code = await readStdin();
      if (!code) {
        console.log(`\n  ${theme.accent('\u2718')} No code to roast. Pass a file, pipe input, or use --clipboard.\n`);
        console.log(`  ${c.dim('Usage:')} roast ${theme.accent('<file>')} [--gentle | --savage] [--clipboard] [--yolo]\n`);
        process.exit(1);
      }
      filename = 'stdin';
    }

    // Truncate very large inputs
    const MAX_CHARS = 15000;
    if (code.length > MAX_CHARS) {
      code = code.slice(0, MAX_CHARS) + '\n// ... (truncated)';
    }

    const lineCount = code.split('\n').length;

    // Call API with animated spinner
    let result;
    try {
      result = await withSpinner(callClaude(code, severity, filename));
    } catch (err) {
      console.log(`\n  ${theme.accent('\u2718')} ${err.message}\n`);
      process.exit(1);
    }

    displayResults(result, severity, filename, lineCount);
  });

program.parse();
