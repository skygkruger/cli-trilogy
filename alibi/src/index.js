#!/usr/bin/env node

// alibi — Zero dependencies. Pure Node.js built-ins only.
// Smoky teal identity (#5F9EA0)

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { createInterface } from 'node:readline';

// ── Constants ────────────────────────────────────────────────────────

const VERSION = '1.0.0';

const STYLES = {
  slacker: { commits: [3, 4], label: 'SLACKER' },
  normal: { commits: [6, 8], label: 'NORMAL' },
  overachiever: { commits: [12, 17], label: 'MANIAC' },
};

// ── Smoky Teal (#5F9EA0) ─────────────────────────────────────────────

const st = (s) => `\x1b[38;2;95;158;160m${s}\x1b[0m`;
const stBold = (s) => `\x1b[1m\x1b[38;2;95;158;160m${s}\x1b[0m`;
const stDim = (s) => `\x1b[2m\x1b[38;2;95;158;160m${s}\x1b[0m`;

const c = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  white: '\x1b[37m',
};

// ── Commit Message Templates ─────────────────────────────────────────

const prefixes = ['fix', 'feat', 'refactor', 'docs', 'test', 'chore', 'style', 'perf'];

const templates = {
  fix: [
    'resolve edge case in {module}',
    'handle empty response gracefully',
    'null check in {module}',
    'race condition in {feature}',
    'memory leak in {module}',
    'off-by-one error in pagination',
    'timezone handling in date utils',
  ],
  feat: [
    'add loading state to {feature}',
    'implement {feature} caching',
    'add retry logic for {module}',
    'implement rate limiting',
    'add health check endpoint',
  ],
  refactor: [
    'extract {thing} logic',
    'improve error handling',
    'simplify {module} initialization',
    'split monolithic {module}',
    'clean up {module}',
  ],
  docs: [
    'update README examples',
    'add JSDoc to {module}',
    'document {feature} API',
    'add architecture diagram',
    'update CONTRIBUTING guide',
  ],
  test: [
    'add unit tests for {module}',
    'integration tests for {feature}',
    'e2e tests for {flow}',
    'improve test coverage',
  ],
  chore: [
    'update dependencies',
    'clean up unused imports',
    'upgrade to Node {version}',
    'update CI pipeline',
    'bump version to {version}',
  ],
  style: [
    'fix linting errors',
    'format {module}',
    'consistent naming in {module}',
  ],
  perf: [
    'optimize {module} queries',
    'lazy load {feature}',
    'reduce bundle size',
  ],
};

const modules = ['auth', 'api', 'database', 'cache', 'worker', 'scheduler', 'validator'];
const features = ['dashboard', 'checkout', 'search', 'notifications', 'settings'];
const flows = ['login', 'checkout', 'onboarding', 'signup'];
const things = ['validation', 'formatting', 'parsing', 'auth', 'config'];
const versions = ['20', '22', '1.4.0', '2.0.0'];

// ── Phrases ─────────────────────────────────────────────────────────

const WORKING_PHRASES = [
  'rewriting history',
  'covering tracks',
  'manufacturing evidence',
  'establishing plausible deniability',
  'adjusting the timeline',
  'nothing to see here',
  'altering records',
  'fabricating commits',
  'generating paper trail',
  'backdating timestamps',
  'erasing footprints',
  'forging the past',
  'manipulating git log',
  'planting evidence',
  'cooking the books',
  'doctoring the timeline',
  'falsifying records',
  'leaving no trace',
];

const DONE_PHRASES = [
  'your alibi is airtight.',
  'history rewritten.',
  'plausible deniability achieved.',
  'what sick day?',
  'the timeline has been corrected.',
  'nothing suspicious here.',
  'the perfect cover.',
  'your tracks are covered.',
  'git blame will never know.',
  'the past is whatever you say it is.',
  'your secret is safe.',
  'no one will ever know.',
  'case closed.',
  'the perfect crime.',
];

// ── ANSI Helpers ────────────────────────────────────────────────────

function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

// ── Box Drawing ─────────────────────────────────────────────────────

function box(lines, width = 61) {
  const h = '\u2500', v = '\u2502';
  const top = st(`\u250C${h.repeat(width)}\u2510`);
  const bot = st(`\u2514${h.repeat(width)}\u2518`);
  const pad = lines.map(l => {
    const visible = stripAnsi(l).length;
    const needed = Math.max(0, width - 2 - visible);
    return `${st(v)}  ${l}${' '.repeat(needed)}${st(v)}`;
  });
  return [top, ...pad, bot].join('\n');
}

// ── Helpers ─────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function fillTemplate(template) {
  return template
    .replace('{module}', pick(modules))
    .replace('{feature}', pick(features))
    .replace('{flow}', pick(flows))
    .replace('{thing}', pick(things))
    .replace('{version}', pick(versions));
}

