# FVCK! — HTML Prototype Next Development

Working title:

> **FVCK! — Founders vs Colossal Kaiju**

The prototype should now move from **rules-fidelity candidate** to **trusted human playtest tool**.

The next work is engineering and playtesting, not another structural board-game design pass.

---

## Design / Story Rule

FVCK! is a **cadence**, not a rage fantasy.

George Washington remains recognizably Washington: formal, upright, composed, increasingly urgent, and almost absurdly dignified as the Colossal Kaiju gets closer.

Do not turn him into:

- a scarred action hero;
- a muscular fantasy general;
- an armored monster fighter;
- a bloodied grimdark survivor.

The contrast is the point:

> **The Kaiju owns scale. Washington owns resolve.**

The world loses composure around Washington more than Washington loses composure himself.

The frightening visual is not constant monster attack animation. It is:

> **The Colossal Kaiju is getting closer.**

The cadence may accelerate with the existing game geometry:

```text
APPROACH
F… V… C… K…

BREACH
F - V - C - K!

DISTRICT II
F-V-C-K! F-V-C-K!

DISTRICT I
FVCK! FVCK!

CITY CORE
FVCK!
```

This is **presentation only**. Do not create a cadence meter, cadence resource, timing mini-game, or new scoring system.

---

# P0 — CLOSE RULES-FIDELITY RISKS

Do this before treating unusual game results as balance evidence.

### 1. Build an explicit trigger queue

The engine needs deterministic handling when several reactions become legal from one event.

Highest-risk combinations:

- W10 Emergency Repairs
- W17 Abigail Adams
- W18 John Paul Jones
- K14 Deep Current
- D03 River Crossing
- District capacity loss

The queue should clearly distinguish:

```text
EVENT
→ prevention
→ movement
→ impact
→ District state change
→ capacity loss
→ card triggers
→ follow-up choices
```

Do not invent tabletop timing rules silently. Any genuinely unresolved timing decision belongs in `RULES_QUESTIONS.md`.

### 2. Finish W12 Orderly Retreat

When a District Ruins:

- Washington fallback movement must resolve correctly;
- the allowed companion Fortification movement must resolve;
- capacity at the destination must still be enforced;
- the Fortification being moved cannot also be discarded by the same Ruin event.

Add a deterministic regression case.

### 3. Finish W16 Lafayette at capacity

Test:

- Command move + free Fortify;
- destination already at capacity;
- destination already has a Gate-shaper;
- legal replacement choice;
- entry-trigger movement at full destination.

### 4. Harden nested hand-limit continuation

Every card-gain path should preserve the action/phase continuation after a hand-limit discard.

Regression-test:

- Rally;
- Market Ward;
- Abigail Adams;
- False Works return + draw;
- Kaiju Instinct draw effects;
- Awakening draw;
- K10 post-Advance draw;
- K15 Breach draw.

### 5. Optional simultaneous triggers

If two optional effects are legal at the same timing point, the UI should either:

- ask the correct player to choose their order, or
- use an explicitly documented tabletop priority rule.

Do not pick an arbitrary hidden order.

---

# P1 — FVCK! STORY / PLAYTEST UX

Once P0 is stable, update the prototype presentation.

### Working title treatment

Primary:

```text
FVCK!
Founders vs Colossal Kaiju
```

Keep the existing repository/folder path `founders-vs-kaiju` for now. Do not create naming churn in code merely because the working brand changed.

### Washington presentation

Use language such as:

- Hold the line.
- Keep pace.
- Fortify.
- Move.
- Fire.
- It's closer.
- One more Response.

Avoid:

- berserk;
- blood rage;
- revenge;
- “Washington goes beast mode”;
- scarred-warrior imagery.

### Cadence treatment

The current battlefield location may change a small presentation cue:

- Approach — slow / measured
- Breach — first urgency
- District II — pace increasing
- District I — rapid cadence
- Core — final call

This can appear in:

- the current-decision panel;
- phase transitions;
- small battlefield copy;
- end-of-Advance messaging.

It should **never affect game state**.

### “Getting closer” transition

After a successful Advance, make the most important visual change obvious:

> **COLOSSUS IS CLOSER.**

Then show:

- new location;
- Exposure change;
- Wave movement;
- Washington's next Response.

The user should feel the Linear Race without reading the log.

### Do not add art production yet

Use typography, scale, spacing, silhouette placeholders, and motion restraint.

The eventual art direction should preserve:

> small composed Washington / enormous approaching Kaiju / escalating chaos around him.

---

# P2 — FIRST HUMAN PLAYTEST BLOCK

Once P0 is clean and P1 is readable:

## Freeze gameplay for 5–10 games

Do not adjust a rule after every dramatic result.

Only interrupt the block for:

- a state-locking software bug;
- an illegal game state;
- a rule that cannot be executed;
- a clear contradiction with the tabletop rules.

Everything else becomes evidence.

## Capture per game

- seed;
- winner;
- total exchanges;
- first exchange Awakening was possible;
- actual Awakening exchange;
- Kaiju Health entering Breach / DII / DI / Core;
- Force choices;
- Adapt choices;
- Overrun Health;
- Strikes;
- total direct damage;
- Waves created / destroyed / Breaches;
- Fortifications installed / replaced;
- Evolutions installed / replaced;
- Body / Tide / Instinct behavior;
- deck depletion;
- Tense markers;
- Obvious markers;
- Confusing markers.

## Ask after every game

1. **What was the hardest decision?**
2. **When did the game feel most inevitable or obvious?**
3. **When did you most strongly feel that the Kaiju was getting closer?**

The third question is now important because it tests both mechanics and the FVCK! presentation thesis.

---

# P3 — v0.3 TUNING FROM EVIDENCE

Do not add systems first.

Tune in this order:

1. card opportunity cost;
2. individual card numbers;
3. Gate values;
4. Health;
5. hand sizes / draw cadence;
6. Exposure values;
7. replace a problematic card;
8. only then consider a system change.

Useful existing warning thresholds:

- one Force/Adapt route chosen roughly >70% across repeated tests;
- repeated 2+ Health Overruns;
- Colossus often dying before District II;
- Colossus commonly entering District I at full Health;
- Washington routinely depleting before late game;
- one Body/Tide/Instinct direction correct regardless of Districts or defense;
- many **Obvious** markers around the same action;
- many **Confusing** markers around the same trigger.

---

# DEFERRED

Do not build yet:

- AI opponent;
- online multiplayer;
- accounts;
- matchmaking;
- campaign;
- progression;
- deck construction;
- additional Kaiju;
- additional Washington characters;
- production illustration;
- sound;
- voice chanting;
- cinematic combat animation;
- mobile polish.

Especially do not add literal chant audio yet.

The cadence should first prove itself as a visual/storytelling device.

---

# v0.2 MERGE READINESS

The rules-fidelity branch is ready to merge when:

- all critical P0 trigger cases have deterministic regression coverage;
- the browser smoke suite passes;
- no normal action sequence can strand a player at 0 actions or in an unresolved phase;
- a complete game can be played without external bookkeeping;
- illegal actions explain why they are unavailable;
- JSON export captures enough data to reconstruct the important decision path;
- known remaining limitations are explicitly non-critical for the first human playtest block.

Then merge v0.2 and begin the 5–10 game freeze.

The central prototype question remains:

> **Does every step closer make both players care more?**
