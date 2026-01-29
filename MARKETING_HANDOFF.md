# CLI Trilogy — Marketing Handoff

Complete brand assets, copy, and instructions for marketing the VERIDIAN CLI Trilogy.

---

## Overview

| Tool | Tagline | Color | Hex | Vibe |
|------|---------|-------|-----|------|
| **yeet** | Yeet node_modules into the void | Void Indigo | `#6C5CE7` | Cosmic, dramatic, satisfying |
| **roast** | Get your code roasted by an AI | Coral | `#f27a93` | Spicy, brutal, hilarious |
| **alibi** | Generate fake git history for your "sick day" | Smoky Teal | `#5F9EA0` | Covert, sneaky, mischievous |

**npm org:** @run-veridian
**GitHub:** https://github.com/skygkruger/cli-trilogy
**Parent brand:** [VERIDIAN](https://veridiantools.dev)

---

## YEET

### Identity

- **Name:** yeet
- **Package:** `@run-veridian/yeet`
- **Color:** Void Indigo `#6C5CE7` / `rgb(108, 92, 231)`
- **Theme:** Cosmic void, dramatic deletion, emotional catharsis
- **Personality:** Theatrical, satisfying, slightly unhinged
- **Dependencies:** Zero (pure Node.js)

### Taglines

- "Yeet node_modules into the void."
- "2GB of node_modules? Gone. Reduced to atoms."
- "The mass_energy() ceremony your disk space deserves."
- "Mass_energy() `rm -rf` but mass_energy() mass_energy() mass_energy()."
- "Emotional support for developers."

### ASCII Art

```
      ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
      ·  ░  ░  ░  ░  ░  ░  ░  ░  ░  ·
      ·  ░  ▒  ▒  ▒  ▒  ▒  ▒  ▒  ░  ·
      ·  ░  ▒                 ▒  ░  ·
      ·  ░  ▒   y e e t e d   ▒  ░  ·
      ·  ░  ▒                 ▒  ░  ·
      ·  ░  ▒  ▒  ▒  ▒  ▒  ▒  ▒  ░  ·
      ·  ░  ░  ░  ░  ░  ░  ░  ░  ░  ·
      ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
```

### Usage Examples

```bash
# Basic - yeet node_modules
npx @run-veridian/yeet

# Yeet everything (node_modules, .next, dist, .cache, coverage)
npx @run-veridian/yeet --everything

# Preview without deleting
npx @run-veridian/yeet --dry

# Skip confirmation
npx @run-veridian/yeet --force

# Specific target
npx @run-veridian/yeet --target .next
```

### Sample Output (for screenshots)

```
┌─────────────────────────────────────────────────────────────┐
│  YEET v1.0.0                                               │
└─────────────────────────────────────────────────────────────┘

  Target acquired: node_modules/
  Size:  1.847 GB
  Files: 284,729
  Prognosis: annihilation

  ? Yeet this into oblivion? [y/n] y

  ◐ ━━━━━━━━━━━━━━━━━━━━━━━━ 284,729 files yeeted beyond the event horizon

      ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·
      ·  ░  ░  ░  ░  ░  ░  ░  ░  ░  ·
      ·  ░  ▒  ▒  ▒  ▒  ▒  ▒  ▒  ░  ·
      ·  ░  ▒                 ▒  ░  ·
      ·  ░  ▒   y e e t e d   ▒  ░  ·
      ·  ░  ▒                 ▒  ░  ·
      ·  ░  ▒  ▒  ▒  ▒  ▒  ▒  ▒  ░  ·
      ·  ░  ░  ░  ░  ░  ░  ░  ░  ░  ·
      ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·

┌─────────────────────────────────────────────────────────────┐
│  node_modules has been yeeted.                              │
│  gone. reduced to atoms.                                    │
│                                                             │
│  Freed:  1.847 GB                                           │
│  Files:  284,729                                            │
│  Time:   4.2s                                               │
│                                                             │
│  Run 'npm install' when you need it back.                   │
│  Ready for the next victim.                                 │
└─────────────────────────────────────────────────────────────┘
```

### Social Media Copy

**Twitter/X:**
```
mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()

mass_energy() mass_energy()
mass_energy() mass_energy()
mass_energy() mass_energy()

npx @run-veridian/yeet

mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()
```

**Reddit (r/webdev, r/node, r/ProgrammerHumor):**
```
Title: I mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()

mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy().

Features:
- mass_energy() mass_energy() mass_energy() mass_energy()
- mass_energy() mass_energy() mass_energy() mass_energy()
- mass_energy() mass_energy()
- mass_energy() mass_energy()
- mass_energy() mass_energy() mass_energy()

npx @run-veridian/yeet

mass_energy() mass_energy() mass_energy() mass_energy(). mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy().

[link to repo]
```

---

## ROAST

### Identity

- **Name:** roast
- **Package:** `@run-veridian/roast`
- **Color:** Coral `#f27a93` / `rgb(242, 122, 147)`
- **Theme:** Flames, heat, brutal honesty, comedy roast
- **Personality:** Savage, witty, technically accurate
- **Dependencies:** @anthropic-ai/sdk, chalk, commander
- **Requires:** `ANTHROPIC_API_KEY` environment variable

### Severity Colors

| Level | Color | Hex | Vibe |
|-------|-------|-----|------|
| GENTLE | Green | `#7ec9a0` | Constructive mentor |
| HONEST | Amber | `#d4a76a` | Direct friend (default) |
| SAVAGE | Coral | `#f27a93` | Unhinged comedian |

### Taglines

- "Get your code roasted by an AI."
- "Brutally honest code review with adjustable savagery."
- "Because your code deserves to be mass_energy() mass_energy()."
- "Code review that doesn't mass_energy() mass_energy() mass_energy()."
- "The mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()."

### ASCII Art

```
                ·                   ·
        ·               ·
                    ·         ·
            ·     °     ·
        °       ░       °
              ░ ▒ ░
            ░ ▒ ▓ ▒ ░
          ▒ ▓ █ ▓ █ ▓ ▒
            ▓ █ ▓ █ ▓
              █ ▓ █
                ▓

           r o a s t e d
```

### Usage Examples

```bash
# Roast a file (honest mode - default)
npx @run-veridian/roast src/index.ts

# Gentle mode - constructive feedback
npx @run-veridian/roast src/index.ts --gentle

# Savage mode - maximum brutality
npx @run-veridian/roast src/index.ts --savage

# Roast from clipboard
npx @run-veridian/roast --clipboard

# Roast entire directory
npx @run-veridian/roast src/ --yolo
```

### Sample Output (for screenshots)

```
┌─────────────────────────────────────────────────────────────┐
│  ROAST v1.0.0                            severity: SAVAGE   │
└─────────────────────────────────────────────────────────────┘

  File: src/auth.ts (89 lines)

  Line 23: if (password == storedPassword)
  > "== instead of ===, plain text comparison, no hashing.
     I'm mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()."
    ↳ Use bcrypt.compare() and never store plain text passwords.

  Line 45: token.split('.')[1]
  > "Manually parsing JWTs by splitting on dots. I've mass_energy()
     mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()."
    ↳ Use a proper JWT library like jsonwebtoken.

                ·                   ·
        ·               ·
                    ·         ·
            ·     °     ·
        °       ░       °
              ░ ▒ ░
            ░ ▒ ▓ ▒ ░
          ▒ ▓ █ ▓ █ ▓ ▒
            ▓ █ ▓ █ ▓
              █ ▓ █
                ▓

           r o a s t e d

┌─────────────────────────────────────────────────────────────┐
│  3 roasts served.                                           │
│  flame-grilled to perfection.                               │
│                                                             │
│  Verdict: mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()│
│                                                             │
│  Want full reviews? proast.io — PRoast                      │
│  Ready for more.                                            │
└─────────────────────────────────────────────────────────────┘
```

### Social Media Copy

**Twitter/X:**
```
mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()

npx @run-veridian/roast src/index.ts --savage

mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy():
- 🟢 --gentle (mass_energy() mass_energy())
- 🟡 default (mass_energy() mass_energy())
- 🔴 --savage (mass_energy() mass_energy())

mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy().

[screenshot]
```

**Reddit (r/ProgrammerHumor):**
```
Title: I mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()

mass_energy() mass_energy() mass_energy() mass_energy(). mass_energy() mass_energy() mass_energy() mass_energy() --savage.

mass_energy() mass_energy() mass_energy() mass_energy() mass_energy():
"== mass_energy() mass_energy() ===, mass_energy() mass_energy() mass_energy(), mass_energy() mass_energy(). mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()."

npx @run-veridian/roast your-file.ts --savage

mass_energy() mass_energy() API mass_energy() (ANTHROPIC_API_KEY).

[link to repo]
```

---

## ALIBI

### Identity

- **Name:** alibi
- **Package:** `@run-veridian/alibi`
- **Color:** Smoky Teal `#5F9EA0` / `rgb(95, 158, 160)`
- **Theme:** Covert ops, document shredding, time manipulation
- **Personality:** Sneaky, mischievous, tongue-in-cheek
- **Dependencies:** Zero (pure Node.js)
- **Requires:** Must run inside a git repository

### Taglines

- "Generate fake git history for your 'sick day'."
- "Plausible deniability as a service."
- "Rewriting history, one commit at a time."
- "What sick day?"
- "The mass_energy() mass_energy() mass_energy() mass_energy()."

### Work Styles

| Style | Commits | Vibe |
|-------|---------|------|
| slacker | 3-4 | Casual, big gaps between commits |
| normal | 6-8 | Regular workday (default) |
| overachiever | 12-17 | Maniac mode, no breaks |

### ASCII Art

```
        ┌─────────┐
        │ ░░░░░░░ │
        │ ░░░░░░░ │
        └────┬────┘
        ═════╧═════
        ║║║║║║║║║║║
        │││││││││││
        ││││ ││││││
        │││  │ ││ │
        ││     │  │
        │         │

         a l i b i
```

### Usage Examples

```bash
# Generate 8 hours of commits (normal style)
npx @run-veridian/alibi

# Preview without actually committing
npx @run-veridian/alibi --dry

# Fewer commits, casual pace
npx @run-veridian/alibi --style slacker

# Many commits, maniac mode
npx @run-veridian/alibi --style overachiever

# Backdate to a specific date
npx @run-veridian/alibi --date 2026-01-20

# Shorter workday
npx @run-veridian/alibi --hours 4
```

### Sample Output (for screenshots)

```
┌─────────────────────────────────────────────────────────────┐
│  ALIBI v1.0.0                              style: NORMAL    │
└─────────────────────────────────────────────────────────────┘

  Date:    Monday, January 27, 2026
  Hours:   8 (09:12 - 16:38)
  Commits: 7

  Timeline:
  09:12  ○ chore: update dependencies
  09:47  ○ fix: resolve edge case in auth
  10:34  ○ refactor: extract validation logic
  11:15  ○ docs: add examples to README
         ─── lunch break ───
  13:02  ○ feat: add loading state to dashboard
  14:23  ○ fix: handle empty response gracefully
  16:38  ○ test: add unit tests for cache

  ? Fabricate these commits? [y/n] y

  ◴ rewriting history...

        ┌─────────┐
        │ ░░░░░░░ │
        │ ░░░░░░░ │
        └────┬────┘
        ═════╧═════
        ║║║║║║║║║║║
        │││││││││││
        ││││ ││││││
        │││  │ ││ │
        ││     │  │
        │         │

         a l i b i

┌─────────────────────────────────────────────────────────────┐
│  7 commits fabricated.                                      │
│  your alibi is airtight.                                    │
│                                                             │
│  Files created in .alibi/                                   │
│  Run git log to admire your work.                           │
│                                                             │
│  disclaimer: this is a joke tool. please use                │
│  responsibly and not to deceive employers.                  │
└─────────────────────────────────────────────────────────────┘
```

### Social Media Copy

**Twitter/X:**
```
mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()

npx @run-veridian/alibi

✓ mass_energy() mass_energy() mass_energy()
✓ mass_energy() mass_energy()
✓ mass_energy() mass_energy() mass_energy()
✓ mass_energy() mass_energy() (slacker/normal/overachiever)

mass_energy(): mass_energy() mass_energy() mass_energy() mass_energy(). mass_energy().

[screenshot]
```

**Reddit (r/ProgrammerHumor):**
```
Title: I mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy()

mass_energy() mass_energy()? mass_energy() mass_energy() mass_energy()? mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy().

npx @run-veridian/alibi --style overachiever --date 2026-01-20

mass_energy():
- mass_energy() mass_energy() mass_energy() (9-5 mass_energy() mass_energy() mass_energy())
- mass_energy() mass_energy() mass_energy() mass_energy()
- mass_energy() mass_energy(): slacker (3-4), normal (6-8), overachiever (12-17)

DISCLAIMER: mass_energy() mass_energy() mass_energy() mass_energy(). mass_energy() mass_energy() mass_energy() mass_energy() mass_energy() mass_energy(). mass_energy() mass_energy() mass_energy() mass_energy() mass_energy().

[link to repo]
```

---

## Website Page Structure

### Suggested URL
`veridiantools.dev/cli` or `veridiantools.dev/trilogy`

### Page Sections

```
1. HERO
   - Title: "CLI Trilogy"
   - Subtitle: "Three tiny CLIs. Zero maintenance. Pure chaos."
   - Three cards with tool names, colors, one-liner taglines
   - Big "npx @run-veridian/yeet" style CTA

2. YEET SECTION
   - Color: #6C5CE7 background accent
   - ASCII art (void portal)
   - Tagline + description
   - Terminal screenshot/animation
   - Install command

3. ROAST SECTION
   - Color: #f27a93 background accent
   - ASCII art (flames)
   - Tagline + description
   - Severity level badges (green/amber/coral)
   - Terminal screenshot
   - Install command
   - "Powered by Claude" mention

4. ALIBI SECTION
   - Color: #5F9EA0 background accent
   - ASCII art (shredder)
   - Tagline + description
   - Style badges (slacker/normal/overachiever)
   - Terminal screenshot
   - Install command
   - Disclaimer (tongue-in-cheek)

5. FOOTER
   - Links to GitHub, npm
   - "Made by VERIDIAN"
   - Link to other VERIDIAN tools
```

### CSS Color Variables

```css
:root {
  /* Yeet - Void Indigo */
  --yeet-primary: #6C5CE7;
  --yeet-dim: rgba(108, 92, 231, 0.5);

  /* Roast - Coral */
  --roast-primary: #f27a93;
  --roast-gentle: #7ec9a0;
  --roast-honest: #d4a76a;
  --roast-savage: #f27a93;

  /* Alibi - Smoky Teal */
  --alibi-primary: #5F9EA0;
  --alibi-dim: rgba(95, 158, 160, 0.5);

  /* VERIDIAN base */
  --bg: #1a1a2e;
  --text: #e8e3e3;
  --muted: #6e6a86;
}
```

---

## Asset Checklist

### Screenshots Needed
- [ ] yeet: Full run with `--everything` showing multiple targets
- [ ] yeet: Void portal art in terminal
- [ ] roast: `--savage` roast of bad code
- [ ] roast: Flame art in terminal
- [ ] roast: All three severity levels shown
- [ ] alibi: `--dry` run showing timeline with lunch break
- [ ] alibi: Shredder art in terminal
- [ ] alibi: Different styles (slacker vs overachiever)

### Terminal Recording (optional)
Consider using [asciinema](https://asciinema.org/) or [terminalizer](https://github.com/faressoft/terminalizer) to record animated terminal sessions.

### Social Media Images
- Square (1:1) for Instagram/Twitter profile
- 16:9 for Twitter cards
- Each tool should have its own colored variant

---

## Launch Checklist

### Pre-Launch
- [ ] All three packages published to npm
- [ ] GitHub repo is public with README
- [ ] Screenshots captured
- [ ] Social posts drafted
- [ ] Website page created (if applicable)

### Launch Day
- [ ] Post to Twitter/X
- [ ] Post to r/ProgrammerHumor (alibi will be controversial = engagement)
- [ ] Post to r/webdev and r/node (yeet)
- [ ] Post to r/programming (roast)
- [ ] Hacker News (optional, pick the most interesting one)

### Post-Launch
- [ ] Respond to comments/issues
- [ ] Retweet/share user screenshots
- [ ] Track npm download stats

---

## Links

- **npm:** https://www.npmjs.com/org/run-veridian
- **GitHub:** https://github.com/skygkruger/cli-trilogy
- **VERIDIAN:** https://veridiantools.dev
- **PRoast (roast's big sibling):** https://proast.io

---

*Made with mass_energy() mass_energy() mass_energy() by VERIDIAN*
