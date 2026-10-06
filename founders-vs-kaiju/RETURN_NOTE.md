# FVCK! — Return Note

Welcome back.

## Where we stopped

The current working build is:

**FVCK! — Founders vs Colossal Kaiju**  
**HTML Playtest Prototype v0.2 — First Human Playtest Build**

Branch:

`fvk-html-v0.2-rules-fidelity`

The game is now in **playtest mode**, not design-expansion mode.

---

## What is done

### P0 — Rules Fidelity: COMPLETE

The HTML engine now has explicit queued resolution for:

- Advance entry effects;
- Wave movement and prevention;
- District Breach / Ruin;
- Fortification capacity changes;
- nested player decisions;
- hand-limit cleanup;
- continuation back into the correct phase.

Hard cases now covered include:

- W10 + W18 simultaneous Wave prevention;
- K14 + D03 River Crossing;
- W12 Orderly Retreat during Ruin;
- W12 moving a companion Fortification before cleanup;
- moved Fortification capacity / Gate-shaper legality;
- W16 Lafayette free Fortify into a full destination;
- False Works return + draw;
- Market Ward;
- Abigail Adams;
- K10 post-Advance draw;
- Signal Beacon interrupting and resuming a Signature;
- K15 drawing only after its Wave actually Breaches.

Two small wording conventions remain in `RULES_QUESTIONS.md`; neither is a structural game-design problem.

### P1 — FVCK! Story / Playtest UX: COMPLETE

The prototype now presents the working identity:

# FVCK!
### Founders vs Colossal Kaiju

The key tone is:

> **The Kaiju owns scale. Washington owns resolve.**

Washington is not a scarred action hero.

He stays formal, upright, composed, and increasingly urgent while the situation around him becomes ridiculous and dangerous.

The FVCK! cadence accelerates by location:

```text
Approach      F… V… C… K…
Breach        F - V - C - K!
District II   F-V-C-K! F-V-C-K!
District I    FVCK! FVCK!
City Core     FVCK!
```

A successful Advance now produces the presentation beat:

> **COLOSSUS IS CLOSER.**

This is storytelling only. No new resource, meter, timer, or cadence mechanic was added.

---

## What is next

### P2 — FIRST HUMAN PLAYTEST BLOCK

This is the active phase.

Run **5–10 games without changing the gameplay** unless a genuine software/rules failure occurs.

Use:

`PLAYTEST_PROTOCOL.md`

Track the block in:

**GitHub Issue #2 — P2: Run first 5–10 FVCK! human playtests**

For every game:

1. export the JSON;
2. use the **Tense / Obvious / Confusing** buttons when appropriate;
3. record the seed;
4. ask the three post-game questions.

### Ask after each game

1. **What was the hardest decision?**
2. **When did the game feel most inevitable or obvious?**
3. **When did you most strongly feel that the Colossal Kaiju was getting closer?**

---

## Do NOT do yet

Do not add:

- another Kaiju;
- AI;
- campaign;
- networking;
- more card systems;
- new scoring;
- a cadence resource;
- production art;
- voice chanting;
- animation-heavy combat.

Do not do “Pass 12” because one playtest feels strange.

The point of the next block is to collect repeated evidence.

---

## What we are trying to prove

The game's master geometry is still:

> **Distance to Core vs Distance to Death**

Kaiju:

```text
APPROACH → BREACH → DII → DI → CORE
```

Washington:

```text
4 HP → 3 → 2 → 1 → 0
```

The defining question is:

> **Does every step closer make both players care more?**

The best sign is a late-game decision where the Kaiju player thinks:

> If I wait, Washington gets another Response.  
> If I go now, I may have to Overrun.  
> If I use this card to pay the Gate, I lose the Evolution I wanted.

...and advances anyway.

That is the game we are testing for.

---

## How to run it

From the repo root:

```bash
git fetch
git checkout fvk-html-v0.2-rules-fidelity
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/founders-vs-kaiju/
```

Regression page:

```text
http://localhost:8080/founders-vs-kaiju/smoke-test.html
```

---

## Current GitHub state

- Draft PR #1: **FVCK! — HTML Playtest Prototype v0.2 — First Human Playtest Build**
- Issue #2: **P2 — Run first 5–10 FVCK! human playtests**
- Active branch: `fvk-html-v0.2-rules-fidelity`

Do not merge the PR just because the code is cleaner.

Play the game first.

---

## First thing to do when you return

**Run Game 1.**

Do not redesign anything before it.

Play it once, mark the moments, export the JSON, and then inspect what actually happened.
