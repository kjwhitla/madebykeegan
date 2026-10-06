# Founders vs Kaiju — HTML Playtest Prototype

A dependency-free browser prototype for **Founders vs Kaiju v0.2**, built as a rules laboratory for two-player hot-seat testing.

## Source of truth

Working rules: https://docs.google.com/document/d/18ejLHNDICC6FqyYkDY0M6WA-e3Yj3fDf3GUoe9NFqZk/edit

The core design contract is:

> The Kaiju cannot win without making itself easier to kill.

Washington shapes costs and geography. Colossus races inward while managing cards, Health, Waves, Evolutions, and exposure.

## Run it

No build step is required.

For the most reliable browser behavior, serve the repository locally:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/founders-vs-kaiju/
```

If this repository is served by GitHub Pages, the same folder can be used as a static page.

## Implemented

- Interactive 3-District reveal / Washington + Kaiju District draft
- Seeded 18-card Kaiju and 18-card Washington decks
- Dormant opening and 2-TIDE Awakening
- Kaiju Instinct / Manifest modes
- Force / Adapt Gates and deliberate card payment
- Overrun Health payment
- District Fortified → Breached → Ruined state
- Fortification capacity and Gate-shaper limits
- Three-Wave lifecycle and Core pressure
- Washington two-action responses
- Geographic Strike / Exposure rules
- Head / Body / Tail Evolutions
- Finite deck depletion
- City Core final Response and win conditions
- Action log and structured event data
- End-game metrics + JSON export
- Seed replay and basic debug/tuning controls

## Prototype architecture

```text
founders-vs-kaiju/
  index.html
  css/
    game.css
  js/
    config.js
    data.js
    engine.js
    ui.js
    app.js
```

`engine.js` owns authoritative state. UI handlers call engine actions rather than mutating state directly.

## Playtest metrics

The prototype records winner, exchange count, Awakening timing, Health by location, Force/Adapt choices, Overrun, Waves, Strikes, Fortifications, Rally use, deck depletion, Evolutions, and approximate Body / Tide / Instinct behavior.

Use **Download JSON** after a game to save the full state, action log, and summary.

## Debug / tuning panel

The Developer panel supports seed replay, Health/position overrides, Wave injection, phase skipping, JSON export, and major starting-value changes before a new game.

Core numbers are centralized in `js/config.js`.

## Current implementation notes

This is an early functional prototype, not a production adaptation. A few nested card-resolution edge cases remain implementation-tuning items rather than structural design gaps. See `RULES_QUESTIONS.md` and `KNOWN_LIMITATIONS.md`.

## Design discipline

Prefer this correction order:

1. tune a card's opportunity cost or value;
2. tune Gate / Health / hand / Exposure values;
3. replace a problematic card effect;
4. only then consider a subsystem change.

The next job of this prototype is to answer: **where do players lean forward, regret a choice, pivot strategy, or become bored?**