function generateCommitMessage() {
  const prefix = pick(prefixes);
  const tmpl = templates[prefix];
  if (!tmpl) return `${prefix}: misc changes`;
  return `${prefix}: ${fillTemplate(pick(tmpl))}`;
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

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function formatTime(date) {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ── Shredder Art ────────────────────────────────────────────────────

function shredderArt() {
  const a = st;
  const ab = stBold;
  const ad = stDim;

  return [
    '',
    `        ${a('┌─────────┐')}`,
    `        ${a('│')} ${ad('░░░░░░░')} ${a('│')}`,
    `        ${a('│')} ${ad('░░░░░░░')} ${a('│')}`,
    `        ${a('└────┬────┘')}`,
    `        ${a('═════╧═════')}`,
    `        ${a('║║║║║║║║║║║')}`,
    `        ${ad('│││││││││││')}`,
    `        ${ad('││││ ││││││')}`,
    `        ${ad('│││  │ ││ │')}`,
    `        ${ad('││     │  │')}`,
    `        ${ad('│         │')}`,
    '',
    `         ${ab('a l i b i')}`,
    '',
  ].join('\n');
}

// ── Time Distribution ───────────────────────────────────────────────

function generateCommitTimes(date, hours, numCommits) {
  // Default workday: 9 AM start
  const startHour = 9;
  const endHour = startHour + hours;

  // Lunch break: 12-1 PM (if workday spans it)
  const lunchStart = 12;
  const lunchEnd = 13;

  const commits = [];
  const baseDate = date ? new Date(date) : new Date();
  baseDate.setHours(startHour, 0, 0, 0);

  // Calculate available minutes (excluding lunch if applicable)
  let availableMinutes = hours * 60;
  const hasLunch = startHour < lunchEnd && endHour > lunchStart;
  if (hasLunch) {
    availableMinutes -= 60; // Remove lunch hour
  }

  // Distribute commits with natural variation
  const avgGap = availableMinutes / (numCommits + 1);

  let currentMinutes = randInt(10, 30); // Start 10-30 mins after arriving

  for (let i = 0; i < numCommits; i++) {
    const commitDate = new Date(baseDate);

    // Add current minutes to start time
    let totalMinutes = startHour * 60 + currentMinutes;

    // Skip lunch break
    if (hasLunch && totalMinutes >= lunchStart * 60) {
      totalMinutes += 60; // Jump over lunch
    }

    commitDate.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, randInt(0, 59), 0);

    commits.push({
      date: commitDate,
      message: generateCommitMessage(),
    });

    // Add gap with variation (±30% of average)
    const variation = avgGap * 0.3;
    currentMinutes += avgGap + randInt(-variation, variation);
  }

  return commits;
}

// ── Spinner ─────────────────────────────────────────────────────────

async function withSpinner(fn) {
  const frames = ['◴', '◷', '◶', '◵'];
  let frame = 0;
  let phraseIdx = Math.floor(Math.random() * WORKING_PHRASES.length);

  const interval = setInterval(() => {
    const spinner = frames[frame % frames.length];

    if (frame > 0 && frame % 20 === 0) {
      phraseIdx = (phraseIdx + 1) % WORKING_PHRASES.length;
    }
    const phrase = WORKING_PHRASES[phraseIdx];

    process.stdout.write(`\x1b[2K\r  ${st(spinner)} ${stDim(phrase)}...`);
    frame++;
  }, 100);

  try {
    const result = await fn();
    clearInterval(interval);
    process.stdout.write('\x1b[2K\r');
    return result;
  } catch (err) {
    clearInterval(interval);
    process.stdout.write('\x1b[2K\r');
    throw err;
  }
}

// ── Git Operations ──────────────────────────────────────────────────

function isGitRepo() {
  try {
    execSync('git rev-parse --git-dir', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function createCommit(commit, index) {
  const alibiDir = '.alibi';

  // Ensure .alibi directory exists
  if (!existsSync(alibiDir)) {
    mkdirSync(alibiDir, { recursive: true });
  }

  // Create a file to commit
  const filename = join(alibiDir, `work-${index + 1}.txt`);
  const content = `${commit.message}\n\nTimestamp: ${commit.date.toISOString()}\n`;
  writeFileSync(filename, content);

  // Stage the file
  execSync(`git add "${filename}"`, { stdio: 'ignore' });

  // Format date for git
  const gitDate = commit.date.toISOString();

  // Commit with backdated timestamp
  const env = {
    ...process.env,
    GIT_AUTHOR_DATE: gitDate,
    GIT_COMMITTER_DATE: gitDate,
  };

  execSync(`git commit -m "${commit.message}"`, {
    stdio: 'ignore',
    env
  });
}

// ── Display ─────────────────────────────────────────────────────────

function displayPlan(commits, flags) {
  const style = STYLES[flags.style];

  // Header
  const left = `${stBold('ALIBI')} ${c.dim}v${VERSION}${c.reset}`;
  const right = flags.dry ? `${c.dim}mode:${c.reset} ${st('DRY RUN')}` : `${c.dim}style:${c.reset} ${st(style.label)}`;
  const leftLen = `ALIBI v${VERSION}`.length;
  const rightLen = stripAnsi(right).length;
  const gap = 59 - leftLen - rightLen;
  const headerLine = `${left}${' '.repeat(Math.max(1, gap))}${right}`;
  console.log('\n' + box([headerLine]));

  // Plan details
  const targetDate = commits[0]?.date || new Date();
  console.log(`
  ${c.dim}Date:${c.reset}    ${formatDate(targetDate)}
  ${c.dim}Hours:${c.reset}   ${flags.hours} (${formatTime(commits[0]?.date)} - ${formatTime(commits[commits.length - 1]?.date)})
  ${c.dim}Commits:${c.reset} ${st(commits.length.toString())}
`);

  // Timeline
  console.log(`  ${c.dim}Timeline:${c.reset}`);

  let lastHour = -1;
  for (const commit of commits) {
    const hour = commit.date.getHours();

    // Show lunch break
    if (lastHour < 12 && hour >= 13) {
      console.log(`  ${c.dim}        ─── lunch break ───${c.reset}`);
    }
    lastHour = hour;

    const time = formatTime(commit.date);
    console.log(`  ${st(time)}  ${st('○')} ${commit.message}`);
  }
  console.log();
}

function displaySuccess(commits) {
  console.log(shredderArt());

  const donePhrase = pick(DONE_PHRASES);

  console.log(box([
    '',
    `  ${st(commits.length.toString())} commits fabricated.`,
    `  ${stDim(donePhrase)}`,
    '',
    `  ${c.dim}Files created in${c.reset} ${st('.alibi/')}`,
    `  ${c.dim}Run${c.reset} git log ${c.dim}to admire your work.${c.reset}`,
    '',
    `  ${stDim('disclaimer: this is a joke tool. please use')}`,
    `  ${stDim('responsibly and not to deceive employers.')}`,
    '',
  ]));
}

// ── CLI ─────────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  // Help
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
  ${stBold('alibi')} v${VERSION} ${c.dim}— Generate convincing git history${c.reset}

  ${st('Usage:')}
    alibi                       Generate 8 hours of commits (normal style)
    alibi --hours 4             Generate 4 hours of commits
    alibi --date 2026-01-24     Backdate to specific date
    alibi --style slacker       Fewer commits, bigger gaps
    alibi --style overachiever  Many commits, no breaks
    alibi --dry                 Preview without committing
    alibi --help                Show this help

  ${st('Styles:')}
    ${st('slacker')}       3-4 commits, casual pace
    ${st('normal')}        6-8 commits, regular workday ${c.dim}(default)${c.reset}
    ${st('overachiever')}  12-17 commits, maniac mode
`);
    return;
  }

  // Version
  if (args.includes('--version') || args.includes('-v')) {
    console.log(`alibi v${VERSION}`);
    return;
  }

  // Check if in git repo
  if (!isGitRepo()) {
    console.log(`\n  ${st('✘')} Not a git repository. Run ${st('git init')} first.\n`);
    process.exit(1);
  }

  // Parse flags
  const flags = {
    hours: 8,
    date: null,
    style: 'normal',
    dry: args.includes('--dry'),
  };

  const hoursIdx = args.indexOf('--hours');
  if (hoursIdx !== -1 && args[hoursIdx + 1]) {
    flags.hours = Math.min(16, Math.max(1, parseInt(args[hoursIdx + 1], 10) || 8));
  }

  const dateIdx = args.indexOf('--date');
  if (dateIdx !== -1 && args[dateIdx + 1]) {
    flags.date = args[dateIdx + 1];
  }

  const styleIdx = args.indexOf('--style');
  if (styleIdx !== -1 && args[styleIdx + 1]) {
    const s = args[styleIdx + 1];
    if (STYLES[s]) flags.style = s;
  }

  // Generate commit plan
  const style = STYLES[flags.style];
  const numCommits = randInt(style.commits[0], style.commits[1]);
  const commits = generateCommitTimes(flags.date, flags.hours, numCommits);

  // Display plan
  displayPlan(commits, flags);

  // Dry run - stop here
  if (flags.dry) {
    console.log(`  ${c.dim}Dry run — no commits were created.${c.reset}`);
    console.log(`  ${c.dim}Remove --dry to execute for real.${c.reset}\n`);
    return;
  }

  // Confirmation
  const ok = await confirm(`  ${st('?')} Fabricate these commits? ${c.dim}[y/n]${c.reset} `);
  if (!ok) {
    console.log(`\n  ${c.dim}Aborted. Your conscience remains clear.${c.reset}\n`);
    return;
  }

  console.log();

  // Execute commits with spinner
  await withSpinner(async () => {
    for (let i = 0; i < commits.length; i++) {
      createCommit(commits[i], i);
      await sleep(200); // Small delay for effect
    }
  });

  // Success
  displaySuccess(commits);
}

main().catch(err => {
  console.error(`\n  ${st('✘')} ${err.message}\n`);
  process.exit(1);
});
