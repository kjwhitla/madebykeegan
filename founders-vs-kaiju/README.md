# Founders vs Kaiju — HTML Playtest Prototype v0.2

A dependency-free, two-player hot-seat rules laboratory for **Founders vs Kaiju**.

This branch is the **Complete Rules Fidelity + Playtest UX** engineering pass. It exists to test the tabletop rules, not to turn the design into a videogame.

## Source of truth

Working tabletop rules:  
https://docs.google.com/document/d/18ejLHNDICC6FqyYkDY0M6WA-e3Yj3fDf3GUoe9NFqZk/edit

Core geometry:

> **Distance to Core vs Distance to Death.**

The Kaiju advances through a Linear Race while Washington advances through a Conquest Race. Progress should create exposure.

## Run it

Serve the repository over HTTP because the v0.2 prototype assembles its rules/UI bundles from local text fragments:

```bash
python3 -m http.server 8080
```

Open:

```text
http://localhost:8080/founders-vs-kaiju/
```

Do not rely on opening `index.html` directly from `file://`.

## v0.2 engineering goals

### 1. Rules fidelity

The old MVP could display all card text while simplifying several effects internally. v0.2 treats that as unsafe for balance testing.

The branch now has explicit resolution paths for K01–K18, W01–W18, the six Districts, Gate payment, Overrun, Waves, Fortifications, Exposure, Evolutions, finite decks, and City Core victory.

See **IMPLEMENTATION_MATRIX.md** before treating an edge-case result as balance evidence.

### 2. Playtest UX

The interface now emphasizes decisions rather than presentation polish:

- current-decision helper;
- legal/illegal action feedback;
- Force vs Adapt preview;
- explicit Gate-card payment;
- Overrun Health preview;
- deterministic card-order choices;
- Fortification replacement choices;
- optional trigger prompts;
- Hand / Deck / Discard visibility;
- Head / Body / Tail Evolution slots;
- reproducible seeds;
- end-game metrics;
- JSON export;
- moment markers: **Tense / Obvious / Confusing**.

### 3. Instrumentation

The game records:

- winner and exchanges;
- first exchange Awakening was possible;
- actual Awakening exchange;
- Dormant Acts;
- Health entering Breach / DII / DI / Core;
- Force vs Adapt;
- Overrun Health;
- Strikes and damage;
- Evolutions installed/replaced;
- Waves created/destroyed/Breaches;
- Fortifications installed/replaced;
- Rally / Command usage;
- Body / Tide / Instinct behavioral counts;
- deck depletion;
- playtester Tense / Obvious / Confusing markers.

## Architecture

```text
founders-vs-kaiju/
  index.html
  README.md
  IMPLEMENTATION_MATRIX.md
  KNOWN_LIMITATIONS.md
  RULES_QUESTIONS.md

  css/
    game.css
    v02.css

  js/
    config.js
    data.js
    bootstrap-v02.js
    ui-bootstrap-v02.js
    app-v02.js

    engine-v02/
      part-00.txt ... part-05.txt

    ui-v02/
      part-00.txt ... part-02.txt
```

The v0.2 engine/UI are split into runtime fragments only to make connector-based iteration manageable. They should be consolidated into normal JavaScript modules once this branch is stable.

## What not to build yet

No AI, networking, accounts, campaign, deck construction, additional Kaiju, art pipeline, sound, or animation-heavy combat.

The question is still:

> **Where do players lean forward, regret a choice, pivot strategy, or become bored?**

## Known engineering risks

Remaining issues are mostly nested trigger-ordering cases, not missing strategic systems. See **KNOWN_LIMITATIONS.md**.

Do not redesign the board game to compensate for a software implementation bug.
