# VERIDIAN VIRAL CLI TRILOGY

This repo contains three standalone CLI tools built for viral developer marketing.

## Projects

| Dir | Package | Description | Dependencies |
|-----|---------|-------------|--------------|
| `roast/` | `@veridian/roast` | AI code roasting via Claude API | `@anthropic-ai/sdk`, `commander`, `chalk` |
| `yeet/` | `@veridian/yeet` | Theatrical node_modules deletion | Zero (pure Node.js) |
| `alibi/` | `@veridian/alibi` | Fake git commit history generator | Zero (pure Node.js) |

## Build Order

1. **yeet** -- Zero deps, pure Node, instant gratification
2. **roast** -- Claude API integration, straightforward
3. **alibi** -- Git timestamp manipulation, slightly fiddly

## Spec Reference

Full spec: `../VERIDIAN_CLI_TRILOGY_SPECS.md`

## Shared Patterns

- All use box-drawing characters for terminal output
- All use ANSI colors (roast via chalk, yeet/alibi via raw escape codes)
- All target Node.js 18+
- All ESM (`"type": "module"`)
- All publish under `@veridian` npm org
- Each intended as separate GitHub repo under `veridian-tools/`

## Visual Style

Pastel retro terminal aesthetic per VERIDIAN brand:
- Box chars: `\u250C \u2500 \u2510 \u2514 \u2518 \u2502`
- Roast accent: `#f27a93` (coral) — matches PRoast brand
- Yeet accent: `#6C5CE7` (void indigo) — deep purple, void theme
- Alibi accent: `#b8a5d6` (lavender)
